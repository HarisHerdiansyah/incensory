import {
  ProfileImageForm,
  ProfileIdentityForm,
  ProfilePasswordForm,
} from '@/components/profile';

export default function page() {
  return (
    <>
      <p className='text-2xl md:text-3xl font-semibold'>Profil</p>
      <ProfileImageForm />
      <div className='my-8 space-y-8 md:px-10 lg:px-16'>
        <ProfileIdentityForm />
        <ProfilePasswordForm />
      </div>
    </>
  );
}
