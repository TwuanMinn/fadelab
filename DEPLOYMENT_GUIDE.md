# Vercel Deployment Guide

Your project uses a monorepo structure where the Next.js application lives in the `frontend` directory.

## 🚨 Critical Step: Configure Root Directory

Because your `package.json` is inside `frontend/`, Vercel will not find it by default. You must configure the Root Directory setting.

1.  **Open Vercel Dashboard**: Go to your project on Vercel.
2.  **Settings**: Click on the "Settings" tab.
3.  **Root Directory**: 
    - Locate the "Root Directory" option (usually under the "General" section).
    - Click "Edit".
    - Select or type `frontend`.
    - Save the change.
4.  **Redeploy**: Go to the "Deployments" tab and redeploy the latest commit (or push a new commit to trigger it).

## Verify Build Settings
Ensure your build command is detected as:
- **Build Command**: `next build` (or `npm run build`)
- **Output Directory**: `.next`
- **Install Command**: `npm install`

Once the Root Directory is set to `frontend`, these should auto-detect correctly.
