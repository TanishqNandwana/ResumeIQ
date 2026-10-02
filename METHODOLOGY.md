# ResumeIQ Methodology

1. Extract text from the resume.
2. Normalize and preprocess resume and job-description text.
3. Detect common resume sections.
4. Extract entities and skills.
5. Normalize aliases such as ML → Machine Learning.
6. Compute keyword overlap.
7. Compute TF-IDF vectors.
8. Compute cosine similarity.
9. Compute semantic similarity using Word2Vec in the Python reference layer and a lightweight equivalent in production where required.
10. Build the evidence map.
11. Calculate the transparent Match Score.
12. Run resume quality heuristics.
13. Generate interview questions.
14. Compare versions when two resumes are provided.

Default score:

35% Skill Match
25% Keyword Coverage
20% TF-IDF Similarity
10% Semantic Similarity
10% Resume Completeness

All weights must be configurable.
