import { pgTable, text, timestamp, uuid, boolean, numeric } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Brands: The parent company or main brand (e.g., "Yildiz Market")
export const brands = pgTable('brands', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    logoUrl: text('logo_url'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Branches: Physical store locations (e.g., "Frankfurt Nordend")
export const branches = pgTable('branches', {
    id: uuid('id').defaultRandom().primaryKey(),
    brandId: uuid('brand_id').references(() => brands.id).notNull(),
    name: text('name').notNull(),
    address: text('address'),
    latitude: numeric('latitude'),
    longitude: numeric('longitude'),
    openingHours: text('opening_hours'),
    phone: text('phone'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Authorized Senders: People allowed to post via WhatsApp for a specific branch
export const authorizedSenders = pgTable('authorized_senders', {
    id: uuid('id').defaultRandom().primaryKey(),
    branchId: uuid('branch_id').references(() => branches.id).notNull(),
    phoneNumber: text('phone_number').notNull().unique(), // WhatsApp number
    senderName: text('sender_name'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Offers: The product offers posted by senders
export const offers = pgTable('offers', {
    id: uuid('id').defaultRandom().primaryKey(),
    branchId: uuid('branch_id').references(() => branches.id).notNull(),
    imageUrl: text('image_url'), // AI-enhanced image
    originalImageUrl: text('original_image_url'), // Raw WhatsApp photo
    description: text('description'), // AI-generated text
    price: text('price'),
    isActive: boolean('is_active').default(true).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Relations
export const brandsRelations = relations(brands, ({ many }) => ({
    branches: many(branches),
}));

export const branchesRelations = relations(branches, ({ one, many }) => ({
    brand: one(brands, {
        fields: [branches.brandId],
        references: [brands.id],
    }),
    authorizedSenders: many(authorizedSenders),
    offers: many(offers),
}));

export const authorizedSendersRelations = relations(authorizedSenders, ({ one }) => ({
    branch: one(branches, {
        fields: [authorizedSenders.branchId],
        references: [branches.id],
    }),
}));

export const offersRelations = relations(offers, ({ one }) => ({
    branch: one(branches, {
        fields: [offers.branchId],
        references: [branches.id],
    }),
}));
