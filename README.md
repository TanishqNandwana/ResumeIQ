# ResumeIQ: An NLP-Based Resume Analyzer and Job Description Matching System

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/tanishqnandwana/ResumeIQ)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-blue)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![NLP Mini-Project](https://img.shields.io/badge/Coursework-Semester%20VII%20NLP-purple)](#)

> **Live Deployment:** [https://resumeiq-two.vercel.app](https://resumeiq-two.vercel.app)  
> **GitHub Repository:** [https://github.com/tanishqnandwana/ResumeIQ](https://github.com/tanishqnandwana/ResumeIQ)  
> **Author:** Tanishq Nandwana (`tanishqnandwana@gmail.com`)

---

## 📌 Project Overview

**ResumeIQ** is an explainable Natural Language Processing (NLP) system designed to evaluate alignment between candidate resumes and target job descriptions. Rather than relying on black-box ranking or opaque scores, ResumeIQ decomposes document alignment into transparent, mathematically grounded linguistic indicators:

- **ResumeIQ Match Score:** Configurable 5-component weighted aggregation (Skill Match 35%, Keyword Coverage 25%, TF-IDF Cosine Similarity 20%, Semantic Similarity 10%, Resume Completeness 10%).
- **Skill Gap Analyzer:** Categorized breakdown of matched skills, missing target competencies, and candidate additional assets across 400+ canonical industry skills with alias normalization (e.g. *k8s* $\to$ *Kubernetes*, *ML* $\to$ *Machine Learning*).
- **Resume Evidence Map:** Traces where target requirements are backed up by actual project bullet excerpts, assessing evidence strength (*Strong*, *Moderate*, *Weak*, *None*).
- **Keyword Placement Matrix:** Cross-sectional distribution matrix tracking top JD keywords across 5 canonical sections (Summary, Skills, Experience, Projects, Education).
- **Resume Quality & ATS Audit:** Audits contact information, document length, sentence structure, reading ease, and keyword stuffing.
- **Bullet Strength Analyzer:** Evaluates experience and project bullets for strong action verbs, quantifiable metrics ($ / % / scale), passive voice, and length.
- **Tailored Interview Question Generator:** Synthesizes 5–8 targeted questions with interviewer intent and suggested candidate talking points.
- **Resume Version Comparison (A/B Testing):** Side-by-side evaluation of Resume V1 vs Resume V2 calculating net score deltas, added/removed skills, and section shifts.
- **Academic NLP Pipeline Inspector:** Step-by-step interactive demonstration of tokenization, stopword removal, morphological lemmas, POS tagging, NER classification, and vector space cosine mathematics.

---

## 🏗️ System Architecture

ResumeIQ employs a decoupled dual-layer architecture to provide both sub-50ms serverless performance on Vercel and academic demonstration capabilities:

```text
                                  ResumeIQ
                                     |
                           Next.js + TypeScript
                                     |
                      ┌──────────────┴──────────────┐
                      |                             |
                 Browser UI                    Vercel API
                      |                             |
             Interactive Dashboard         Lightweight TS NLP
             (Recharts, Lucide)            Processing & Scoring
                      |                             |
                      └──────────────┬──────────────┘
                                     |
                           Resume / JD Content
```

- **Production Platform (Vercel):** Next.js 14 App Router, React 18, TypeScript 5, Tailwind CSS, Recharts, and `pdf-parse`. Native TypeScript NLP engine ensures zero runtime cold starts and no bulky Python wheel dependencies.
- **Academic Reference Platform (`python-nlp/`):** Python 3.12, NLTK, scikit-learn, NumPy, and pandas for classroom demonstration and offline benchmark evaluation.

---

## 📚 Coursework Syllabus Mapping

| Course Topic | Implementation in ResumeIQ |
|---|---|
| Text Preprocessing | Whitespace cleaning, HTML stripping, lowercasing |
| Stopword Removal | English functional stopword filtering |
| Stemming & Lemmatization | Porter stemmer & morphological rule reductions |
| Regular Expressions | Contact extraction, timeline detection, degree parsing |
| POS Tagging | Heuristic grammatical categorizer (NOUN, VERB, ADJ, ADV, NUM) |
| Named Entity Recognition | Classifier for PERSON, ORG, GPE, DATE, DEGREE, and TECH |
| Bag of Words (BoW) | Vocabulary frequency matrices across documents |
| TF-IDF & Cosine Similarity | Smoothed TF-IDF weighting and inner-product vector comparison |
| N-Grams Language Modeling | Unigram, bigram, and trigram phrase extraction |
| Semantic Word Embeddings | High-dimensional concept clusters (TS) & Word2Vec/Gensim (Python) |
| Information Extraction | Structured skill, section, and contact parsing |
| Information Retrieval | Evidence retrieval matching requirements to project excerpts |

---

## ⚡ Quick Start

### 1. Prerequisites
- Node.js 20+
- npm 10+
- Python 3.10+ (for academic reference layer)

### 2. Local Installation
```bash
# Clone the repository
git clone https://github.com/tanishqnandwana/ResumeIQ.git
cd ResumeIQ

# Install dependencies
npm install

# Run automated tests (15/15 passing)
npm test

# Start development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### 3. Production Build
```bash
npm run build
npm start
```

### 4. Running the Academic Python Layer
```bash
cd python-nlp
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# Run Python unit tests (7/7 passing)
python3 -m unittest discover -s tests -p '*_test.py'

# Run benchmark evaluation
python3 evaluation.py
```

---

## 🧪 Automated Testing

ResumeIQ includes automated unit tests covering all NLP components:

```bash
npm test
```

**Results:**
- `tests/nlp.test.ts`: Tokenization, stopwords, stemming, POS, NER, n-grams
- `tests/extraction.test.ts`: Skill aliases, section detection, contact parsing, evidence mapping
- `tests/scoring.test.ts`: TF-IDF calculation, cosine similarity, match score weighting
- `tests/comparison.test.ts`: Version comparison (V1 vs V2), deltas, edge case resilience
- **Total:** 15 TypeScript tests + 7 Python tests = **22 tests (100% passing)**

---

## 📁 Repository Structure

```text
ResumeIQ/
├── app/
│   ├── layout.tsx                 # Root layout & SEO metadata
│   ├── page.tsx                   # Homepage & interactive text/PDF input
│   ├── globals.css                # Tailwind directives & print styles
│   ├── analyze/page.tsx           # 8-tab live analysis dashboard
│   ├── comparison/page.tsx        # Side-by-side A/B version comparison
│   ├── methodology/page.tsx       # Coursework mapping & formulas
│   └── api/
│       ├── analyze/route.ts       # POST /api/analyze endpoint
│       ├── compare/route.ts       # POST /api/compare endpoint
│       └── extract-pdf/route.ts   # POST /api/extract-pdf endpoint
├── components/
│   ├── Navbar.tsx                 # Navigation header
│   ├── Footer.tsx                 # Academic footer & notice
│   ├── ScoreCard.tsx              # Radial meter & sub-score cards
│   ├── ScoreWeightModal.tsx       # Interactive scoring formula sliders
│   ├── SkillGapView.tsx           # Matched, missing, and additional skills
│   ├── EvidenceMapView.tsx        # Project excerpts & evidence rating
│   ├── KeywordPlacementView.tsx   # 5-section keyword placement matrix
│   ├── SectionHealthView.tsx      # Section completeness audit
│   ├── QualityAuditView.tsx       # Contact & formatting quality audit
│   ├── BulletStrengthView.tsx     # Action verbs, metrics, and suggestions
│   ├── NlpPipelineView.tsx        # Step-by-step academic NLP inspector
│   ├── InterviewQuestionsView.tsx # Tailored interview questions
│   ├── ComparisonDashboard.tsx    # Side-by-side comparison metrics
│   └── DownloadReportButton.tsx   # PDF print & JSON export
├── lib/
│   ├── types.ts                   # TypeScript interfaces
│   ├── sampleData.ts              # Preloaded roles (ML, SWE, Analyst)
│   └── nlp/                       # Core production NLP engine
│       ├── preprocessor.ts        # Tokenizer, stemmer, POS, NER
│       ├── skillsTaxonomy.ts      # 400+ skills & alias mapping
│       ├── skillExtractor.ts      # Skills & JD requirements parser
│       ├── sectionDetector.ts     # Section parser & contact extractor
│       ├── tfidf.ts               # TF-IDF & Cosine similarity math
│       ├── semanticSimilarity.ts  # Semantic concept clusters
│       ├── evidenceMapper.ts      # Evidence linking & excerpt extraction
│       ├── bulletAnalyzer.ts      # Bullet strength & verb analyzer
│       ├── qualityAuditor.ts      # Heuristic quality auditor
│       ├── interviewGenerator.ts  # Interview question synthesizer
│       ├── comparisonEngine.ts    # Version delta comparator
│       ├── scorer.ts              # Weighted match score calculator
│       └── analyzer.ts            # Master pipeline coordinator
├── data/
│   ├── sample_resume.txt          # Synthetic sample resume (ML Engineer)
│   ├── sample_job_description.txt # Synthetic sample job description
│   ├── sample_resume_v2.txt       # Synthetic tailored resume V2
│   └── sample_dataset.csv         # Benchmark evaluation dataset
├── python-nlp/                    # Academic reference layer
│   ├── preprocessing.py           # NLTK tokenization & lemmatization
│   ├── extraction.py              # Section & skill extraction
│   ├── similarity.py              # scikit-learn TF-IDF & Cosine
│   ├── evaluation.py              # Benchmark evaluation script
│   ├── requirements.txt           # Python dependencies
│   ├── README.md                  # Python layer documentation
│   └── tests/nlp_test.py          # Python unit tests
├── tests/                         # Production TypeScript tests
│   ├── nlp.test.ts
│   ├── extraction.test.ts
│   ├── scoring.test.ts
│   └── comparison.test.ts
├── ARCHITECTURE.md                # System design & architecture
├── PROJECT_REPORT.md              # Academic technical report
├── METHODOLOGY.md                 # Mathematical formulations
├── EVALUATION.md                  # Benchmark evaluation results
├── DEMO.md                        # Step-by-step presentation guide
├── COURSE_MAPPING.md              # Detailed syllabus alignment
├── DEPLOYMENT.md                  # Vercel deployment guide
└── package.json
```

---

## ⚖️ Educational Notice & Disclaimer

The **ResumeIQ Match Score** is designed strictly as an educational indicator of textual and semantic alignment. It is not an automated hiring predictor and does not replicate commercial ATS black-box algorithms. Human judgment remains paramount in hiring decisions.

---

## 📄 License

This project is licensed under the MIT License.
