'use client';

import { useActionState } from 'react';
import { login } from '../_actions/auth';
import { Card, Field, Notice, SubmitButton, inputCls } from '@/components/admin/ui';

export default function LoginForm() {
  const [state, action] = useActionState(login, undefined);
  return (
    <Card>
      <form action={action} className="space-y-4">
        <Notice state={state} />
        <Field label="Email">
          <input name="email" type="email" autoComplete="username" required defaultValue={state?.email} key={state?.email} className={inputCls} />
        </Field>
        <Field label="Password">
          <input name="password" type="password" autoComplete="current-password" required className={inputCls} />
        </Field>
        <SubmitButton className="w-full" pendingLabel="Signing in…">Sign in</SubmitButton>
      </form>
    </Card>
  );
}
