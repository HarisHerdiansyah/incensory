'use client';

import { Session } from 'next-auth';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { updateIdentity } from '@/actions/profile';
import Loader from '../Loader';
import { diffing } from '@/lib/utils';

export default function ProfileIdentityForm({ session }: { session: Session }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [identityState, setIdentityState] = useState({
    username: session.user.username || '',
    email: session.user.email || '',
    phone_number: session.user.phone_number || '',
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIdentityState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async () => {
    setIsLoading(true);

    const initial = {
      username: session.user.username,
      email: session.user.email,
      phone_number: session.user.phone_number,
    };
    const payload = diffing(initial, identityState);
    const response = await updateIdentity(payload);
    
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }

    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Loader className='h-screen' />}
      <div id='formGrid'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div id='formControl'>
            <Label htmlFor='username' className='mb-3'>
              Nama Pengguna:
            </Label>
            <Input
              type='text'
              id='username'
              name='username'
              autoComplete='off'
              value={identityState.username}
              onChange={onChange}
            />
          </div>
          <div id='formControl'>
            <Label htmlFor='email' className='mb-3'>
              Email:
            </Label>
            <Input
              type='text'
              id='email'
              name='email'
              autoComplete='off'
              value={identityState.email}
              onChange={onChange}
            />
          </div>
          <div id='formControl'>
            <Label htmlFor='phone_number' className='mb-3'>
              No. Telepon
            </Label>
            <Input
              type='number'
              id='phone_number'
              name='phone_number'
              autoComplete='off'
              value={identityState.phone_number}
              onChange={onChange}
            />
          </div>
        </div>
        <div className='flex justify-end my-8'>
          <Button variant='secondary' onClick={onSubmit}>
            Simpan Perubahan
          </Button>
        </div>
      </div>
    </>
  );
}
