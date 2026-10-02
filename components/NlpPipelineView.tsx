'use client';

import React, { useState } from 'react';
import { Cpu, Terminal, Sparkles, Binary, Hash, FileCode, Calculator, BookOpen, Layers } from 'lucide-react';
import { NlpPipelineDetails } from '@/lib/types';

interface NlpPipelineViewProps {
  nlpPipeline: NlpPipelineDetails;
}

export default function NlpPipelineView({ nlpPipeline }: NlpPipelineViewProps) {
  const [activeSubTab, setActiveSubTab] = useState<'preprocessing' | 'pos_ner' | 'ngrams' | 'tfidf' | 'cosine_math'>('preprocessing');

  const {
    resumeRaw,
    jdRaw,
    resumeTokensCount,
    jdTokensCount,
    resumeCleanTokensCount,
    jdCleanTokensCount,
    sampleLemmas,
    posDistribution,
    namedEntities,
    topTfidfResume,
    topTfidfJd,
    commonTopTerms,
    ngrams,
    cosineMath,
    semanticSimilarity,
  } = nlpPipeline;

  return (
    <div className="space-y-6">
      {/* Top Academic Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-2xl shadow-sm border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold tracking-wider uppercase mb-1">
              <Cpu className="w-4 h-4" /> Academic NLP Execution Pipeline
            </div>
            <h3 className="text-xl font-bold tracking-tight">Interactive Pipeline Inspector</h3>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Inspect step-by-step natural language processing stages: tokenization, stopword removal, morphological lemmatization, rule-based POS tagging, NER extraction, and vector space cosine mathematics.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs px-3 py-1.5 rounded-lg bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 font-mono">
              Tokens: {resumeTokensCount} raw → {resumeCleanTokensCount} clean
            </span>
          </div>
        </div>

        {/* Sub-tab navigation */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800/80 overflow-x-auto">
          {[
            { id: 'preprocessing', label: '1. Preprocessing & Lemmatization' },
            { id: 'pos_ner', label: '2. POS Tagging & NER' },
            { id: 'ngrams', label: '3. N-Grams (1, 2, 3)' },
            { id: 'tfidf', label: '4. TF-IDF Vectors' },
            { id: 'cosine_math', label: '5. Cosine Similarity Math' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeSubTab === tab.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sub-tab 1: Preprocessing & Lemmatization */}
      {activeSubTab === 'preprocessing' && (
        <div className="space-y-6">
          {/* Comparison Cards: Raw vs Cleaned */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Raw Resume Text Excerpt
                </span>
                <span className="text-xs font-mono text-slate-400">{resumeTokensCount} tokens</span>
              </div>
              <p className="text-xs font-mono text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/60 max-h-48 overflow-y-auto leading-relaxed">
                {resumeRaw}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Target Job Description Excerpt
                </span>
                <span className="text-xs font-mono text-slate-400">{jdTokensCount} tokens</span>
              </div>
              <p className="text-xs font-mono text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/60 max-h-48 overflow-y-auto leading-relaxed">
                {jdRaw}
              </p>
            </div>
          </div>

          {/* Morphological Lemmatization Samples Table */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Sample Token Normalization & Morphological Lemmatization
                </h4>
                <p className="text-xs text-slate-500">
                  Demonstrating surface form reduction to canonical dictionary lemmas and POS classification.
                </p>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                Porter / Morphological Rules
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
                    <th className="py-2.5 px-4 font-semibold">Surface Token (Raw)</th>
                    <th className="py-2.5 px-4 font-semibold">Normalized Token</th>
                    <th className="py-2.5 px-4 font-semibold">Canonical Lemma</th>
                    <th className="py-2.5 px-4 font-semibold">POS Category</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {sampleLemmas.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60">
                      <td className="py-2 px-4 text-slate-900 font-bold">{item.original}</td>
                      <td className="py-2 px-4 text-slate-600">{item.token}</td>
                      <td className="py-2 px-4 text-blue-700 font-semibold">{item.lemma}</td>
                      <td className="py-2 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-indigo-50 text-indigo-700 font-bold border border-indigo-200">
                          {item.pos}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Sub-tab 2: POS Tagging & NER */}
      {activeSubTab === 'pos_ner' && (
        <div className="space-y-6">
          {/* POS Distribution Breakdown */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900">Part-of-Speech (POS) Distribution</h4>
              <p className="text-xs text-slate-500">
                Linguistic tag frequency calculated across extracted resume content.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {posDistribution.map((item) => (
                <div key={item.pos} className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 font-mono">{item.pos}</span>
                    <span className="text-xs font-semibold text-slate-600">{item.count} tokens ({item.percentage}%)</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Named Entity Recognition (NER) */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Named Entity Recognition (NER)</h4>
                <p className="text-xs text-slate-500">
                  Entities extracted and labeled by semantic type (Person, Organization, Location, Date, Degree, Technology).
                </p>
              </div>
              <span className="text-xs font-semibold text-slate-400">
                {namedEntities.length} Entities Classified
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {namedEntities.map((ent, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl border border-slate-200/70 bg-white shadow-xs space-y-1.5 hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 truncate mr-2">{ent.text}</span>
                    <span
                      className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shrink-0 ${
                        ent.label === 'PERSON'
                          ? 'bg-purple-100 text-purple-800'
                          : ent.label === 'ORG'
                          ? 'bg-blue-100 text-blue-800'
                          : ent.label === 'GPE'
                          ? 'bg-emerald-100 text-emerald-800'
                          : ent.label === 'DATE'
                          ? 'bg-amber-100 text-amber-800'
                          : ent.label === 'DEGREE'
                          ? 'bg-indigo-100 text-indigo-800'
                          : 'bg-cyan-100 text-cyan-800'
                      }`}
                    >
                      {ent.label}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">{ent.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sub-tab 3: N-Grams */}
      {activeSubTab === 'ngrams' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Unigrams */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-blue-600" /> Top Unigrams (N=1)
            </h4>
            <div className="space-y-1.5 font-mono text-xs">
              {ngrams.unigrams.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                  <span className="text-slate-800 font-semibold">{item.text}</span>
                  <span className="text-slate-500 text-[11px]">{item.count}x</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bigrams */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-indigo-600" /> Top Bigrams (N=2)
            </h4>
            <div className="space-y-1.5 font-mono text-xs">
              {ngrams.bigrams.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                  <span className="text-slate-800 font-semibold">{item.text}</span>
                  <span className="text-slate-500 text-[11px]">{item.count}x</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trigrams */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-purple-600" /> Top Trigrams (N=3)
            </h4>
            <div className="space-y-1.5 font-mono text-xs">
              {ngrams.trigrams.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                  <span className="text-slate-800 font-semibold">{item.text}</span>
                  <span className="text-slate-500 text-[11px]">{item.count}x</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sub-tab 4: TF-IDF Vectors */}
      {activeSubTab === 'tfidf' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Resume TF-IDF */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Top TF-IDF Terms — Resume Vector
                </h4>
                <span className="text-[11px] text-slate-400 font-mono">Smoothed IDF</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-100 text-[10px] uppercase font-mono">
                      <th className="py-2">Term</th>
                      <th className="py-2 text-right">TF</th>
                      <th className="py-2 text-right">IDF</th>
                      <th className="py-2 text-right font-bold text-blue-600">TF-IDF</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {topTfidfResume.map((t) => (
                      <tr key={t.term} className="hover:bg-slate-50/50">
                        <td className="py-1.5 font-semibold text-slate-800">{t.term}</td>
                        <td className="py-1.5 text-right text-slate-500">{t.tf}</td>
                        <td className="py-1.5 text-right text-slate-500">{t.idf}</td>
                        <td className="py-1.5 text-right font-bold text-blue-600">{t.tfidf}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top JD TF-IDF */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Top TF-IDF Terms — Target JD Vector
                </h4>
                <span className="text-[11px] text-slate-400 font-mono">Smoothed IDF</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-100 text-[10px] uppercase font-mono">
                      <th className="py-2">Term</th>
                      <th className="py-2 text-right">TF</th>
                      <th className="py-2 text-right">IDF</th>
                      <th className="py-2 text-right font-bold text-indigo-600">TF-IDF</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {topTfidfJd.map((t) => (
                      <tr key={t.term} className="hover:bg-slate-50/50">
                        <td className="py-1.5 font-semibold text-slate-800">{t.term}</td>
                        <td className="py-1.5 text-right text-slate-500">{t.tf}</td>
                        <td className="py-1.5 text-right text-slate-500">{t.idf}</td>
                        <td className="py-1.5 text-right font-bold text-indigo-600">{t.tfidf}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sub-tab 5: Cosine Similarity Math */}
      {activeSubTab === 'cosine_math' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-6">
            <div>
              <h4 className="text-base font-bold text-slate-900">Vector Space Model Cosine Similarity</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Exact mathematical formulation used to calculate statistical document alignment between Resume vector (A) and JD vector (B).
              </p>
            </div>

            {/* Formula display */}
            <div className="p-4 rounded-xl bg-slate-900 text-white font-mono text-center space-y-2">
              <div className="text-sm text-indigo-300">
                cos(&theta;) = ( A · B ) / ( ||A|| × ||B|| )
              </div>
              <div className="text-xs text-slate-400">
                = &sum;(A<sub>i</sub> × B<sub>i</sub>) / ( &radic;&sum;(A<sub>i</sub><sup>2</sup>) × &radic;&sum;(B<sub>i</sub><sup>2</sup>) )
              </div>
            </div>

            {/* Calculated Values */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-xs font-semibold text-slate-500">Dot Product (A · B)</div>
                <div className="text-xl font-bold font-mono text-slate-900 mt-1">{cosineMath.dotProduct}</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-xs font-semibold text-slate-500">L2 Norm Resume ||A||</div>
                <div className="text-xl font-bold font-mono text-slate-900 mt-1">{cosineMath.normA}</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-xs font-semibold text-slate-500">L2 Norm JD ||B||</div>
                <div className="text-xl font-bold font-mono text-slate-900 mt-1">{cosineMath.normB}</div>
              </div>

              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-center">
                <div className="text-xs font-semibold text-blue-700">Cosine Similarity</div>
                <div className="text-xl font-bold font-mono text-blue-900 mt-1">{cosineMath.cosineSimilarity} ({Math.round(cosineMath.cosineSimilarity * 100)}%)</div>
              </div>
            </div>

            {/* Semantic Domain Alignment */}
            <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/50 space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <h5 className="text-xs font-bold text-indigo-950 uppercase tracking-wider">
                  Semantic Concept Vector Alignment
                </h5>
              </div>
              <p className="text-xs text-indigo-900 leading-relaxed">
                {semanticSimilarity.explanation}
              </p>
              {semanticSimilarity.overlappingSemanticClusters.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {semanticSimilarity.overlappingSemanticClusters.map((cluster) => (
                    <span
                      key={cluster}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200"
                    >
                      {cluster}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
