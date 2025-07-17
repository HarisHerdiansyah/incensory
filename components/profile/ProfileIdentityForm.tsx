import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ProfileIdentityForm() {
  return (
    <div id='formGrid'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div id='formControl'>
          <Label htmlFor='username' className='mb-3'>
            Nama Pengguna:
          </Label>
          <Input type='text' id='username' name='username' autoComplete='off' />
        </div>
        <div id='formControl'>
          <Label htmlFor='email' className='mb-3'>
            Email:
          </Label>
          <Input type='text' id='email' name='email' autoComplete='off' />
        </div>
        <div id='formControl'>
          <Label htmlFor='phone' className='mb-3'>
            No. Telepon
          </Label>
          <Input type='text' id='phone' name='phone' autoComplete='off' />
        </div>
      </div>
      <div className='flex justify-end my-8'>
        <Button variant='secondary'>Simpan Perubahan</Button>
      </div>
    </div>
  );
}
