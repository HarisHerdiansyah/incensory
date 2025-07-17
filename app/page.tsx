import React from 'react';
import { Mail, MapPin, Phone, Clock, Instagram, Youtube } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Illust, TeamPhoto, WordingSquare } from '@/assets';
import {
  contentLists,
  service,
  navigation,
  teams,
  contactDetails,
  faqs,
} from '@/lib/constants';
import ContactForm from '@/components/ContactForm';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import LandingNavbar from '@/components/LandingNavbar';

export default function page() {
  return (
    <>
      <LandingNavbar />

      <div className='bg-muted w-full min-h-screen grid lg:grid-cols-2 p-8 sm:p-12 md:p-16 gap-4 md:gap-8 items-center justify-items-center'>
        <div className='bg-white w-[250px] h-[250px] md:w-[300px] md:h-[300px] rounded-full flex items-center justify-center relative overflow-hidden'>
          <Image
            src={WordingSquare}
            alt='Photo-1'
            className='object-cover'
            fill
          />
        </div>
        <article className='justify-self-start space-y-3'>
          <p className='text-2xl md:text-4xl font-semibold'>Incensory</p>
          <p className='text-lg md:text-xl text-secondary'>
            Multisensori terapi dengan bantuan Virtual Reality untuk fobia
            spesifik
          </p>
          <div className='flex items-center gap-x-2'>
            <Link href='/register'>
              <Button className='cursor-pointer' variant='secondary'>
                Mulai
              </Button>
            </Link>
            <Button
              className='cursor-pointer text-secondary font-semibold'
              variant='link'
            >
              Pelajari Lebih Lanjut
            </Button>
          </div>
        </article>
      </div>

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
        <div className='my-12 flex justify-center items-center gap-8 flex-wrap'>
          {contentLists.map((content) => (
            <div className='rounded-lg p-2' key={content.title}>
              <Image
                className='rounded-lg'
                src={content.image}
                alt={content.title}
                width={300}
                height={300}
              />
              <p className='text-center italic'>{content.title}</p>
            </div>
          ))}
        </div>
      </section>

      <section className='py-8 px-8 md:py-12 md:px-24 lg:py-16 lg:px-32 bg-muted'>
        <article className='text-center space-y-4'>
          <p className='text-2xl md:text-4xl font-semibold'>
            Apa yang Kami Tawarkan?
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

      <section className='py-8 px-8 md:py-12 md:px-24 lg:py-16 lg:px-32 bg-white'>
        <div className='grid grid-cols-1 lg:grid-cols-2 items-center justify-items-center gap-8'>
          <article className='space-y-3 text-center lg:text-right'>
            <p className='text-2xl md:text-4xl font-semibold italic'>
              Feel it. Face it. Heal it.
            </p>
            <p className='text-lg md:text-xl text-secondary'>
              Incensory hadir sebagai solusi nyata untuk membantu Anda
              menghadapi ketakutan dengan cara yang ilmiah dan manusiawi.
            </p>
          </article>
          <div className='w-[250px] h-[250px] md:w-[300px] md:h-[300px] rounded-full flex items-center justify-center relative overflow-hidden'>
            <Image src={Illust} alt='Photo-2' className='object-cover' fill />
          </div>
        </div>
      </section>

      {/* <section className='py-8 px-8 md:py-12 md:px-24 lg:py-16 lg:px-32 bg-muted'>
        <article className='text-center space-y-4'>
          <p className='text-2xl md:text-4xl font-semibold'>Apa Kata Mereka?</p>
        </article>
        <div className='my-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
          <div className='rounded-lg bg-white p-4 space-y-6'>
            <p className='italic'>
              "Incensory telah membantu saya menghadapi ketakutan saya dengan
              cara yang tidak pernah saya bayangkan sebelumnya."
            </p>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-x-2'>
                <CircleUserRound size={34} />
                <aside className='text-sm'>
                  <p className='font-semibold'>John Doe</p>
                  <p className='italic'>john@gmail.com</p>
                </aside>
              </div>
              <div className='flex items-center gap-x-2'>
                <Star size={24} fill='yellow' color='yellow' />
                <p className='font-semibold'>4/5</p>
              </div>
            </div>
          </div>
          <div className='rounded-lg bg-white p-4 space-y-6'>
            <p className='italic'>
              "Incensory telah membantu saya menghadapi ketakutan saya dengan
              cara yang tidak pernah saya bayangkan sebelumnya."
            </p>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-x-2'>
                <CircleUserRound size={34} />
                <aside className='text-sm'>
                  <p className='font-semibold'>John Doe</p>
                  <p className='italic'>john@gmail.com</p>
                </aside>
              </div>
              <div className='flex items-center gap-x-2'>
                <Star size={24} fill='yellow' color='yellow' />
                <p className='font-semibold'>4/5</p>
              </div>
            </div>
          </div>
          <div className='rounded-lg bg-white p-4 space-y-6'>
            <p className='italic'>
              "Incensory telah membantu saya menghadapi ketakutan saya dengan
              cara yang tidak pernah saya bayangkan sebelumnya."
            </p>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-x-2'>
                <CircleUserRound size={34} />
                <aside className='text-sm'>
                  <p className='font-semibold'>John Doe</p>
                  <p className='italic'>john@gmail.com</p>
                </aside>
              </div>
              <div className='flex items-center gap-x-2'>
                <Star size={24} fill='yellow' color='yellow' />
                <p className='font-semibold'>4/5</p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section
        id='ourTeam'
        className='py-8 px-8 md:py-12 md:px-24 lg:py-16 lg:px-32 bg-white'
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
              Tim Incensory - Universitas Padjadjaran
            </p>
          </div>
        </div>
        <div className='my-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
          {teams.map((team) => (
            <div className='bg-white rounded-lg text-center' key={team.name}>
              <p className='text-lg font-semibold'>{team.name}</p>
              <p className='text-sm italic'>
                {team.role} - {team.major}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        id='contact'
        className='py-8 px-8 md:py-12 md:px-24 lg:py-16 lg:px-32 bg-muted'
      >
        <article className='text-center space-y-4'>
          <p className='text-2xl md:text-4xl font-semibold'>
            Tertarik? Segera Hubungi Kami!
          </p>
        </article>
        <div className='flex justify-center my-14'>
          <ContactForm />
        </div>
        <p className='text-center text-xl md:text-2xl font-semibold'>
          Atau, gunakan informasi berikut untuk menghubungi kami:
        </p>
        <div className='my-12 grid grid-cols-1 md:grid-cols-2 gap-8'>
          {contactDetails.map((item) => (
            <div className='bg-white rounded-lg p-4 space-y-4' key={item.title}>
              <p className='text-lg font-semibold flex items-center gap-x-2'>
                <item.icon /> {item.title}
              </p>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

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

      <footer className='bg-secondary py-4 text-secondary-foreground'>
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
                <Mail size={18} /> incensory@incensory.id
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
