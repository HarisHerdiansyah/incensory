'use client';

import { useState, ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { updatePassword } from '@/actions/profile';
import Loader from '../Loader';

export default function ProfilePasswordForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [passwordState, setPasswordState] = useState({
    password: '',
    confirmPassword: '',
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async () => {
    if (passwordState.password !== passwordState.confirmPassword) {
      toast.error('Kata Sandi Tidak Cocok.');
      return;
    }

    setIsLoading(true);
    const response = await updatePassword(passwordState.password);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }

    setIsLoading(false);
    setPasswordState({ password: '', confirmPassword: '' });
  };

  return (
    <>
      {isLoading && <Loader className='h-screen' />}
      <div id='formGrid'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div id='formControl'>
            <Label htmlFor='password' className='mb-3'>
              Kata Sandi:
            </Label>
            <Input
              type='password'
              id='password'
              name='password'
              autoComplete='off'
              value={passwordState.password}
              onChange={onChange}
            />
          </div>
          <div id='formControl'>
            <Label htmlFor='confirmPassword' className='mb-3'>
              Konfirmasi Kata Sandi:
            </Label>
            <Input
              type='password'
              id='confirmPassword'
              name='confirmPassword'
              autoComplete='off'
              value={passwordState.confirmPassword}
              onChange={onChange}
            />
          </div>
        </div>
        <div className='flex justify-end my-8'>
          <Button variant='secondary' onClick={onSubmit}>
            Ganti Kata Sandi
          </Button>
        </div>
      </div>
    </>
  );
}
