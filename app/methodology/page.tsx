'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Cpu, Layers, Binary, CheckCircle2, ShieldAlert, ArrowLeft, Terminal, GitBranch } from 'lucide-react';

export default function MethodologyPage() {
  const courseMappings = [
    { topic: 'Text Preprocessing & Normalization', method: 'Lowercasing, HTML tag stripping, regex token boundaries preserving technical terms (C++, C#, .NET).' },
    { topic: 'Stopword Removal', method: 'Custom curated English stopword dictionary filtering non-informative functional words.' },
    { topic: 'Stemming & Lemmatization', method: 'Porter stemmer reduction + morphological irregular lookup for technical domain terms.' },
    { topic: 'Regular Expressions (Regex)', method: 'Contextual pattern matchers for emails, phone numbers, timeline dates, and degrees.' },
    { topic: 'Part-of-Speech (POS) Tagging', method: 'Rule-based heuristic POS tagger identifying NOUN, VERB, ADJ, ADV, NUM, ADP.' },
    { topic: 'Named Entity Recognition (NER)', method: 'Contextual entity classification into PERSON, ORG, GPE, DATE, DEGREE, and TECH.' },
    { topic: 'Bag of Words (BoW)', method: 'Term occurrence vectors over joint document vocabulary.' },
    { topic: 'TF-IDF (Term Frequency - Inverse Document Frequency)', method: 'Smoothed IDF formulation: ln((1 + N) / (1 + df)) + 1 with relative term frequency.' },
    { topic: 'Vector Space Model & Cosine Similarity', method: 'L2-normalized inner product: (A · B) / (||A|| × ||B||).' },
    { topic: 'N-Grams Language Modeling', method: 'Unigram, bigram, and trigram sliding window frequency distributions.' },
    { topic: 'Semantic Word Embeddings', method: 'Concept cluster projection in production TypeScript and Word2Vec/Gensim in Python reference layer.' },
    { topic: 'Information Extraction (IE)', method: 'Extraction of structured skills, candidate contact info, and bullet points from unstructured resume text.' },
    { topic: 'Information Retrieval (IR)', method: 'Evidence retrieval matching target JD requirements with relevant resume bullet excerpts.' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Top Header */}
      <div className="space-y-4 border-b border-slate-200 pb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Application
        </Link>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Semester VII Natural Language Processing Mini-Project</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Methodology & Mathematical Formulations
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
          Comprehensive technical documentation of the natural language processing pipelines, mathematical equations, domain taxonomies, and architectural design principles powering ResumeIQ.
        </p>
      </div>

      {/* 1. Course Mapping Table */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-bold text-slate-900">1. NLP Course Syllabus Mapping</h2>
        </div>
        <p className="text-xs text-slate-600">
          Every component in ResumeIQ is deliberately grounded in standard NLP coursework modules.
        </p>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-bold text-[11px]">
                <th className="py-3 px-4">Course Topic</th>
                <th className="py-3 px-4">ResumeIQ Implementation Technique</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {courseMappings.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60">
                  <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                    {row.topic}
                  </td>
                  <td className="py-3 px-4 text-slate-600 leading-relaxed">{row.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Mathematical Equations */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Binary className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-bold text-slate-900">2. Mathematical Formulations</h2>
        </div>

        {/* Formula 1: Explainable Match Score */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-slate-900">A. Explainable ResumeIQ Match Score</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            The composite match score is a weighted linear combination of five transparent linguistic indicators:
          </p>
          <div className="p-4 rounded-xl bg-slate-900 text-indigo-300 font-mono text-center text-xs sm:text-sm">
            MatchScore = w<sub>1</sub>(SkillMatch) + w<sub>2</sub>(KeywordCoverage) + w<sub>3</sub>(TFIDF_Cosine) + w<sub>4</sub>(SemanticSimilarity) + w<sub>5</sub>(Completeness)
          </div>
          <p className="text-xs text-slate-500">
            Default baseline weights: w<sub>1</sub>=0.35, w<sub>2</sub>=0.25, w<sub>3</sub>=0.20, w<sub>4</sub>=0.10, w<sub>5</sub>=0.10 (normalized to &sum;w = 1.0).
          </p>
        </div>

        {/* Formula 2: TF-IDF & Cosine */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-slate-900">B. Smoothed TF-IDF & Cosine Similarity</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Term Frequency (TF) measures the relative occurrence of term <em>t</em> in document <em>d</em>:
          </p>
          <div className="p-3 rounded-xl bg-slate-900 text-indigo-300 font-mono text-center text-xs">
            TF(t, d) = count(t, d) / &sum;<sub>t&prime; &isin; d</sub> count(t&prime;, d)
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Inverse Document Frequency (IDF) with scikit-learn compatible smoothing prevents zero-division:
          </p>
          <div className="p-3 rounded-xl bg-slate-900 text-indigo-300 font-mono text-center text-xs">
            IDF(t) = ln( (1 + N) / (1 + df(t)) ) + 1.0
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Cosine Similarity between the resume vector <strong>A</strong> and job description vector <strong>B</strong>:
          </p>
          <div className="p-4 rounded-xl bg-slate-900 text-indigo-300 font-mono text-center text-xs sm:text-sm">
            Cosine(A, B) = ( A · B ) / ( ||A||<sub>2</sub> × ||B||<sub>2</sub> ) = &sum;(A<sub>i</sub> B<sub>i</sub>) / ( &radic;&sum;A<sub>i</sub><sup>2</sup> &radic;&sum;B<sub>i</sub><sup>2</sup> )
          </div>
        </div>
      </section>

      {/* 3. Dual Architecture */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-bold text-slate-900">3. Production vs Academic Architecture</h2>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            To satisfy the engineering constraints of Vercel serverless execution without runtime latency penalties, ResumeIQ follows a decoupled dual-layer architecture:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-2">
              <h4 className="text-xs font-bold text-blue-900 uppercase">Production Layer (Vercel Serverless)</h4>
              <ul className="text-xs text-blue-800 space-y-1 list-disc pl-4">
                <li>Next.js 14 App Router + TypeScript</li>
                <li>Pure TypeScript NLP tokenization & stemming</li>
                <li>Heuristic POS tagging & rule-based NER</li>
                <li>Real-time smoothed TF-IDF & Cosine math</li>
                <li>In-memory PDF text extraction via pdf-parse</li>
                <li>Sub-50ms execution latency on Vercel</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-200 space-y-2">
              <h4 className="text-xs font-bold text-indigo-900 uppercase">Academic Reference Layer (Python)</h4>
              <ul className="text-xs text-indigo-800 space-y-1 list-disc pl-4">
                <li>Located in <code className="font-mono font-bold">python-nlp/</code></li>
                <li>NLTK tokenization, stopwords, & WordNet lemmatizer</li>
                <li>spaCy en_core_web_sm Named Entity Recognition</li>
                <li>scikit-learn TfidfVectorizer & Cosine metrics</li>
                <li>Gensim Word2Vec semantic word vectors</li>
                <li>Automated test suite & synthetic benchmark evaluation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Educational Disclaimer */}
      <section className="bg-amber-50 border border-amber-200 p-6 rounded-2xl space-y-2 text-amber-900">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-600" />
          <h3 className="text-sm font-bold">Educational Ethics & Algorithmic Scope</h3>
        </div>
        <p className="text-xs leading-relaxed text-amber-800">
          The ResumeIQ Match Score is designed strictly as an educational indicator of textual and semantic alignment. Commercial Applicant Tracking Systems (ATS) and human recruiters evaluate candidates across holistic dimensions beyond lexical match, such as portfolio depth, soft skill interactions, and organizational cultural fit. This tool should not be used as an automated hiring gatekeeper.
        </p>
      </section>
    </div>
  );
}
