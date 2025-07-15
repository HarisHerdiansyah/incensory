'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useActionState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Wording } from '@/assets';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { verificationForm } from '@/lib/constants';
import { singleVerification } from '@/actions/auth';
import Loader from '../Loader';

export default function VerificationForm() {
  const [state, formAction, isPending] = useActionState(singleVerification, {
    success: null,
    message: '',
  });

  useEffect(() => {
    if (state.success === true) {
      toast.success(state.message);
    } else if (state.success === false) {
      toast.error(state.message);
    }
  }, [state.success, state.message]);

  return (
    <>
      {isPending && <Loader />}
      <form
        action={formAction}
        className='pt-12 px-8 pb-8 rounded-md flex-1 max-w-[500px] bg-white space-y-6'
      >
        <div className='flex justify-center items-center'>
          <Image src={Wording} alt='Incensory' width={220} height={120} />
        </div>
        {verificationForm.map((field) => (
          <div id='formControl' key={field.id}>
            <Label htmlFor={field.id} className='mb-3'>
              {field.label}
            </Label>
            <Input
              type={field.type}
              id={field.id}
              name={field.id}
              autoComplete='off'
              required
            />
          </div>
        ))}
        <div className='flex justify-between gap-1.5'>
          <Link
            href='/register'
            className='text-secondary hover:underline cursor-pointer text-center block'
          >
            Daftar di sini
          </Link>
          <Link
            href='/login'
            className='text-secondary hover:underline cursor-pointer text-center block'
          >
            Masuk di sini
          </Link>
        </div>
        <Button variant='secondary' className='w-full cursor-pointer'>
          Verifikasi Akun
        </Button>
      </form>
    </>
  );
}
