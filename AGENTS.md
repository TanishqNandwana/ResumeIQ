# ResumeIQ Agent Instructions

You are responsible for completing the entire ResumeIQ project, not merely generating starter code.

## Absolute requirements

1. Build the complete application.
2. Test it locally.
3. Create the GitHub repository `tanishqnandwana/ResumeIQ`.
4. Push the complete source code.
5. Deploy the production web application to Vercel.
6. Verify the live deployment.
7. Update documentation with real URLs.

## Git identity

```bash
git config user.name "Tanishq Nandwana"
git config user.email "tanishqnandwana@gmail.com"
```

## Deployment architecture

Vercel is the mandatory production platform.

Do NOT create a Streamlit-only project because Streamlit is not a native Vercel deployment target.

Use Next.js + TypeScript for the production application.

Keep a Python NLP reference layer for academic demonstration and experiments.

## Do not fake anything

Never:
- fake scores
- fake test results
- fake GitHub URLs
- fake Vercel URLs
- hardcode analysis results
- fabricate candidate achievements
- commit secrets

## Autonomy

Proceed through implementation, testing, GitHub, and deployment without repeatedly asking for permission.

Only stop and ask for user action when an external authentication/authorization step genuinely cannot be completed automatically, such as GitHub/Vercel login or browser approval.

## Completion criteria

The task is incomplete until the application:
- builds
- runs
- passes tests
- is pushed to GitHub
- is deployed to Vercel
- is tested from the production URL
