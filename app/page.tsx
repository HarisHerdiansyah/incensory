import Image from 'next/image';
import {
  Brain,
  ChevronRight,
  ShieldCheck,
  Zap,
  Star,
  Users,
  TrendingUp,
} from 'lucide-react';
import {
  AcroIllust,
  NyctoIllust,
  ClaustroIllust,
  WordingSquare,
  PhobiaOverview,
} from '@/assets';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function Index() {
  return (
    <>
      <section id='hero' className='bg-muted h-screen flex items-center'>
        <div className='py-8 px-16 grid grid-cols-1 lg:grid-cols-2 items-center gap-x-8 gap-y-12'>
          <div className='flex flex-col items-center space-y-4'>
            <Image
              src={WordingSquare}
              alt='Incensory Logo'
              width={400}
              height={400}
              className='rounded-full'
            />
          </div>
          <article>
            <h1 className='text-3xl font-semibold'>
              Virtual Exposure Therapy for Specific Phobias
            </h1>
            <p className='text-xl my-6'>
              Overcome your fears in a safe, controlled virtual environment with
              our evidence-based therapeutic approach.
            </p>
            <Button size='lg' className='cursor-pointer'>
              Get Started
              <ChevronRight />
            </Button>
          </article>
        </div>
      </section>
      <section id='overview' className='py-24 px-16'>
        <div className='grid grid-cols-2 items-center'>
          <div className='flex flex-col items-center space-y-4'>
            <Image
              src={PhobiaOverview}
              alt='Phobia Overview'
              width={400}
              height={400}
              className='shadow-2xl rounded-xl'
            />
          </div>
          <article>
            <Badge variant='secondary'>What is Phobia?</Badge>
            <h1 className='text-4xl font-semibold mt-3 mb-8'>
              Understanding Specific Phobias
            </h1>
            <p className='text-secondary text-2xl'>
              A specific phobia is an intense, irrational fear of a specific
              object or situation that leads to avoidance behavior.
            </p>
            <p className='mt-6 text-lg'>
              Common examples include fear of heights (acrophobia), fear of
              enclosed spaces (claustrophobia), and fear of darkness
              (nyctophobia).
            </p>
          </article>
        </div>
      </section>
      <section id='vret' className='bg-muted'>
        <div className='py-24 px-16'>
          <article className='text-center'>
            <Badge variant='secondary'>Our Approach</Badge>
            <h1 className='text-4xl font-semibold mt-3 mb-8'>
              How Virtual Exposure Therapy Works
            </h1>
            <p className='text-secondary text-2xl'>
              A gradual, controlled approach to facing your fears in a virtual
              environment.
            </p>
          </article>
          <div className='grid grid-cols-3 mt-8 gap-8'>
            <div className='bg-white rounded-xl p-6 text-center'>
              <ShieldCheck className='text-secondary mx-auto' size={48} />
              <h4 className='mt-10 text-2xl font-semibold'>Safe Environment</h4>
              <p className='mt-2 text-lg'>
                Experience your fears in a completely controlled and safe
                virtual setting.
              </p>
            </div>
            <div className='bg-white rounded-xl p-6 text-center'>
              <Brain className='text-secondary mx-auto' size={48} />
              <h4 className='mt-10 text-2xl font-semibold'>Guided Therapy</h4>
              <p className='mt-2 text-lg'>
                Professional therapists guide you through each step of the
                exposure process.
              </p>
            </div>
            <div className='bg-white rounded-xl p-6 text-center'>
              <Zap className='text-secondary mx-auto' size={48} />
              <h4 className='mt-10 text-2xl font-semibold'>Lasting Results</h4>
              <p className='mt-2 text-lg'>
                Build confidence and resilience that transfers to real-world
                situations.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id='treatment' className='py-24 px-16'>
        <article className='text-center'>
          <Badge variant='secondary'>Virtual Environment</Badge>
          <h1 className='text-4xl font-semibold mt-3 mb-8'>
            Three Fears, Three Worlds
          </h1>
          <p className='text-secondary text-2xl'>
            Three different environment — one journey to confront them all.
          </p>
        </article>
        <div className='my-10 grid grid-cols-3 justify-items-center'>
          <div>
            <Image src={AcroIllust} alt='Acrophobia' width={360} height={200} />
            <p className='mt-2 text-2xl font-semibold'>Acrophobia</p>
          </div>
          <div>
            <Image
              src={ClaustroIllust}
              alt='Claustrophobia'
              width={360}
              height={200}
            />
            <p className='mt-2 text-2xl font-semibold'>Claustrophobia</p>
          </div>
          <div>
            <Image
              src={NyctoIllust}
              alt='Nyctophobia'
              width={360}
              height={200}
            />
            <p className='mt-2 text-2xl font-semibold'>Nyctophobia</p>
          </div>
        </div>
      </section>
      <section id='testimony' className='bg-muted'>
        <div className='py-24 px-16 grid grid-cols-2 items-center gap-8'>
          <article>
            <Badge variant='secondary'>Testimonials</Badge>
            <h1 className='text-4xl font-semibold mt-3 mb-8'>
              Real People, Real Results
            </h1>
            <p className='text-secondary text-2xl'>
              Discover how our innovative virtual exposure therapy combined with
              custom perfume formulations has helped people overcome their
              deepest fears.
            </p>
          </article>
          <div className='grid grid-rows-3 space-y-6'>
            <div className='row-span-2 bg-white rounded-xl p-6 h-min'>
              <article>
                <p className='italic mb-6'>
                  Before VR therapy, even standing near a window on a high floor
                  made me anxious. After several sessions, my fear of heights
                  has improved dramatically. The virtual environments felt real
                  but safe, helping me build confidence step by step. I finally
                  enjoy high places again!
                </p>
              </article>
              <div className='flex justify-between items-center'>
                <aside className='flex items-center gap-4'>
                  <Avatar className='w-12 h-12'>
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className='font-semibold'>John Doe</p>
                    <p className='text-secondary'>Acrophobia Survivor</p>
                  </div>
                </aside>
                <aside className='flex items-center gap-1'>
                  <div>
                    {Array.from({ length: 4 }, (_, index) => (
                      <Star
                        key={index}
                        className='text-secondary inline-block fill-secondary'
                        size={24}
                      />
                    ))}
                    <Star className='text-secondary inline-block' size={24} />
                  </div>
                  <p className='font-semibold text-xl'>4/5</p>
                </aside>
              </div>
            </div>
            <div className='grid grid-cols-3 gap-6'>
              <div className='bg-white p-6 rounded-xl'>
                <div className='flex justify-center items-center gap-2'>
                  <Star className='text-secondary' size={28} />
                  <p className='font-bold text-2xl'>4.9</p>
                </div>
                <p className='text-center mt-3'>Average Rating</p>
              </div>
              <div className='bg-white p-6 rounded-xl'>
                <div className='flex justify-center items-center gap-2'>
                  <Users className='text-secondary' size={28} />
                  <p className='font-bold text-2xl'>78+</p>
                </div>
                <p className='text-center mt-3'>Clients</p>
              </div>
              <div className='bg-white p-6 rounded-xl'>
                <div className='flex justify-center items-center gap-2'>
                  <TrendingUp className='text-secondary' size={28} />
                  <p className='font-bold text-2xl'>94%</p>
                </div>
                <p className='text-center mt-3'>Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id='cta' className='py-24 px-16'>
        <article className='text-center'>
          <Badge variant='secondary'>Join With Us!</Badge>
          <h1 className='text-4xl font-semibold mt-3 mb-8'>
            Ready to overcome your phobia?
          </h1>
          <p className='text-secondary text-2xl'>
            Take the first step toward freedom from fear.
          </p>
        </article>
        <div className='flex justify-center my-10'>
          <Button size='lg'>Schedule Consultation</Button>
        </div>
      </section>
      <footer className='bg-muted py-6 text-center'>
        <p>
          @ 2025 <span className='font-brand'>Incensory</span>, All Rights
          Reserved
        </p>
      </footer>
    </>
  );
}
