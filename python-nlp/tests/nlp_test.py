import unittest
import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from preprocessing import clean_text, tokenize_text, remove_stopwords, stem_words, lemmatize_words, pos_tag_tokens
from extraction import extract_contact_info, extract_skills, extract_sections
from similarity import compute_bow_and_tfidf


class TestAcademicNlpPipeline(unittest.TestCase):

    def test_text_cleaning_and_tokenization(self):
        sample = "<p>Experienced software engineer proficient in C++, Python, and Node.js.</p>"
        cleaned = clean_text(sample)
        self.assertNotIn("<p>", cleaned)
        self.assertNotIn("</p>", cleaned)

        tokens = tokenize_text(cleaned)
        self.assertIn("c++", tokens)
        self.assertIn("python", tokens)
        self.assertIn("node.js", tokens)

    def test_stopword_removal(self):
        tokens = ["the", "candidate", "is", "skilled", "in", "python"]
        clean = remove_stopwords(tokens)
        self.assertNotIn("the", clean)
        self.assertNotIn("is", clean)
        self.assertNotIn("in", clean)
        self.assertIn("candidate", clean)
        self.assertIn("python", clean)

    def test_stemming_and_lemmatization(self):
        tokens = ["engineered", "optimizing", "models"]
        stemmed = stem_words(tokens)
        self.assertTrue(len(stemmed) == 3)

        lemmas = lemmatize_words(tokens)
        self.assertTrue(len(lemmas) == 3)

    def test_pos_tagging(self):
        tokens = ["python", "engineered", "scalable", "quickly"]
        tagged = pos_tag_tokens(tokens)
        self.assertEqual(len(tagged), 4)

    def test_contact_info_extraction(self):
        sample = "John Doe | john.doe@example.com | (555) 123-4567 | linkedin.com/in/johndoe | github.com/johndoe"
        contact = extract_contact_info(sample)
        self.assertEqual(contact["email"], "john.doe@example.com")
        self.assertEqual(contact["phone"], "(555) 123-4567")
        self.assertIn("linkedin.com/in/johndoe", contact["linkedin"])
        self.assertIn("github.com/johndoe", contact["github"])

    def test_skill_extraction_and_alias_mapping(self):
        sample = "Proficient in py, k8s, postgres, and aws cloud services."
        skills = extract_skills(sample)
        canonicals = [s["canonical"] for s in skills]
        self.assertIn("Python", canonicals)
        self.assertIn("Kubernetes", canonicals)
        self.assertIn("SQL", canonicals)
        self.assertIn("AWS", canonicals)

    def test_similarity_calculation(self):
        doc_a = "Senior Machine Learning Engineer proficient in Python, PyTorch, and TensorFlow."
        doc_b = "Looking for an ML engineer with strong Python and PyTorch skills."
        result = compute_bow_and_tfidf(doc_a, doc_b)
        self.assertGreater(result["cosine_similarity"], 0.2)
        self.assertLessEqual(result["cosine_similarity"], 1.0)


if __name__ == "__main__":
    unittest.main()
