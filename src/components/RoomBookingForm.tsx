'use client';

import { useEffect, useRef, useState } from 'react';
import { Minus, Plus, CheckCircle2 } from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';
import { priceWithGstLabel, priceBasisLabel, MEAL_PLAN, type Room } from '@/lib/accommodations';

type Quote = { lines: { label: string; amount: number }[]; gst: number; gstPercent: number; total: number; notes: string[]; minNights: number; nights: number };
type Check = { loading: boolean; available?: boolean; unavailableNights?: string[]; quote?: Quote; error?: string };

const istToday = () => new Date(Date.now() + 5.5 * 3600e3).toISOString().slice(0, 10);
const plusDays = (iso: string, n: number) => {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};
const pretty = (iso: string) => new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', timeZone: 'UTC' });

function Counter({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (n: number) => void }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-ink-900">{label}</span>
      <div className="flex items-center gap-3">
        <button type="button" aria-label={`Fewer ${label}`} disabled={value <= min} onClick={() => onChange(value - 1)} className="w-8 h-8 rounded-full border border-mist-200 flex items-center justify-center disabled:opacity-40"><Minus className="h-4 w-4" /></button>
        <span className="w-5 text-center font-medium">{value}</span>
        <button type="button" aria-label={`More ${label}`} disabled={value >= max} onClick={() => onChange(value + 1)} className="w-8 h-8 rounded-full border border-mist-200 flex items-center justify-center disabled:opacity-40"><Plus className="h-4 w-4" /></button>
      </div>
    </div>
  );
}

