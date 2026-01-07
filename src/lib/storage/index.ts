/**
 * Cloudflare R2 Storage Configuration
 * 
 * This module will contain R2 storage utilities for image uploads.
 * 
 * Setup Instructions:
 * 1. Install AWS SDK (R2 is S3-compatible): npm install @aws-sdk/client-s3
 * 2. Add environment variables to .env.local:
 *    - R2_ACCOUNT_ID=your_account_id
 *    - R2_ACCESS_KEY_ID=your_access_key
 *    - R2_SECRET_ACCESS_KEY=your_secret_key
 *    - R2_BUCKET_NAME=bereket-market-images
 *    - R2_PUBLIC_URL=https://your-bucket.r2.dev
 * 3. Configure CORS on your R2 bucket for client-side uploads
 */

export const STORAGE_CONFIG = {
    bucketName: process.env.R2_BUCKET_NAME || 'bereket-market-images',
    region: 'auto',
    maxFileSizeMB: 10,
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
};

// Placeholder for R2 client
// import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
//
// export const r2Client = new S3Client({
//   region: 'auto',
//   endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
//   credentials: {
//     accessKeyId: process.env.R2_ACCESS_KEY_ID!,
//     secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
//   },
// });

// Utility functions placeholder
// export async function uploadImage(file: File): Promise<string> { }
// export async function deleteImage(key: string): Promise<void> { }
// export function getImageUrl(key: string): string { }
