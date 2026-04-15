-- Tambah kolom photo_decoration di invitations
alter table invitations
  add column if not exists photo_decoration boolean default true;
