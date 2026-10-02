# ResumeIQ — System Architecture & Design Specification

## 1. System Overview

ResumeIQ is an explainable Natural Language Processing (NLP) system designed to evaluate alignment between candidate resumes and target job descriptions. It addresses the black-box nature of commercial Applicant Tracking Systems (ATS) by providing transparent, mathematically grounded similarity metrics, comprehensive skill gap identification, contextual evidence mapping, and resume quality heuristics.

```text
                                  +-----------------------------+
                                  |     Candidate Resume PDF    |
                                  |  or Raw Text + Target JD    |
                                  +--------------+--------------+
                                                 |
                                                 v
                                  +-----------------------------+
                                  |   Next.js 14 Web Interface  |
                                  +--------------+--------------+
                                                 |
                         +-----------------------+-----------------------+
                         |                                               |
                         v                                               v
        +----------------------------------+            +----------------------------------+
        |   Vercel Serverless Production   |            |   Academic Python Reference      |
        |          (TypeScript)            |            |       (python-nlp/ Layer)        |
        +----------------------------------+            +----------------------------------+
        | • Text Normalization & Tokenizer |            | • NLTK Tokenization & Stemming   |
        | • Stopword Filtering & Lemmatizer|            | • spaCy NER Classification       |
        | • Regex Contact & Section Parser |            | • scikit-learn TfidfVectorizer   |
        | • 400+ Skill Taxonomy & Aliases  |            | • Cosine Pairwise Metric         |
        | • Smoothed TF-IDF & Cosine Math  |            | • Gensim Word2Vec Embeddings     |
        | • High-Dim Semantic Clusters     |            | • Benchmark Evaluation Suite     |
        | • Evidence Mapper & Excerpts     |            +----------------------------------+
        | • Bullet Quality Action Verb QA  |
        | • Interview Question Generator   |
        | • Version Comparison Engine (AB) |
        +----------------------------------+
```

---

## 2. Decoupled Dual-Layer Architecture

To reconcile the competing priorities of:
1. **Zero-cold-start, lightweight serverless deployment** on Vercel without multi-hundred megabyte Python runtime dependencies, and
2. **Academic rigor and coursework demonstration** using standard NLP libraries (NLTK, spaCy, scikit-learn),

ResumeIQ utilizes a decoupled dual-layer architecture:

### A. Production Web Application (Next.js + TypeScript)
- **Framework:** Next.js 14 App Router, React 18, TypeScript 5
- **Styling & UI:** Tailwind CSS, Lucide React, Recharts
- **Parsing:** In-memory PDF text extraction (`pdf-parse`)
- **NLP Engine:** Native TypeScript implementation of Porter Stemmer, morphological lemmatization, heuristic POS tagger, regex NER, smoothed TF-IDF, vector space cosine similarity, and semantic cluster projections.
- **Hosting:** Vercel Global Edge Network with instant serverless API responses (< 50ms).

### B. Academic Reference Layer (`python-nlp/`)
- **Core Libraries:** Python 3.12, NLTK, scikit-learn, NumPy, pandas
- **Modules:**
  - `preprocessing.py`: Tokenization, Porter stemmer, WordNet lemmatizer, and POS tagger
  - `extraction.py`: Contact parsing, section segmentation, skill extraction, and entity recognition
  - `similarity.py`: TfidfVectorizer, Bag-of-Words, and Cosine similarity
  - `evaluation.py`: Automated benchmarking on annotated test pairs (`data/sample_dataset.csv`)
  - `tests/nlp_test.py`: Comprehensive test suite

---

## 3. Data Flow Pipeline

```text
[Input Resume PDF / Text]
         |
         v
[Normalization & Cleaning] ---> Lowercasing, HTML stripping, whitespace normalization
         |
         v
[Specialized Tokenizer]    ---> Preserves C++, C#, .NET, Node.js, and CI/CD
         |
         v
[Stopword Removal]         ---> Curated English stopword dictionary
         |
         +--------------------------------------------------------+
         |                                                        |
         v                                                        v
[Section & Contact Parser]                              [Skill Taxonomy Engine]
- Contact Info (Email, Phone, Links)                    - 400+ Canonical Skills
- Summary, Skills, Experience, Projects, Education      - Alias Mapping (k8s -> Kubernetes, ML -> Machine Learning)
         |                                                        |
         +---------------------------+----------------------------+
                                     |
                                     v
                        [Evidence Mapping & Extraction]
                        - Locates project & experience citations
                        - Extracts matching sentence excerpts
                        - Calculates evidence strength (Strong / Moderate / Weak / None)
                                     |
                                     v
                        [Statistical Vector Space Model]
                        - Term Frequency (TF)
                        - Smoothed Inverse Document Frequency (IDF)
                        - Cosine Similarity: (A · B) / (||A|| × ||B||)
                        - High-Dimensional Semantic Cluster Projection
                                     |
                                     v
                        [Quality & Bullet Heuristic QA]
                        - Action verbs (Strong vs Weak)
                        - Quantifiable metrics & scale detection
                        - Section completeness score
                                     |
                                     v
                        [Explainable Match Score Calculation]
                        35% Skill + 25% Keywords + 20% TF-IDF + 10% Semantic + 10% Completeness
                                     |
                                     v
                        [Tailored Interview Question Generation]
                        - Technical deep dives on candidate skills
                        - System architecture probes on listed projects
                        - Rapid ramp-up questions on identified gaps
```

---

## 4. API Endpoints

| Route | Method | Payload | Description |
|---|---|---|---|
| `/api/analyze` | `POST` | `{ resumeText, jdText, weights? }` | Executes complete NLP analysis pipeline, returning scores, gaps, evidence map, quality audit, and interview questions. |
| `/api/compare` | `POST` | `{ resumeV1Text, resumeV2Text, jdText, weights? }` | Runs dual analysis on V1 and V2 and computes numerical deltas and structural shifts. |
| `/api/extract-pdf` | `POST` | `multipart/form-data (file)` | Extracts raw text from uploaded PDF using in-memory buffer validation. |

---

## 5. Security & Privacy Guarantees

1. **Zero Persistent Storage:** Uploaded resumes and pasted texts are processed exclusively in-memory during request execution and discarded immediately upon response delivery.
2. **Zero Commercial Data Leakage:** No proprietary candidate information is transmitted to third-party generative APIs.
3. **Input Sanitization:** Extracted text is sanitized and HTML entities are escaped before rendering in the DOM.
4. **File Restrictions:** File uploads are limited to 10MB and strictly verified for PDF mime-types.