export default function RoomBookingForm({ room, className }: { room: Room; className?: string }) {
  const today = istToday();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(Math.min(2, room.maxOccupancy));
  const [children, setChildren] = useState(0);
  const [check, setCheck] = useState<Check>({ loading: false });
  const [step, setStep] = useState<'select' | 'details' | 'done'>('select');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [code, setCode] = useState('');
  const startedAt = useRef(0);
  useEffect(() => { startedAt.current = Date.now(); }, []);

  useEffect(() => {
    if (!checkIn || !checkOut || checkOut <= checkIn) { setCheck({ loading: false }); return; }
    const ctrl = new AbortController();
    setCheck({ loading: true });
    const t = setTimeout(async () => {
      try {
        const qs = new URLSearchParams({ room: room.slug, checkIn, checkOut, adults: String(adults), children: String(children) });
        const res = await fetch(`/api/availability?${qs}`, { signal: ctrl.signal });
        const json = await res.json();
        setCheck(res.ok ? { loading: false, ...json } : { loading: false, error: json.error ?? 'Could not check availability' });
      } catch (e) {
        if ((e as Error).name !== 'AbortError') setCheck({ loading: false, error: 'Could not check availability' });
      }
    }, 250);
    return () => { clearTimeout(t); ctrl.abort(); };
  }, [room.slug, checkIn, checkOut, adults, children]);

  const tooShort = check.quote && check.quote.nights < check.quote.minNights;
  const canProceed = !!check.quote && check.available && !tooShort;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    const f = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          room: room.slug, checkIn, checkOut, adults, children,
          guestName: f.get('guestName'), guestEmail: f.get('guestEmail'), guestPhone: f.get('guestPhone'),
          specialRequests: f.get('specialRequests') || undefined,
          website: f.get('website'), startedAt: startedAt.current,
        }),
      });
      const json = await res.json();
      if (json.success) { setCode(json.code); setStep('done'); }
      else setSubmitError(json.message ?? 'Something went wrong.');
    } catch {
      setSubmitError('Network error. Please try again or WhatsApp +91 77952 07779.');
    } finally {
      setSubmitting(false);
    }
  }

  if (step === 'done') {
    return (
      <div className={cn('bg-bone-0 rounded-input shadow-elev-2 p-6 text-center space-y-3', className)} id="book">
        <CheckCircle2 className="h-10 w-10 text-moss-500 mx-auto" />
        <h3 className="font-display text-xl text-forest-900">Request received</h3>
        <p className="text-sm text-soil-700">Reference <b className="text-ink-900">{code}</b></p>
        <p className="text-sm text-soil-700">Your dates are not confirmed yet. We&apos;ll reply within 24 hours with confirmation and a payment link. Check your email.</p>
      </div>
    );
  }

  const input = 'w-full rounded-input border border-mist-200 px-3 py-2 text-sm bg-bone-0 focus:outline-none focus:border-moss-500';

  return (
    <div className={cn('bg-bone-0 rounded-input shadow-elev-2 p-6 space-y-4', className)} id="book">
      <div>
        <div className="text-2xl font-bold text-forest-900">{priceWithGstLabel(room.basePrice)}</div>
        <div className="text-sm text-soil-700">{priceBasisLabel(room)}</div>
        <div className="text-xs text-moss-500 font-medium">{MEAL_PLAN}</div>
      </div>

      {step === 'select' && (
        <>
          <div className="grid grid-cols-2 gap-2">
            <label className="text-xs text-soil-700">Check-in
              <input type="date" min={today} value={checkIn} className={input}
                onChange={(e) => { setCheckIn(e.target.value); if (!checkOut || checkOut <= e.target.value) setCheckOut(plusDays(e.target.value, 1)); }} />
            </label>
            <label className="text-xs text-soil-700">Check-out
              <input type="date" min={checkIn ? plusDays(checkIn, 1) : plusDays(today, 1)} value={checkOut} className={input} onChange={(e) => setCheckOut(e.target.value)} />
            </label>
          </div>
          <div className="space-y-3 border border-mist-200 rounded-input p-3">
            <Counter label="Adults" value={adults} min={1} max={room.maxOccupancy - children} onChange={setAdults} />
            <Counter label="Children" value={children} min={0} max={room.maxOccupancy - adults} onChange={setChildren} />
            <p className="text-xs text-soil-700">Sleeps up to {room.maxOccupancy}.</p>
          </div>

          {check.loading && <p className="text-sm text-soil-700">Checking availability…</p>}
          {check.error && <p className="text-sm text-red-700">{check.error}</p>}
          {check.quote && check.available === false && (
            <p className="text-sm text-red-700">Not available on {check.unavailableNights?.slice(0, 3).map(pretty).join(', ')}. Try other dates or WhatsApp us.</p>
          )}
          {tooShort && <p className="text-sm text-red-700">Minimum stay for these dates is {check.quote!.minNights} nights.</p>}
          {check.quote && check.available && (
            <div className="border-t border-mist-200 pt-3 space-y-1.5 text-sm">
              {check.quote.lines.map((l) => (
                <div key={l.label} className="flex justify-between gap-3"><span className="text-soil-700">{l.label}</span><span>{formatPrice(l.amount)}</span></div>
              ))}
              <div className="flex justify-between"><span className="text-soil-700">GST ({check.quote.gstPercent}%)</span><span>{formatPrice(check.quote.gst)}</span></div>
              <div className="flex justify-between font-bold text-base pt-1"><span>Total</span><span>{formatPrice(check.quote.total)}</span></div>
              {check.quote.notes.map((n) => <p key={n} className="text-xs text-soil-700">{n}</p>)}
            </div>
          )}

          <button type="button" disabled={!canProceed} onClick={() => setStep('details')} className="btn btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed">
            {checkIn ? 'Request to book' : 'Select dates'}
          </button>
          <p className="text-xs text-center text-soil-700">No payment now. We confirm within 24 hours. <a href="/cancellation" className="underline">Cancellation policy</a></p>
        </>
      )}

      {step === 'details' && check.quote && (
        <form onSubmit={submit} className="space-y-3">
          <p className="text-sm text-soil-700">{pretty(checkIn)} → {pretty(checkOut)} · {adults + children} guest{adults + children === 1 ? '' : 's'} · <b className="text-ink-900">{formatPrice(check.quote.total)}</b></p>
          <input name="guestName" required minLength={2} placeholder="Full name" autoComplete="name" className={input} />
          <input name="guestEmail" type="email" required placeholder="Email" autoComplete="email" className={input} />
          <input name="guestPhone" type="tel" required placeholder="Phone / WhatsApp" autoComplete="tel" className={input} />
          <textarea name="specialRequests" rows={3} placeholder="Food preferences, pets, arrival time… (optional)" className={input} />
          <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
            <input name="website" tabIndex={-1} autoComplete="off" />
          </div>
          {submitError && <p className="text-sm text-red-700">{submitError}</p>}
          <button type="submit" disabled={submitting} className="btn btn-primary w-full justify-center disabled:opacity-50">{submitting ? 'Sending…' : 'Send booking request'}</button>
          <button type="button" onClick={() => setStep('select')} className="w-full text-sm text-soil-700 underline">Change dates</button>
        </form>
      )}
    </div>
  );
}
