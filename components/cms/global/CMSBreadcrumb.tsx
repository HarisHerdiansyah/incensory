'use client';

import { usePathname } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function CMSBreadcrumb() {
  const pathname = usePathname();
  const extractedPath = pathname
    .substring(1)
    .split('/')
    .map((path) => {
      return {
        itemKey: uuidv4(),
        separatorKey: uuidv4(),
        path,
      };
    });

  return (
    <header className='flex h-12 items-center gap-1 bg-secondary pl-2 pr-4 rounded-lg w-full'>
      <SidebarTrigger />
      <Separator
        orientation='vertical'
        className='mr-1 bg-black'
        style={{ height: 30 }}
      />
      <Breadcrumb>
        <BreadcrumbList>
          {extractedPath.map((path, i) => (
            <div key={i} className='flex items-center'>
              <BreadcrumbItem
                className='text-secondary-foreground font-semibold uppercase'
                key={path.itemKey}
              >
                {path.path}
              </BreadcrumbItem>
              {i < extractedPath.length - 1 && (
                <BreadcrumbSeparator
                  key={path.separatorKey}
                  className='text-secondary-foreground ml-2'
                />
              )}
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}
