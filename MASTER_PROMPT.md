# RESUMEIQ — MASTER AUTONOMOUS BUILD + GITHUB + VERCEL DEPLOYMENT PROMPT

You are the lead full-stack engineer, NLP engineer, ML engineer, UI/UX designer, QA engineer, DevOps engineer, and technical writer for this project.

Your task is to BUILD, TEST, DOCUMENT, PUSH TO GITHUB, AND DEPLOY the complete ResumeIQ project. Do not stop at scaffolding or a partial implementation.

The user wants a finished, professional, submission-ready NLP mini-project.

---

# 1. USER / GITHUB CONFIGURATION

GitHub username:
`tanishqnandwana`

GitHub email:
`tanishqnandwana@gmail.com`

Create a NEW repository:

`ResumeIQ`

Repository owner:

`tanishqnandwana`

Expected repository:

`https://github.com/tanishqnandwana/ResumeIQ`

Use Git identity:

```bash
git config user.name "Tanishq Nandwana"
git config user.email "tanishqnandwana@gmail.com"
```

If GitHub CLI is authenticated, use it to create and push the repository.

If authentication requires a browser login, token, OAuth approval, or one-time confirmation, request that only when technically required. Do not repeatedly ask for permission for normal project operations.

---

# 2. DEPLOYMENT REQUIREMENT

The final application MUST be deployed to Vercel.

Important engineering constraint:

A Streamlit server is not a native Vercel deployment target. Therefore, DO NOT build a Streamlit-only application and then pretend it is deployable to Vercel.

Use this architecture:

```text
                    ResumeIQ
                       |
             Next.js + TypeScript
                       |
        ┌──────────────┴──────────────┐
        |                             |
   Browser UI                    Vercel API
        |                             |
        |                    Lightweight NLP
        |                    processing/scoring
        |                             |
        └──────────────┬──────────────┘
                       |
                Resume / JD data
```

Recommended production stack:

- Next.js
- TypeScript
- React
- Tailwind CSS
- Recharts
- pdfjs/pdf-parse-compatible browser/server approach
- lightweight TypeScript NLP utilities
- Vercel serverless API routes

The repository may ALSO contain a Python NLP reference/experimentation layer using:

- Python
- NLTK
- spaCy
- scikit-learn
- pandas
- NumPy
- Word2Vec

This Python layer is useful for demonstrating the course methodology and for offline experiments.

The deployed Vercel application must not depend on a huge Python ML stack if that creates Vercel function-size/runtime problems.

Do not sacrifice deployment reliability for unnecessary dependencies.

---

# 3. PROJECT TITLE

ResumeIQ

Full title:

"ResumeIQ: An NLP-Based Resume Analyzer and Job Description Matching System"

---

# 4. PROJECT PURPOSE

Build an explainable NLP system that accepts:

1. Resume PDF
2. Job description

and produces:

- Resume/JD Match Score
- skill matching
- skill gaps
- keyword coverage
- TF-IDF similarity
- semantic similarity
- resume section analysis
- named entities
- evidence mapping
- keyword placement
- bullet quality analysis
- resume quality audit
- interview questions
- resume version comparison
- downloadable report

This is an educational NLP application.

Do NOT claim that the system reproduces a commercial ATS.

Label the score:

"ResumeIQ Match Score"

and describe it as:

"An educational NLP-based similarity indicator."

---

# 5. CORE NLP REQUIREMENTS

The project must visibly demonstrate the following course concepts:

- text preprocessing
- tokenization
- stopword removal
- stemming/lemmatization
- regular expressions
- POS tagging
- Named Entity Recognition
- Bag of Words
- TF-IDF
- lexical similarity
- N-grams
- Word2Vec or equivalent semantic representation
- cosine similarity
- information extraction
- information retrieval
- semantic analysis
- text classification where useful

The course policy specifically covers preprocessing, BoW/TF-IDF, corpus analysis, N-gram language models, POS tagging, NER, WSD, Word2Vec/GloVe, sentiment analysis, and real-world applications including information extraction/retrieval. Keep the implementation visibly connected to those topics.

---

# 6. UNIQUE FEATURES

Implement all of these.

## A. Explainable Match Score

Default configurable formula:

35% Skill Match
25% Keyword Coverage
20% TF-IDF Similarity
10% Semantic Similarity
10% Resume Completeness

Show the individual components.

Never display an unexplained number.

---

## B. Skill Gap Analyzer

Show:

- Matched skills
- Missing important skills
- Additional skills
- Skill categories

Example:

```text
Matched
Python
SQL
Pandas
Machine Learning

Missing
AWS
Docker

Additional
Java
React
```

---

## C. Job Description Requirement Extractor

Extract and categorize:

- technical skills
- tools
- programming languages
- soft skills
- education
- experience
- domain terms
- certifications

---

## D. Resume Evidence Map

For each important JD skill, identify where evidence appears.

