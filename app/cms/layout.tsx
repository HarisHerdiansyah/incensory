import Image from 'next/image';
import { Wording } from '@/assets';
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
        <div className='w-full h-full border-r-4 border-primary p-6'>
          <Image src={Wording} alt='Incensory' width={220} height={120} />
          <SidebarContent />
        </div>
        <SidebarFooter className='border-r-4 border-primary'>
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
