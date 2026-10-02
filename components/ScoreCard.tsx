'use client';

import React, { useState } from 'react';
import { Sliders, HelpCircle, CheckCircle2, TrendingUp, Sparkles, BookOpen } from 'lucide-react';
import { MatchScoreBreakdown, WeightConfig } from '@/lib/types';
import ScoreWeightModal from './ScoreWeightModal';

interface ScoreCardProps {
  matchScore: MatchScoreBreakdown;
  onUpdateWeights: (weights: WeightConfig) => void;
}

export default function ScoreCard({ matchScore, onUpdateWeights }: ScoreCardProps) {
  const [isWeightModalOpen, setIsWeightModalOpen] = useState(false);

  const { overallScore, skillMatchScore, keywordCoverageScore, tfidfSimilarityScore, semanticSimilarityScore, completenessScore, weights } = matchScore;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600 bg-emerald-50 border-emerald-200 stroke-emerald-600';
    if (score >= 65) return 'text-blue-600 bg-blue-50 border-blue-200 stroke-blue-600';
    if (score >= 50) return 'text-amber-600 bg-amber-50 border-amber-200 stroke-amber-600';
    return 'text-rose-600 bg-rose-50 border-rose-200 stroke-rose-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-emerald-500';
    if (score >= 65) return 'bg-blue-600';
    if (score >= 50) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  // SVG circular progress calculation
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallScore / 100) * circumference;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all hover:shadow-md">
      {/* Header bar */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 px-6 py-4 text-white flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-semibold tracking-wider uppercase text-blue-300">
              Explainable Scoring Model
            </span>
          </div>
          <h2 className="text-lg font-bold tracking-tight">ResumeIQ Match Score</h2>
          <p className="text-xs text-slate-300">
            An educational NLP-based similarity indicator.
          </p>
        </div>
        <button
          onClick={() => setIsWeightModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/15"
        >
          <Sliders className="w-3.5 h-3.5" />
          Customize Weights
        </button>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Radial Meter */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 border-b lg:border-b-0 lg:border-r border-slate-100">
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  className="stroke-slate-100"
                  strokeWidth="12"
                  fill="transparent"
                />
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  className={`${getScoreColor(overallScore).split(' ')[3]} transition-all duration-1000 ease-out`}
                  strokeWidth="12"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-extrabold tracking-tight text-slate-900">
                  {overallScore}%
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mt-0.5">
                  Match Score
                </span>
              </div>
            </div>

            <div className="mt-3 text-center">
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getScoreColor(overallScore).slice(0, 2)}`}>
                {overallScore >= 80 ? 'Exceptional Fit' : overallScore >= 65 ? 'Competitive Match' : overallScore >= 50 ? 'Moderate Alignment' : 'Significant Gaps'}
              </span>
              <p className="text-[11px] text-slate-500 mt-2 max-w-xs">
                Derived through transparent weighted aggregation of 5 linguistic indicators.
              </p>
            </div>
          </div>

          {/* Sub-Score Breakdown Cards */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Constituent Score Breakdown
              </h3>
              <span className="text-xs text-slate-400">Total Formula: 100%</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Skill Match */}
              <div className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-slate-700">Skill Match</span>
                  <span className="text-xs text-slate-500 font-mono">Weight: {weights.skillMatch}%</span>
                </div>
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-xl font-bold text-slate-900">{skillMatchScore}%</span>
                  <span className="text-[11px] text-slate-500">Overlap with JD skills</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${skillMatchScore}%` }}
                  />
                </div>
              </div>

              {/* Keyword Coverage */}
              <div className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-slate-700">Keyword Coverage</span>
                  <span className="text-xs text-slate-500 font-mono">Weight: {weights.keywordCoverage}%</span>
                </div>
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-xl font-bold text-slate-900">{keywordCoverageScore}%</span>
                  <span className="text-[11px] text-slate-500">Technical vocabulary breadth</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                    style={{ width: `${keywordCoverageScore}%` }}
                  />
                </div>
              </div>

              {/* TF-IDF Similarity */}
              <div className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-slate-700">TF-IDF Cosine Similarity</span>
                  <span className="text-xs text-slate-500 font-mono">Weight: {weights.tfidfSimilarity}%</span>
                </div>
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-xl font-bold text-slate-900">{tfidfSimilarityScore}%</span>
                  <span className="text-[11px] text-slate-500">Statistical term vector match</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                    style={{ width: `${tfidfSimilarityScore}%` }}
                  />
                </div>
              </div>

              {/* Semantic Similarity */}
              <div className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-slate-700">Semantic Alignment</span>
                  <span className="text-xs text-slate-500 font-mono">Weight: {weights.semanticSimilarity}%</span>
                </div>
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-xl font-bold text-slate-900">{semanticSimilarityScore}%</span>
                  <span className="text-[11px] text-slate-500">Domain concept clusters</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-600 rounded-full transition-all duration-500"
                    style={{ width: `${semanticSimilarityScore}%` }}
                  />
                </div>
              </div>

              {/* Resume Completeness */}
              <div className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-colors sm:col-span-2">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-slate-700">Resume Structural Completeness</span>
                  <span className="text-xs text-slate-500 font-mono">Weight: {weights.completeness}%</span>
                </div>
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-xl font-bold text-slate-900">{completenessScore}%</span>
                  <span className="text-[11px] text-slate-500">Contact integrity & section presence</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan-600 rounded-full transition-all duration-500"
                    style={{ width: `${completenessScore}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Formula Explanation Callout */}
            <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200/70 text-xs text-slate-700 flex items-start gap-2">
              <BookOpen className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong>Mathematical Transparency:</strong> {matchScore.explanation}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ScoreWeightModal
        isOpen={isWeightModalOpen}
        onClose={() => setIsWeightModalOpen(false)}
        currentWeights={weights}
        onApplyWeights={onUpdateWeights}
      />
    </div>
  );
}
