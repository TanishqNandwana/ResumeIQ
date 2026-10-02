# GitHub + Vercel Deployment

## GitHub

Repository:

`https://github.com/tanishqnandwana/ResumeIQ`

Configure:

```bash
git config user.name "Tanishq Nandwana"
git config user.email "tanishqnandwana@gmail.com"
```

Then:

```bash
git init
git add .
git commit -m "Initial complete ResumeIQ implementation"
git branch -M main
git remote add origin https://github.com/tanishqnandwana/ResumeIQ.git
git push -u origin main
```

If the repository already exists, do not create a duplicate repository.

## Vercel

Install CLI:

```bash
npm install -g vercel
```

Authenticate:

```bash
vercel login
```

Deploy:

```bash
vercel
vercel --prod
```

For a Git-connected deployment, configure the GitHub repository in Vercel and use:

```text
Framework: Next.js
Build Command: npm run build
Install Command: npm install
```

## Verification

After deployment verify:

- homepage
- resume upload
- JD input
- analysis
- score
- skill gap
- evidence map
- NLP analysis
- interview questions
- version comparison
- report
- responsive UI
- browser console
- Vercel logs

Only record the production URL after it has actually been opened and tested.
