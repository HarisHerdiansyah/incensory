import { CircleUserRound } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import LogoutBtn from './LogoutBtn';

export default function Navbar() {
  return (
    <div className='sticky top-0 bg-white'>
      <nav className='px-16 py-4 flex items-center justify-end'>
        <Popover>
          <PopoverTrigger>
            <CircleUserRound size={36} className='cursor-pointer' />
          </PopoverTrigger>
          <PopoverContent align='end'>
            <div className='flex items-center gap-3 border-b-2 broder-slate-200 pb-3 mb-3 cursor-pointer'>
              <CircleUserRound size={48} />
              <aside>
                <p className='font-semibold'>Haris Herdiansyah</p>
                <p>harisherdian001@gmail.com</p>
              </aside>
            </div>
            <div className='flex justify-end'>
              <LogoutBtn />
            </div>
          </PopoverContent>
        </Popover>
      </nav>
      <div className='w-full h-1 bg-gradient'></div>
    </div>
  );
}
