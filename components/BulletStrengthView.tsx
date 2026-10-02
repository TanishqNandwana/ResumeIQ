'use client';

import React from 'react';
import { Target, Zap, TrendingUp, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';
import { BulletSummary } from '@/lib/types';

interface BulletStrengthViewProps {
  bulletStrength: BulletSummary;
}

export default function BulletStrengthView({ bulletStrength }: BulletStrengthViewProps) {
  const { totalBullets, strongBullets, needsImprovement, metricsPercentage, actionVerbPercentage, bullets } = bulletStrength;

  return (
    <div className="space-y-6">
      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-sm">
          <div className="text-2xl font-bold text-slate-900">{totalBullets}</div>
          <div className="text-xs text-slate-500 font-medium">Total Bullets Extracted</div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-sm">
          <div className="text-2xl font-bold text-emerald-600">{strongBullets}</div>
          <div className="text-xs text-slate-500 font-medium">Strong High-Impact Bullets</div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-sm">
          <div className="text-2xl font-bold text-blue-600">{actionVerbPercentage}%</div>
          <div className="text-xs text-slate-500 font-medium">Strong Action Verb Rate</div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-sm">
          <div className="text-2xl font-bold text-indigo-600">{metricsPercentage}%</div>
          <div className="text-xs text-slate-500 font-medium">Quantified Outcomes Rate</div>
        </div>
      </div>

      {/* Bullets List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Target className="w-4 h-4 text-blue-600" />
            Detailed Bullet-by-Bullet Evaluation
          </h3>
          <span className="text-xs text-slate-500">
            Assessed for active verbs, metrics, and concise engineering impact.
          </span>
        </div>

        {bullets.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center text-slate-400">
            No bullet points detected in the provided resume. Experience and projects should be structured using bullet points.
          </div>
        ) : (
          <div className="space-y-3">
            {bullets.map((b, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow space-y-3"
              >
                {/* Header row */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {b.section}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {b.wordCount} words
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                        b.status === 'Strong'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : b.status === 'Needs Improvement'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}
                    >
                      {b.status} ({b.score}/100)
                    </span>
                  </div>
                </div>

                {/* Original Bullet */}
                <p className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed bg-slate-50/70 p-3 rounded-xl border border-slate-200/60">
                  {b.bulletText}
                </p>

                {/* Linguistic Indicators */}
                <div className="flex flex-wrap gap-2 text-[11px]">
                  {/* Action verb */}
                  {b.actionVerb ? (
                    <span
                      className={`px-2 py-0.5 rounded-md flex items-center gap-1 ${
                        b.actionVerb.isStrong
                          ? 'bg-emerald-100/80 text-emerald-800'
                          : 'bg-amber-100/80 text-amber-800'
                      }`}
                    >
                      <Zap className="w-3 h-3" />
                      Verb: &ldquo;{b.actionVerb.verb}&rdquo; ({b.actionVerb.isStrong ? 'Strong' : 'Weak'})
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 flex items-center gap-1">
                      No leading action verb
                    </span>
                  )}

                  {/* Measurable outcomes */}
                  {b.hasMeasurableOutcome ? (
                    <span className="px-2 py-0.5 rounded-md bg-indigo-100/80 text-indigo-800 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Quantified: {b.metricsFound.join(', ')}
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Missing measurable metrics
                    </span>
                  )}

                  {/* Passive voice */}
                  {b.isPassive && (
                    <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-800">
                      Passive voice detected
                    </span>
                  )}
                </div>

                {/* Actionable Suggestion */}
                <div className="pt-2 border-t border-slate-100 text-xs text-slate-600 flex items-start gap-1.5">
                  <span className="font-semibold text-blue-600 shrink-0">Recommendation:</span>
                  <span>{b.suggestion}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
