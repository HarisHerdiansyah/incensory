import { ContentForm } from '@/components/cms/contents';

export default function AddContentPage() {
  return (
    <div className='max-w-3xl mx-auto mt-10'>
      <h1 className='text-2xl font-semibold mb-6'>Tambah Konten VR</h1>
      <ContentForm mode='add' />
    </div>
  );
}
