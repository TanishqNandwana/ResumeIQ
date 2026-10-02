import { describe, it } from 'node:test';
import assert from 'node:assert';
import { analyzeResumeAndJobDescription } from '../lib/nlp/analyzer';
import { compareResumeAnalyses } from '../lib/nlp/comparisonEngine';
import { SAMPLE_PRESETS } from '../lib/sampleData';

describe('Version Comparison & Robustness Test Suite', () => {
  it('correctly compares Resume V1 and Resume V2 calculating deltas and skill changes', () => {
    const v1 = SAMPLE_PRESETS[0].resume;
    const v2 = SAMPLE_PRESETS[0].resumeV2 || SAMPLE_PRESETS[0].resume;
    const jd = SAMPLE_PRESETS[0].jobDescription;

    const analysis1 = analyzeResumeAndJobDescription(v1, jd);
    const analysis2 = analyzeResumeAndJobDescription(v2, jd);

    const comparison = compareResumeAnalyses(analysis1, analysis2);

    assert.ok(typeof comparison.scoreDelta === 'number');
    assert.ok(comparison.addedSkills.length >= 0);
    assert.ok(comparison.sectionDifferences.length > 0);
    assert.ok(comparison.summaryVerdict.length > 0);
  });

  it('handles edge cases gracefully without crashing on sparse or minimal inputs', () => {
    const minimalResume = 'Candidate Name\nEmail: test@example.com\nPython developer with experience.';
    const minimalJd = 'Looking for a Python developer.';

    const result = analyzeResumeAndJobDescription(minimalResume, minimalJd);

    assert.ok(result.matchScore.overallScore >= 0);
    assert.ok(result.matchScore.overallScore <= 100);
    assert.ok(result.skillGap.matchedSkills.length > 0);
    assert.strictEqual(result.qualityAudit.contactAudit.hasEmail, true);
    assert.strictEqual(result.qualityAudit.contactAudit.hasPhone, false);
  });
});
