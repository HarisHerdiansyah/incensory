import { getServerSession } from 'next-auth';
import {
  ProfileImageForm,
  ProfileIdentityForm,
  ProfilePasswordForm,
} from '@/components/profile';
import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';

export default async function page() {
  const session = await getServerSession(authOptions);

  if (!session) redirect('/login');

  return (
    <>
      <p className='text-2xl md:text-3xl font-semibold'>Profil</p>
      <ProfileImageForm session={session} />
      <div className='my-8 space-y-8 md:px-10 lg:px-16'>
        <ProfileIdentityForm session={session} />
        <ProfilePasswordForm />
      </div>
    </>
  );
}
