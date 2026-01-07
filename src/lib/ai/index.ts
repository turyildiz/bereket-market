/**
 * AI Processing Configuration
 * 
 * This module will contain AI utilities for processing offer photos.
 * 
 * Use Cases:
 * - Extract product information from images
 * - Translate product descriptions
 * - Categorize products automatically
 * - Generate search-friendly tags
 * 
 * Setup Instructions:
 * 1. Choose an AI provider (OpenAI Vision, Google Gemini, etc.)
 * 2. Install SDK: npm install openai (or respective SDK)
 * 3. Add environment variables to .env.local:
 *    - OPENAI_API_KEY=sk_xxx (or equivalent)
 */

export const AI_CONFIG = {
    // AI configuration placeholder
    provider: 'openai', // or 'gemini', 'anthropic', etc.
    model: 'gpt-4-vision-preview',
    maxTokens: 1024,
};

// Placeholder for AI utilities
// export async function processOfferImage(imageUrl: string): Promise<ProcessedOffer> { }
// export async function translateDescription(text: string, targetLang: string): Promise<string> { }
// export async function categorizeProduct(description: string): Promise<string[]> { }
