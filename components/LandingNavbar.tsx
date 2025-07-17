'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { navigation } from '@/lib/constants';
import LandingSidebar from './LandingSidebar';
import clsx from 'clsx';

export default function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={clsx(
        'z-50 py-4 px-6 md:px-10 lg:px-14 fixed w-full transition-all duration-300',
        {
          'bg-secondary shadow-lg': scrolled,
          'bg-transparent': !scrolled,
        }
      )}
    >
      <div className='flex items-center justify-between'>
        <aside
          className={clsx('font-semibold text-2xl', {
            'text-secondary-foreground': scrolled,
            'text-secondary': !scrolled,
          })}
        >
          <p>Incensory</p>
        </aside>
        <div className='hidden md:flex items-center gap-x-8'>
          {navigation.map((navItem) => {
            if (navItem.href.startsWith('/')) {
              return (
                <Link
                  className='hover:underline'
                  href={navItem.href}
                  key={navItem.label}
                >
                  <Button
                    className='cursor-pointer'
                    variant={scrolled ? 'outline' : 'secondary'}
                  >
                    {navItem.label}
                  </Button>
                </Link>
              );
            } else {
              return (
                <Link
                  className={clsx('hover:underline font-semibold', {
                    'text-secondary': !scrolled,
                    'text-secondary-foreground': scrolled,
                  })}
                  href={navItem.href}
                  key={navItem.label}
                >
                  {navItem.label}
                </Link>
              );
            }
          })}
        </div>
        <LandingSidebar />
      </div>
    </nav>
  );
}
