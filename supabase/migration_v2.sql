-- Add new columns to invitations table
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
  add column if not exists dresscode_color text,
  add column if not exists dresscode_note text,
  add column if not exists quran_verse text,
  add column if not exists quran_surah text;
