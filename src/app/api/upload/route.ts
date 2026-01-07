/**
 * Upload API Route
 * 
 * Handles image uploads to Cloudflare R2.
 * 
 * Features:
 * - Validates file type and size
 * - Uploads to R2 bucket
 * - Triggers AI processing for offer images
 * - Returns public URL
 */

import { NextResponse } from 'next/server';

export async function POST() {
    // TODO: Implement image upload to R2
    return NextResponse.json({
        message: 'Upload API - Coming soon'
    }, { status: 501 });
}
