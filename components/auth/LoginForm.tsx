'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getSession, signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useState, useRef } from 'react';
import { WordingWhite } from '@/assets';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { loginForm } from '@/lib/constants';
import Loader from '../Loader';

export default function LoginForm() {
  const router = useRouter();
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

    const session = await getSession();
    if (session?.user.role === 'ADMIN') {
      router.push('/cms/dashboard');
    } else {
      router.push('/home');
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
        className='pt-12 px-6 sm:px-8 pb-8 rounded-lg flex-1 max-w-[500px] space-y-6 text-white'
      >
        <div className='flex justify-center items-center'>
          <Image src={WordingWhite} alt='Incensory' width={220} height={120} />
        </div>
        {loginForm.map((field) => (
          <div id='formControl' key={field.id}>
            <Label htmlFor={field.id} className='mb-3'>
              {field.label}
            </Label>
            <Input
              className='bg-primary border-t-0 border-l-0 border-r-0 border-b-2 border-b-white'
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
            className='text-white hover:underline cursor-pointer text-center block'
          >
            Daftar di sini
          </Link>
          <Link
            href='/forgot-password'
            className='text-white hover:underline cursor-pointer text-center block'
          >
            Lupa kata sandi
          </Link>
        </div>
        <Link
          href='/verification'
          className='text-white hover:underline cursor-pointer text-center block'
        >
          Saya belum verifikasi akun
        </Link>
        <Button variant='secondary' className='w-full cursor-pointer'>
          Masuk
        </Button>
      </form>
    </>
  );
}
