@AGENTS.md

# Undangan Digital — Project Guide

## Stack
- **Framework**: Next.js 16 (App Router)
- **Database**: Supabase (PostgreSQL + Auth + Storage)
- **Styling**: Tailwind CSS v4 + custom CSS variables
- **Animations**: Framer Motion
- **Payment**: Midtrans Snap
- **Email**: Resend

## Commands
```bash
npm run dev      # dev server
npm run build    # production build
npm run lint     # eslint
```

## Project Structure
```
app/
  page.tsx                    # Landing page
  v/[slug]/page.tsx           # Public invitation view
  dashboard/                  # Authenticated area
    page.tsx                  # Dashboard home
    editor/[id]/page.tsx      # Invitation editor
    guests/[id]/page.tsx      # Guest list management
    rsvp/[id]/page.tsx        # RSVP responses
    archived/page.tsx         # Archived invitations
    profile/page.tsx          # User profile & settings
  api/
    guestbook/route.ts        # Rate-limited guestbook submit
    payment/create/route.ts   # Midtrans payment init
    webhooks/midtrans/        # Payment webhook
    notify-rsvp/route.ts      # RSVP email notification (DB webhook)
    rsvp-reminder/route.ts    # Manual RSVP recap email
    account/delete/route.ts   # Delete account
    admin/stats/route.ts      # Platform stats (ADMIN_SECRET protected)
    stats/route.ts            # Public stats for landing page

components/
  templates/          # 8 invitation themes (Luxury, Floral, Midnight, Royal, Rustic, Celestial, Bali, Ivory)
  invitation/         # Reusable invitation sections
  editor/             # Editor form components
  dashboard/          # Dashboard UI components

lib/
  types.ts            # TypeScript interfaces
  utils.ts            # Helpers (cn, generateSlug, formatDate)
  imageCompress.ts    # Client-side image compression via Canvas
  rateLimit.ts        # In-memory rate limiter
  demoData.ts         # Demo invitation data for /demo/[theme]
  presetMusic.ts      # 9 preset music tracks
```

## Database Migrations
Run in order in Supabase SQL editor:
1. `supabase/schema.sql` — base schema
2. `supabase/migration_v4.sql` — gallery, video, love_story
3. `supabase/migration_v5.sql` — guests table, couple_photos, extra invitation columns
4. `supabase/migration_v6.sql` — cover_type, silhouette_variant
5. `supabase/migration_v7.sql` — is_archived, indexes, updated_at on profiles

## Key Env Vars
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
MIDTRANS_SERVER_KEY
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY
NEXT_PUBLIC_MIDTRANS_SNAP_URL
MIDTRANS_IS_PRODUCTION        # 'true' for production, 'false' for sandbox
NEXT_PUBLIC_APP_URL
RESEND_API_KEY
WEBHOOK_SECRET                # For Supabase DB webhook → /api/notify-rsvp
ADMIN_SECRET                  # For /api/admin/stats
STATS_BASE_INVITATIONS        # Social proof base number
STATS_BASE_GUESTS
```

## Image Upload
All photo uploads go through `lib/imageCompress.ts` before uploading to Supabase Storage.
- Cover/couple photos: max 1920×1920, quality 0.85
- Gallery photos: max 1600×1600, quality 0.82
- Couple slideshow photos: max 1200×1200, quality 0.85

## Slug Validation
Slugs are validated client-side in EditorForm:
- Only lowercase letters, numbers, hyphens
- Min 3 characters
- Real-time availability check (debounced 600ms) against DB

## Rate Limiting
In-memory rate limiter (`lib/rateLimit.ts`):
- Payment: 5 req/min per IP
- Guestbook: 5 submissions/10min per IP

## Midtrans
- Set `MIDTRANS_IS_PRODUCTION=true` when going live
- Webhook URL: `{APP_URL}/api/webhooks/midtrans`
- Webhook verifies SHA512 signature before processing

## Supabase DB Webhook (RSVP Notifications)
Set up in Supabase Dashboard → Database → Webhooks:
- Table: `guestbook`, Event: `INSERT`
- URL: `{APP_URL}/api/notify-rsvp`
- Header: `x-webhook-secret: {WEBHOOK_SECRET}`
