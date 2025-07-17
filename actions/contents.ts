'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { VRCategory } from '@prisma/client';
import { parseJsonSafe, deleteFilesFromS3 } from '@/lib/utils';

const CMS_PATH = '/cms/contents';

// CREATE
export async function insertContent(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const category = formData.get('category') as VRCategory;
  const source = formData.get('source') as string;

  if (!title || !description || !category || !source) {
    return { success: false, message: 'Semua field wajib diisi.' };
  }

  try {
    await db.vRContent.create({
      data: {
        title,
        description,
        category,
        source,
        isVisible: true,
      },
    });

    revalidatePath(CMS_PATH);
    return { success: true, message: 'Konten berhasil ditambahkan.' };
  } catch (error) {
    console.error('[INSERT_CONTENT]', error);
    return { success: false, message: 'Gagal menambahkan konten.' };
  }
}

// UPDATE
export async function updateContent(id: string, formData: FormData) {
  const raw = formData.get('updatedContent');
  const updatedContent = parseJsonSafe<any>(raw);

  if (!updatedContent || Object.keys(updatedContent).length === 0) {
    return { success: false, message: 'Data tidak valid.' };
  }

  try {
    if ('source' in updatedContent) {
      const previous = await db.vRContent.findUnique({
        where: { id },
        select: { source: true },
      });

      const oldSource = previous?.source;
      const newSource = updatedContent.source;

      if (oldSource && newSource && oldSource !== newSource) {
        await deleteFilesFromS3([oldSource]);
      }
    }

    await db.vRContent.update({
      where: { id },
      data: { ...updatedContent },
    });

    revalidatePath(CMS_PATH);
    return { success: true, message: 'Konten berhasil diperbarui.' };
  } catch (error) {
    console.error('[UPDATE_CONTENT]', error);
    return { success: false, message: 'Gagal memperbarui konten.' };
  }
}

// DELETE
export async function archiveContent(id: string, isVisible: boolean) {
  try {
    const data = await db.vRContent.findUnique({
      where: { id },
      select: { source: true },
    });

    if (data?.source) {
      await deleteFilesFromS3([data.source]);
    }

    await db.vRContent.update({
      where: { id },
      data: { isVisible },
    });

    revalidatePath(CMS_PATH);
    return { success: true, message: 'Konten berhasil diarsipkan.' };
  } catch (error) {
    console.error('[DELETE_CONTENT]', error);
    return { success: false, message: 'Gagal mengarsipkan konten.' };
  }
}

// GET BY ID
export async function getContentById(id: string) {
  try {
    const content = await db.vRContent.findUnique({
      where: { id },
    });
    return content;
  } catch (error) {
    console.error('[GET_CONTENT_BY_ID]', error);
    return null;
  }
}
