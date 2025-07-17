'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { navigation } from '@/lib/constants';
import { Button } from '@/components/ui/button';

export default function LandingSidebar() {
  return (
    <Sheet>
      <SheetTrigger className='md:hidden'>
        <Menu />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Incensory</SheetTitle>
          <ul>
            {navigation.map((navItem) => {
              if (navItem.href.startsWith('/')) {
                return (
                  <li
                    key={navItem.label}
                    className='border-b border-slate-300 py-3'
                  >
                    <Link href={navItem.href}>
                      <Button variant='secondary'>Masuk</Button>
                    </Link>
                  </li>
                );
              } else {
                return (
                  <li
                    key={navItem.label}
                    className='border-b border-slate-300 py-3 font-semibold text-secondary'
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