Example:

```text
Python
✓ Skills
✓ Project: Crop Yield Prediction

SQL
✓ Skills
✓ Internship

AWS
✗ Not found
```

---

## E. Keyword Placement Analyzer

For each important JD keyword, determine whether it appears in:

- Summary
- Skills
- Experience
- Projects
- Education

Show a clear matrix.

---

## F. Resume Section Health

Detect:

- Contact
- Summary
- Education
- Skills
- Experience
- Projects
- Certifications
- Achievements
- Leadership/Extracurriculars

Show present/missing sections.

---

## G. Bullet Strength Analyzer

Analyze experience/project bullets.

Flag:

- short bullets
- overly long bullets
- weak verbs
- lack of measurable outcomes
- excessive passive language
- generic wording

Generate suggestions without inventing achievements.

Never create fake metrics.

---

## H. Resume Quality Audit

Detect:

- missing email
- missing phone
- missing LinkedIn/GitHub where applicable
- duplicate keywords
- excessive repetition
- missing dates
- missing technology names in projects
- long paragraphs
- weak bullets
- missing sections

Treat these as heuristic signals, not absolute judgments.

---

## I. Interview Question Generator

Generate 5–8 questions based only on:

- resume skills
- resume projects
- resume experience
- target JD

Categories:

- technical
- project
- experience
- skill verification

Use deterministic templates where possible.

---

## J. Resume Version Comparison

Allow:

Resume V1
+
Resume V2

Output:

- added skills
- removed skills
- changed sections
- changed keywords
- Match Score change
- new/missing evidence

---

# 7. REQUIRED USER FLOW

Homepage:

```text
ResumeIQ
Understand how your resume aligns with a target role.

Upload Resume
Paste Job Description

[ Analyze Resume ]
```

Then show:

### Dashboard

```text
ResumeIQ Match Score
82%

Skill Match        91%
Keyword Coverage   84%
TF-IDF Similarity  79%
Semantic Match     76%
Completeness       88%
```

Tabs:

1. Overview
2. Skill Gap
3. Evidence Map
4. Resume Quality
5. NLP Analysis
6. Interview Questions
7. Version Comparison
8. Methodology

---

# 8. NLP ANALYSIS PAGE

This page is essential for the academic submission.

Show:

### Preprocessing

Original:

"The candidate has experience in Machine Learning."

Tokens:

candidate
experience
machine
learning

Lemmas:

candidate
experience
machine
learning

### POS Tags

Show selected POS tags.

### NER

Show detected:

- Person
- Organization
- Location
- Date
- Technology where applicable

### TF-IDF

Show top terms.

### Similarity

Show:

TF-IDF cosine similarity
Semantic similarity
Keyword overlap

This allows the student to demonstrate the actual NLP pipeline during viva.

---

# 9. PRODUCTION ARCHITECTURE

Use a clean Next.js structure such as:

```text
ResumeIQ/
├── app/
│   ├── page.tsx
│   ├── analyze/
│   ├── comparison/
│   ├── methodology/
│   └── api/
│       ├── analyze/
│       ├── compare/
│       └── report/
├── components/
├── lib/
│   ├── nlp/
│   ├── scoring/
│   ├── extraction/
│   ├── comparison/
│   └── report/
├── data/
├── public/
├── python-nlp/
│   ├── preprocessing.py
│   ├── extraction.py
│   ├── similarity.py
│   ├── evaluation.py
│   └── README.md
├── tests/
├── docs/
├── package.json
├── requirements.txt
├── README.md
├── .gitignore
├── vercel.json
└── .env.example
```

Adapt as needed.

---

# 10. GITHUB REQUIREMENTS

After the application is working:

```bash
git init
git add .
git commit -m "Initial complete ResumeIQ implementation"
```

Create the repository:

```text
tanishqnandwana/ResumeIQ
```

Push:

```bash
git branch -M main
git remote add origin https://github.com/tanishqnandwana/ResumeIQ.git
git push -u origin main
```

Before pushing:

- ensure `.env` is ignored
- ensure secrets are absent
- ensure personal/private resumes are not committed
- include only synthetic/public sample data
- ensure `node_modules` and Python virtual environments are ignored

If GitHub secret scanning blocks a push, inspect the offending file, remove the secret, rewrite the local commit if necessary, and push the clean history.

Never disable repository secret protection just to force a push.

---

# 11. VERCEL REQUIREMENTS

Deploy the production web application to Vercel.

Preferred method:

```bash
npm install -g vercel
vercel login
vercel
vercel --prod
```

If the GitHub repository is connected to Vercel, configure the project through the Vercel CLI/dashboard as necessary.

Set the correct framework:

Next.js

Build command:

```text
npm run build
```

Do not deploy a development server.

After deployment:

