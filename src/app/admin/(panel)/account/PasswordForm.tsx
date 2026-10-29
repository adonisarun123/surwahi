'use client';

import { useActionState } from 'react';
import { changePassword } from '../../_actions/auth';
import { Field, Notice, SubmitButton, inputCls } from '@/components/admin/ui';

export default function PasswordForm() {
  const [state, action] = useActionState(changePassword, undefined);
  return (
    <form action={action} className="space-y-4">
      <Notice state={state} />
      <Field label="Current password"><input name="current" type="password" autoComplete="current-password" required className={inputCls} /></Field>
      <Field label="New password" hint="At least 10 characters"><input name="next" type="password" autoComplete="new-password" required className={inputCls} /></Field>
      <Field label="Repeat new password"><input name="confirm" type="password" autoComplete="new-password" required className={inputCls} /></Field>
      <SubmitButton>Update password</SubmitButton>
    </form>
  );
}
