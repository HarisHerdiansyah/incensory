import Link from 'next/link';
import Image from 'next/image';
import { CircleUserRound } from 'lucide-react';
import { getServerSession } from 'next-auth';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { authOptions } from '@/lib/authOptions';
import { WordingWhite } from '@/assets';
import LogoutBtn from './LogoutBtn';

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <div
      className='sticky top-0 z-50'
      style={{
        background: `linear-gradient(135deg, #104056 0%, #0a2d3d 50%, #051a24 100%)`,
      }}
    >
      <nav className='py-4 px-6 md:px-10 lg:px-14 flex items-center justify-between'>
        <Image src={WordingWhite} alt='Incensort' width={180} height={66} />
        <Popover>
          <PopoverTrigger>
            <CircleUserRound size={36} className='cursor-pointer' color='white' />
          </PopoverTrigger>
          <PopoverContent align='end' className='bg-white'>
            <div className='flex items-center gap-3 border-b-2 broder-slate-200 pb-3 mb-3 cursor-pointer'>
              <CircleUserRound size={48} />
              <Link href='/profile'>
                <aside>
                  <p className='font-semibold'>
                    {session?.user.username || ''}
                  </p>
                  <p>{session?.user.email || ''}</p>
                </aside>
              </Link>
            </div>
            <div className='flex justify-end'>
              <LogoutBtn />
            </div>
          </PopoverContent>
        </Popover>
      </nav>
    </div>
  );
}
