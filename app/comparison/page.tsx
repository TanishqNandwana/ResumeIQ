'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { GitCompare, ArrowLeft, RotateCcw, Play, CheckCircle2, ArrowRight } from 'lucide-react';
import { SAMPLE_PRESETS } from '@/lib/sampleData';
import { analyzeResumeAndJobDescription } from '@/lib/nlp/analyzer';
import { compareResumeAnalyses } from '@/lib/nlp/comparisonEngine';
import { ComparisonResult } from '@/lib/types';
import ComparisonDashboard from '@/components/ComparisonDashboard';

export default function ComparisonPage() {
  const [resumeV1, setResumeV1] = useState(SAMPLE_PRESETS[0].resume);
  const [resumeV2, setResumeV2] = useState(SAMPLE_PRESETS[0].resumeV2 || SAMPLE_PRESETS[0].resume);
  const [jdText, setJdText] = useState(SAMPLE_PRESETS[0].jobDescription);
  const [comparison, setComparison] = useState<ComparisonResult | null>(null);
  const [isComparing, setIsComparing] = useState(false);

  useEffect(() => {
    // Run initial comparison on mount
    runComparison(SAMPLE_PRESETS[0].resume, SAMPLE_PRESETS[0].resumeV2 || SAMPLE_PRESETS[0].resume, SAMPLE_PRESETS[0].jobDescription);
  }, []);

  const runComparison = (v1: string, v2: string, jd: string) => {
    setIsComparing(true);
    try {
      const a1 = analyzeResumeAndJobDescription(v1, jd, { customId: 'v1' });
      const a2 = analyzeResumeAndJobDescription(v2, jd, { customId: 'v2' });
      const result = compareResumeAnalyses(a1, a2);
      setComparison(result);
    } catch (err) {
      console.error('Error during comparison:', err);
    } finally {
      setIsComparing(false);
    }
  };

  const handleRun = () => {
    runComparison(resumeV1, resumeV2, jdText);
  };

  const handleResetPresets = () => {
    setResumeV1(SAMPLE_PRESETS[0].resume);
    setResumeV2(SAMPLE_PRESETS[0].resumeV2 || SAMPLE_PRESETS[0].resume);
    setJdText(SAMPLE_PRESETS[0].jobDescription);
    runComparison(SAMPLE_PRESETS[0].resume, SAMPLE_PRESETS[0].resumeV2 || SAMPLE_PRESETS[0].resume, SAMPLE_PRESETS[0].jobDescription);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                Resume Version Comparison (V1 vs V2)
              </h1>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                A/B Testing
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Quantify the linguistic and statistical difference before and after tailoring your resume.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetPresets}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Sample V1/V2
          </button>
          <button
            onClick={handleRun}
            disabled={isComparing}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs shadow-blue-500/20 transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            {isComparing ? 'Comparing...' : 'Run Version Compare'}
          </button>
        </div>
      </div>

      {/* Input Collapsible / Toggle Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Version 1 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Resume Draft 1 (Original)
            </label>
            <span className="text-[11px] font-mono text-slate-400">
              {resumeV1.split(/\s+/).filter(Boolean).length} words
            </span>
          </div>
          <textarea
            value={resumeV1}
            onChange={(e) => setResumeV1(e.target.value)}
            className="w-full h-44 p-3 text-[11px] font-mono rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* Version 2 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
              Resume Draft 2 (Tailored)
            </label>
            <span className="text-[11px] font-mono text-slate-400">
              {resumeV2.split(/\s+/).filter(Boolean).length} words
            </span>
          </div>
          <textarea
            value={resumeV2}
            onChange={(e) => setResumeV2(e.target.value)}
            className="w-full h-44 p-3 text-[11px] font-mono rounded-xl border border-indigo-200 bg-indigo-50/20 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
          />
        </div>

        {/* Target JD */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Target Job Description
            </label>
            <span className="text-[11px] font-mono text-slate-400">
              {jdText.split(/\s+/).filter(Boolean).length} words
            </span>
          </div>
          <textarea
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            className="w-full h-44 p-3 text-[11px] font-mono rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
          />
        </div>
      </div>

      {/* Comparison Results */}
      {comparison && <ComparisonDashboard comparison={comparison} />}
    </div>
  );
}
