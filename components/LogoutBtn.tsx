'use client';

import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';
import Loader from './Loader';

export default function LogoutBtn() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignOut = () => {
    setIsLoading(true);
    signOut({
      callbackUrl: '/',
    }).finally(() => setIsLoading(false));
  };

  return (
    <>
      {isLoading && <Loader />}
      <Button
        variant='destructive'
        className='cursor-pointer'
        onClick={handleSignOut}
      >
        <LogOut />
        Keluar
      </Button>
    </>
  );
}
