'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChartPie, ShoppingBasket, Video } from 'lucide-react';

const links = [
  {
    href: '/cms/dashboard',
    icon: <ChartPie />,
    label: 'Dashboard',
  },
  {
    href: '/cms/products',
    icon: <ShoppingBasket />,
    label: 'Produk',
  },
  {
    href: '/cms/contents',
    icon: <Video />,
    label: 'Konten',
  },
];

export default function SidebarContent() {
  const pathname = usePathname();

  return (
    <ul className='mt-8 space-y-2'>
      {links.map(({ href, icon, label }) => {
        const isActive = pathname.includes(href);
        return (
          <li
            key={href}
            className={
              isActive ? 'bg-secondary rounded-lg text-white' : undefined
            }
          >
            <Link
              className={`hover:bg-secondary hover:text-secondary-foreground p-1.5 rounded-lg font-semibold cursor-pointer flex items-center gap-2 ${
                isActive ? 'bg-secondary text-white' : ''
              }`}
              href={href}
            >
              {icon}
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
