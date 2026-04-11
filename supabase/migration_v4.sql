-- Galeri foto
create table if not exists gallery (
  id uuid default uuid_generate_v4() primary key,
  invitation_id uuid references invitations(id) on delete cascade not null,
  photo_url text not null,
  caption text,
  sort_order integer default 0,
  created_at timestamp with time zone default now()
);

alter table gallery enable row level security;
create policy "Users can CRUD own gallery" on gallery for all
  using (invitation_id in (select id from invitations where user_id = auth.uid()));
create policy "Public can view gallery" on gallery for select
  using (invitation_id in (select id from invitations where is_published = true));

-- Kolom baru di invitations
alter table invitations
  add column if not exists video_url text,
  add column if not exists love_story text,
  add column if not exists live_streaming_url text;
