'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { WordingWhite } from '@/assets';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { navigation } from '@/lib/constants';
// import { Button } from '@/components/ui/button';

export default function LandingSidebar() {
  return (
    <Sheet>
      <SheetTrigger className='md:hidden'>
        <Menu color='white' size={32} />
      </SheetTrigger>
      <SheetContent
        style={{
          background: `linear-gradient(135deg, #104056 0%, #0a2d3d 50%, #051a24 100%)`,
        }}
      >
        <SheetHeader>
          <SheetTitle>
            <Image src={WordingWhite} alt='Incensory' width={180} height={80} />
          </SheetTitle>
          <ul>
            {navigation.map((navItem) => {
              if (navItem.href.startsWith('/')) {
                return (
                  <li
                    key={navItem.label}
                    className='py-3'
                  >
                    <Link href={navItem.href}>
                      <Button className='cursor-pointer text-lg bg-white text-primary rounded-full'>
                        Masuk
                      </Button>
                    </Link>
                  </li>
                );
              } else {
                return (
                  <li
                    key={navItem.label}
                    className='py-3 font-semibold text-white'
                  >
                    <Link href={navItem.href}>{navItem.label}</Link>
                  </li>
                );
              }
            })}
          </ul>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
