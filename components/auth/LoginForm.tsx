'use client';

import Link from 'next/link';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useState, useRef } from 'react';
import { Wording } from '@/assets';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { loginForm } from '@/lib/constants';
import Loader from '../Loader';

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(formRef.current as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const response = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    setIsLoading(false);
    if (!response?.ok) {
      toast.error(`Gagal masuk. ${response?.error}`);
      return;
    }

    toast.success('Berhasil masuk!');
    formRef.current?.reset();
  };

  return (
    <>
      {isLoading && <Loader />}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className='pt-12 px-8 pb-12 rounded-md flex-1 max-w-[500px] bg-white space-y-6'
      >
        <div className='flex justify-center items-center'>
          <Image src={Wording} alt='Incensory' width={220} height={120} />
        </div>
        {loginForm.map((field) => (
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
        <div className='flex justify-center gap-1.5'>
          <p>Sudah punya akun? </p>
          <Link
            href='/register'
            className='text-secondary hover:underline cursor-pointer text-center block'
          >
            Masuk di sini
          </Link>
        </div>
        <Button variant='secondary' className='w-full cursor-pointer'>
          Masuk
        </Button>
      </form>
    </>
  );
}
