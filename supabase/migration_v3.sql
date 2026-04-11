alter table invitations
  add column if not exists cover_type text default 'gradient' check (cover_type in ('gradient', 'photo', 'silhouette')),
  add column if not exists silhouette_variant text default 'standing' check (silhouette_variant in ('standing', 'holding', 'romantic'));
