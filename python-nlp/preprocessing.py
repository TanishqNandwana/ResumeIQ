"""
ResumeIQ Academic NLP Reference Layer — Text Preprocessing Module
Demonstrating:
- Text normalization & cleaning
- Tokenization
- Stopword removal
- Porter Stemming
- Lemmatization
- Part-of-Speech (POS) Tagging
"""

import re
from typing import List, Tuple

# Standard English stopwords fallback
FALLBACK_STOPWORDS = {
    'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are',
    'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by',
    'can', 'could', 'did', 'do', 'does', 'doing', 'down', 'during', 'each', 'few', 'for', 'from',
    'further', 'had', 'has', 'have', 'having', 'he', 'her', 'here', 'hers', 'herself', 'him',
    'himself', 'his', 'how', 'i', 'if', 'in', 'into', 'is', 'it', 'its', 'itself', 'just', 'me',
    'more', 'most', 'my', 'myself', 'no', 'nor', 'not', 'now', 'of', 'off', 'on', 'once', 'only',
    'or', 'other', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'she', 'should', 'so',
    'some', 'such', 'than', 'that', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there',
    'these', 'they', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was',
    'we', 'were', 'what', 'when', 'where', 'which', 'while', 'who', 'whom', 'why', 'will', 'with', 'you'
}


def clean_text(text: str) -> str:
    """Normalize text: strip HTML, lowercase, normalize whitespace."""
    if not text:
        return ""
    text = re.sub(r"<[^>]*>", " ", text)
    text = re.sub(r"[\r\n\t]+", " ", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip().lower()


def tokenize_text(text: str) -> List[str]:
    """
    Tokenize text preserving technical tokens like C++, C#, .NET, Node.js, and CI/CD.
    """
    if not text:
        return []
    pattern = r"c\+\+|c\#|\.net|ci\/cd|\b[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*\b"
    tokens = re.findall(pattern, text, flags=re.IGNORECASE)
    return [t.lower() for t in tokens]


def remove_stopwords(tokens: List[str]) -> List[str]:
    """Filter out stopwords and single-character non-technical tokens."""
    try:
        import nltk
        from nltk.corpus import stopwords
        try:
            stop_set = set(stopwords.words("english"))
        except LookupError:
            nltk.download("stopwords", quiet=True)
            stop_set = set(stopwords.words("english"))
    except Exception:
        stop_set = FALLBACK_STOPWORDS

    return [t for t in tokens if t not in stop_set and (len(t) > 1 or t in {'c', 'r'})]


def stem_words(tokens: List[str]) -> List[str]:
    """Stem tokens using the Porter Stemmer."""
    try:
        from nltk.stem import PorterStemmer
        stemmer = PorterStemmer()
        return [stemmer.stem(t) for t in tokens]
    except Exception:
        # Simple suffix stripping fallback
        def _simple_stem(w: str) -> str:
            if w.endswith("ing") and len(w) > 4:
                return w[:-3]
            if w.endswith("ed") and len(w) > 4:
                return w[:-2]
            if w.endswith("s") and len(w) > 3 and not w.endswith("ss"):
                return w[:-1]
            return w
        return [_simple_stem(t) for t in tokens]


def lemmatize_words(tokens: List[str]) -> List[str]:
    """Lemmatize tokens using WordNet Lemmatizer."""
    try:
        import nltk
        from nltk.stem import WordNetLemmatizer
        try:
            lemmatizer = WordNetLemmatizer()
            lemmatizer.lemmatize("testing")
        except LookupError:
            nltk.download("wordnet", quiet=True)
            nltk.download("omw-1.4", quiet=True)
            lemmatizer = WordNetLemmatizer()
        return [lemmatizer.lemmatize(t) for t in tokens]
    except Exception:
        return tokens


def pos_tag_tokens(tokens: List[str]) -> List[Tuple[str, str]]:
    """Assign Part-of-Speech (POS) tags to tokens."""
    try:
        import nltk
        try:
            return nltk.pos_tag(tokens)
        except LookupError:
            nltk.download("averaged_perceptron_tagger", quiet=True)
            nltk.download("averaged_perceptron_tagger_eng", quiet=True)
            return nltk.pos_tag(tokens)
    except Exception:
        # Rule-based fallback tagger
        tags = []
        for t in tokens:
            if t.endswith("ly"):
                tags.append((t, "RB"))
            elif t.endswith("ing") or t.endswith("ed"):
                tags.append((t, "VB"))
            elif t.endswith("al") or t.endswith("ive") or t.endswith("ous"):
                tags.append((t, "JJ"))
            elif t.isdigit():
                tags.append((t, "CD"))
            else:
                tags.append((t, "NN"))
        return tags


if __name__ == "__main__":
    sample = "The candidate has 4 years of experience in Machine Learning and Python, optimizing PyTorch models."
    print("Original Text:", sample)
    tokens = tokenize_text(sample)
    print("Tokens:", tokens)
    clean = remove_stopwords(tokens)
    print("Clean Tokens:", clean)
    stemmed = stem_words(clean)
    print("Stemmed:", stemmed)
    lemmatized = lemmatize_words(clean)
    print("Lemmatized:", lemmatized)
    pos = pos_tag_tokens(clean)
    print("POS Tags:", pos)
