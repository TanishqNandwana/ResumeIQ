# ResumeIQ — Demonstration & Presentation Guide

This guide provides a step-by-step walkthrough of the ResumeIQ application for academic presentations, university vivas, and local test drives.

---

## 1. Quick Local Start

```bash
# Clone the repository
git clone https://github.com/tanishqnandwana/ResumeIQ.git
cd ResumeIQ

# Install production dependencies
npm install

# Run automated tests (15 / 15 TypeScript tests)
npm test

# Launch local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 2. Interactive Feature Walkthrough

### Step 1: 1-Click Role Presets
- On the homepage, select any of the preloaded sample presets:
  - **Machine Learning Engineer** (Alex Mercer)
  - **Full Stack Software Engineer** (Devon Chen)
  - **Data Analyst / BI Engineer** (Maya Patel)
- Or click **Upload PDF / Text** to upload your own resume PDF.
- Click **Analyze Resume Alignment**.

### Step 2: The 8-Tab Analysis Dashboard
Once the analysis completes, examine the 8 dedicated dashboard tabs:

1. **Overview Tab:**
   - Review the radial **ResumeIQ Match Score** meter.
   - Inspect the 5 constituent sub-scores (Skill Match, Keywords, TF-IDF, Semantic, Completeness).
   - Click **Customize Weights** to open the scoring formula modal, adjust sliders, and observe instant recalculation.

2. **Skill Gap Tab:**
   - Inspect the three categorized badge groups: **Matched Competencies**, **Missing Skills (Gaps)**, and **Additional Assets**.
   - Use the category breakdown filter to view performance across Languages, Cloud, ML, Databases, and Tools.

3. **Evidence Map Tab:**
   - Search any target skill.
   - Observe the multi-section presence checklist (Summary, Skills, Experience, Projects, Education).
   - Read the real extracted bullet point excerpts validating the candidate's hands-on experience.

4. **Keyword Placement Matrix Tab:**
   - View the cross-sectional distribution matrix tracking the top 15 JD terms across all 5 canonical sections.

5. **Quality & Sections Tab:**
   - Audit contact information (Email, Phone, LinkedIn, GitHub).
   - Review the section health checklist (word count, bullet count, and recommendations).
   - Check ATS formatting heuristics (reading ease, length, keyword stuffing flags).

6. **Bullet Strength Tab:**
   - View percentage rates for **Strong Action Verbs** and **Quantified Outcomes**.
   - Examine each bullet point with its specific linguistic diagnosis and constructive rewrite recommendation.

7. **NLP Pipeline Inspector Tab (Academic Viva Highlight):**
   - Click between the 5 interactive sub-tabs:
     - *1. Preprocessing & Lemmatization:* Raw vs Cleaned tokens and morphological dictionary lemmas.
     - *2. POS Tagging & NER:* Grammatical distribution and classified entities (PERSON, ORG, GPE, DATE, DEGREE, TECH).
     - *3. N-Grams:* Unigrams, bigrams, and trigrams.
     - *4. TF-IDF Vectors:* Top terms with TF, smoothed IDF, and final weight tables.
     - *5. Cosine Similarity Math:* Mathematical formula display showing dot product, vector L2 norms, and cosine similarity.

8. **Interview Prep Tab:**
   - Review the 5–8 targeted interview questions generated deterministically from candidate project excerpts, skills, and identified gaps.
   - Click to expand each question and inspect the **Interviewer Intent** and **Suggested Candidate Talking Points**.

### Step 3: Resume Version Comparison (A/B Testing)
- Navigate to `/comparison` in the top navbar.
- Compare **Resume Draft 1 (Original)** against **Resume Draft 2 (Tailored)**.
- Observe the side-by-side metric deltas (+% score increase, added skills, removed terms, and section shifts).

### Step 4: Exporting the Report
- On the analysis dashboard, click **Print / PDF** to generate an executive printable audit report, or click **Export JSON Data** to download the structured analysis payload.

---

## 3. Academic Python Reference Layer Demonstration

In a separate terminal window:

```bash
# Navigate to the Python reference layer
cd python-nlp

# Run the 7 unit tests
python3 -m unittest discover -s tests -p '*_test.py'

# Run the benchmark evaluation experiment
python3 evaluation.py
```
