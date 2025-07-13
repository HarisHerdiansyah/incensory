'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ImageUploadMultiple } from './ImageUploadMultiple';
import { ProductProps } from './types';

export default function ProductFormFields({ values, onChange }: ProductProps) {
  return (
    <div className='space-y-6'>
      {/* Name */}
      <div>
        <Label htmlFor='name'>Nama Produk</Label>
        <Input
          id='name'
          value={values.name}
          onChange={(e) => onChange('name', e.target.value)}
        />
      </div>

      {/* Description */}
      <div>
        <Label htmlFor='description'>Deskripsi</Label>
        <Textarea
          id='description'
          value={values.description}
          onChange={(e) => onChange('description', e.target.value)}
          rows={4}
        />
      </div>

      {/* Price */}
      <div>
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

      {/* Links */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div>
          <Label htmlFor='shopee'>Shopee</Label>
          <Input
            id='shopee'
            type='url'
            value={values.links?.SHOPEE || ''}
            onChange={(e) =>
              onChange('links', { ...values.links, SHOPEE: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor='tokopedia'>Tokopedia</Label>
          <Input
            id='tokopedia'
            type='url'
            value={values.links?.TOKOPEDIA || ''}
            onChange={(e) =>
              onChange('links', { ...values.links, TOKOPEDIA: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor='whatsapp'>WhatsApp</Label>
          <Input
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
      <div>
        <Label>Gambar Produk</Label>
        <ImageUploadMultiple
          initialImages={values.existingImages}
          onChange={(existing, uploaded, deleted) => {
            onChange('existingImages', existing);
            onChange('uploadedImages', uploaded);
            onChange('deletedImages', deleted);
          }}
        />
      </div>
    </div>
  );
}
