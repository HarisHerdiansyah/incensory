'use client';

import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { ChangeEvent, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { updateProfileImage } from '@/actions/profile';
import Loader from '../Loader';

export default function ProfileImageForm() {
  const { update, data } = useSession();
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const onUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0] as File;
    console.log(image);
    setIsUploading(true);

    const response = await updateProfileImage(image);
    if (response.success) {
      await update({ profileImage: response.data });
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }

    setIsUploading(false);
  };

  return (
    <>
      {isUploading && <Loader />}
      <div className='my-8 md:px-10 lg:px-16 flex flex-col md:flex-row items-center justify-center gap-8'>
        <div className='w-[220px] h-[220px] rounded-full bg-muted relative overflow-hidden border border-black'>
          {data?.user.profileImage && (
            <Image
              src={`${process.env.NEXT_PUBLIC_S3_PUBLIC_URL}/${data?.user.profileImage}`}
              alt='Profile'
              className='object-cover'
              fill
            />
          )}
        </div>
        <div id='formControl'>
          <Label htmlFor='profile' className='mb-3'>
            Ubah Foto Profil:
          </Label>
          <Input
            type='file'
            id='profile'
            name='profile'
            accept='image/*'
            onChange={onUpload}
          />
        </div>
      </div>
    </>
  );
}
