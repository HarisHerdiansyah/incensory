import Image, { StaticImageData } from 'next/image';
import { Button } from '../ui/button';
import { RectangleGoggles, Info } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Link from 'next/link';

type GalleryType = {
  id: string;
  title: string;
  category: string;
  description: string;
  image: StaticImageData;
  source: string;
};

export default function GalleryCard({
  id,
  title,
  category,
  description,
  image,
  source,
}: GalleryType) {
  return (
    <div className='w-[320px] h-[350px] p-3.5 border border-slate-200 rounded-lg shadow-sm flex flex-col justify-between'>
      <div className='w-full h-[170px] bg-gray-300 rounded-lg overflow-hidden'>
        <Image src={image} alt={`${category}-${id}`} width={306} height={170} />
      </div>
      <article>
        <p className='text-xl font-semibold'>{category.toString()}</p>
        <p>{title}</p>
      </article>
      <div className='grid grid-cols-2 gap-3'>
        <Dialog>
          <DialogTrigger className='py-1.5 bg-accent-foreground hover:bg-accent cursor-pointer hover:text-white rounded-md transition-all flex items-center justify-center gap-2 text-sm font-semibold border-accent border-2'>
            <Info size={18} strokeWidth={3} />
            Detail
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription className='text-base'>
                Kategori: {category}
              </DialogDescription>
              <DialogDescription className='text-base'>
                {description}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Link href={source}>
          <Button variant='secondary' className='cursor-pointer w-full'>
            <RectangleGoggles strokeWidth={3} />
            Akses
          </Button>
        </Link>
      </div>
    </div>
  );
}
