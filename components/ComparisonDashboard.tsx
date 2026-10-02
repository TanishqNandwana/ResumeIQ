'use client';

import React from 'react';
import { GitCompare, ArrowUpRight, ArrowDownRight, Minus, CheckCircle2, XCircle, FileText, Sparkles } from 'lucide-react';
import { ComparisonResult } from '@/lib/types';

interface ComparisonDashboardProps {
  comparison: ComparisonResult;
}

export default function ComparisonDashboard({ comparison }: ComparisonDashboardProps) {
  const {
    resume1,
    resume2,
    scoreDelta,
    skillMatchDelta,
    keywordDelta,
    tfidfDelta,
    semanticDelta,
    completenessDelta,
    addedSkills,
    removedSkills,
    retainedSkills,
    sectionDifferences,
    summaryVerdict,
  } = comparison;

  const renderDeltaBadge = (delta: number) => {
    if (delta > 0) {
      return (
        <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
          <ArrowUpRight className="w-3.5 h-3.5" /> +{delta}%
        </span>
      );
    }
    if (delta < 0) {
      return (
        <span className="inline-flex items-center gap-0.5 text-xs font-bold text-rose-700 bg-rose-100/70 px-2 py-0.5 rounded-full">
          <ArrowDownRight className="w-3.5 h-3.5" /> {delta}%
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-0.5 text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
        <Minus className="w-3.5 h-3.5" /> 0%
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Executive Summary Card */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 rounded-2xl shadow-sm border border-blue-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-300 text-xs font-bold uppercase tracking-wider mb-1">
              <GitCompare className="w-4 h-4" /> Version Comparison Analysis
            </div>
            <h3 className="text-xl font-bold tracking-tight">Resume V1 vs Resume V2 Comparison</h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-3xl font-black">{scoreDelta >= 0 ? `+${scoreDelta}%` : `${scoreDelta}%`}</div>
              <div className="text-[11px] font-semibold uppercase text-blue-300">Net Score Delta</div>
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-blue-100 bg-white/10 p-3.5 rounded-xl border border-white/10 leading-relaxed">
          {summaryVerdict}
        </p>
      </div>

      {/* Side by Side Score Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Overall Match */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm space-y-2">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Match Score</span>
          <div className="flex items-baseline justify-between">
            <div className="text-lg font-bold text-slate-900 font-mono">
              {resume1.matchScore.overallScore}% → {resume2.matchScore.overallScore}%
            </div>
          </div>
          {renderDeltaBadge(scoreDelta)}
        </div>

        {/* Skill Match */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm space-y-2">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Skill Match</span>
          <div className="flex items-baseline justify-between">
            <div className="text-lg font-bold text-slate-900 font-mono">
              {resume1.matchScore.skillMatchScore}% → {resume2.matchScore.skillMatchScore}%
            </div>
          </div>
          {renderDeltaBadge(skillMatchDelta)}
        </div>

        {/* Keyword Coverage */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm space-y-2">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Keywords</span>
          <div className="flex items-baseline justify-between">
            <div className="text-lg font-bold text-slate-900 font-mono">
              {resume1.matchScore.keywordCoverageScore}% → {resume2.matchScore.keywordCoverageScore}%
            </div>
          </div>
          {renderDeltaBadge(keywordDelta)}
        </div>

        {/* TF-IDF Cosine */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm space-y-2">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">TF-IDF</span>
          <div className="flex items-baseline justify-between">
            <div className="text-lg font-bold text-slate-900 font-mono">
              {resume1.matchScore.tfidfSimilarityScore}% → {resume2.matchScore.tfidfSimilarityScore}%
            </div>
          </div>
          {renderDeltaBadge(tfidfDelta)}
        </div>

        {/* Semantic */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm space-y-2">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Semantic</span>
          <div className="flex items-baseline justify-between">
            <div className="text-lg font-bold text-slate-900 font-mono">
              {resume1.matchScore.semanticSimilarityScore}% → {resume2.matchScore.semanticSimilarityScore}%
            </div>
          </div>
          {renderDeltaBadge(semanticDelta)}
        </div>

        {/* Completeness */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm space-y-2">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Completeness</span>
          <div className="flex items-baseline justify-between">
            <div className="text-lg font-bold text-slate-900 font-mono">
              {resume1.matchScore.completenessScore}% → {resume2.matchScore.completenessScore}%
            </div>
          </div>
          {renderDeltaBadge(completenessDelta)}
        </div>
      </div>

      {/* Added, Removed, and Retained Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Added Skills in V2 */}
        <div className="bg-white rounded-2xl p-5 border border-emerald-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-emerald-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Newly Added Skills in V2 ({addedSkills.length})
            </h4>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              Positive Additions
            </span>
          </div>

          {addedSkills.length === 0 ? (
            <p className="text-xs text-slate-400 py-4 text-center">No new skills added in Version 2.</p>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {addedSkills.map((s) => (
                <span
                  key={s}
                  className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200"
                >
                  +{s}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Removed Skills in V2 */}
        <div className="bg-white rounded-2xl p-5 border border-rose-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-rose-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900 flex items-center gap-1.5">
              <XCircle className="w-4 h-4 text-rose-600" /> Removed Skills in V2 ({removedSkills.length})
            </h4>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-rose-100 text-rose-800">
              Dropped Items
            </span>
          </div>

          {removedSkills.length === 0 ? (
            <p className="text-xs text-slate-400 py-4 text-center">No existing skills dropped in Version 2.</p>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {removedSkills.map((s) => (
                <span
                  key={s}
                  className="text-xs font-bold px-2.5 py-1 rounded-lg bg-rose-50 text-rose-800 border border-rose-200"
                >
                  -{s}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Section Level Differences */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <h4 className="text-sm font-bold text-slate-900">Resume Section Structural Changes</h4>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
                <th className="py-2.5 px-4 font-semibold">Section Name</th>
                <th className="py-2.5 px-4 font-semibold text-center">Version 1</th>
                <th className="py-2.5 px-4 font-semibold text-center">Version 2</th>
                <th className="py-2.5 px-4 font-semibold">Observed Changes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sectionDifferences.map((diff) => (
                <tr key={diff.section} className="hover:bg-slate-50/60 font-medium">
                  <td className="py-2.5 px-4 font-bold text-slate-900">{diff.section}</td>
                  <td className="py-2.5 px-4 text-center">
                    {diff.v1Present ? (
                      <span className="text-emerald-700 font-semibold">Present</span>
                    ) : (
                      <span className="text-slate-400">Missing</span>
                    )}
                  </td>
                  <td className="py-2.5 px-4 text-center">
                    {diff.v2Present ? (
                      <span className="text-emerald-700 font-semibold">Present</span>
                    ) : (
                      <span className="text-slate-400">Missing</span>
                    )}
                  </td>
                  <td className="py-2.5 px-4 text-slate-600">{diff.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
