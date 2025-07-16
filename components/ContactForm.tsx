'use client';

import { Send } from 'lucide-react';
import { useActionState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { contactForm } from '@/lib/constants';
import { sendContactEmail } from '@/actions/contact';
import Loader from './Loader';

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(sendContactEmail, {
    success: null,
    message: '',
  });

  useEffect(() => {
    if (state.success === true) {
      toast.success(state.message);
    } else if (state.success === false) {
      toast.error(state.message);
    }
  }, [state.success, state.message]);

  return (
    <>
      {isPending && <Loader />}
      <form
        action={formAction}
        className='pt-12 px-8 pb-8 rounded-md flex-1 max-w-[500px] bg-white space-y-6'
      >
        {contactForm.map((field) => (
          <div id='formControl' key={field.id}>
            <Label htmlFor={field.id} className='mb-3'>
              {field.label}
            </Label>
            <Input
              type={field.type}
              id={field.id}
              name={field.id}
              autoComplete='off'
              required
            />
          </div>
        ))}
        <div id='formControl'>
          <Label htmlFor='message' className='mb-3'>
            Pesan:
          </Label>
          <Textarea id='message' name='message' rows={4} required />
        </div>
        <Button variant='secondary' className='w-full cursor-pointer'>
          <Send />
          Kirim
        </Button>
      </form>
    </>
  );
}
