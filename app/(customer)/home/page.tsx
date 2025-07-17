import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GalleryCard, ProductCard } from '@/components/home';
import { db } from '@/lib/db';
import { AcroIllust, ClaustroIllust, NyctoIllust } from '@/assets';
import { VRCategory } from '@prisma/client';

const thumbnail = {
  [VRCategory.ACROPHOBIA]: AcroIllust,
  [VRCategory.CLAUSTROPHOBIA]: ClaustroIllust,
  [VRCategory.NYCTOPHOBIA]: NyctoIllust,
};

export default async function HomePage() {
  const products = await db.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      description: true,
      product_images: {
        select: {
          id: true,
          source: true,
        },
      },
      product_links: {
        select: {
          id: true,
          link: true,
          target: true,
        },
      },
    },
    where: { isVisible: true },
  });

  const contents = await db.vRContent.findMany({
    select: {
      id: true,
      title: true,
      category: true,
      description: true,
      source: true,
    },
    where: { isVisible: true },
  });

  return (
    <>
      <Tabs defaultValue='therapy' className='w-full'>
        <div className='flex justify-center w-full mb-8'>
          <div className='w-full max-w-[500px]'>
            <TabsList className='w-full'>
              <TabsTrigger
                value='therapy'
                className='data-[state=active]:bg-primary cursor-pointer'
              >
                Ruang Terapi
              </TabsTrigger>
              <TabsTrigger
                value='catalogue'
                className='data-[state=active]:bg-primary cursor-pointer'
              >
                Katalog Produk
              </TabsTrigger>
            </TabsList>
          </div>
        </div>
        <TabsContent value='therapy'>
          <div className='flex flex-wrap items-center justify-center gap-6'>
            {contents.map((content) => (
              <GalleryCard
                key={content.id}
                id={content.id}
                title={content.title}
                category={content.category}
                description={content.description}
                image={thumbnail[content.category]}
                source={content.source}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value='catalogue'>
          <div className='flex flex-wrap items-center justify-center gap-6'>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                price={Number(product.price)}
                description={product.description}
                productImages={product.product_images}
                productLinks={product.product_links}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
