import { describe, it } from 'node:test';
import assert from 'node:assert';
import { computeTfidfAndCosine } from '../lib/nlp/tfidf';
import { calculateMatchScore, DEFAULT_WEIGHTS } from '../lib/nlp/scorer';

describe('TF-IDF & Explainable Scoring Test Suite', () => {
  it('computes TF-IDF vectors and mathematical cosine similarity between documents', () => {
    const resume = 'Senior Machine Learning Engineer skilled in Python, PyTorch, and NLP models.';
    const jd = 'Looking for a Machine Learning Engineer with Python and PyTorch experience.';

    const result = computeTfidfAndCosine(resume, jd);

    assert.ok(result.similarityPercentage > 20, 'Similar technical texts should have positive similarity');
    assert.ok(result.similarityPercentage <= 100, 'Similarity should not exceed 100%');
    assert.ok(result.cosineMath.dotProduct > 0, 'Dot product should be positive');
    assert.ok(result.cosineMath.normA > 0, 'Norm of document A should be positive');
    assert.ok(result.cosineMath.normB > 0, 'Norm of document B should be positive');
    assert.ok(result.topResumeTerms.length > 0, 'Top resume terms should be populated');
  });

  it('calculates the default 5-component Explainable Match Score', () => {
    // 35% Skill Match (80%) + 25% Keyword Coverage (70%) + 20% TF-IDF (60%) + 10% Semantic (70%) + 10% Completeness (90%)
    // = 28 + 17.5 + 12 + 7 + 9 = 73.5 -> 74%
    const score = calculateMatchScore(80, 70, 60, 70, 90, DEFAULT_WEIGHTS);

    assert.strictEqual(score.overallScore, 74);
    assert.strictEqual(score.skillMatchScore, 80);
    assert.strictEqual(score.keywordCoverageScore, 70);
    assert.strictEqual(score.tfidfSimilarityScore, 60);
    assert.strictEqual(score.semanticSimilarityScore, 70);
    assert.strictEqual(score.completenessScore, 90);
    assert.ok(score.explanation.includes('ResumeIQ Match Score (74%)'));
  });

  it('supports custom weight configuration and auto-normalization', () => {
    const customWeights = {
      skillMatch: 50,
      keywordCoverage: 50,
      tfidfSimilarity: 0,
      semanticSimilarity: 0,
      completeness: 0,
    };

    const score = calculateMatchScore(80, 60, 20, 20, 20, customWeights);
    // (80*50 + 60*50)/100 = 70%
    assert.strictEqual(score.overallScore, 70);
  });
});
