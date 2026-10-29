import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/auth/session';
import { ROLE_LABELS } from '@/lib/auth/permissions';
import { Badge, Card } from '@/components/admin/ui';
import { setUserActive, setUserRole } from '../../_actions/users';
import { CreateUserForm, ResetPasswordButton } from './UserForms';

export default async function UsersPage() {
  const me = await requireUser('users');
  const users = await prisma.adminUser.findMany({ orderBy: [{ isActive: 'desc' }, { createdAt: 'asc' }] });
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl text-forest-900">Users</h1>
      <Card title="Team">
        <ul className="divide-y divide-mist-200">
          {users.map((u) => (
            <li key={u.id} className="py-3 flex flex-wrap items-center gap-3 justify-between">
              <div>
                <div className="font-medium">{u.name} {u.id === me.id && <span className="text-xs text-soil-700">(you)</span>}</div>
                <div className="text-xs text-soil-700">{u.email} · last sign-in {u.lastLoginAt ? u.lastLoginAt.toLocaleDateString('en-IN') : 'never'}</div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {!u.isActive && <Badge tone="red">Deactivated</Badge>}
                {u.id === me.id ? (
                  <Badge tone="blue">{u.role}</Badge>
                ) : (
                  <>
                    <form action={setUserRole.bind(null, u.id)} className="flex items-center gap-1">
                      <select name="role" defaultValue={u.role} className="rounded-lg border border-mist-200 text-sm px-2 py-1">
                        <option value="OWNER">Owner</option>
                        <option value="MANAGER">Manager</option>
                        <option value="EDITOR">Editor</option>
                      </select>
                      <button className="text-xs text-forest-700 hover:underline">Set</button>
                    </form>
                    <ResetPasswordButton userId={u.id} />
                    <form action={setUserActive.bind(null, u.id, !u.isActive)}>
                      <button className="text-xs text-red-700 hover:underline">{u.isActive ? 'Deactivate' : 'Reactivate'}</button>
                    </form>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </Card>
      <Card title="Add a team member">
        <CreateUserForm roles={ROLE_LABELS} />
      </Card>
    </div>
  );
}
