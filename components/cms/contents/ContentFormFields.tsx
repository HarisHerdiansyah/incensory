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
  mode: string;
  defaultValues?: {
    title: string;
    description: string;
    category: VRCategory;
    source: string;
  };
  isVideoUploaded?: boolean;
};

export default function ContentFormFields({
  mode,
  defaultValues,
  isVideoUploaded,
}: Props) {
  return (
    <>
      <div className='grid gap-2'>
        <Label htmlFor='title'>Judul Konten</Label>
        <Input
          id='title'
          name='title'
          defaultValue={defaultValues?.title ?? ''}
          placeholder='Masukkan judul konten'
          disabled={mode === 'add' && !isVideoUploaded}
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
          disabled={mode === 'add' && !isVideoUploaded}
          required
        />
      </div>

      <div className='grid gap-2'>
        <Label htmlFor='category'>Kategori</Label>
        <Select
          name='category'
          defaultValue={defaultValues?.category ?? VRCategory.ACROPHOBIA}
          disabled={mode === 'add' && !isVideoUploaded}
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

      {/* source diset melalui upload file */}
      <input type='hidden' name='source' value={defaultValues?.source ?? ''} />
    </>
  );
}
