'use client';

import { useState, useMemo, useEffect } from 'react';
import { Calendar, Users, Search, Plus, Minus, X } from 'lucide-react';
import { cn, addDays, formatPrice } from '@/lib/utils';
import { rooms } from '@/lib/accommodations';

type Room = typeof rooms[keyof typeof rooms];

interface BookingWidgetProps {
  className?: string;
  variant?: 'hero' | 'sticky' | 'page';
  room?: Room;
}

export default function BookingWidget({ className, variant = 'hero', room }: BookingWidgetProps) {
  const [checkIn, setCheckIn] = useState<string>('');
  const [checkOut, setCheckOut] = useState<string>('');
  const [adults, setAdults] = useState(room ? 1 : 2);
  const [children, setChildren] = useState(0);
  const [isGuestSelectorOpen, setIsGuestSelectorOpen] = useState(false);

  useEffect(() => {
    // Close guest selector when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isGuestSelectorOpen &&
        !(event.target as HTMLElement).closest('.guest-selector-wrapper')
      ) {
        setIsGuestSelectorOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isGuestSelectorOpen]);

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = addDays(new Date(), 1).toISOString().split('T')[0];
  
  const maxGuests = room ? room.maxOccupancy : 8;

  const handleCheckInChange = (date: string) => {
    setCheckIn(date);
    if (!checkOut || new Date(checkOut) <= new Date(date)) {
      const nextDay = addDays(new Date(date), 1).toISOString().split('T')[0];
      setCheckOut(nextDay);
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams({
      checkIn: checkIn || today,
      checkOut: checkOut || tomorrow,
      adults: adults.toString(),
      children: children.toString(),
    });

    if (room) {
      // Handle direct booking for a specific room
      alert(`Booking ${room.name} for ${adults} adults and ${children} children from ${checkIn} to ${checkOut}`);
    } else {
      // Handle general availability search
      window.location.href = `/accommodations?${params.toString()}`;
    }
  };

  const numberOfNights = useMemo(() => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diff = end.getTime() - start.getTime();
      const nights = Math.ceil(diff / (1000 * 60 * 60 * 24));
      return nights > 0 ? nights : 0;
    }
    return 0;
  }, [checkIn, checkOut]);

  const totalGuests = adults + children;
  const guestText = `${totalGuests} guest${totalGuests !== 1 ? 's' : ''}`;

  const isCompact = variant === 'sticky';
  const isHero = variant === 'hero';
  
  const basePrice = room ? room.basePrice : 0;
  const totalBasePrice = basePrice * numberOfNights;
  const taxesAndFees = totalBasePrice * 0.18; // Example 18% tax
  const totalPrice = totalBasePrice + taxesAndFees;

  if (isCompact) {
    return (
      <div className={cn('bg-bone-0/95 backdrop-blur-md rounded-input shadow-elev-1 p-3', className)}>
        <div className="flex items-center gap-2">
          <button className="flex-1 px-3 py-2 rounded-input border border-mist-200 text-left text-sm bg-bone-0">
            <span className="block text-xs text-soil-700">Check-in</span>
            <span>{checkIn ? new Date(checkIn).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }) : 'Add dates'}</span>
          </button>
          <button className="flex-1 px-3 py-2 rounded-input border border-mist-200 text-left text-sm bg-bone-0">
            <span className="block text-xs text-soil-700">Guests</span>
            <span>{guestText}</span>
          </button>
          <button
            onClick={handleSearch}
            className="px-4 py-2 rounded-input bg-forest-700 text-bone-0 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Search className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      'bg-bone-0 rounded-input shadow-elev-2 p-6',
      isHero && 'max-w-md w-full',
      className
    )}>
      <div className="space-y-4">
        {!room && (
          <div className="text-center">
            <h3 className="font-display text-xl text-forest-900 mb-2">
              Book Your Stay
            </h3>
            <p className="text-sm text-soil-700">
              Find your perfect eco-friendly retreat
            </p>
          </div>
        )}

        {room && (
          <div className="text-left">
             <div className="text-2xl font-bold text-forest-900">
              {formatPrice(room.basePrice)}
              <span className="text-sm font-normal text-soil-700"> / night</span>
            </div>
            <div className="text-xs text-soil-700">Excluding taxes & fees</div>
          </div>
        )}

        {/* Date Selection */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="checkin" className="block text-sm font-medium text-ink-900 mb-1">
              Check-in
            </label>
            <div className="relative">
              <input
                id="checkin"
                type="date"
                value={checkIn}
                min={today}
                onChange={(e) => handleCheckInChange(e.target.value)}
                className="form-input text-sm pr-10"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-soil-700 pointer-events-none" />
            </div>
          </div>

          <div>
            <label htmlFor="checkout" className="block text-sm font-medium text-ink-900 mb-1">
              Check-out
            </label>
            <div className="relative">
              <input
                id="checkout"
                type="date"
                value={checkOut}
                min={checkIn || tomorrow}
                onChange={(e) => setCheckOut(e.target.value)}
                className="form-input text-sm pr-10"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-soil-700 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Guest Selection */}
        <div className="relative guest-selector-wrapper">
          <label className="block text-sm font-medium text-ink-900 mb-1">
            Guests
          </label>
          <button
            type="button"
            onClick={() => setIsGuestSelectorOpen(!isGuestSelectorOpen)}
            className="form-input w-full text-left flex items-center justify-between"
          >
            <span>{guestText}</span>
            <Users className="h-4 w-4 text-soil-700" />
          </button>

          {isGuestSelectorOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-bone-0 border border-mist-200 rounded-input shadow-elev-2 p-4 z-10">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-ink-900">Guests</div>
                  <button onClick={() => setIsGuestSelectorOpen(false)}>
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-ink-900">Adults</div>
                    <div className="text-sm text-soil-700">Ages 13+</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      disabled={adults <= 1}
                      className="w-8 h-8 rounded-full border border-mist-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:border-moss-500 transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-medium">{adults}</span>
                    <button
                      type="button"
                      onClick={() => setAdults(Math.min(maxGuests - children, adults + 1))}
                      disabled={(adults + children) >= maxGuests}
                      className="w-8 h-8 rounded-full border border-mist-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:border-moss-500 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-ink-900">Children</div>
                    <div className="text-sm text-soil-700">Ages 2-12</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      disabled={children <= 0}
                      className="w-8 h-8 rounded-full border border-mist-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:border-moss-500 transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-medium">{children}</span>
                    <button
                      type="button"
                      onClick={() => setChildren(Math.min(maxGuests - adults, children + 1))}
                      disabled={(adults + children) >= maxGuests}
                      className="w-8 h-8 rounded-full border border-mist-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:border-moss-500 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Price Breakdown */}
        {room && numberOfNights > 0 && (
          <div className="border-t border-mist-200 pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-soil-700">{formatPrice(basePrice)} x {numberOfNights} night{numberOfNights > 1 && 's'}</span>
              <span className="text-ink-900">{formatPrice(totalBasePrice)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-soil-700">Taxes & fees</span>
              <span className="text-ink-900">{formatPrice(taxesAndFees)}</span>
            </div>
            <div className="flex justify-between font-bold text-base pt-2">
              <span className="text-forest-900">Total</span>
              <span className="text-forest-900">{formatPrice(totalPrice)}</span>
            </div>
          </div>
        )}

        {/* Search Button */}
        <button
          onClick={handleSearch}
          disabled={room && !checkIn && !checkOut}
          className="btn btn-primary w-full justify-center text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {room ? (
            'Reserve'
          ) : (
            <>
              <Search className="h-4 w-4 mr-2" />
              Check Availability
            </>
          )}
        </button>

        {/* Quick Info */}
        <div className="text-center">
          <p className="text-xs text-soil-700">
            Free cancellation • Best rate guarantee
          </p>
        </div>
      </div>
    </div>
  );
}

// Simplified mobile booking bar component
export function MobileBookingBar() {
  return (
    <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 bg-bone-0/95 border-t border-mist-200 backdrop-blur-md">
      <div className="container mx-auto px-4 py-3">
        <BookingWidget variant="sticky" />
      </div>
    </div>
  );
}
