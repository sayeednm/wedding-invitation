-- Kolom cover_type dan silhouette_variant yang ada di types.ts tapi belum di schema
alter table invitations
  add column if not exists cover_type text check (cover_type in ('gradient', 'photo', 'pattern')) default 'gradient',
  add column if not exists silhouette_variant text check (silhouette_variant in ('standing', 'holding', 'romantic')) default 'standing';
