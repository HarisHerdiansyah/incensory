'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight, Info, ShoppingCart } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ShopeeLogo, TokopediaLogo, WhatsappLogo } from '@/assets';
import { usePrevNextButtons } from '@/hooks/usePrevNextButton';
import { toRupiah } from '@/lib/utils';
import Link from 'next/link';

type ProductType = {
  name: string;
  price: number;
  description: string;
  productImages: { id: string; source: string }[];
  productLinks: { id: string; link: string; target: string }[];
};

const LOGO = {
  SHOPEE: ShopeeLogo,
  TOKOPEDIA: TokopediaLogo,
  WHATSAPP: WhatsappLogo,
};

export default function ProductCard({
  name,
  price,
  description,
  productImages,
  productLinks,
}: ProductType) {
  const [emblaRef, emblaApi] = useEmblaCarousel({});

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className='w-[230px] h-[350px] p-3.5 border border-slate-200 rounded-lg shadow-sm flex flex-col justify-between'>
      <div className='embla'>
        <div className='embla__viewport relative' ref={emblaRef}>
          <div className='embla__container w-[200px]'>
            {productImages.map((image) => (
              <div
                className='border h-[200px] rounded-lg embla__slide'
                key={image.id}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_S3_PUBLIC_URL}/${image.source}`}
                  alt={name}
                  width={150}
                  height={150}
                  className='mx-auto'
                />
              </div>
            ))}
          </div>
          <Button
            size='icon'
            variant='outline'
            className='absolute bottom-2 left-2 rounded-full cursor-pointer'
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled || productImages.length <= 1}
          >
            <ChevronLeft size={28} strokeWidth={2.75} />
          </Button>
          <Button
            size='icon'
            variant='outline'
            className='absolute bottom-2 right-2 rounded-full cursor-pointer'
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled || productImages.length <= 1}
          >
            <ChevronRight size={28} strokeWidth={2.75} />
          </Button>
        </div>
      </div>

      <article>
        <p className='font-semibold line-clamp-1'>{name}</p>
        <p>{toRupiah(price)}</p>
      </article>

      <div className='flex gap-x-2'>
        <Dialog>
          <DialogTrigger className='p-2 bg-accent-foreground hover:bg-accent cursor-pointer hover:text-white rounded-md transition-all flex items-center justify-center gap-2 text-sm font-semibold border-accent border-2'>
            <Info size={18} strokeWidth={3} />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{name}</DialogTitle>
              <DialogDescription className='text-base'>
                Harga: {price}
              </DialogDescription>
              <DialogDescription className='text-base'>
                {description}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Popover>
          <PopoverTrigger className='py-1.5 bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 cursor-pointer rounded-md transition-all flex items-center justify-center gap-2 flex-1'>
            <ShoppingCart strokeWidth={2.5} />
            Belanja
          </PopoverTrigger>
          <PopoverContent
            className='w-[180px] grid grid-cols-3 gap-2'
            align='center'
          >
            {productLinks.map((link) => (
              <Link href={link.link} target='_blank' key={link.id}>
                <div className='border border-slate-300 p-2 rounded-lg mx-auto cursor-pointer'>
                  <Image
                    src={LOGO[link.target as keyof typeof LOGO]}
                    alt={link.target}
                    width={30}
                    height={30}
                  />
                </div>
              </Link>
            ))}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
