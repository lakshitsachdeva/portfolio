#!/bin/bash

# Script to set up a fresh git repo and prepare for deployment

echo "🚀 Setting up fresh repository..."

# Remove existing git if any
if [ -d ".git" ]; then
    echo "⚠️  Existing .git folder found. Removing it..."
    rm -rf .git
fi

# Initialize fresh git repo
echo "📦 Initializing fresh git repository..."
git init
git branch -M main

# Add all files
echo "📝 Adding files..."
git add .

# Create initial commit
echo "💾 Creating initial commit..."
git commit -m "Initial commit: portfolio website"

echo ""
echo "✅ Repository initialized!"
echo ""
echo "📋 Next steps:"
echo "1. Create a new GitHub repository (don't initialize with README)"
echo "2. Run these commands:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git"
echo "   git push -u origin main"
echo ""
echo "3. Then follow DEPLOYMENT_GUIDE.md to deploy on Vercel"
echo ""
