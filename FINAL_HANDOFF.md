# ResumeIQ Final Handoff Summary

## GitHub Repository
- **URL:** [https://github.com/TanishqNandwana/ResumeIQ](https://github.com/TanishqNandwana/ResumeIQ)
- **Status:** Pushed to `main` branch with clean history (no secrets, no binary bloat)

## Production Deployment
- **URL:** [https://resumeiq-livid-phi.vercel.app](https://resumeiq-livid-phi.vercel.app)
- **Platform:** Vercel (Hobby Team `tanishq-462a`)
- **Status:** Deployed and verified via live HTTP/2 200 checks on all routes and APIs

## Local Development
```bash
npm install
npm run dev
# Running on http://localhost:3000
```

## Production Build & Tests
- **Next.js Production Build:** Passed (`npm run build`, 9 static routes, 3 serverless API routes)
- **Automated Tests:** 22/22 passed (15 TypeScript tests via `npm test` + 7 Python tests via `npm run test:python`)

## Functional Feature Set
1. **Explainable Match Score:** 5-component weighted aggregation with real-time customizable weights.
2. **Skill Gap Analyzer:** 400+ canonical skills taxonomy with alias mapping (k8s -> Kubernetes, ML -> Machine Learning) and domain breakdowns.
3. **Requirement Extractor:** Identifies technical skills, tools, languages, education degrees, experience timelines, and certifications.
4. **Evidence Map:** Validates skill citations against project bullets with excerpt extraction and strength ratings (Strong, Moderate, Weak, None).
5. **Keyword Placement Matrix:** Cross-sectional distribution matrix tracking top keywords across 5 canonical sections.
6. **Resume Section Health:** Audits presence and word/bullet density across 9 resume sections.
7. **Bullet Strength Analyzer:** Flags action verbs, measurable outcomes ($ / % / scale), passive voice, and length with rewrite suggestions.
8. **Resume Quality Audit:** Evaluates contact visibility, document length, sentence count, reading ease, and keyword stuffing.
9. **Interview Question Generator:** 5-8 tailored questions with interviewer intent and suggested candidate talking points.
10. **Resume Version Comparison (A/B Testing):** Side-by-side comparison of V1 vs V2 with score deltas and skill/section diffs.
11. **Academic NLP Pipeline Inspector:** Step-by-step pipeline view (tokenization, stopword filtering, lemmatization, POS, NER, TF-IDF vectors, and Cosine math).
12. **Downloadable Report:** PDF print stylesheet and structured JSON export.

## Academic Reference Layer (`python-nlp/`)
- Demonstrates traditional NLTK, spaCy, and scikit-learn implementations.
- Benchmark evaluation on synthetic dataset (`data/sample_dataset.csv`): 80.44% Macro F1-score across 8 test pairs.
