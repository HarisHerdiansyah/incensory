'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { RectangleGoggles } from 'lucide-react';
import { Button } from '../ui/button';
import Loader from '../Loader';

export default function GalleryCardAccessBtn({
  category,
}: {
  category: string;
  source: string;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleNavigate = useCallback(async () => {
    setIsLoading((prev) => !prev);
    const response = await fetch('/api/vr/create-token', {
      method: 'POST',
      body: JSON.stringify({ category }),
    });
    const data = await response.json();
    const targetUrl = new URL(process.env.NEXT_PUBLIC_VR_URL as string);
    targetUrl.searchParams.set('category', category.toLowerCase());
    targetUrl.searchParams.set('token', data.data.token);
    setIsLoading((prev) => !prev);
    return router.push(targetUrl.toString());
  }, [category, router]);

  return (
    <>
      {isLoading && <Loader />}
      <Button
        variant='secondary'
        className='cursor-pointer w-full'
        onClick={handleNavigate}
      >
        <RectangleGoggles strokeWidth={3} />
        Akses
      </Button>
    </>
  );
}
