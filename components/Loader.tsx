import clsx from 'clsx';
import { LoaderCircle } from 'lucide-react';

export default function Loader({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        'fixed inset-0 z-[99] flex items-center justify-center bg-black/50 ' +
          className
      )}
    >
      <LoaderCircle className='w-12 h-12 text-white animate-spin' />
    </div>
  );
}
