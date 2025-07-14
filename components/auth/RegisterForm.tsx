'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useActionState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Wording } from '@/assets';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { registerUser } from '@/actions/auth';
import { registerForm } from '@/lib/constants';
import Loader from '../Loader';

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerUser, {
    success: null,
    message: '',
  });

  useEffect(() => {
    if (state.success === false) {
      toast.error(state.message);
    } else if (state.success === true) {
      toast.success(state.message);
    }
  }, [state.success, state.message]);

  return (
    <>
      {isPending && <Loader />}
      <form
        action={formAction}
        className='pt-12 px-8 pb-8 rounded-md flex-1 max-w-[700px] bg-white space-y-6'
      >
        <div className='flex justify-center items-center'>
          <Image src={Wording} alt='Incensory' width={220} height={120} />
        </div>
        {registerForm.map((block, i) => (
          <div className='grid grid-cols-2 gap-x-6' key={i}>
            {block.map((field) => (
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
          </div>
        ))}
        <div className='flex justify-center gap-1.5'>
          <p>Sudah punya akun? </p>
          <Link
            href='/login'
            className='text-secondary hover:underline cursor-pointer text-center block'
          >
            Masuk di sini
          </Link>
        </div>
        <Button variant='secondary' className='w-full cursor-pointer'>
          Daftar
        </Button>
      </form>
    </>
  );
}
