'use client';

import { signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';

export default function LogoutBtn() {
  const handleSignOut = () => {
    signOut({
      callbackUrl: '/',
    });
  };

  return (
    <Button
      variant='destructive'
      className='cursor-pointer'
      onClick={handleSignOut}
    >
      <LogOut />
      Keluar
    </Button>
  );
}
