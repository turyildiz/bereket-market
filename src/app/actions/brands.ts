'use server';

import { db } from '@/db';
import { brands } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';

export async function createBrand(formData: FormData) {
    const name = formData.get('name') as string;
    const logoUrl = formData.get('logoUrl') as string;

    if (!name) {
        throw new Error('Name is required');
    }

    await db.insert(brands).values({
        name,
        logoUrl,
    });

    revalidatePath('/admin/brands');
}

export async function deleteBrand(id: string) {
    await db.delete(brands).where(eq(brands.id, id));
    revalidatePath('/admin/brands');
}
