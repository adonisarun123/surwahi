'use client';

import { useState } from 'react';
import { Calendar, Users, Search, Plus, Minus } from 'lucide-react';
import { cn, addDays } from '@/lib/utils';

interface BookingWidgetProps {
  className?: string;
  variant?: 'hero' | 'sticky' | 'page';
}

export default function BookingWidget({ className, variant = 'hero' }: BookingWidgetProps) {
  const [checkIn, setCheckIn] = useState<string>('');
  const [checkOut, setCheckOut] = useState<string>('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [isGuestSelectorOpen, setIsGuestSelectorOpen] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = addDays(new Date(), 1).toISOString().split('T')[0];

  const handleCheckInChange = (date: string) => {
    setCheckIn(date);
    // Auto-set checkout to next day if not set or if checkout is before checkin
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

    window.location.href = `/accommodations?${params.toString()}`;
  };

  const totalGuests = adults + children;
  const guestText = `${totalGuests} guest${totalGuests !== 1 ? 's' : ''}`;

  const isCompact = variant === 'sticky';
  const isHero = variant === 'hero';

  if (isCompact) {
    return (
      <div className={cn('bg-bone-0/95 backdrop-blur-md rounded-input shadow-elev-1 p-3', className)}>
        <div className="flex items-center gap-2">
          <button className="flex-1 min-w-0 px-2 sm:px-3 py-2 rounded-input border border-mist-200 text-left text-sm bg-bone-0">
            <span className="block text-xs text-soil-700">Check-in</span>
            <span className="truncate block">{checkIn ? new Date(checkIn).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }) : 'Add dates'}</span>
          </button>
          <button className="flex-1 min-w-0 px-2 sm:px-3 py-2 rounded-input border border-mist-200 text-left text-sm bg-bone-0">
            <span className="block text-xs text-soil-700">Guests</span>
            <span className="truncate block">{guestText}</span>
          </button>
          <button
            onClick={handleSearch}
            className="flex-shrink-0 px-3 sm:px-4 py-2 rounded-input bg-forest-700 text-bone-0 text-sm font-medium hover:opacity-90 transition-opacity"
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
        <div className="text-center">
          <h3 className="font-display text-xl text-forest-900 mb-2">
            Book Your Stay
          </h3>
          <p className="text-sm text-soil-700">
            Find your perfect eco-friendly retreat
          </p>
        </div>

        {/* Date Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                className="form-input text-sm w-full"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-soil-700 pointer-events-none hidden sm:block" />
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
                className="form-input text-sm w-full"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-soil-700 pointer-events-none hidden sm:block" />
            </div>
          </div>
        </div>

        {/* Guest Selection */}
        <div className="relative">
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
            <div className="absolute top-full left-0 right-0 mt-1 bg-bone-0 border border-mist-200 rounded-input shadow-elev-2 p-4 z-50">
              <div className="space-y-4">
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
                      onClick={() => setAdults(Math.min(8, adults + 1))}
                      disabled={adults >= 8}
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
                      onClick={() => setChildren(Math.min(6, children + 1))}
                      disabled={children >= 6}
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

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="btn btn-primary w-full justify-center text-base"
        >
          <Search className="h-4 w-4 mr-2" />
          Check Availability
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
