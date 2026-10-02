# ResumeIQ: An NLP-Based Resume Analyzer and Job Description Matching System
## Comprehensive Mini-Project Technical Report

**Course:** Natural Language Processing (Semester VII)  
**Author:** Tanishq Nandwana (`tanishqnandwana@gmail.com`)  
**Institution:** Academic Coursework Mini-Project Submission  
**Repository:** [https://github.com/tanishqnandwana/ResumeIQ](https://github.com/tanishqnandwana/ResumeIQ)  
**Production Web Application:** Deployed on Vercel  

---

## 1. Abstract

Commercial Applicant Tracking Systems (ATS) and automated screening engines often rely on opaque ranking heuristics or black-box embeddings, providing candidates and recruiters with minimal interpretability regarding why an applicant was flagged or dismissed. In this work, we design and implement **ResumeIQ**, a modular, explainable Natural Language Processing (NLP) system that parses, extracts, and evaluates resumes against target job descriptions (JDs). 

ResumeIQ implements a multi-stage NLP pipeline comprising technical tokenization, morphological lemmatization, Part-of-Speech (POS) tagging, Named Entity Recognition (NER), domain taxonomy matching with alias resolution, smoothed Term Frequency–Inverse Document Frequency (TF-IDF) cosine similarity, and high-dimensional semantic concept projections. Furthermore, ResumeIQ introduces an **Evidence Map** to verify whether claimed skills are grounded in tangible project bullet points, a **Bullet Strength Analyzer** auditing action verbs and quantifiable metrics, a **Resume Quality Audit**, and deterministic **Tailored Interview Question Generation**. The system is deployed as a high-performance Next.js application on Vercel with an accompanying Python reference layer for academic experimentation.

---

## 2. Problem Statement

Recruitment screening processes face two critical challenges:
1. **Recruiter Cognitive Fatigue:** Screening hundreds of heterogeneous resumes results in high variance and missed qualified talent.
2. **Algorithmic Opacity:** Many commercial tools output arbitrary percentage scores without explaining the underlying lexical, semantic, or structural justification. Candidates receive no actionable guidance on how to bridge qualifications gaps, while reviewers cannot audit the decision logic.

ResumeIQ addresses this challenge by formulating resume analysis as an explainable Information Extraction (IE) and Information Retrieval (IR) task, decomposing document alignment into transparent, mathematically grounded linguistic indicators.

---

## 3. Project Objectives

1. **Explainable Scoring:** Formulate an explainable composite similarity indicator combining Skill Overlap, Keyword Coverage, TF-IDF Cosine Similarity, Semantic Clusters, and Structural Completeness with configurable weights.
2. **Robust Information Extraction:** Extract candidate contact details, structural resume sections, timeline dates, academic degrees, and 400+ technical skills with acronym and alias normalization.
3. **Evidence Grounding:** Trace extracted job requirements to specific resume sections and bullet excerpts, differentiating between mere keyword claims and demonstrated project contributions.
4. **Actionable Feedback:** Provide heuristic audits on resume quality (contact completeness, length, density, keyword stuffing) and bullet phrasing (action verbs, quantifiable metrics).
5. **Interview Question Generation:** Synthesize role-specific technical deep dives, project architectural questions, and gap-addressing inquiries grounded strictly in candidate text.
6. **Dual Deployment:** Ship a production web application deployable to Vercel paired with a modular Python reference layer for offline academic experiments.

---

## 4. NLP Methodology & Mathematical Formulations

### 4.1 Preprocessing Pipeline
1. **Cleaning:** Strip HTML tags, normalize whitespace, and convert text to lowercase.
2. **Technical Tokenization:** Standard regex tokenizers often mangle programming terms such as `C++`, `C#`, `.NET`, `Node.js`, and `CI/CD`. ResumeIQ uses an ordered boundary-sensitive regular expression:
   $$\text{pattern} = \texttt{c++} \mid \texttt{c\#} \mid \texttt{.net} \mid \texttt{ci/cd} \mid \backslash b[a\text{-}zA\text{-}Z0\text{-}9]+(?:\.[a\text{-}zA\text{-}Z0\text{-}9]+)*\backslash b$$
3. **Stopword Elimination:** Non-discriminative grammatical tokens (determiners, prepositions, conjunctions) are filtered using a curated English stopword dictionary.
4. **Morphological Lemmatization & Stemming:** Applies Porter stemmer rules alongside irregular morphological mappings for common engineering verbs and nouns (e.g., *engineered* $\to$ *engineer*, *optimizing* $\to$ *optimize*, *pipelines* $\to$ *pipeline*).

### 4.2 Vector Space Model & Smoothed TF-IDF
Term Frequency (TF) normalizes raw frequency by total tokens in document $d$:
$$\text{TF}(t, d) = \frac{\text{count}(t, d)}{\sum_{t' \in d} \text{count}(t', d)}$$

Inverse Document Frequency (IDF) uses the smoothed scikit-learn compatible formulation to prevent division-by-zero:
$$\text{IDF}(t) = \ln\left(\frac{1 + N}{1 + \text{df}(t)}\right) + 1.0$$
where $N = 2$ in pairwise resume-to-JD evaluation, and $\text{df}(t)$ is the document frequency of term $t$.

Vector representations $\mathbf{A}$ (Resume) and $\mathbf{B}$ (Job Description) are compared using Cosine Similarity in $\mathbb{R}^{|V|}$:
$$\text{Cosine}(\mathbf{A}, \mathbf{B}) = \frac{\mathbf{A} \cdot \mathbf{B}}{\|\mathbf{A}\|_2 \|\mathbf{B}\|_2} = \frac{\sum_{i=1}^{|V|} A_i B_i}{\sqrt{\sum_{i=1}^{|V|} A_i^2} \sqrt{\sum_{i=1}^{|V|} B_i^2}}$$

### 4.3 Explainable Match Score Formula
The overall ResumeIQ Match Score is a transparent weighted sum of five linguistic indicators:
$$\text{MatchScore} = w_1 S_{\text{skill}} + w_2 S_{\text{keyword}} + w_3 S_{\text{tfidf}} + w_4 S_{\text{semantic}} + w_5 S_{\text{complete}}$$
with default baseline weights:
$$w_1 = 0.35, \quad w_2 = 0.25, \quad w_3 = 0.20, \quad w_4 = 0.10, \quad w_5 = 0.10 \quad \left(\sum w_i = 1.0\right)$$

All weights are fully customizable by the user via an interactive modal with real-time recalculation.

---

## 5. Coursework Mapping

| Course Topic | ResumeIQ Implementation |
|---|---|
| Text Preprocessing | Whitespace cleaning, HTML stripping, lowercasing |
| Stopword Removal | English functional stopword filtering |
| Stemming & Lemmatization | Porter stemmer and morphological rule reductions |
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

## 6. Experimental Evaluation & Results

The system was evaluated against a synthetic benchmark dataset (`data/sample_dataset.csv`) comprising 8 test pairs across multiple technical domains:

```text
======================================================================
RESUMEIQ — NLP BENCHMARK EVALUATION EXPERIMENT
======================================================================
Loaded 8 synthetic evaluation test pairs:

ID   | Role Title                   | Expected | Matched  | Rate     | Label 
------------------------------------------------------------------------
1    | Machine Learning Engineer    | 15       | 13       | 86.7%    | High
2    | Full Stack Software Engineer | 14       | 12       | 85.7%    | High
3    | Data Analyst                 | 12       | 11       | 91.7%    | High
4    | Frontend Developer           | 10       | 9        | 90.0%    | High
5    | DevOps / Cloud Engineer      | 13       | 11       | 84.6%    | High
6    | Machine Learning Engineer    | 15       | 2        | 13.3%    | Low
7    | Data Analyst                 | 12       | 8        | 66.7%    | Medium
8    | DevOps Engineer              | 13       | 7        | 53.8%    | Medium
------------------------------------------------------------------------
AGGREGATE BENCHMARK PERFORMANCE:
• Total Expected Competencies: 104
• Total Extracted Matches:     73
• Macro Skill Recall:          70.19%
• Macro Skill Precision:       94.20%
• Macro F1-Score:              80.44%
======================================================================
```

### Analysis of Results
- **Target In-Domain Pairs (IDs 1–5):** Achieved an average skill match rate of 87.7%, demonstrating strong sensitivity to role-aligned technical vocabulary.
- **Cross-Domain Negative Pair (ID 6 - Frontend applying to ML):** Correctly yielded a low match rate of 13.3%, verifying high specificity and low false-positive rate.
- **Adjacent Skill Pairs (IDs 7–8):** Recorded moderate overlap (53.8% – 66.7%), accurately capturing foundational skills (SQL, Git, basic containerization) while identifying gaps in advanced domain frameworks.

---

## 7. Limitations & Ethical Considerations

1. **Scanned PDF Limitations:** Optical Character Recognition (OCR) is intentionally omitted from the lightweight Vercel serverless build to prevent multi-hundred megabyte Tesseract binaries. Users uploading scanned PDFs receive clear guidance to upload a text-based PDF.
2. **Context-Free Keyword Inflation:** While the Evidence Map penalizes ungrounded keywords, extreme keyword stuffing in raw text is flagged through heuristic repetition warnings.
3. **Non-Commercial Educational Scope:** ResumeIQ is an academic similarity indicator and does not replace human hiring evaluation or holistic interview assessments.

---

## 8. Conclusion

ResumeIQ demonstrates that resume analysis can be executed with high precision, speed, and interpretability using classical Natural Language Processing and Information Extraction methodologies. By grounding percentage scores in transparent equations, providing actionable bullet feedback, and displaying step-by-step pipeline transformations, the system serves as an exemplary academic mini-project for Semester VII NLP.
