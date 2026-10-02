# GitHub + Vercel Deployment

## Verified Production Deployment

- **Production URL:** `https://resumeiq-livid-phi.vercel.app`
- **GitHub Repository:** `https://github.com/TanishqNandwana/ResumeIQ`
- **Vercel Team:** `tanishq-462a`
- **Framework:** Next.js 14 (App Router)
- **Status:** Active, verified via HTTP/2 200 checks on all pages and serverless API endpoints

## GitHub Repository Setup

```bash
git config user.name "Tanishq Nandwana"
git config user.email "tanishqnandwana@gmail.com"

git init
git add .
git commit -m "Initial complete ResumeIQ implementation"
git branch -M main
git remote add origin https://github.com/TanishqNandwana/ResumeIQ.git
git push -u origin main
```

## Vercel Deployment Instructions

```bash
npm install -g vercel
vercel login
vercel --name resumeiq --yes
vercel --prod --yes
```

Configuration in `vercel.json`:
```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "installCommand": "npm install"
}
```

## Verified Endpoints Checklist

- [x] Homepage (`/`) -> HTTP 200 OK
- [x] Analysis Dashboard (`/analyze`) -> HTTP 200 OK
- [x] Version Comparison (`/comparison`) -> HTTP 200 OK
- [x] NLP Methodology (`/methodology`) -> HTTP 200 OK
- [x] Analysis API (`/api/analyze`) -> HTTP 200 OK (verified via live POST request)
- [x] Compare API (`/api/compare`) -> HTTP 200 OK (verified via live POST request)
- [x] PDF Extraction API (`/api/extract-pdf`) -> In-memory text extraction with scanned PDF error handling
