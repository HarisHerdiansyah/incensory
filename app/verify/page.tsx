import Link from 'next/link';
import { db } from '@/lib/db';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface VerificationPayload extends JwtPayload {
  id: string;
  email: string;
  type: string;
  code: string;
}

function Success() {
  return (
    <div className='mt-16 flex flex-col items-center max-w-[500px] px-4'>
      <div className='w-[75px] h-[75px]'>
        <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <g id='SVGRepo_bgCarrier' strokeWidth={0} />
          <g
            id='SVGRepo_tracerCarrier'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <g id='SVGRepo_iconCarrier'>
            <circle
              cx={12}
              cy={12}
              r={9}
              fill='#00c951'
              fillOpacity='0.24'
              stroke='#008236'
              strokeWidth='1.2'
            />
            <path d='M8 12L11 15L16 9' stroke='#008236' strokeWidth='1.2' />
          </g>
        </svg>
      </div>
      <p className='my-2 text-2xl text-center font-semibold'>
        Verifikasi Sukses!
      </p>
      <p className='text-center'>
        Selamat akun berhasil diverifikasi! Kamu bisa lanjut masuk ke halaman
        login dengan klik{' '}
        <Link href='/login' className='underline cursor-pointer'>
          di sini.
        </Link>
      </p>
    </div>
  );
}

function Failed() {
  return (
    <div className='mt-16 flex flex-col items-center max-w-[500px] px-4'>
      <div className='w-[75px] h-[75px]'>
        <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <g id='SVGRepo_bgCarrier' strokeWidth={0} />
          <g
            id='SVGRepo_tracerCarrier'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <g id='SVGRepo_iconCarrier'>
            <circle cx={12} cy={12} r={9} fill='#c10007' fillOpacity='0.24' />
            <path
              d='M16 8L8 16'
              stroke='#c10007'
              strokeWidth='1.2'
              strokeLinecap='square'
              strokeLinejoin='round'
            />
            <path
              d='M8 8L16 16'
              stroke='#c10007'
              strokeWidth='1.2'
              strokeLinecap='square'
              strokeLinejoin='round'
            />
          </g>
        </svg>
      </div>
      <p className='my-2 text-2xl text-center font-semibold'>
        Verifikasi Gagal :(
      </p>
      <p className='text-center'>
        Sepertinya terjadi masalah, verifikasi ulang akun melalui dengan klik{' '}
        <span className='underline cursor-pointer'>di sini.</span>
      </p>
    </div>
  );
}

export default async function Verify({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  const { token } = await searchParams;

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as VerificationPayload;

    if (payload.type !== 'VERIFICATION') {
      throw new Error('Invalid type');
    }

    await db.$transaction(async (tx) => {
      await tx.accessCode.update({
        where: { code: payload.code },
        data: { is_used: true, user_id: payload.id },
      });

      await tx.user.update({
        where: { id: payload.id },
        data: { verification: true },
      });
    });

    return (
      <main className='flex justify-center'>
        <Success />;
      </main>
    );
  } catch (error) {
    console.log('[VERIFICATION ERROR]', error);
    return (
      <main className='flex justify-center'>
        <Failed />
      </main>
    );
  }
}
