-- ============================================
-- Supabase Blog Table Setup
-- ============================================
-- Run this in your Supabase SQL Editor
-- ============================================

-- Create the blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT,
  author TEXT NOT NULL DEFAULT 'lakshit sachdeva',
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create an index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);

-- Create an index on published_at for sorting
CREATE INDEX IF NOT EXISTS idx_blogs_published_at ON blogs(published_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow public read access
CREATE POLICY "Allow public read access" ON blogs
  FOR SELECT
  USING (true);

-- Create a function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to automatically update updated_at
CREATE TRIGGER update_blogs_updated_at
  BEFORE UPDATE ON blogs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Sample Data (Optional - remove if you don't want sample data)
-- ============================================

INSERT INTO blogs (title, slug, excerpt, content, author, published_at, tags) VALUES
(
  'building neural networks from scratch',
  'building-neural-networks-from-scratch',
  'a deep dive into implementing neural networks using only numpy, understanding the mathematics behind backpropagation and gradient descent.',
  '# Building Neural Networks from Scratch

This is where your full blog content goes. You can use markdown here!

## Introduction

Neural networks are fascinating...

## The Math

Backpropagation is...

## Conclusion

In summary...',
  'lakshit sachdeva',
  '2024-01-15T10:00:00Z',
  ARRAY['machine learning', 'python', 'neural networks']
),
(
  'understanding transformers',
  'understanding-transformers',
  'exploring the architecture behind modern language models and how attention mechanisms work.',
  '# Understanding Transformers

Full content here...',
  'lakshit sachdeva',
  '2024-02-20T10:00:00Z',
  ARRAY['deep learning', 'nlp', 'transformers']
);

-- ============================================
-- Verify the setup
-- ============================================

-- Check if table was created
SELECT * FROM blogs ORDER BY published_at DESC;
