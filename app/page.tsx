import Image from 'next/image';
import Link from 'next/link';
import { unstable_noStore as noStore } from 'next/cache';
import { Mail, MapPin, Phone, Clock, Instagram, Youtube } from 'lucide-react';
import {
  Cencen,
  Kemenyan,
  CencenFront,
  WordingWhite,
  TeamPhoto,
} from '@/assets';
import {
  contentLists,
  service,
  teams,
  contactDetails,
  faqs,
  navigation,
} from '@/lib/constants';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import ContactForm from '@/components/ContactForm';
import LandingSidebar from '@/components/LandingSidebar';
import { ProductCard } from '@/components/home';
import { db } from '@/lib/db';

export const revalidate = 60;

export default async function Page() {
  noStore();
  const products = await db.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      description: true,
      product_images: {
        select: {
          id: true,
          source: true,
        },
      },
      product_links: {
        select: {
          id: true,
          link: true,
          target: true,
        },
      },
    },
    where: { isVisible: true },
  });

  return (
    <>
      {/* Hero Section */}
      <div
        id='heroSection'
        className='w-full min-h-screen relative overflow-hidden'
        style={{
          background: `linear-gradient(135deg, #104056 0%, #0a2d3d 50%, #051a24 100%)`,
        }}
      >
        {/* Hero Content */}
        <div className='my-16 p-8 sm:p-12 md:p-16 text-white uppercase flex flex-col items-center justify-center text-center'>
          <p className='my-2 text-xl'>
            Program Kreativitas Mahasiswa Kewirausahaan 2025
          </p>
          <p className='text-xl'>Universitas Padjadjaran</p>
          <Image src={WordingWhite} alt='Incensory' width={600} height={200} />
          <p className='my-8 text-xl'>
            Terapi Multisensori Kombinasi Parfum Kemenyan & Virtual Reality
            untuk Fobia Spesifik
          </p>
          <Link href='/register'>
            <Button className='rounded-full font-semibold text-lg bg-white text-primary cursor-pointer hover:bg-accent'>
              Bergabung Sekarang
            </Button>
          </Link>
        </div>

        {/* Bottom Wave */}
        <div className='absolute bottom-0 left-0 right-0'>
          <svg viewBox='0 0 1200 120' fill='none' className='w-full h-auto'>
            <path
              d='M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z'
              fill='rgba(255,255,255,0.1)'
            />
          </svg>
        </div>
      </div>

      {/* Navbar */}
      <nav className='py-4 px-6 md:px-10 lg:px-14 sticky top-0 z-50'>
        <div className='mx-auto bg-primary w-full rounded-full px-6 py-2 flex items-center justify-between'>
          <Image src={WordingWhite} alt='Incensort' width={200} height={66} />
          <div className='hidden md:flex items-center text-white gap-x-6 font-semibold text-lg'>
            {navigation.map((navItem) => {
              if (navItem.href.startsWith('/')) {
                return (
                  <Link
                    className='hover:underline'
                    href={navItem.href}
                    key={navItem.label}
                  >
                    <Button className='cursor-pointer text-lg bg-white text-primary rounded-full hover:bg-muted'>
                      {navItem.label}
                    </Button>
                  </Link>
                );
              } else {
                return (
                  <Link
                    className='hover:underline font-semibold'
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

      {/* Tentang | About */}
      <section
        id='about'
        className='py-8 px-8 md:py-12 md:px-24 lg:py-16 lg:px-32 bg-white'
      >
        <article className='text-center space-y-4'>
          <p className='text-2xl md:text-4xl font-semibold'>
            Apa itu Incensory?
          </p>
          <p className='md:text-lg'>
            <strong>Incensory</strong> adalah inovasi terapi multisensori
            pertama di Indonesia yang dirancang untuk membantu mengatasi fobia
            spesifik seperti fobia <strong>ketinggian</strong> (akrofobia),{' '}
            <strong>ruang sempit</strong> (klaustrofobia), dan{' '}
            <strong>gelap</strong> (niktofobia). Dengan menggabungkan teknologi{' '}
            <strong>Virtual Reality (VR)</strong> dan aromaterapi berbasis{' '}
            <strong>kemenyan</strong>, Incensory menawarkan pendekatan terapi
            modern yang ilmiah, imersif, dan aman.
          </p>
        </article>
        <div className='my-12 flex justify-evenly items-end gap-8 flex-wrap'>
          <div className='text-center space-y-1.5'>
            <Image
              src={Cencen}
              alt='Maskot Incensory | Cencen'
              width={250}
              height={250}
            />
            <p className='italic'>Cencen (Maskot Incensory)</p>
          </div>
          <div className='text-center space-y-1.5'>
            <Image src={Kemenyan} alt='Kemenyan' width={300} height={300} />
            <p className='italic'>Kemenyan (Styrax Benzoin)</p>
          </div>
        </div>
      </section>

      {/* Mengapa memilih Incensory? */}
      <section className='py-8 px-8 md:py-12 md:px-24 lg:py-16 lg:px-32 bg-muted'>
        <article className='text-center space-y-4'>
          <p className='text-2xl md:text-4xl font-semibold'>
            Mengapa memilih Incensory?
          </p>
        </article>
        <div className='my-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
          {service.map((item) => (
            <div className='bg-white rounded-lg p-4 space-y-4' key={item.title}>
              <p className='text-lg font-semibold flex items-center gap-x-2'>
                <item.icon /> {item.title}
              </p>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Maskot dan Tagline */}
      <section className='py-8 px-8 md:py-12 md:px-24 lg:py-16 lg:px-32 bg-white'>
        <div className='grid grid-cols-1 lg:grid-cols-2 items-center justify-items-center gap-8'>
          <div className='text-center space-y-1.5'>
            <Image
              src={CencenFront}
              alt='Maskot Incensory | Cencen'
              width={250}
              height={250}
            />
            <p className='italic'>Cencen (Maskot Incensory)</p>
          </div>
          <article className='space-y-3 text-center lg:text-left'>
            <p className='text-2xl md:text-4xl font-semibold italic'>
              Feel it. Face it. Heal it.
            </p>
            <p className='text-lg md:text-xl text-secondary'>
              Incensory hadir sebagai solusi nyata untuk membantu Anda
              menghadapi ketakutan dengan cara yang ilmiah dan manusiawi.
            </p>
          </article>
        </div>
      </section>

      {/* Produk | Product */}
      {products.length > 0 && (
        <section
          id='product'
          className='py-8 px-8 md:py-12 md:px-24 lg:py-16 lg:px-32 bg-secondary'
        >
          <article className='text-center space-y-4'>
            <p className='text-2xl md:text-4xl font-semibold text-white'>
              Produk Incensory
            </p>
          </article>
          <div className='my-12 flex items-center justify-center flex-wrap gap-8'>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                price={Number(product.price)}
                description={product.description}
                productImages={product.product_images}
                productLinks={product.product_links}
              />
            ))}
          </div>
        </section>
      )}

      <section className='py-8 px-8 md:py-12 md:px-24 lg:py-16 lg:px-32 bg-white'>
        <article className='text-center space-y-4'>
          <p className='text-2xl md:text-4xl font-semibold'>
            Rasakan pengalaman imersif!
          </p>
          <p className='md:text-lg'>
            Akses langsung konten-konten VR berikut! Rasakan langsung pengalaman
            nyata di lingkungan virtual!
          </p>
        </article>
        <div className='my-12 flex justify-center items-center gap-8 flex-wrap'>
          {contentLists.map((content) => (
            <Link key={content.title} href='/home'>
              <div className='rounded-lg relative overflow-hidden'>
                <Image
                  className='rounded-lg'
                  src={content.image}
                  alt={content.title}
                  width={300}
                  height={300}
                />
                <div
                  className='absolute inset-0 text-white font-semibold uppercase flex items-center justify-center cursor-pointer'
                  style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                >
                  <p>{content.title}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Tim Kami | ourTeam */}
      <section
        id='ourTeam'
        className='py-8 px-8 md:py-12 md:px-24 lg:py-16 lg:px-32 bg-muted'
      >
        <article className='text-center space-y-4'>
          <p className='text-2xl md:text-4xl font-semibold'>
            Siapa di balik Incensory?
          </p>
          <p className='md:text-lg'>
            Program ini dirintis oleh lima mahasiswa dari lintas bidang untuk
            menciptakan solusi yang konklusif berdasarkan keahliannya
            masing-masing.
          </p>
        </article>
        <div className='my-12 flex justify-center items-center'>
          <div className='rounded-lg p-2'>
            <Image
              className='rounded-lg'
              src={TeamPhoto}
              alt='Tim Incensory'
              width={700}
              height={700}
            />
            <p className='text-center italic'>
              Tim PKM-K 2025 Incensory - Universitas Padjadjaran
            </p>
          </div>
        </div>
        <div className='my-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
          {teams.map((team) => (
            <div className='rounded-lg text-center' key={team.name}>
              <p className='text-lg font-semibold'>{team.name}</p>
              <p className='text-sm italic'>
                {team.role} - {team.major}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Kontak | Contact */}
      <section
        id='contact'
        className='py-8 px-8 md:py-12 md:px-24 lg:py-16 lg:px-32 bg-white'
      >
        <article className='text-center space-y-4'>
          <p className='text-2xl md:text-4xl font-semibold'>Kontak Kami</p>
          <p className='md:text-lg'>
            Hubungi kami melalui formulir berikut atau kunjungi informasi yang
            tertera.
          </p>
        </article>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 my-4'>
          <ContactForm />
          <div className='grid grid-cols-1 gap-8'>
            {contactDetails.map((item) => (
              <div
                className='bg-secondary text-white rounded-lg p-4 space-y-4'
                key={item.title}
              >
                <p className='text-lg font-semibold flex items-center gap-x-2'>
                  <item.icon /> {item.title}
                </p>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id='faq'
        className='py-8 px-8 md:py-12 md:px-24 lg:py-16 lg:px-32 bg-white'
      >
        <article className='text-center space-y-4'>
          <p className='text-2xl md:text-4xl font-semibold'>
            Frequenly Asked Questions (FAQ)
          </p>
        </article>
        <div className='max-w-[700px] mx-auto my-12'>
          <Accordion type='single' className='space-y-2' collapsible>
            {faqs.map((faq, i) => (
              <AccordionItem value={`item-${i + 1}`} key={faq.title}>
                <AccordionTrigger className='font-semibold text-lg bg-secondary px-3 py-2 text-secondary-foreground cursor-pointer'>
                  {faq.title}
                </AccordionTrigger>
                <AccordionContent className='bg-muted px-3 py-2 text-base rounded-lg'>
                  {faq.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer
        className='py-4 text-white'
        style={{
          background: `linear-gradient(135deg, #104056 0%, #0a2d3d 50%, #051a24 100%)`,
        }}
      >
        <div className='max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-8 text-sm'>
          <div>
            <h3 className='text-xl font-semibold mb-2 '>Incensory</h3>
            <p>Feel it. Face it. Heal it.</p>
            <p className='mt-4 text-xs'>
              Terapi fobia berbasis VR dan aroma relaksasi pertama di Indonesia.
            </p>
          </div>

          <div>
            <h4 className=' font-semibold mb-3'>Navigasi</h4>
            <ul className='space-y-2'>
              {navigation.map((navItem) => {
                if (!navItem.href.startsWith('/')) {
                  return (
                    <li key={navItem.label}>
                      <Link href={navItem.href} className='hover:underline '>
                        {navItem.label}
                      </Link>
                    </li>
                  );
                }
              })}
            </ul>
          </div>

          <div>
            <h4 className=' font-semibold mb-3'>Kontak</h4>
            <ul className='space-y-1'>
              <li className='flex items-center gap-x-2'>
                <MapPin size={18} /> Jatinangor, Sumedang 45363
              </li>
              <li className='flex items-center gap-x-2'>
                <Phone size={18} /> 0895-3704-93300
              </li>
              <li className='flex items-center gap-x-2'>
                <Mail size={18} /> incensorypimnas38@gmail.com
              </li>
              <li className='flex items-center gap-x-2'>
                <Clock size={18} /> Senin-Jumat, 09.00-17.00
              </li>
            </ul>
          </div>

          <div>
            <h4 className=' font-semibold mb-3'>Sosial Media</h4>
            <ul className='space-y-2'>
              <li className='flex items-center gap-x-2'>
                <Instagram size={18} />{' '}
                <Link
                  href='https://www.instagram.com/incensory.official/'
                  className='hover:underline cursor-pointer'
                >
                  @incensory.official
                </Link>
              </li>
              <li className='flex items-center gap-x-2'>
                <Youtube size={18} />{' '}
                <Link
                  href='https://www.youtube.com/@Incensory38'
                  className='hover:underline cursor-pointer'
                >
                  Incensory.official
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className='border-t border-white mt-10 pt-4 text-center text-xs'>
          &copy; 2025 Incensory. All rights reserved.
        </div>
      </footer>
    </>
  );
}
