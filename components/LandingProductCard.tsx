import Image, { StaticImageData } from 'next/image';
import { toRupiah } from '@/lib/utils';
import { Button } from './ui/button';
import Link from 'next/link';

type ProductType = {
  name: string;
  price: number;
  image: StaticImageData;
};

export default function LandingProductCard({
  name,
  price,
  image,
}: ProductType) {
  return (
    <Link href='https://forms.gle/YT2eVESgg8pXJpPU9' target='_blank'>
      <div className='p-3.5 bg-white rounded-lg shadow-sm flex flex-col justify-between'>
        <Image
          src={image}
          alt={name}
          width={150}
          height={150}
          className='mx-auto'
        />

        <article className='text-lg my-2'>
          <p className='font-semibold line-clamp-1'>{name}</p>
          <p>{toRupiah(price)}</p>
        </article>

        <Button className='cursor-pointer text-lg'>Pre-Order</Button>
      </div>
    </Link>
  );
}
