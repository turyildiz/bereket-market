# Product Requirements Document: Bereket Market

**Version**: 1.0
**Date**: 2026-02-27
**Status**: Draft

---

## 1. Product Overview

### 1.1 Vision

Bereket Market is a web platform that enables Turkish and Middle Eastern supermarkets to digitally advertise their latest product offers. Supermarket staff send photos of offers via WhatsApp; the platform automatically processes them with AI, publishes them online, and allows customers to browse deals by store or location.

### 1.2 Problem Statement

Turkish supermarkets in German-speaking markets (and similar diaspora communities) currently rely on paper flyers, WhatsApp group broadcasts, and word-of-mouth to communicate weekly deals. This is:

- **Fragmented**: No single place for customers to discover deals across multiple stores.
- **Labour-intensive**: Store owners manually create and distribute flyers.
- **Ephemeral**: Offers disappear from WhatsApp chats and have no searchable archive.
- **Unscalable**: Each new branch requires a separate distribution channel.

### 1.3 Solution

A two-sided platform:
- **For supermarkets**: A dead-simple way to post offers — send a WhatsApp photo, and it appears online immediately, enriched with AI-extracted product info.
- **For customers**: A browsable, searchable catalogue of current offers across multiple supermarket chains and branches.

### 1.4 Target Markets

- **Primary**: Turkish-run supermarkets operating in German-speaking regions (Germany, Austria, Switzerland).
- **Secondary**: Any Middle Eastern or ethnic grocery supermarket seeking a digital offer channel.

---

## 2. Users & Roles

| Role | Description | Key Permissions |
|---|---|---|
| **Admin** | Platform operator (Bereket team) | Full access; manages brands, branches, users, moderation |
| **Shop Owner** | Supermarket chain owner/manager | Manages their brand, branches, and authorized senders |
| **Branch Staff** | Store employee at a specific branch | Submits offers via WhatsApp (no web login required) |
| **Customer** | End-user browsing offers | Browses, searches, and saves offers (no login required) |

---

## 3. Core Features

### 3.1 WhatsApp Offer Ingestion (P0)

The primary input mechanism for offers. Store staff photograph a product or price tag and send it to a dedicated WhatsApp number.

**Requirements:**
- A WhatsApp Business API webhook receives incoming messages.
- The system verifies the sender's phone number against the `authorizedSenders` table.
- If authorized, the image is stored in Cloudflare R2 and queued for AI processing.
- If unauthorized, the system sends an auto-reply explaining the sender is not registered.
- Supports photos, short videos (optional), and text-only offers.
- Handles multiple offers in a single message thread.

**Acceptance Criteria:**
- Authorized sender sends a photo → offer appears on the website within 60 seconds.
- Unauthorized sender receives a polite rejection reply.
- Images are stored reliably and served via CDN.

---

### 3.2 AI Offer Processing (P0)

After an image is received, AI enriches the raw photo with structured data.

**Requirements:**
- Vision model (OpenAI GPT-4o Vision, Google Gemini 1.5, or Anthropic Claude) analyses the image.
- Extracted fields:
  - Product name (in original language + German translation)
  - Price (numerical value + currency)
  - Unit (per kg, per piece, per litre, etc.)
  - Offer validity dates (if visible)
  - Product category (produce, meat, dairy, bakery, beverages, dry goods, frozen, household, other)
- Confidence scores are stored alongside extracted data.
- Low-confidence extractions are flagged for manual review by an admin.
- Original image is preserved; AI may optionally enhance brightness/contrast for display.

**Acceptance Criteria:**
- >85% of offers have product name and price correctly extracted without manual correction.
- Processing completes within 30 seconds of image receipt.
- Extraction failures are surfaced in the admin moderation queue.

---

### 3.3 Public Offer Browse (P0)

The customer-facing side of the platform — no login required.

**Requirements:**
- Home page displays a grid of active, recent offers across all brands.
- Offers can be filtered by:
  - Brand / supermarket chain
  - Product category
  - City or postal code (geo-based, using branch coordinates)
  - Free-text search (product name)
- Each offer card displays: product image, product name, price, unit, store name, branch address, and time since posting.
- Offer detail page shows full image, all extracted data, and branch contact info.
- Pagination or infinite scroll for offer lists.
- Offers auto-expire after a configurable period (default: 7 days) and are hidden from browse.

**Acceptance Criteria:**
- Page loads in under 2 seconds on a mobile connection.
- Filtering by brand and category works correctly.
- Expired offers do not appear in browse.
- Works without JavaScript (SSR/SSG).

---

