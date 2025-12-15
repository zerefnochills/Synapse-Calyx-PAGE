# 🚀 Vercel Deployment Guide - Maintenance Mode Setup

## Quick Fix for Maintenance Mode

### The Problem
You set `MAINTENANCE_MODE=true` in Vercel but the maintenance page isn't showing.

### The Solution

**Step 1: Push the Latest Changes**
```bash
git add .
git commit -m "Add Vercel serverless configuration"
git push origin main
```

**Step 2: Set Environment Variables in Vercel**

Go to your Vercel project → **Settings** → **Environment Variables** and add:

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `MAINTENANCE_MODE` | `true` or `false` | Production, Preview, Development |
| `MONGO_URI` | Your MongoDB Atlas connection string | Production, Preview, Development |
| `NODE_ENV` | `production` | Production |
| `VITE_API_URL` | `/api` | Production, Preview, Development |

**Step 3: Redeploy**

After setting environment variables:
1. Go to **Deployments** tab
2. Click **⋯** (three dots) on the latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

**Step 4: Test**

Visit your Vercel URL. If `MAINTENANCE_MODE=true`, you should see the maintenance page!

---

## How to Toggle Maintenance Mode

### Enable Maintenance (Show Maintenance Page)
1. Vercel Dashboard → Settings → Environment Variables
2. Change `MAINTENANCE_MODE` to `true`
3. Redeploy (Deployments → ⋯ → Redeploy)

### Disable Maintenance (Show Normal Site)
1. Vercel Dashboard → Settings → Environment Variables
2. Change `MAINTENANCE_MODE` to `false`
3. Redeploy (Deployments → ⋯ → Redeploy)

---

## Complete Setup Guide

### 1. MongoDB Atlas Setup (Required)

Your app needs a database. Set up MongoDB Atlas:

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a **FREE** cluster
3. Create a database user:
   - Database Access → Add New Database User
   - Username: `synapse_admin`
   - Password: (generate a strong password)
   - Role: `Atlas Admin`
4. Whitelist all IPs:
   - Network Access → Add IP Address
   - Enter: `0.0.0.0/0` (allows Vercel to connect)
   - Click Confirm
5. Get connection string:
   - Clusters → Connect → Connect your application
   - Copy the connection string
   - Replace `<password>` with your actual password
   - Replace `<dbname>` with `synapse_calyx`

Example:
```
mongodb+srv://synapse_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/synapse_calyx?retryWrites=true&w=majority
```

### 2. Deploy to Vercel

#### Option A: Via Vercel Dashboard (Recommended)

1. Go to https://vercel.com/dashboard
2. Click **"Add New Project"**
3. Import your GitHub repository: `zerefnochills/Synapse-Calyx-PAGE`
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `./`
   - **Build Command**: Leave default or use `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: Leave default
5. Click **"Deploy"**

#### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### 3. Configure All Environment Variables

In Vercel Dashboard → Your Project → Settings → Environment Variables:

```env
# Backend Variables
MAINTENANCE_MODE=false
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/synapse_calyx
NODE_ENV=production

# Frontend Variables
VITE_API_URL=/api
VITE_OPENAI_API_KEY=your-openai-key-if-using-ai
```

**Important**: Set these for **all three environments** (Production, Preview, Development)

### 4. Redeploy After Setting Variables

After adding environment variables, you MUST redeploy:
- Deployments → ⋯ → Redeploy

---

## Troubleshooting

### ❌ Maintenance page not showing

**Check:**
1. Is `MAINTENANCE_MODE=true` set in environment variables?
2. Did you redeploy after setting the variable?
3. Check Function Logs: Deployments → [Your Deployment] → Functions → Check for errors

**Fix:**
```bash
# Verify the environment variable is set
vercel env ls

# If not set, add it
vercel env add MAINTENANCE_MODE production
# Enter: true

# Redeploy
vercel --prod
```

### ❌ API calls failing (Network errors)

**Check:**
1. Is `VITE_API_URL=/api` set correctly?
2. Check Function Logs for backend errors
3. Verify MongoDB connection string is correct

**Fix:**
- Make sure `MONGO_URI` is set with correct password
- Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Check Vercel Function Logs for specific errors

### ❌ Database connection errors

**Check:**
1. MongoDB Atlas IP whitelist
2. Database user credentials
3. Connection string format

**Fix:**
- MongoDB Atlas → Network Access → Add `0.0.0.0/0`
- Verify username/password in connection string
- Test connection string locally first

### ❌ Build failures

**Check Build Logs:**
- Vercel Dashboard → Deployments → [Failed Deployment] → Building

**Common fixes:**
```bash
# Make sure all dependencies are in package.json
npm install

# Test build locally
npm run build

# If successful, commit and push
git add .
git commit -m "Fix build"
git push origin main
```

---

## Testing Locally Before Deployment

Test the production build locally:

```bash
# Build the frontend
npm run build

# Preview the build
npm run preview

# In another terminal, run the backend
cd server
npm run dev
```

Visit `http://localhost:4173` to test.

---

## Monitoring & Logs

### View Function Logs (Backend)
Vercel Dashboard → Deployments → [Select Deployment] → Functions

### View Build Logs
Vercel Dashboard → Deployments → [Select Deployment] → Building

### Real-time Logs (CLI)
```bash
vercel logs --follow
```

---

## Quick Reference Commands

```bash
# Deploy to production
vercel --prod

# View logs
vercel logs --follow

# List environment variables
vercel env ls

# Add environment variable
vercel env add VARIABLE_NAME production

# Remove environment variable
vercel env rm VARIABLE_NAME production
```

---

## File Structure for Vercel

```
synapse-calyx/
├── api/
│   └── index.js          # Serverless function entry point
├── server/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js         # Original Express server (for local dev)
├── src/                  # React frontend
├── dist/                 # Build output (auto-generated)
├── vercel.json          # Vercel configuration
└── package.json
```

---

## Support

- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com/
- **Check Function Logs**: Vercel Dashboard → Deployments → Functions

---

**Remember**: After ANY environment variable change, you MUST redeploy! 🔄
