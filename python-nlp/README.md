# ResumeIQ — Python Academic NLP Reference Layer

This directory contains the Python NLP reference implementation for ResumeIQ. It serves as an academic experimentation platform and demonstration tool for university evaluations and vivas.

## Directory Structure

```text
python-nlp/
├── preprocessing.py    # Tokenization, Porter stemming, WordNet lemmatization, POS tagging
├── extraction.py       # Regex contact extraction, section segmentation, skill extraction, NER
├── similarity.py       # scikit-learn CountVectorizer, TfidfVectorizer, and Cosine Similarity
├── evaluation.py       # Benchmark evaluation script on synthetic test dataset
├── tests/
│   └── nlp_test.py     # Unit tests verifying NLP modules
└── requirements.txt    # Python dependencies
```

## Setup & Running Locally

1. Create and activate a Python virtual environment:
```bash
python3 -m venv .venv
source .venv/bin/activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the automated test suite:
```bash
python3 -m unittest discover -s tests -p '*_test.py'
```

4. Run the benchmark evaluation experiment:
```bash
python3 evaluation.py
```

## Distinction Between Python Layer and Production Next.js App

- **Production (Vercel Serverless):** Implemented in pure TypeScript within `lib/nlp/` for lightweight, zero-cold-start execution without serverless binary bloat.
- **Academic Reference (Python):** Demonstrates traditional NLTK, spaCy, and scikit-learn workflows for offline evaluation and classroom methodology mapping.
