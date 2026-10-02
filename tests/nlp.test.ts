import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  tokenize,
  removeStopwords,
  stemWord,
  lemmatizeWord,
  tagPos,
  extractNamedEntities,
  extractNgrams,
} from '../lib/nlp/preprocessor';

describe('NLP Preprocessor Test Suite', () => {
  it('correctly tokenizes technical symbols like C++, C#, .NET, and Node.js', () => {
    const text = 'Senior Engineer experienced in C++, C#, .NET, Python, and Node.js microservices.';
    const tokens = tokenize(text);

    assert.ok(tokens.includes('c++'), 'Should preserve c++');
    assert.ok(tokens.includes('c#'), 'Should preserve c#');
    assert.ok(tokens.includes('.net'), 'Should preserve .net');
    assert.ok(tokens.includes('python'), 'Should preserve python');
    assert.ok(tokens.includes('node.js'), 'Should preserve node.js');
  });

  it('removes standard English stopwords while keeping meaningful tokens', () => {
    const tokens = ['the', 'candidate', 'is', 'skilled', 'in', 'python', 'and', 'distributed', 'systems'];
    const clean = removeStopwords(tokens);

    assert.ok(!clean.includes('the'), 'Should remove "the"');
    assert.ok(!clean.includes('is'), 'Should remove "is"');
    assert.ok(!clean.includes('in'), 'Should remove "in"');
    assert.ok(!clean.includes('and'), 'Should remove "and"');
    assert.ok(clean.includes('candidate'), 'Should retain "candidate"');
    assert.ok(clean.includes('python'), 'Should retain "python"');
    assert.ok(clean.includes('distributed'), 'Should retain "distributed"');
  });

  it('correctly stems and lemmatizes technical and action verbs', () => {
    assert.strictEqual(lemmatizeWord('engineered'), 'engineer');
    assert.strictEqual(lemmatizeWord('developed'), 'develop');
    assert.strictEqual(lemmatizeWord('optimizing'), 'optimize');
    assert.strictEqual(lemmatizeWord('databases'), 'database');
    assert.strictEqual(lemmatizeWord('pipelines'), 'pipeline');
  });

  it('tags parts of speech with appropriate grammatical categories', () => {
    assert.strictEqual(tagPos('Python'), 'NOUN');
    assert.strictEqual(tagPos('engineered'), 'VERB');
    assert.strictEqual(tagPos('scalable'), 'ADJ');
    assert.strictEqual(tagPos('95%'), 'NUM');
  });

  it('extracts named entities including DEGREE, DATE, GPE, and TECH', () => {
    const sample = `
Alex Mercer
San Francisco, CA | alex@example.com
Bachelor of Science in Computer Science | 2018 - 2022
Worked at Apex AI Technologies deploying Python and Kubernetes microservices.
    `;
    const entities = extractNamedEntities(sample);
    const labels = entities.map((e) => e.label);

    assert.ok(labels.includes('DEGREE'), 'Should identify academic degree');
    assert.ok(labels.includes('DATE'), 'Should identify timeline date');
    assert.ok(labels.includes('GPE'), 'Should identify location');
    assert.ok(labels.includes('TECH'), 'Should identify technology entity');
  });

  it('generates n-grams (unigrams, bigrams, trigrams)', () => {
    const tokens = ['natural', 'language', 'processing', 'deep', 'learning'];
    const unigrams = extractNgrams(tokens, 1);
    const bigrams = extractNgrams(tokens, 2);
    const trigrams = extractNgrams(tokens, 3);

    assert.strictEqual(unigrams.length, 5);
    assert.strictEqual(bigrams.length, 4);
    assert.strictEqual(trigrams.length, 3);
    assert.strictEqual(bigrams[0].text, 'natural language');
    assert.strictEqual(trigrams[0].text, 'natural language processing');
  });
});
