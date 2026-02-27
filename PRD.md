# Product Requirements Document: Bereket Market

**Version**: 1.1
**Date**: 2026-02-27
**Status**: Draft

---

## 1. Product Overview

### 1.1 Vision

Bereket Market is a web platform that enables Turkish and Middle Eastern supermarkets to digitally advertise their latest product offers. Shop owners publish offers through a web dashboard; customers can browse current deals by store or location without needing an account.

### 1.2 Problem Statement

Turkish supermarkets in German-speaking markets (and similar diaspora communities) currently rely on paper flyers and word-of-mouth to communicate weekly deals. This is:

- **Fragmented**: No single place for customers to discover deals across multiple stores.
- **Labour-intensive**: Store owners manually create and distribute flyers.
- **Ephemeral**: Printed offers have no searchable, persistent archive.
- **Unscalable**: Each new branch requires its own separate distribution effort.

### 1.3 Solution

A two-sided platform:
- **For supermarkets**: A dashboard to publish and manage offers — upload a photo, fill in the details, and it goes live immediately.
- **For customers**: A browsable, searchable catalogue of current offers across multiple supermarket chains and branches.

### 1.4 Target Markets

- **Primary**: Turkish-run supermarkets operating in German-speaking regions (Germany, Austria, Switzerland).
- **Secondary**: Any Middle Eastern or ethnic grocery supermarket seeking a digital offer channel.

---

## 2. Users & Roles

| Role | Description | Key Permissions |
|---|---|---|
| **Admin** | Platform operator (Bereket team) | Full access; manages brands, branches, users, moderation |
| **Shop Owner** | Supermarket chain owner/manager | Manages their brand, branches, and publishes offers via dashboard |
| **Customer** | End-user browsing offers | Browses and searches offers (no login required) |

---

## 3. Core Features

### 3.1 Web-Based Offer Publishing (P0)

Shop owners publish offers directly through the dashboard. No third-party messaging integration is required.

**Requirements:**
- Shop owner uploads an image (JPEG/PNG/WebP, max 10 MB) via a web form.
- Required fields: product name, price, unit (per kg / per piece / per litre / other).
- Optional fields: product category, offer valid-until date, free-text description.
- Image is stored in Cloudflare R2 and served via CDN.
- Offer goes live immediately upon submission (or after admin approval if moderation is enabled).
- Shop owner can edit or deactivate any of their offers after publishing.

**Acceptance Criteria:**
- Upload → offer visible on public browse page within 10 seconds.
- Images are served reliably from CDN with no broken links.
- Form validates required fields before submission.

---

### 3.2 AI Offer Processing (P1)

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
- Manage branch staff accounts (invite/remove users who can post offers).

**Acceptance Criteria:**
- Brand CRUD works end-to-end and persists to the database.
- Branch CRUD works end-to-end.
- A shop owner cannot see or modify another brand's data.

---

### 3.5 Dashboard & Offer Management (P1)

Shop owners and authorised staff can review and manage offers through the web dashboard.

**Requirements:**
- Dashboard home shows summary stats: total active offers, offers this week, number of branches.
- Offer list view with status (active, expired, pending review, rejected).
- Ability to edit offer details (name, price, category, description) after publishing.
- Ability to deactivate or delete an offer.
- Upload an image and create a new offer directly from the dashboard.
- Filter offers by branch and date range.

**Acceptance Criteria:**
- Shop owner can edit an offer and changes are reflected on the public site within 5 seconds.
- Offer upload and creation flow works end-to-end without errors.

---

### 3.6 Admin Moderation (P1)

Platform-level oversight for content quality and policy compliance.

**Requirements:**
- Moderation queue shows offers flagged by AI (low confidence or policy violation).
- Admin can approve (publish), edit, or reject any offer.
- Admin can view all offers across all brands, filterable by brand, branch, status, and date.
- Admin can suspend a brand or individual shop owner account.
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
| AI Processing (P1) | OpenAI GPT-4o Vision or Anthropic Claude claude-sonnet-4-6 |
| Deployment | Vercel (recommended) |

