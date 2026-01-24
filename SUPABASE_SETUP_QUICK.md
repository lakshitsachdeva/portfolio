# Quick Supabase Setup Guide

## Step 1: Run the SQL

1. Go to your Supabase dashboard
2. Click on **SQL Editor** in the left sidebar
3. Copy and paste the entire contents of `SUPABASE_SQL.sql`
4. Click **Run** (or press Cmd/Ctrl + Enter)

This will:
- Create the `blogs` table
- Set up indexes for performance
- Enable Row Level Security (RLS)
- Create a public read policy
- Add sample blog posts (optional)

## Step 2: Add Your Environment Variables

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

Get these from: **Settings** → **API** in your Supabase dashboard

## Step 3: Restart Your Dev Server

```bash
npm run dev
```

## Step 4: Add Your Own Blog Posts

You can add blog posts either:

### Option A: Through Supabase Dashboard
1. Go to **Table Editor** → **blogs**
2. Click **Insert row**
3. Fill in:
   - `title`: Your blog title
   - `slug`: URL-friendly version (e.g., "my-first-post")
   - `excerpt`: Short description
   - `content`: Full blog content (supports HTML)
   - `author`: Your name
   - `published_at`: When to publish
   - `tags`: Array of tags like `["tag1", "tag2"]`

### Option B: Through SQL

```sql
INSERT INTO blogs (title, slug, excerpt, content, author, published_at, tags) VALUES
(
  'your blog title',
  'your-blog-slug',
  'short description here',
  '<p>Your full HTML content here</p>',
  'lakshit sachdeva',
  NOW(),
  ARRAY['tag1', 'tag2']
);
```

## Troubleshooting

**Can't see blog posts?**
- Check your `.env.local` file has the correct values
- Restart your dev server after adding env variables
- Check browser console for errors

**404 when clicking blog posts?**
- Make sure you created the `[slug]` folder structure: `src/app/blog/[slug]/page.tsx`
- Check that the slug in your database matches the URL

**Permission errors?**
- Make sure RLS policy "Allow public read access" is enabled
- Check the policy in **Authentication** → **Policies** → **blogs**
