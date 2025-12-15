# Deploying to Vercel with Maintenance Mode

This guide explains how to deploy your Synapse Calyx website to Vercel and control the maintenance mode.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. Your GitHub repository connected to Vercel
3. MongoDB Atlas account (for production database)

## Step 1: Prepare Your Project

The project is already configured with `vercel.json` for deployment.

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click "Add New Project"
3. Import your GitHub repository: `zerefnochills/Synapse-Calyx-PAGE`
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

## Step 3: Configure Environment Variables on Vercel

Go to your project settings on Vercel Dashboard:

1. Navigate to: **Project Settings** → **Environment Variables**
2. Add the following variables:

### Frontend Variables (VITE_*)
- **VITE_API_URL**: `/api` (for production, uses relative path)
- **VITE_OPENAI_API_KEY**: `your-openai-api-key` (if using AI assistant)

### Backend Variables (Server)
- **MONGO_URI**: `your-mongodb-atlas-connection-string`
- **PORT**: `5000` (optional, Vercel handles this)
- **NODE_ENV**: `production`
- **MAINTENANCE_MODE**: `false` (set to `true` to enable maintenance mode)

### Important Notes:
- Make sure to set these for **Production**, **Preview**, and **Development** environments
- The `VITE_API_URL` should be `/api` in production (not the full URL)

## Step 4: Enable/Disable Maintenance Mode

### To Enable Maintenance Mode:

1. Go to Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
2. Find `MAINTENANCE_MODE`
3. Change value from `false` to `true`
4. Click **Save**
5. Go to **Deployments** tab
6. Click the **three dots** (⋯) on the latest deployment
7. Click **Redeploy** → **Use existing Build Cache** (faster)

Your site will now show the maintenance page! 🚧

### To Disable Maintenance Mode:

1. Change `MAINTENANCE_MODE` back to `false`
2. Redeploy the project

### Quick Toggle via Vercel CLI:

```bash
# Enable maintenance mode
vercel env add MAINTENANCE_MODE production
# Enter: true

# Redeploy
vercel --prod

# Disable maintenance mode
vercel env add MAINTENANCE_MODE production
# Enter: false

# Redeploy
vercel --prod
```

## Step 5: Set Up MongoDB Atlas (Production Database)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Create a database user
4. Whitelist all IP addresses (0.0.0.0/0) for Vercel
5. Get your connection string
6. Add it to Vercel as `MONGO_URI` environment variable

Example connection string:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/synapse_calyx?retryWrites=true&w=majority
```

## Step 6: Install Server Dependencies

Make sure your `server/package.json` dependencies are installed during deployment. Vercel should automatically detect and install them.

## Troubleshooting

### API calls not working:
- Check that `VITE_API_URL` is set to `/api` in production
- Verify `vercel.json` routes are correct
- Check Vercel function logs in Dashboard → Deployments → Function Logs

### Maintenance mode not showing:
- Verify `MAINTENANCE_MODE=true` is set in environment variables
- Make sure you redeployed after changing the variable
- Check browser console for API errors

### Database connection issues:
- Verify MongoDB Atlas IP whitelist includes 0.0.0.0/0
- Check connection string format
- Ensure database user has correct permissions

## Monitoring

- **Function Logs**: Vercel Dashboard → Deployments → [Select Deployment] → Functions
- **Analytics**: Vercel Dashboard → Analytics
- **Real-time Logs**: Use `vercel logs` command

## Automatic Deployments

Vercel automatically deploys when you push to your GitHub repository:
- **Push to `main`**: Deploys to production
- **Push to other branches**: Creates preview deployments

---

## Quick Reference

**Enable Maintenance**: Set `MAINTENANCE_MODE=true` → Redeploy  
**Disable Maintenance**: Set `MAINTENANCE_MODE=false` → Redeploy  
**View Logs**: `vercel logs --follow`  
**Redeploy**: Vercel Dashboard → Deployments → Redeploy

---

Need help? Check Vercel docs: https://vercel.com/docs
