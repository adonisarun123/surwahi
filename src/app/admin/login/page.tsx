import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth/session';
import LoginForm from './LoginForm';

export const dynamic = 'force-dynamic';

export default async function LoginPage() {
  if (await getCurrentUser()) redirect('/admin');
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <h1 className="font-display text-3xl text-forest-900">Surwahi Admin</h1>
          <p className="text-sm text-soil-700 mt-1">Sign in to manage bookings, rates and content.</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
