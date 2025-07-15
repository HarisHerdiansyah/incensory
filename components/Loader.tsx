import { LoaderCircle } from 'lucide-react';

export default function Loader() {
  return (
    <div className='absolute inset-0 z-50 flex items-center justify-center bg-black/50'>
      <LoaderCircle className='w-12 h-12 text-white animate-spin' />
    </div>
  );
}
