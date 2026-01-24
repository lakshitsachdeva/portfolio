# Fresh Deployment Guide

## 🆕 Setting Up Fresh Repository

Your old repo has been disconnected. Follow these steps:

### Step 1: Create New GitHub Repo

1. Go to [github.com/new](https://github.com/new)
2. **Repository name**: `portfolio` (or whatever you want)
3. **Description**: "Personal portfolio website"
4. **Visibility**: Public or Private (your choice)
5. **DO NOT** check "Initialize with README" ❌
6. Click **"Create repository"**

### Step 2: Initialize Fresh Git

Run these commands:

```bash
# Initialize git
git init
git branch -M main

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: portfolio website"

# Add your new GitHub repo as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to new repo
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repo name.

---

## 🚀 Deployment Options

### Option 1: Netlify (Recommended - FREE, Easy)

**Why Netlify?**
- ✅ Free hosting
- ✅ Easy setup
- ✅ Automatic deployments from GitHub
- ✅ Free SSL
- ✅ Custom domains

**Steps:**

1. **Push to GitHub** (follow Step 2 above)

2. **Go to Netlify:**
   - Visit [netlify.com](https://www.netlify.com)
   - Sign up/login with GitHub

3. **Import Project:**
   - Click **"Add new site"** → **"Import an existing project"**
   - Select your GitHub repo
   - Click **"Deploy site"**

4. **Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - **Click "Show advanced"** and add:
     - Node version: `20` (or latest LTS)

5. **Environment Variables:**
   - Go to **Site settings** → **Environment variables**
   - Add:
     - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase key

6. **Redeploy:**
   - Go to **Deploys** tab
   - Click **"Trigger deploy"** → **"Clear cache and deploy site"**

7. **Done!** Your site is live at `your-site-name.netlify.app`

---

### Option 2: Railway (FREE tier available)

**Why Railway?**
- ✅ Free tier (500 hours/month)
- ✅ Easy deployment
- ✅ Automatic deployments

**Steps:**

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click **"New Project"** → **"Deploy from GitHub repo"**
4. Select your repo
5. Add environment variables (same as above)
6. Railway auto-detects Next.js and deploys
7. Done!

---

### Option 3: Render (FREE tier)

**Why Render?**
- ✅ Free tier available
- ✅ Automatic deployments

**Steps:**

1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click **"New +"** → **"Web Service"**
4. Connect your GitHub repo
5. Settings:
   - Build Command: `npm install --legacy-peer-deps && npm run build`
   - Start Command: `npm start`
6. Add environment variables
7. Deploy!

---

### Option 4: Cloudflare Pages (FREE, Fast CDN)

**Why Cloudflare Pages?**
- ✅ Free
- ✅ Fast global CDN
- ✅ Automatic deployments

**Steps:**

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Sign up/login
3. Click **"Create a project"** → **"Connect to Git"**
4. Select your GitHub repo
5. Build settings:
   - Framework preset: `Next.js`
   - Build command: `npm run build`
   - Build output directory: `.next`
6. Add environment variables
7. Deploy!

---

## 🌐 Connect Custom Domain

### For Netlify:

1. In Netlify dashboard → **Domain settings**
2. Click **"Add custom domain"**
3. Enter your domain
4. Follow DNS instructions (add A/CNAME records)
5. Wait 24-48 hours for DNS propagation

### For Railway/Render/Cloudflare:

Similar process - go to domain settings in each platform.

---

## 📋 Pre-Deployment Checklist

- [ ] New GitHub repo created (not connected to Orchids)
- [ ] Code pushed to new repo
- [ ] Environment variables ready
- [ ] Supabase set up and working
- [ ] Tested locally: `npm run build` works

---

## 🆘 Troubleshooting

**Build fails?**
- Check Node version (use 18+)
- Make sure all dependencies are in `package.json`
- Check build logs in deployment platform

**Environment variables not working?**
- Make sure they start with `NEXT_PUBLIC_`
- Redeploy after adding variables
- Check spelling

**Site not loading?**
- Check build logs
- Verify environment variables
- Make sure Supabase RLS policies allow public read

---

## 💡 Recommendation

**Use Netlify** - it's the easiest and most reliable for Next.js portfolios.

**Quick Netlify Deploy:**
1. Push to GitHub
2. Connect to Netlify
3. Add env variables
4. Deploy
5. Done in 5 minutes! 🚀
