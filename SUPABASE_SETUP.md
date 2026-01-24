# Supabase Setup Guide

This guide will help you set up your own Supabase database to replace the Orchids setup.

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - **Project Name**: `portfolio-lakshit` (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to you
5. Click "Create new project"
6. Wait 2-3 minutes for the project to be ready

## Step 2: Get Your API Keys

1. In your Supabase dashboard, go to **Settings** → **API**
2. You'll see:
   - **Project URL**: Copy this (looks like `https://xxxxx.supabase.co`)
   - **anon/public key**: Copy this (starts with `eyJ...`)

## Step 3: Create Environment Variables

1. Create a `.env.local` file in your project root (if it doesn't exist)
2. Add these variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

Replace `your_project_url_here` and `your_anon_key_here` with the values from Step 2.

## Step 4: Create the Blogs Table

1. In Supabase dashboard, go to **Table Editor**
2. Click "New Table"
3. Name it: `blogs`
4. Add these columns:

| Column Name | Type | Default Value | Nullable | Primary Key |
|------------|------|---------------|----------|-------------|
| `id` | `uuid` | `gen_random_uuid()` | ❌ | ✅ |
| `title` | `text` | - | ❌ | ❌ |
| `slug` | `text` | - | ❌ | ❌ |
| `excerpt` | `text` | - | ❌ | ❌ |
| `content` | `text` | - | ✅ | ❌ |
| `author` | `text` | - | ❌ | ❌ |
| `published_at` | `timestamptz` | `now()` | ❌ | ❌ |
| `tags` | `text[]` | `{}` | ✅ | ❌ |
| `created_at` | `timestamptz` | `now()` | ❌ | ❌ |
| `updated_at` | `timestamptz` | `now()` | ❌ | ❌ |

5. Click "Save"

## Step 5: Set Up Row Level Security (RLS)

1. In the `blogs` table, go to **Policies** tab
2. Click "New Policy"
3. Select "For full customization"
4. Name: `Allow public read access`
5. Policy definition:
   ```sql
   SELECT
   ```
6. Target roles: `public`
7. With check expression: Leave empty
8. Click "Review" then "Save policy"

This allows anyone to read blog posts (but not modify them).

## Step 6: Add Sample Data (Optional)

1. In Table Editor, click on your `blogs` table
2. Click "Insert row"
3. Fill in sample data:

```json
{
  "title": "Building Neural Networks from Scratch",
  "slug": "building-neural-networks-from-scratch",
  "excerpt": "A deep dive into implementing neural networks using only NumPy, understanding the mathematics behind backpropagation.",
  "content": "Full blog content goes here...",
  "author": "Lakshit Sachdeva",
  "published_at": "2024-01-15T10:00:00Z",
  "tags": ["Machine Learning", "Python", "Neural Networks"]
}
```

4. Click "Save"

## Step 7: Test Your Setup

1. Restart your dev server:
   ```bash
   npm run dev
   ```

2. Navigate to `/blog` in your browser
3. You should see your blog posts!

## Step 8: Enable Real-time (Optional)

If you want real-time updates:

1. Go to **Database** → **Replication**
2. Find the `blogs` table
3. Toggle it ON

## Troubleshooting

### "Invalid API key" error
- Double-check your `.env.local` file
- Make sure you copied the **anon/public** key, not the service_role key
- Restart your dev server after changing `.env.local`

### "relation 'blogs' does not exist"
- Make sure you created the table in the correct project
- Check that the table name is exactly `blogs` (lowercase)

### No data showing
- Check that RLS policies allow SELECT operations
- Verify your data in the Supabase Table Editor
- Check browser console for errors

## Next Steps

- Add authentication if you want to allow blog editing from the UI
- Set up image storage in Supabase Storage for blog images
- Add more tables (e.g., `authors`, `categories`, `comments`)

## Useful SQL Commands

You can run these in **SQL Editor**:

```sql
-- View all blogs
SELECT * FROM blogs ORDER BY published_at DESC;

-- Add a new blog
INSERT INTO blogs (title, slug, excerpt, author, published_at, tags)
VALUES (
  'Your Title',
  'your-slug',
  'Your excerpt...',
  'Your Name',
  NOW(),
  ARRAY['Tag1', 'Tag2']
);

-- Update a blog
UPDATE blogs 
SET title = 'New Title', updated_at = NOW()
WHERE id = 'your-blog-id';

-- Delete a blog
DELETE FROM blogs WHERE id = 'your-blog-id';
```
