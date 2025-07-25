'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { RectangleGoggles } from 'lucide-react';
import { Button } from '../ui/button';

export default function GalleryCardAccessBtn({
  category,
  source,
}: {
  category: string;
  source: string;
}) {
  const router = useRouter();

  const handleNavigate = useCallback(async () => {
    const response = await fetch('/api/vr/create-token', {
      method: 'POST',
      body: JSON.stringify({ category }),
    });
    const data = await response.json();
    const targetUrl = new URL(source);
    targetUrl.searchParams.set('category', category.toLowerCase());
    targetUrl.searchParams.set('token', data.data.token);
    console.log(response);
    // return router.push(targetUrl.toString());
  }, [category, router, source]);

  return (
    <Button
      variant='secondary'
      className='cursor-pointer w-full'
      onClick={handleNavigate}
    >
      <RectangleGoggles strokeWidth={3} />
      Akses
    </Button>
  );
}