### 3.4 Brand & Branch Management (P0)

Admin and shop owners manage the organisational hierarchy.

**Requirements:**

**Admin capabilities:**
- Create, edit, and delete brands (supermarket chains).
- Create, edit, and delete branches under a brand.
- Assign a `shop_owner` role to a Clerk user and link them to a brand.

**Shop Owner capabilities:**
- View and edit their own brand profile (name, logo).
- Create, edit, and deactivate branches under their brand.
  - Branch fields: name, address, city, postal code, phone, opening hours, geo-coordinates (lat/lon).
- Manage authorized WhatsApp senders per branch (add/remove phone numbers).

**Acceptance Criteria:**
- Brand CRUD works end-to-end and persists to the database.
- Branch CRUD works end-to-end.
- A shop owner cannot see or modify another brand's data.

---

### 3.5 Dashboard & Offer Management (P1)

Shop owners and authorised staff can review and manage offers through the web dashboard.

**Requirements:**
- Dashboard home shows summary stats: total active offers, offers this week, branches, authorized senders.
- Offer list view with status (active, expired, pending review, rejected).
- Ability to manually edit extracted data (name, price, category) on any offer.
- Ability to deactivate or delete an offer.
- Ability to manually upload an image and create an offer directly (web upload as alternative to WhatsApp).
- Filter offers by branch and date range.

**Acceptance Criteria:**
- Shop owner can edit an offer's extracted data and changes are reflected on the public site within 5 seconds.
- Manual web upload creates an offer indistinguishable from a WhatsApp-submitted one.

---

### 3.6 Admin Moderation (P1)

Platform-level oversight for content quality and policy compliance.

**Requirements:**
- Moderation queue shows offers flagged by AI (low confidence or policy violation).
- Admin can approve (publish), edit, or reject any offer.
- Admin can view all offers across all brands, filterable by brand, branch, status, and date.
- Admin can suspend a brand or individual authorized sender.
- Basic analytics: offers created per day, AI extraction accuracy over time.

**Acceptance Criteria:**
- All low-confidence offers appear in the moderation queue before going live (unless auto-publish is enabled).
- Admin can reject an offer with a note, and that note is logged.

---

### 3.7 Authentication & Authorisation (P0 — Partially Done)

**Requirements:**
- Clerk handles all authentication (email/password, Google OAuth).
- German language UI for all Clerk-rendered components.
- Three roles: `admin`, `shop_owner`, `customer`.
- Role stored in Clerk user metadata.
- Middleware protects `/dashboard/*` (any authenticated user) and `/admin/*` (admin role only).
- Shop owners are scoped to their own brand — server-side queries enforce this.

**Status**: Auth and admin role gating are implemented. Shop owner data scoping needs to be implemented.

---

## 4. Technical Architecture

### 4.1 Stack Summary

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router), React 19, Tailwind CSS 4 |
| Auth | Clerk |
| Database | PostgreSQL via Neon (serverless) |
| ORM | Drizzle ORM |
| File Storage | Cloudflare R2 (S3-compatible) |
| AI Processing | OpenAI GPT-4o Vision (or Anthropic Claude 3.5 Sonnet) |
| WhatsApp API | Twilio or Meta Cloud API |
| Deployment | Vercel (recommended) |

### 4.2 Data Model (Current Schema)

```
brands          (id, name, logoUrl, createdAt)
  └── branches  (id, brandId, name, address, lat, lon, openingHours, phone, createdAt)
        ├── authorizedSenders  (id, branchId, phoneNumber, senderName, createdAt)
        └── offers             (id, branchId, imageUrl, originalImageUrl, description, price, isActive, createdAt)
```

**Required schema additions:**
- `offers.productName` — extracted product name
- `offers.productNameDe` — German translation
- `offers.unit` — e.g., "per kg"
- `offers.category` — enum of product categories
- `offers.validUntil` — offer expiry date
- `offers.aiConfidence` — float 0–1
- `offers.moderationStatus` — enum: `pending`, `approved`, `rejected`
- `offers.moderationNote` — text
- `branches.city` — for geo-filtering
- `branches.postalCode`

### 4.3 Key Integration Points

1. **WhatsApp Webhook** (`POST /api/webhook/whatsapp`): Receives incoming messages, validates sender, stores image, enqueues AI job.
2. **AI Processing Worker** (`POST /api/process-offer`): Invokes vision model, writes extracted fields back to DB.
3. **Image Upload** (`POST /api/upload`): Accepts multipart form data, validates, stores to R2, returns public URL.
4. **Offers API** (`GET /api/offers`): Public endpoint for listing offers with filters and pagination.