### 4.2 Data Model (Current Schema)

```
brands          (id, name, logoUrl, createdAt)
  └── branches  (id, brandId, name, address, lat, lon, openingHours, phone, createdAt)
        └── offers  (id, branchId, imageUrl, description, price, isActive, createdAt)
```

> Note: The `authorizedSenders` table (for WhatsApp) exists in the current schema but is no longer needed for the web-only publishing model. It should be removed in the next migration.

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

1. **Image Upload** (`POST /api/upload`): Accepts multipart form data from the dashboard, validates, stores to R2, returns public URL.
2. **Offers API** (`GET /api/offers`): Public endpoint for listing offers with filters and pagination.
3. **AI Processing Worker** (`POST /api/process-offer`, P1): Optional — invokes vision model to auto-fill product fields from an uploaded image.

---

## 5. Non-Functional Requirements

| Requirement | Target |
|---|---|
| Offer publish latency (upload → live) | < 10 seconds |
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

**Goal**: A working end-to-end loop: shop owner uploads offer via dashboard → offer appears on the public browse page.

| Feature | Priority | Status |
|---|---|---|
| Auth + role gating | P0 | Done |
| Brand CRUD (admin) | P0 | Done |
| Branch CRUD (admin + shop owner) | P0 | Not started |
| Image upload to R2 | P0 | Not started |
| Offer creation form (dashboard) | P0 | Not started |
| Offers API (GET + POST) | P0 | Not started |
| Public offer browse page | P0 | Not started |
| Offers schema migration | P0 | Not started |
| Remove `authorizedSenders` table | P0 | Not started |

### Phase 2 — Shop Owner Dashboard

**Goal**: Self-service for shop owners — no admin intervention needed for day-to-day operations.

- Dashboard stats & overview
- Offer editing & deactivation
- Branch management UI
- Shop owner data scoping (enforce brand isolation)

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
| Offer publish latency (p95) | < 15s | < 10s |

---

## 9. Open Questions

1. **AI provider** (Phase 2): OpenAI GPT-4o Vision vs. Anthropic Claude claude-sonnet-4-6 vs. Google Gemini — cost/accuracy trade-off for auto-filling offer fields from images?
2. **Auto-publish vs. moderation-first**: Should offers go live immediately, or should all offers be held for admin review initially?
3. **Customer accounts**: Should phase 1 include a "follow this store" feature, or is that strictly v2?
4. **Pricing model**: Free for shop owners in MVP? Freemium (free up to N offers/month)? Subscription per branch?
5. **Offer ingestion beyond web**: Is any future messaging-based ingestion channel (Telegram bot, email) planned, or is the web dashboard the only interface long-term?

---

## 10. Appendix: Current Codebase Gaps vs. This PRD

| PRD Feature | Codebase Status | Action Required |
|---|---|---|
| Brand CRUD | Implemented (admin only) | Extend to shop owner scope |
| Branch CRUD | Schema exists, no UI/API | Build UI + server actions |
| `authorizedSenders` table | In schema, no longer needed | Remove in next Drizzle migration |
| Image upload | Stub in `/api/upload` | Implement R2 client + upload logic |
| Offer creation form (dashboard) | Not started | Build form + wire to upload + DB |
| AI extraction (optional, P1) | Config placeholder | Implement vision model pipeline |
| Offers API | Returns 501 | Implement GET + POST handlers |
| Public browse page | Not started | New page + offer listing components |
| Offer schema fields | Missing several fields | Drizzle migration |
| Shop owner data scoping | Not implemented | Middleware + query-level enforcement |
| Error pages (404/500) | Missing | Add `not-found.tsx` and `error.tsx` |
| Input validation | Minimal | Add Zod schemas throughout |
| Tests | None | Set up Vitest + React Testing Library |
