import { requireUser } from '@/lib/auth/session';
import { ROLE_LABELS } from '@/lib/auth/permissions';
import { Card } from '@/components/admin/ui';
import PasswordForm from './PasswordForm';

export default async function AccountPage() {
  const user = await requireUser();
  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="font-display text-3xl text-forest-900">My account</h1>
      <Card title="Profile">
        <p className="text-sm">{user.name} · {user.email}</p>
        <p className="text-xs text-soil-700 mt-1">{ROLE_LABELS[user.role]}</p>
      </Card>
      <Card title="Change password"><PasswordForm /></Card>
    </div>
  );
}
