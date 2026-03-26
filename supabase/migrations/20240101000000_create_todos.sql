create table public.todos (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  is_complete boolean default false not null,
  created_at timestamptz default now() not null
);

alter table public.todos enable row level security;

create policy "Users can view their own todos" on public.todos
  for select using (auth.uid() = user_id);

create policy "Users can insert their own todos" on public.todos
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own todos" on public.todos
  for update using (auth.uid() = user_id);

create policy "Users can delete their own todos" on public.todos
  for delete using (auth.uid() = user_id);
