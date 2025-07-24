import Image, { StaticImageData } from 'next/image';
import { Info } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import GalleryCardAccessBtn from './GalleryCardAccessBtn';

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
        <GalleryCardAccessBtn category={category} source={source} />
      </div>
    </div>
  );
}
