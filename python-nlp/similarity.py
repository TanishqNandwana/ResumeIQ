"""
ResumeIQ Academic NLP Reference Layer — Similarity & Vector Space Models
Demonstrating:
- Bag-of-Words (BoW)
- Term Frequency - Inverse Document Frequency (TF-IDF)
- Cosine Similarity
- Semantic representation
"""

import math
from typing import Dict, Any, List
from preprocessing import tokenize_text, remove_stopwords


def compute_bow_and_tfidf(doc_a: str, doc_b: str) -> Dict[str, Any]:
    """
    Compute TF-IDF and Cosine Similarity using scikit-learn if available,
    with a pure Python mathematical fallback.
    """
    try:
        from sklearn.feature_extraction.text import TfidfVectorizer
        from sklearn.metrics.pairwise import cosine_similarity

        vectorizer = TfidfVectorizer(stop_words="english")
        tfidf_matrix = vectorizer.fit_transform([doc_a, doc_b])
        feature_names = vectorizer.get_feature_names_out()

        cosine_sim = float(cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0])

        dense = tfidf_matrix.todense()
        doc_a_scores = dense[0].tolist()[0]
        doc_b_scores = dense[1].tolist()[0]

        top_terms_a = sorted(
            [(feature_names[i], round(doc_a_scores[i], 4)) for i in range(len(feature_names)) if doc_a_scores[i] > 0],
            key=lambda x: x[1],
            reverse=True
        )[:10]

        top_terms_b = sorted(
            [(feature_names[i], round(doc_b_scores[i], 4)) for i in range(len(feature_names)) if doc_b_scores[i] > 0],
            key=lambda x: x[1],
            reverse=True
        )[:10]

        return {
            "cosine_similarity": round(cosine_sim, 4),
            "percentage": round(cosine_sim * 100, 1),
            "top_terms_resume": top_terms_a,
            "top_terms_jd": top_terms_b,
            "engine": "scikit-learn TfidfVectorizer"
        }
    except Exception:
        # Pure Python Vector Space Model
        tokens_a = remove_stopwords(tokenize_text(doc_a))
        tokens_b = remove_stopwords(tokenize_text(doc_b))

        tf_a = {}
        for t in tokens_a:
            tf_a[t] = tf_a.get(t, 0) + 1
        for k in tf_a:
            tf_a[k] /= len(tokens_a) if tokens_a else 1

        tf_b = {}
        for t in tokens_b:
            tf_b[t] = tf_b.get(t, 0) + 1
        for k in tf_b:
            tf_b[k] /= len(tokens_b) if tokens_b else 1

        vocab = set(tf_a.keys()).union(set(tf_b.keys()))
        N = 2
        idf = {}
        for w in vocab:
            df = (1 if w in tf_a else 0) + (1 if w in tf_b else 0)
            idf[w] = math.log((1 + N) / (1 + df)) + 1.0

        vec_a = {w: tf_a.get(w, 0) * idf[w] for w in vocab}
        vec_b = {w: tf_b.get(w, 0) * idf[w] for w in vocab}

        dot = sum(vec_a[w] * vec_b[w] for w in vocab)
        norm_a = math.sqrt(sum(v * v for v in vec_a.values()))
        norm_b = math.sqrt(sum(v * v for v in vec_b.values()))

        cos = dot / (norm_a * norm_b) if (norm_a > 0 and norm_b > 0) else 0.0
        return {
            "cosine_similarity": round(cos, 4),
            "percentage": round(cos * 100, 1),
            "top_terms_resume": sorted(vec_a.items(), key=lambda x: x[1], reverse=True)[:10],
            "top_terms_jd": sorted(vec_b.items(), key=lambda x: x[1], reverse=True)[:10],
            "engine": "Pure Python TF-IDF"
        }
