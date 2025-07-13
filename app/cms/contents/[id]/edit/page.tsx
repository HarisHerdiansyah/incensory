import { notFound } from 'next/navigation';
import { getContentById } from '@/actions/contents';
import { ContentForm } from '@/components/cms/contents';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditContentPage({ params }: Props) {
  const { id } = await params;
  const content = await getContentById(id);

  if (!content) return notFound();

  const { title, description, source, category } = content;

  return (
    <div className='max-w-3xl mx-auto mt-10'>
      <h1 className='text-2xl font-semibold mb-6'>Edit Konten VR</h1>
      <ContentForm
        mode='edit'
        contentId={id}
        initialData={{
          title,
          description,
          source,
          category,
        }}
      />
    </div>
  );
}
