import Link from 'next/link';
import { requireUser } from '@/lib/auth/session';
import { getSetting, getGalleryVideos } from '@/lib/content-repo';
import { Card } from '@/components/admin/ui';
import { HeroForm, AnnouncementForm, VideosForm } from './SettingsForms';

export const dynamic = 'force-dynamic';

export default async function HomepageAdmin() {
  await requireUser('content');
  const [hero, announcement, videos] = await Promise.all([getSetting('home_hero'), getSetting('announcement'), getGalleryVideos()]);
  return (
    <div className="space-y-6 max-w-3xl">
      <div><Link href="/admin/content" className="text-sm text-soil-700 hover:underline">← Content</Link><h1 className="font-display text-3xl text-forest-900">Homepage, announcement &amp; videos</h1></div>
      <Card title="Announcement bar"><AnnouncementForm initial={announcement} /></Card>
      <Card title="Homepage hero"><HeroForm initial={hero} /></Card>
      <Card title="Gallery videos"><VideosForm initial={videos} /></Card>
    </div>
  );
}
