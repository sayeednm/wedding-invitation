-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  is_premium boolean default false,
  created_at timestamp with time zone default now()
);

-- Invitations table
create table invitations (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  slug text unique not null,
  template_id text default 'luxury' not null,
  bride_name text,
  groom_name text,
  event_date timestamp with time zone,
  location_name text,
  location_maps_url text,
  music_url text,
  cover_photo_url text,
  couple_photo_url text,
  opening_text text,
  is_published boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Digital gifts table
create table digital_gifts (
  id uuid default uuid_generate_v4() primary key,
  invitation_id uuid references invitations(id) on delete cascade not null,
  bank_name text,
  account_number text,
  account_holder text,
  qris_url text,
  created_at timestamp with time zone default now()
);

-- Guestbook table
create table guestbook (
  id uuid default uuid_generate_v4() primary key,
  invitation_id uuid references invitations(id) on delete cascade not null,
  guest_name text not null,
  message text,
  attendance_status text check (attendance_status in ('hadir', 'tidak_hadir', 'mungkin')) default 'mungkin',
  created_at timestamp with time zone default now()
);

-- Orders table
create table orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  order_id text unique not null,
  amount integer not null,
  status text check (status in ('pending', 'success', 'failed')) default 'pending',
  created_at timestamp with time zone default now()
);

-- RLS Policies
alter table profiles enable row level security;
alter table invitations enable row level security;
alter table digital_gifts enable row level security;
alter table guestbook enable row level security;
alter table orders enable row level security;

-- Profiles policies
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Invitations policies
create policy "Users can CRUD own invitations" on invitations for all using (auth.uid() = user_id);
create policy "Public can view published invitations" on invitations for select using (is_published = true);

-- Digital gifts policies
create policy "Users can CRUD own gifts" on digital_gifts for all
  using (invitation_id in (select id from invitations where user_id = auth.uid()));
create policy "Public can view gifts" on digital_gifts for select
  using (invitation_id in (select id from invitations where is_published = true));

-- Guestbook policies
create policy "Anyone can insert guestbook" on guestbook for insert with check (true);
create policy "Public can view guestbook" on guestbook for select
  using (invitation_id in (select id from invitations where is_published = true));
create policy "Users can view own guestbook" on guestbook for select
  using (invitation_id in (select id from invitations where user_id = auth.uid()));

-- Orders policies
create policy "Users can view own orders" on orders for select using (auth.uid() = user_id);
create policy "Users can insert own orders" on orders for insert with check (auth.uid() = user_id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
