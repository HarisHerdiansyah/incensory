import Image from 'next/image';
import { WordingWhite } from '@/assets';
import {
  Sidebar,
  SidebarProvider,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { CMSBreadcrumb, SidebarContent } from '@/components/cms/global';
import LogoutBtn from '@/components/LogoutBtn';

export default function CustomerLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <Sidebar>
        <div
          className='w-full h-full p-6'
          style={{
            background: `linear-gradient(135deg, #104056 0%, #0a2d3d 50%, #051a24 100%)`,
          }}
        >
          <Image src={WordingWhite} alt='Incensory' width={220} height={120} />
          <SidebarContent />
        </div>
        <SidebarFooter
          className='border-secondary'
          style={{
            background: `linear-gradient(135deg, #104056 0%, #0a2d3d 50%, #051a24 100%)`,
          }}
        >
          <LogoutBtn />
        </SidebarFooter>
      </Sidebar>
      <main className='w-full p-6'>
        <CMSBreadcrumb />
        <div className='my-6'>{children}</div>
      </main>
    </SidebarProvider>
  );
}
