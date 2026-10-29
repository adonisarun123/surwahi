'use client';

import { useActionState } from 'react';
import { createUser, resetPassword } from '../../_actions/users';
import { Field, Notice, SubmitButton, inputCls } from '@/components/admin/ui';

export function CreateUserForm({ roles }: { roles: Record<string, string> }) {
  const [state, action] = useActionState(createUser, undefined);
  return (
    <form action={action} className="space-y-4">
      <Notice state={state} />
      <div className="grid sm:grid-cols-3 gap-4">
        <Field label="Name"><input name="name" required className={inputCls} /></Field>
        <Field label="Email"><input name="email" type="email" required className={inputCls} /></Field>
        <Field label="Role">
          <select name="role" defaultValue="MANAGER" className={inputCls}>
            {Object.entries(roles).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </Field>
      </div>
      <SubmitButton>Create account</SubmitButton>
    </form>
  );
}

export function ResetPasswordButton({ userId }: { userId: string }) {
  const [state, action] = useActionState(resetPassword.bind(null, userId), undefined);
  return (
    <form action={action} className="flex items-center gap-2">
      {state?.message ? <code className="text-xs bg-sand-50 px-2 py-1 rounded">{state.message}</code> : <button className="text-xs text-forest-700 hover:underline">Reset password</button>}
    </form>
  );
}
