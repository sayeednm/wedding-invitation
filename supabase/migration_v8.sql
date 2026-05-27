-- Migration v8: Explicit GRANT untuk semua tabel
-- Diperlukan mulai 30 Mei 2026 — Supabase tidak lagi auto-expose tabel baru ke Data API
-- Ref: https://supabase.com/changelog

-- GRANT untuk role 'anon' (pengguna tidak login / public)
grant usage on schema public to anon;
grant select on table public.invitations to anon;
grant select on table public.guestbook to anon;
grant insert on table public.guestbook to anon;
grant select on table public.digital_gifts to anon;
grant select on table public.gallery to anon;
grant select on table public.couple_photos to anon;
-- anon TIDAK perlu akses ke: profiles, orders, guests (data sensitif)

-- GRANT untuk role 'authenticated' (pengguna sudah login)
grant usage on schema public to authenticated;
grant select, insert, update, delete on table public.profiles to authenticated;
grant select, insert, update, delete on table public.invitations to authenticated;
grant select, insert, update, delete on table public.digital_gifts to authenticated;
grant select, insert, update, delete on table public.guestbook to authenticated;
grant select, insert, update, delete on table public.orders to authenticated;
grant select, insert, update, delete on table public.gallery to authenticated;
grant select, insert, update, delete on table public.guests to authenticated;
grant select, insert, update, delete on table public.couple_photos to authenticated;

-- GRANT untuk service_role (dipakai webhook Midtrans & server-side)
grant usage on schema public to service_role;
grant all on table public.profiles to service_role;
grant all on table public.invitations to service_role;
grant all on table public.digital_gifts to service_role;
grant all on table public.guestbook to service_role;
grant all on table public.orders to service_role;
grant all on table public.gallery to service_role;
grant all on table public.guests to service_role;
grant all on table public.couple_photos to service_role;

-- GRANT sequence (untuk uuid_generate_v4 dan auto-increment)
grant usage on all sequences in schema public to anon;
grant usage on all sequences in schema public to authenticated;