---

## 5. Non-Functional Requirements

| Requirement | Target |
|---|---|
| Offer publish latency (WhatsApp → live) | < 60 seconds |
| AI extraction accuracy (name + price) | > 85% |
| Page load time (mobile, 4G) | < 2 seconds |
| Image upload size limit | 10 MB |
| Uptime | 99.5% monthly |
| Data residency | EU (GDPR compliance) |
| Language | German primary, Turkish secondary |
| Accessibility | WCAG 2.1 AA |

---

## 6. Out of Scope (v1)

- Native mobile apps (iOS/Android)
- Customer accounts, saved offers, or personalised feeds
- Payment processing or e-commerce checkout
- Loyalty programmes
- Direct messaging between customers and stores
- Multi-language AI extraction beyond German and Turkish
- Advanced analytics or BI dashboards

---

## 7. Phased Roadmap

### Phase 1 — Foundation (Current State → MVP)

**Goal**: A working end-to-end loop: WhatsApp photo → published offer → public browse.

| Feature | Priority | Status |
|---|---|---|
| Auth + role gating | P0 | Done |
| Brand CRUD (admin) | P0 | Done |
| Branch CRUD (admin + shop owner) | P0 | Not started |
| Authorized sender management | P0 | Not started |
| Image upload to R2 | P0 | Not started |
| WhatsApp webhook | P0 | Not started |
| AI offer extraction | P0 | Not started |
| Public offer browse | P0 | Not started |
| Offers schema migration | P0 | Not started |

### Phase 2 — Shop Owner Dashboard

**Goal**: Self-service for shop owners — no admin intervention needed for day-to-day operations.

- Dashboard stats & overview
- Manual web offer upload
- Offer editing & deactivation
- Branch management UI
- Authorized sender management UI

### Phase 3 — Discovery & Growth

**Goal**: Make it valuable for customers to return regularly.

- Geo-location based offer filtering
- Category browse with icons
- Share offer links (Open Graph previews)
- SEO-optimised offer pages
- Admin moderation queue
- Basic analytics for shop owners

### Phase 4 — Scale & Automation

- Automated offer expiry notifications to shop owners
- AI-powered duplicate detection
- Offer performance metrics (views, clicks)
- Multi-language support (Turkish UI)
- API for third-party integrations

---

## 8. Success Metrics

| Metric | 3-Month Target | 6-Month Target |
|---|---|---|
| Onboarded supermarket brands | 5 | 20 |
| Active branches | 10 | 50 |
| Offers published per week | 50 | 500 |
| Monthly unique visitors | 1,000 | 10,000 |
| AI extraction accuracy | 80% | 90% |
| Offer publish latency (p95) | < 120s | < 45s |

---

## 9. Open Questions

1. **WhatsApp API provider**: Twilio vs. Meta Cloud API vs. a lower-cost alternative (e.g., 360dialog)?
2. **AI provider**: OpenAI GPT-4o Vision vs. Anthropic Claude claude-sonnet-4-6 vs. Google Gemini — cost/accuracy trade-off?
3. **Auto-publish vs. moderation-first**: Should offers go live immediately if AI confidence is high, or should all offers be held for admin review initially?
4. **Customer accounts**: Should phase 1 include a "follow this store" feature, or is that strictly v2?
5. **GDPR & WhatsApp numbers**: How are sender phone numbers handled, stored, and deleted on request?
6. **Pricing model**: Free for shop owners in MVP? Freemium (free up to N offers/month)? Subscription per branch?

---

## 10. Appendix: Current Codebase Gaps vs. This PRD

| PRD Feature | Codebase Status | Action Required |
|---|---|---|
| Brand CRUD | Implemented (admin only) | Extend to shop owner scope |
| Branch CRUD | Schema exists, no UI/API | Build UI + server actions |
| Authorized sender management | Schema exists, no UI | Build UI + server actions |
| Image upload | Stub in `/api/upload` | Implement R2 client + upload logic |
| WhatsApp webhook | Not started | New route + Twilio/Meta integration |
| AI extraction | Config placeholder | Implement vision model pipeline |
| Offers API | Returns 501 | Implement GET + POST handlers |
| Public browse page | Not started | New page + offer listing components |
| Offer schema fields | Missing several fields | Drizzle migration |
| Shop owner data scoping | Not implemented | Middleware + query-level enforcement |
| Error pages (404/500) | Missing | Add `not-found.tsx` and `error.tsx` |
| Input validation | Minimal | Add Zod schemas throughout |
| Tests | None | Set up Vitest + React Testing Library |
