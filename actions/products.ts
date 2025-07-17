'use server';

import { revalidatePath } from 'next/cache';
import { LinkTarget } from '@/lib/enums';
import { parseJsonSafe, deleteFilesFromS3 } from '@/lib/utils';
import { db } from '@/lib/db';

export async function createProduct(formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const price = Number(formData.get('price'));
  const imagesRaw = formData.get('uploadedImages');
  const linksRaw = formData.get('links');

  const imageKeys = parseJsonSafe<string[]>(imagesRaw) || [];
  const links = parseJsonSafe<{ [K in LinkTarget]?: string }>(linksRaw) || {};

  if (!name || !description || !price || imageKeys.length === 0) {
    return { success: false, message: 'Semua data wajib diisi dengan benar' };
  }

  if (isNaN(price) || price < 0) throw new Error('Harga tidak valid');

  try {
    await db.$transaction(async (tx) => {
      const newProduct = await tx.product.create({
        data: {
          name,
          description,
          price,
          isVisible: true,
        },
      });

      await tx.productImage.createMany({
        data: imageKeys.map((key) => ({
          product_id: newProduct.id,
          source: key,
        })),
      });

      await tx.productLink.createMany({
        data: Object.entries(links)
          .filter(([_, value]) => value)
          .map(([target, link]) => ({
            product_id: newProduct.id,
            link,
            target: target as LinkTarget,
          })),
      });
    });

    revalidatePath('/cms/products');
    return { success: true, message: 'Produk berhasil ditambahkan' };
  } catch (err) {
    console.error('[CREATE_PRODUCT]', err);
    return { success: false, message: 'Gagal menambahkan produk' };
  }
}

export async function updateProduct(formData: FormData) {
  const productId = formData.get('productId') as string;
  const updatedRaw = formData.get('updatedProduct');
  const updatedLinksRaw = formData.get('updatedLinks');
  const uploadedImagesRaw = formData.get('uploadedImages');
  const deletedImagesRaw = formData.get('deletedImages');

  const updatedProduct = parseJsonSafe<Record<string, any>>(updatedRaw) || {};
  const updatedLinks =
    parseJsonSafe<{ [K in LinkTarget]?: string }>(updatedLinksRaw) || {};
  const uploadedImages = parseJsonSafe<string[]>(uploadedImagesRaw) || [];
  const deletedImages = parseJsonSafe<string[]>(deletedImagesRaw) || [];

  try {
    await db.$transaction(async (tx) => {
      // Hapus gambar
      if (deletedImages.length > 0) {
        await deleteFilesFromS3(deletedImages);
        await tx.productImage.deleteMany({
          where: { product_id: productId, source: { in: deletedImages } },
        });
      }

      // Tambah gambar baru
      if (uploadedImages.length > 0) {
        await tx.productImage.createMany({
          data: uploadedImages.map((key) => ({
            product_id: productId,
            source: key,
          })),
        });
      }

      // Update link
      for (const target of Object.keys(updatedLinks) as LinkTarget[]) {
        const link = updatedLinks[target];
        if (link) {
          await tx.productLink.updateMany({
            where: { product_id: productId, target },
            data: { link },
          });
        }
      }

      // Update data utama
      if (Object.keys(updatedProduct).length > 0) {
        await tx.product.update({
          where: { id: productId },
          data: updatedProduct,
        });
      }
    });

    revalidatePath('/cms/products');
    return { success: true };
  } catch (err) {
    console.error('[UPDATE_PRODUCT]', err);
    return { success: false, message: 'Gagal memperbarui produk' };
  }
}

export async function getProductById(id: string) {
  try {
    const product = await db.product.findUnique({
      where: { id },
      include: {
        product_links: true,
        product_images: true,
      },
    });

    return product;
  } catch (err) {
    console.error('[GET_PRODUCT]', err);
    return null;
  }
}

export async function archiveProduct(id: string, isVisible: boolean) {
  try {
    await db.$transaction(async (tx) => {
      const images = await tx.productImage.findMany({
        where: { product_id: id },
        select: { source: true },
      });

      const deletedImages = images.map((img) => img.source);

      if (deletedImages.length > 0) {
        await deleteFilesFromS3(deletedImages);
      }

      await tx.product.update({
        where: { id },
        data: { isVisible },
      });
    });
    revalidatePath('/cms/products');
    return { success: true, message: 'Produk behasil diarsipkan' };
  } catch (error) {
    console.error('[DELETE_PRODUCT]', error);
    return { success: false, message: 'Produk gagal diarsipkan' };
  }
}
