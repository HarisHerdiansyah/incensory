import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ProfilePasswordForm() {
  return (
    <div id='formGrid'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div id='formControl'>
          <Label htmlFor='password' className='mb-3'>
            Kata Sandi:
          </Label>
          <Input type='text' id='password' name='password' autoComplete='off' />
        </div>
        <div id='formControl'>
          <Label htmlFor='confirmPassword' className='mb-3'>
            Konfirmasi Kata Sandi:
          </Label>
          <Input
            type='text'
            id='confirmPassword'
            name='confirmPassword'
            autoComplete='off'
          />
        </div>
      </div>
      <div className='flex justify-end my-8'>
        <Button variant='secondary'>Ganti Kata Sandi</Button>
      </div>
    </div>
  );
}