1. Open the production URL.
2. Test homepage.
3. Test resume upload.
4. Test JD analysis.
5. Test scoring.
6. Test skill gap.
7. Test evidence map.
8. Test methodology.
9. Test comparison.
10. Test report generation.
11. Check browser console.
12. Check Vercel function logs.

Fix deployment/runtime errors before declaring success.

---

# 12. VERCEL COMPATIBILITY RULES

Avoid unnecessarily heavy dependencies in Vercel serverless functions.

If spaCy/scikit-learn/large Word2Vec models cannot fit the production environment:

- retain them in `python-nlp/` for academic/offline evaluation
- implement equivalent lightweight production algorithms in TypeScript
- clearly document the distinction
- do not fake the implementation

The deployed app should still perform:

- tokenization
- normalization
- stopword filtering
- regex extraction
- skill extraction
- TF-IDF
- cosine similarity
- keyword coverage
- evidence mapping
- quality analysis

The Python reference implementation should demonstrate:

- NLTK preprocessing
- POS tagging
- NER
- TF-IDF
- Word2Vec
- evaluation

---

# 13. DATA

Create synthetic sample resumes and job descriptions.

Suggested roles:

- Data Analyst
- Software Engineer
- Machine Learning Intern
- Business Analyst
- Frontend Developer

Never commit real private resumes.

Create:

```text
data/sample_resume.txt
data/sample_job_description.txt
data/sample_resume_v2.txt
data/sample_dataset.csv
```

---

# 14. TESTING

Create automated tests.

Test:

- tokenization
- normalization
- skill aliases
- skill extraction
- section detection
- TF-IDF
- cosine similarity
- scoring
- evidence mapping
- comparison
- invalid input handling

Run all tests.

Do not claim tests pass unless they actually pass.

---

# 15. DOCUMENTATION

Create:

- README.md
- PROJECT_REPORT.md
- METHODOLOGY.md
- ARCHITECTURE.md
- DEPLOYMENT.md
- DEMO.md
- EVALUATION.md
- COURSE_MAPPING.md

The documentation must include:

- problem statement
- objectives
- methodology
- architecture
- algorithms
- technology stack
- dataset
- implementation
- evaluation
- results
- limitations
- future scope
- screenshots section
- deployment URL
- GitHub repository URL

Do not fabricate evaluation results.

---

# 16. UI DESIGN

Use a professional academic/industry design.

Theme:

- white/light background
- deep blue primary color
- subtle gradients
- clean cards
- readable typography
- responsive layout

Avoid:
- excessive animations
- unnecessary neon colors
- generic AI robot graphics
- clutter

The application should look suitable for a university project presentation.

---

# 17. ERROR HANDLING

Handle:

- invalid PDF
- empty PDF
- scanned PDF
- empty JD
- extremely short resume
- missing sections
- duplicate skills
- unknown skills
- malformed input

For scanned PDFs, display:

"Text could not be extracted from this PDF. Please upload a text-based PDF."

Do not silently fail.

---

# 18. SECURITY

- Do not store uploaded resumes permanently.
- Process files temporarily.
- Do not log resume contents.
- Do not expose secrets.
- Do not commit `.env`.
- Validate uploaded file types.
- Limit upload size.
- Sanitize extracted text before rendering.
- Escape HTML content.
- Do not include real personal data in sample files.

---

# 19. FINAL AUTONOMOUS EXECUTION

Work in this exact sequence:

1. Inspect current directory.
2. Read all provided Markdown instructions.
3. Build project architecture.
4. Implement core NLP.
5. Implement UI.
6. Implement API routes.
7. Implement all unique features.
8. Add sample data.
9. Add tests.
10. Run tests.
11. Fix errors.
12. Run production build.
13. Fix build errors.
14. Initialize Git.
15. Create GitHub repository.
16. Push complete project.
17. Deploy to Vercel.
18. Test deployed application.
19. Fix deployment problems.
20. Push final fixes.
21. Redeploy.
22. Verify final GitHub repository.
23. Verify final Vercel URL.
24. Update documentation with actual URLs.

Do not stop after step 5 or step 10.

---

# 20. FINAL RESPONSE FROM AGENT

At completion, provide:

```text
PROJECT STATUS
Complete

GitHub:
https://github.com/tanishqnandwana/ResumeIQ

Vercel:
<actual production URL>

Local:
<exact command>

Tests:
<number passed / number total>

Production build:
Passed

Major features:
- ...
- ...
- ...

Known limitations:
- ...
```

Only provide URLs that were actually created and verified.

Do not invent a deployment URL.

---

# 21. IMPORTANT

The final project must be genuinely functional.

Do not:
- create fake buttons
- create placeholder pages that appear functional
- hardcode analysis results
- hardcode scores
- fabricate evaluation results
- fabricate skills
- use fake API responses
- claim deployment without verifying it
- claim GitHub push without verifying it

If something cannot be implemented exactly as planned, implement the closest technically valid alternative and document it.

Begin now.
