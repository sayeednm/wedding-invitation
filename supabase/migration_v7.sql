-- Rate limiting: tambah index untuk performa query guestbook per invitation
create index if not exists idx_guestbook_invitation_id on guestbook(invitation_id);
create index if not exists idx_guestbook_created_at on guestbook(created_at desc);
create index if not exists idx_guests_invitation_id on guests(invitation_id);

-- Tambah kolom updated_at di profiles
alter table profiles
  add column if not exists updated_at timestamp with time zone default now();

-- Policy: batasi insert guestbook — max 10 entri per nama per undangan (anti spam)
-- Ini dilakukan di application level (API route), bukan DB level
-- Tapi kita tambah constraint unik yang soft: tidak ada duplikat nama+invitation dalam 1 menit
-- (handled by rate limiter di /api/guestbook)

-- Tambah index untuk orders
create index if not exists idx_orders_user_id on orders(user_id);
create index if not exists idx_orders_order_id on orders(order_id);

-- Tambah kolom is_active di invitations untuk soft delete / archiving
alter table invitations
  add column if not exists is_archived boolean default false;

-- Index untuk sitemap query
create index if not exists idx_invitations_published_archived on invitations(is_published, is_archived) where is_published = true and is_archived = false;
