'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ImageUploadMultiple } from './ImageUploadMultiple';
import { ProductProps } from './types';

export default function ProductFormFields({ values, onChange }: ProductProps) {
  return (
    <div className='grid grid-cols-2 space-y-6 gap-6'>
      {/* Name */}
      <div id='formControl'>
        <Label className='mb-3' htmlFor='name'>
          Nama Produk
        </Label>
        <Input
          id='name'
          value={values.name}
          onChange={(e) => onChange('name', e.target.value)}
        />
      </div>

      {/* Price */}
      <div id='formControl'>
        <Label className='mb-3' htmlFor='price'>
          Harga
        </Label>
        <Input
          id='price'
          type='number'
          value={Number.isNaN(values.price) ? '' : values.price}
          onChange={(e) => {
            const value = e.target.value;
            onChange('price', value === '' ? 0 : parseFloat(value));
          }}
        />
      </div>

      {/* Description */}
      <div id='formControl'>
        <Label className='mb-3' htmlFor='description'>
          Deskripsi
        </Label>
        <Textarea
          id='description'
          value={values.description}
          onChange={(e) => onChange('description', e.target.value)}
          rows={4}
        />
      </div>

      {/* Links */}
      <div className='space-y-4'>
        <Label className='mb-3'>Tautan Produk</Label>
        <div id='formControl'>
          <Input
            placeholder='Shopee'
            id='shopee'
            type='url'
            value={values.links?.SHOPEE || ''}
            onChange={(e) =>
              onChange('links', { ...values.links, SHOPEE: e.target.value })
            }
          />
        </div>
        <div id='formControl'>
          <Input
            placeholder='Tokopedia'
            id='tokopedia'
            type='url'
            value={values.links?.TOKOPEDIA || ''}
            onChange={(e) =>
              onChange('links', { ...values.links, TOKOPEDIA: e.target.value })
            }
          />
        </div>
        <div id='formControl'>
          <Input
            placeholder='WhatsApp'
            id='whatsapp'
            type='url'
            value={values.links?.WHATSAPP || ''}
            onChange={(e) =>
              onChange('links', { ...values.links, WHATSAPP: e.target.value })
            }
          />
        </div>
      </div>

      {/* Images */}
      {/* <div id='formControl'> */}
        {/* <Label className='mb-2'>Gambar Produk</Label> */}
        <ImageUploadMultiple
          initialImages={values.existingImages}
          onChange={(existing, uploaded, deleted) => {
            onChange('existingImages', existing);
            onChange('uploadedImages', uploaded);
            onChange('deletedImages', deleted);
          }}
        />
      {/* </div> */}
    </div>
  );
}
