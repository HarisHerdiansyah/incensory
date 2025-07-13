import { ProductForm } from '@/components/cms/products';
import { ProductFormState } from '@/components/cms/products/types';
import { ProductImage, ProductLink } from '@prisma/client';
import { getProductById } from '@/actions/products';

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) return <div>Produk tidak ditemukan</div>;

  const defaultValues: ProductFormState = {
    name: product.name,
    description: product.description,
    price: Number(product.price),
    links: Object.fromEntries(
      product.product_links.map((l: ProductLink) => [l.target, l.link])
    ),
    existingImages: product.product_images.map(
      (img: ProductImage) => img.source
    ),
    uploadedImages: [],
    deletedImages: [],
  };

  return (
    <div className='max-w-3xl mx-auto py-8'>
      <h1 className='text-2xl font-semibold mb-4'>Edit Produk</h1>
      <ProductForm mode='edit' productId={id} defaultValues={defaultValues} />
    </div>
  );
}
