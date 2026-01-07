/**
 * Shared TypeScript Types
 * 
 * This file contains shared type definitions for the Bereket Market application.
 */

// User types (linked to Clerk)
export interface User {
    id: string;
    clerkId: string;
    email: string;
    firstName?: string;
    lastName?: string;
    imageUrl?: string;
    role: 'shop_owner' | 'customer' | 'admin';
    createdAt: Date;
    updatedAt: Date;
}

// Shop types
export interface Shop {
    id: string;
    ownerId: string;
    name: string;
    description?: string;
    address?: string;
    city: string;
    postcode: string;
    phone?: string;
    imageUrl?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// Offer/Product types
export interface Offer {
    id: string;
    shopId: string;
    title: string;
    description?: string;
    price?: number;
    currency: string;
    category?: string;
    tags: string[];
    images: OfferImage[];
    aiProcessed: boolean;
    aiExtractedData?: AIExtractedData;
    isActive: boolean;
    expiresAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface OfferImage {
    id: string;
    offerId: string;
    url: string;
    r2Key: string;
    isPrimary: boolean;
    createdAt: Date;
}

// AI Processing types
export interface AIExtractedData {
    detectedProducts: string[];
    suggestedCategory: string;
    suggestedTags: string[];
    detectedLanguage: string;
    translatedDescription?: string;
    priceDetected?: number;
    confidence: number;
}

// API Response types
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
    hasMore: boolean;
}
