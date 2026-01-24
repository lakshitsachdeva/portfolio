#!/bin/bash

# Quick script to set up fresh repo and prepare for deployment

echo "🚀 Setting up fresh repository for deployment..."
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
    git branch -M main
    git add .
    git commit -m "Initial commit: portfolio website"
    echo "✅ Git initialized and committed"
else
    echo "✅ Git already initialized"
fi

echo ""
echo "📋 Next steps:"
echo ""
echo "1. Create a NEW GitHub repository:"
echo "   - Go to: https://github.com/new"
echo "   - Name it: portfolio (or whatever you want)"
echo "   - DO NOT initialize with README"
echo "   - Click 'Create repository'"
echo ""
echo "2. Connect and push:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git"
echo "   git push -u origin main"
echo ""
echo "3. Deploy to Netlify (recommended):"
echo "   - Go to: https://www.netlify.com"
echo "   - Sign up with GitHub"
echo "   - Import your new repo"
echo "   - Add environment variables:"
echo "     * NEXT_PUBLIC_SUPABASE_URL"
echo "     * NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo "   - Deploy!"
echo ""
echo "📖 See FRESH_DEPLOY.md for detailed instructions"
echo ""
