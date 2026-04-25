-- Tambah kolom kado/gift address di invitations
alter table invitations
  add column if not exists gift_recipient_name text,
  add column if not exists gift_recipient_phone text,
  add column if not exists gift_address text;
