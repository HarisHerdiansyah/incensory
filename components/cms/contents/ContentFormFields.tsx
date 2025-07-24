'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { VRCategory } from '@prisma/client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Props = {
  defaultValues?: {
    title: string;
    description: string;
    category: VRCategory;
    source: string;
  };
};

export default function ContentFormFields({ defaultValues }: Props) {
  return (
    <>
      <div className='grid gap-2'>
        <Label htmlFor='title'>Judul Konten</Label>
        <Input
          id='title'
          name='title'
          defaultValue={defaultValues?.title ?? ''}
          placeholder='Masukkan judul konten'
          required
        />
      </div>
      
      <div className='grid gap-2'>
        <Label htmlFor='source'>Tautan Konten</Label>
        <Input
          id='source'
          name='source'
          defaultValue={defaultValues?.source ?? ''}
          placeholder='Masukkan tautan konten'
          required
        />
      </div>

      <div className='grid gap-2'>
        <Label htmlFor='description'>Deskripsi</Label>
        <Textarea
          id='description'
          name='description'
          defaultValue={defaultValues?.description ?? ''}
          placeholder='Tuliskan deskripsi konten'
          required
        />
      </div>

      <div className='grid gap-2'>
        <Label htmlFor='category'>Kategori</Label>
        <Select
          name='category'
          defaultValue={defaultValues?.category ?? VRCategory.ACROPHOBIA}
        >
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='Pilih kategori' />
          </SelectTrigger>
          <SelectContent>
            {Object.values(VRCategory).map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
