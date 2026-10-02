import { describe, it } from 'node:test';
import assert from 'node:assert';
import { extractSkillsFromText, computeSkillGap } from '../lib/nlp/skillExtractor';
import { parseResumeSections } from '../lib/nlp/sectionDetector';
import { buildEvidenceMap } from '../lib/nlp/evidenceMapper';

describe('Information Extraction & Skills Taxonomy Test Suite', () => {
  it('correctly maps abbreviations and aliases to canonical skills', () => {
    const text = 'Extensive experience in py, k8s, postgres, ml, and nlp architectures.';
    const skills = extractSkillsFromText(text);
    const canonicals = skills.map((s) => s.canonical);

    assert.ok(canonicals.includes('Python'), 'py should resolve to Python');
    assert.ok(canonicals.includes('Kubernetes'), 'k8s should resolve to Kubernetes');
    assert.ok(canonicals.includes('PostgreSQL'), 'postgres should resolve to PostgreSQL');
    assert.ok(canonicals.includes('Machine Learning'), 'ml should resolve to Machine Learning');
    assert.ok(canonicals.includes('Natural Language Processing'), 'nlp should resolve to Natural Language Processing');
  });

  it('correctly parses standard resume sections and contact information', () => {
    const resume = `
Alex Mercer
San Francisco, CA | alex.mercer@example.com | (555) 234-5678 | linkedin.com/in/alexmercer | github.com/alexmercer

PROFESSIONAL SUMMARY
Results-driven Machine Learning Engineer with 3+ years of experience.

TECHNICAL SKILLS
Python, PyTorch, SQL, Docker, AWS

WORK EXPERIENCE
Machine Learning Engineer | Apex AI Technologies | 2022 - Present
• Engineered distributed NLP pipelines.

TECHNICAL PROJECTS
Crop Yield Predictor
• Built regression model in Python.

EDUCATION
Bachelor of Science in Computer Science
University of California, Berkeley | 2018 - 2022
`;

    const parsed = parseResumeSections(resume);

    assert.strictEqual(parsed.contactInfo.hasEmail, true);
    assert.strictEqual(parsed.contactInfo.details.email, 'alex.mercer@example.com');
    assert.strictEqual(parsed.contactInfo.hasPhone, true);
    assert.strictEqual(parsed.contactInfo.hasLinkedIn, true);
    assert.strictEqual(parsed.contactInfo.hasGitHub, true);

    assert.ok(parsed.sections.summary.length > 0, 'Summary section should be populated');
    assert.ok(parsed.sections.skills.length > 0, 'Skills section should be populated');
    assert.ok(parsed.sections.experience.length > 0, 'Experience section should be populated');
    assert.ok(parsed.sections.projects.length > 0, 'Projects section should be populated');
    assert.ok(parsed.sections.education.length > 0, 'Education section should be populated');
  });

  it('accurately calculates skill gap between candidate skills and JD requirements', () => {
    const resumeSkills = extractSkillsFromText('Proficient in Python, SQL, Docker, and PyTorch.');
    const jdSkills = extractSkillsFromText('Requires Python, SQL, Docker, Kubernetes, and AWS.');

    const gap = computeSkillGap(resumeSkills, jdSkills);

    const matchedNames = gap.matchedSkills.map((s) => s.name);
    const missingNames = gap.missingSkills.map((s) => s.name);

    assert.ok(matchedNames.includes('Python'));
    assert.ok(matchedNames.includes('SQL'));
    assert.ok(matchedNames.includes('Docker'));

    assert.ok(missingNames.includes('Kubernetes'));
    assert.ok(missingNames.includes('AWS'));

    assert.strictEqual(gap.matchRate, 60); // 3 of 5
  });

  it('builds evidence map linking JD requirements to sections and excerpts', () => {
    const jdSkills = [{ canonical: 'Python', category: 'Programming Languages' as const }];
    const sections = {
      summary: 'Proficient software developer with Python experience.',
      skills: 'Python, SQL, Docker',
      experience: 'Engineered Python microservices on AWS.',
      projects: 'Crop Yield Predictor developed in Python.',
      education: 'B.S. in Computer Science',
      certifications: 'AWS Certified',
    };

    const evidence = buildEvidenceMap(jdSkills, sections);
    assert.strictEqual(evidence.length, 1);
    assert.strictEqual(evidence[0].found, true);
    assert.strictEqual(evidence[0].overallEvidenceStrength, 'Strong');
    assert.ok(evidence[0].sections.some((s) => s.sectionName === 'Projects'));
    assert.ok(evidence[0].sections.some((s) => s.sectionName === 'Experience'));
  });
});
