# Deployment Guide

## 🚀 Quick Deploy to Vercel (Recommended - FREE)

Vercel is the best option for Next.js apps. It's free and super easy.

### Step 1: Prepare Your Code

1. Make sure `.env.local` is in `.gitignore` (already done)
2. Commit your code:
   ```bash
   git add .
   git commit -m "portfolio ready for deployment"
   ```

### Step 2: Push to GitHub

1. Create a new GitHub repo (don't initialize with README)
2. Push your code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

### Step 3: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up/login with GitHub
3. Click **"Add New Project"**
4. Import your GitHub repo
5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
6. Click **"Deploy"**
7. Wait 2-3 minutes - done! 🎉

Your site will be live at: `your-project-name.vercel.app`

---

## 🌐 Getting a Cheap Domain

### Option 1: Namecheap (Recommended)
- **Price**: ~$8-12/year for .com
- **Link**: [namecheap.com](https://www.namecheap.com)
- **Why**: Cheap, reliable, easy to use

### Option 2: Cloudflare Registrar
- **Price**: At-cost pricing (usually cheapest)
- **Link**: [cloudflare.com/products/registrar](https://www.cloudflare.com/products/registrar)
- **Why**: No markup, just pay what they pay

### Option 3: Google Domains (now Squarespace)
- **Price**: ~$12/year
- **Link**: [domains.google](https://domains.google)
- **Why**: Simple interface

### Option 4: Freenom (Free domains)
- **Price**: FREE for .tk, .ml, .ga, .cf
- **Link**: [freenom.com](https://www.freenom.com)
- **Why**: Free, but less professional

---

## 🔗 Connect Domain to Vercel

1. In Vercel dashboard, go to your project
2. Click **Settings** → **Domains**
3. Add your domain (e.g., `lakshitsachdeva.com`)
4. Vercel will show you DNS records to add:
   - Go to your domain registrar
   - Add the A record or CNAME record Vercel provides
5. Wait 24-48 hours for DNS to propagate
6. Done! Your site is live on your domain 🎉

---

## 📝 Alternative: Deploy to Netlify (Also FREE)

1. Go to [netlify.com](https://www.netlify.com)
2. Sign up with GitHub
3. Click **"Add new site"** → **"Import an existing project"**
4. Connect your GitHub repo
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Add environment variables (same as Vercel)
7. Deploy!

---

## 💰 Cost Breakdown

- **Hosting**: FREE (Vercel/Netlify)
- **Domain**: $8-12/year (.com) or FREE (.tk, .ml, etc.)
- **Supabase**: FREE tier (up to 500MB database, 2GB bandwidth)

**Total**: ~$10/year or FREE if you use free domain

---

## 🛠️ Troubleshooting

**Build fails?**
- Check that all dependencies are in `package.json`
- Make sure environment variables are set in Vercel
- Check build logs in Vercel dashboard

**Domain not working?**
- Wait 24-48 hours for DNS propagation
- Check DNS records are correct
- Use [whatsmydns.net](https://www.whatsmydns.net) to check

**Environment variables not working?**
- Make sure they start with `NEXT_PUBLIC_` for client-side access
- Restart deployment after adding variables
- Check they're spelled correctly

---

## ✅ Pre-Deployment Checklist

- [ ] `.env.local` is in `.gitignore`
- [ ] All code is committed
- [ ] Supabase is set up and working
- [ ] Test locally: `npm run build` works
- [ ] Environment variables are ready to add to Vercel

---

## 🎯 Quick Commands

```bash
# Build locally to test
npm run build

# Start production server locally
npm start

# Check for errors
npm run lint
```
