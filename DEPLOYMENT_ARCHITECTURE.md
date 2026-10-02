# ResumeIQ Deployment Architecture

## Why the architecture uses Next.js

ResumeIQ needs a Vercel-compatible production deployment.

A Streamlit server is not a native Vercel application target, so the production interface is implemented with Next.js and TypeScript.

## Architecture

```text
Browser
   |
   v
Next.js UI
   |
   +---- Client-side PDF/text processing
   |
   +---- Vercel API routes
              |
              +---- Text preprocessing
              +---- Skill extraction
              +---- TF-IDF
              +---- Cosine similarity
              +---- Scoring
              +---- Evidence mapping
              +---- Quality analysis

Python NLP Reference Layer
   |
   +---- NLTK
   +---- spaCy
   +---- scikit-learn
   +---- Word2Vec
   +---- Evaluation experiments
```

## Deployment principle

The production application must use lightweight dependencies compatible with Vercel serverless execution.

Heavy Python NLP libraries can remain in the academic/reference layer rather than forcing them into production serverless functions.

This provides both:
- a reliable deployed product
- a technically demonstrable NLP implementation

## Production stack

- Next.js
- TypeScript
- React
- Tailwind CSS
- Vercel
- lightweight NLP utilities
- Recharts
- PDF text extraction

## Academic stack

- Python
- NLTK
- spaCy
- scikit-learn
- Word2Vec
- pandas
- NumPy
