-- Tabel daftar tamu (persistent guest list)
create table if not exists guests (
  id uuid default uuid_generate_v4() primary key,
  invitation_id uuid references invitations(id) on delete cascade not null,
  name text not null,
  created_at timestamp with time zone default now()
);

alter table guests enable row level security;
create policy "Users can CRUD own guests" on guests for all
  using (invitation_id in (select id from invitations where user_id = auth.uid()));

-- Kolom tambahan di invitations yang ada di types tapi belum di schema
alter table invitations
  add column if not exists groom_full_name text,
  add column if not exists groom_father text,
  add column if not exists groom_mother text,
  add column if not exists groom_instagram text,
  add column if not exists bride_full_name text,
  add column if not exists bride_father text,
  add column if not exists bride_mother text,
  add column if not exists bride_instagram text,
  add column if not exists akad_date timestamp with time zone,
  add column if not exists akad_location text,
  add column if not exists akad_maps_url text,
  add column if not exists groom_photo_url text,
  add column if not exists bride_photo_url text,
  add column if not exists photo_frame text default 'circle',
  add column if not exists dresscode_enabled boolean default false,
  add column if not exists photo_mode text default 'single',
  add column if not exists dresscode_color text,
  add column if not exists dresscode_note text,
  add column if not exists quran_verse text,
  add column if not exists quran_surah text;

-- Tabel couple_photos
create table if not exists couple_photos (
  id uuid default uuid_generate_v4() primary key,
  invitation_id uuid references invitations(id) on delete cascade not null,
  photo_url text not null,
  person text check (person in ('groom', 'bride', 'couple')) default 'couple',
  sort_order integer default 0,
  created_at timestamp with time zone default now()
);

alter table couple_photos enable row level security;
create policy "Users can CRUD own couple_photos" on couple_photos for all
  using (invitation_id in (select id from invitations where user_id = auth.uid()));
create policy "Public can view couple_photos" on couple_photos for select
  using (invitation_id in (select id from invitations where is_published = true));
