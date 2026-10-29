'use client';

import { useFormStatus } from 'react-dom';
import { cn } from '@/lib/utils';

export function Card({ title, children, actions, className }: { title?: string; children: React.ReactNode; actions?: React.ReactNode; className?: string }) {
  return (
    <section className={cn('bg-white rounded-xl border border-mist-200 shadow-sm', className)}>
      {(title || actions) && (
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-mist-200">
          {title && <h2 className="font-semibold text-forest-900">{title}</h2>}
          {actions}
        </div>
      )}
      <div className="p-5">{children}</div>
    </section>
  );
}

export function Field({ label, hint, children, className }: { label: string; hint?: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={cn('block', className)}>
      <span className="block text-sm font-medium text-ink-900 mb-1">{label}</span>
      {children}
      {hint && <span className="block text-xs text-soil-700 mt-1">{hint}</span>}
    </label>
  );
}

export const inputCls =
  'w-full rounded-lg border border-mist-200 bg-white px-3 py-2 text-sm text-ink-900 focus:border-moss-500 focus:outline-none focus:ring-2 focus:ring-moss-500/20';

export function SubmitButton({ children, variant = 'primary', className, pendingLabel = 'Saving…' }: { children: React.ReactNode; variant?: 'primary' | 'danger' | 'secondary'; className?: string; pendingLabel?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition disabled:opacity-60',
        variant === 'primary' && 'bg-forest-700 text-white hover:bg-forest-900',
        variant === 'secondary' && 'border border-mist-200 bg-white text-ink-900 hover:bg-sand-50',
        variant === 'danger' && 'bg-red-600 text-white hover:bg-red-700',
        className
      )}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}

export type ActionState = { ok?: boolean; error?: string; message?: string; email?: string } | undefined;

export function Notice({ state }: { state: ActionState }) {
  if (!state) return null;
  if (state.error) return <p role="alert" className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">{state.error}</p>;
  if (state.message) return <p role="status" className="rounded-lg bg-green-50 border border-green-200 px-3 py-2 text-sm text-green-800">{state.message}</p>;
  return null;
}

export function Badge({ children, tone = 'neutral' }: { children: React.ReactNode; tone?: 'neutral' | 'green' | 'amber' | 'red' | 'blue' }) {
  const tones = {
    neutral: 'bg-sand-50 text-soil-700',
    green: 'bg-green-100 text-green-800',
    amber: 'bg-amber-100 text-amber-800',
    red: 'bg-red-100 text-red-700',
    blue: 'bg-blue-100 text-blue-800',
  };
  return <span className={cn('inline-flex rounded-full px-2 py-0.5 text-xs font-medium', tones[tone])}>{children}</span>;
}
