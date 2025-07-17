import { Rating } from '@/components/home';
import Navbar from '@/components/Navbar';

export default function CustomerLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      <main className='mt-6 mb-20 px-10 sm:px-16'>{children}</main>
      <Rating />
    </>
  );
}
