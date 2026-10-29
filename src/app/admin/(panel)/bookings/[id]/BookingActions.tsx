'use client';

import { useActionState, useState } from 'react';
import { approve, recordPayment, changeStatus, saveNotes } from '../../../_actions/bookings';
import { Field, Notice, SubmitButton, inputCls } from '@/components/admin/ui';

const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;

export function ApproveForm({ id, razorpay, total, resend = false }: { id: string; razorpay: boolean; total: number; resend?: boolean }) {
  const [state, action] = useActionState(approve.bind(null, id), undefined);
  const [paid, setPaid] = useState(false);
  return (
    <form action={action} className="space-y-3">
      <Notice state={state} />
      {!resend && (
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="paidOffline" checked={paid} onChange={(e) => setPaid(e.target.checked)} /> Already paid (cash / UPI / bank transfer)
        </label>
      )}
      {!paid && (
        razorpay ? (
          <p className="text-xs text-soil-700">{resend ? 'Re-emails the existing link.' : `Creates a Razorpay link for ${inr(total)} (valid 72 hours) and emails it to the guest. Dates are held while awaiting payment.`}</p>
        ) : (
          <Field label="Payment link (optional)" hint="Razorpay isn't connected yet. Paste a UPI/Razorpay link to email it, or leave empty and mark paid later.">
            <input name="paymentUrl" type="url" placeholder="https://rzp.io/…" className={inputCls} />
          </Field>
        )
      )}
      <SubmitButton className="w-full" pendingLabel="Working…">{paid ? 'Confirm booking' : resend ? 'Resend payment email' : 'Approve & email guest'}</SubmitButton>
    </form>
  );
}

export function PaymentForm({ id, total }: { id: string; total: number }) {
  const [state, action] = useActionState(recordPayment.bind(null, id), undefined);
  return (
    <form action={action} className="space-y-3">
      <Notice state={state} />
      <Field label="Amount received (₹)" hint={`Leave empty for the full ${inr(total)}`}>
        <input name="amount" type="number" min={0} className={inputCls} />
      </Field>
      <SubmitButton className="w-full" pendingLabel="Working…">Mark paid & confirm</SubmitButton>
    </form>
  );
}

export function StatusForm({ id, status, past }: { id: string; status: string; past: boolean }) {
  const [state, action] = useActionState(changeStatus.bind(null, id), undefined);
  const options = status === 'CONFIRMED'
    ? [...(past ? [['COMPLETED', 'Completed (guest stayed)'], ['NO_SHOW', 'No-show']] : []), ['CANCELLED', 'Cancel booking']]
    : status === 'REQUESTED' ? [['DECLINED', 'Decline request']] : [['CANCELLED', 'Cancel booking']];
  return (
    <form action={action} className="space-y-3">
      <Notice state={state} />
      <select name="status" className={inputCls} defaultValue={options[0][0]}>
        {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
      <Field label="Message to guest (optional)"><textarea name="reason" rows={2} className={inputCls} /></Field>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="notify" defaultChecked /> Email the guest</label>
      <SubmitButton variant="secondary" className="w-full" pendingLabel="Working…">Apply</SubmitButton>
    </form>
  );
}

export function NotesForm({ id, notes }: { id: string; notes: string }) {
  const [state, action] = useActionState(saveNotes.bind(null, id), undefined);
  return (
    <form action={action} className="space-y-3">
      <Notice state={state} />
      <textarea name="notes" rows={4} defaultValue={notes} placeholder="Only visible to staff" className={inputCls} />
      <SubmitButton variant="secondary">Save notes</SubmitButton>
    </form>
  );
}
