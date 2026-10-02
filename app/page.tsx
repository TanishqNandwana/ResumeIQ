'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FileText,
  Upload,
  ArrowRight,
  Sparkles,
  Layers,
  Search,
  CheckCircle2,
  FileCheck2,
  Cpu,
  ShieldCheck,
  Zap,
  GitCompare,
  BookOpen,
  AlertCircle,
  FileCode,
} from 'lucide-react';
import { SAMPLE_PRESETS } from '@/lib/sampleData';

export default function HomePage() {
  const router = useRouter();
  const [resumeText, setResumeText] = useState(SAMPLE_PRESETS[0].resume);
  const [jdText, setJdText] = useState(SAMPLE_PRESETS[0].jobDescription);
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleRoleSelect = (idx: number) => {
    setActiveRoleIndex(idx);
    setResumeText(SAMPLE_PRESETS[idx].resume);
    setJdText(SAMPLE_PRESETS[idx].jobDescription);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    setIsUploading(true);

    if (file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (event) => {
        setResumeText((event.target?.result as string) || '');
        setIsUploading(false);
      };
      reader.readAsText(file);
      return;
    }

    if (file.name.toLowerCase().endsWith('.pdf') || file.type === 'application/pdf') {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch('/api/extract-pdf', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Failed to extract text from PDF');
        }

        setResumeText(data.text);
      } catch (err: any) {
        setUploadError(err.message || 'Text could not be extracted from this PDF. Please upload a text-based PDF.');
      } finally {
        setIsUploading(false);
      }
    } else {
      setUploadError('Please upload a PDF (.pdf) or Plain Text (.txt) file.');
      setIsUploading(false);
    }
  };

  const handleStartAnalysis = () => {
    if (!resumeText.trim() || !jdText.trim()) return;
    // Store in sessionStorage for instant retrieval on /analyze
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('resumeiq_resume', resumeText);
      sessionStorage.setItem('resumeiq_jd', jdText);
    }
    router.push('/analyze');
  };

  return (
    <div className="space-y-16 py-8 sm:py-12">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Explainable Natural Language Processing System</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto">
          Understand How Your Resume <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Aligns with a Target Role
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          An educational NLP application computing explainable skill matching, TF-IDF cosine similarity, evidence mapping, and resume quality heuristics.
        </p>

        {/* 1-Click Role Presets */}
        <div className="pt-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2.5">
            Quick 1-Click Academic Sample Presets:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {SAMPLE_PRESETS.map((preset, idx) => (
              <button
                key={preset.id}
                onClick={() => handleRoleSelect(idx)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeRoleIndex === idx
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25 scale-102'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Interactive Dual Input Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          {/* Card Header Bar */}
          <div className="bg-slate-900 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <FileCode className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold tracking-tight">Interactive Text & PDF Ingestion</h2>
                <p className="text-[11px] text-slate-400">
                  Upload candidate resume and paste target job description
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors border border-white/15">
                <Upload className="w-3.5 h-3.5" />
                <span>{isUploading ? 'Extracting...' : 'Upload PDF / Text'}</span>
                <input
                  type="file"
                  accept=".pdf,.txt"
                  className="hidden"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                />
              </label>
            </div>
          </div>

          {/* Upload Error Banner if any */}
          {uploadError && (
            <div className="mx-6 mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{uploadError}</span>
            </div>
          )}

          {/* Dual Textareas */}
          <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Resume Text Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-blue-600" /> Candidate Resume Content
                </label>
                <span className="text-[11px] text-slate-400 font-mono">
                  {resumeText.split(/\s+/).filter(Boolean).length} words
                </span>
              </div>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste full resume text or upload PDF above..."
                className="w-full h-80 p-4 text-xs font-mono rounded-2xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none transition-all leading-relaxed"
              />
            </div>

            {/* Job Description Text Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Search className="w-4 h-4 text-indigo-600" /> Target Job Description
                </label>
                <span className="text-[11px] text-slate-400 font-mono">
                  {jdText.split(/\s+/).filter(Boolean).length} words
                </span>
              </div>
              <textarea
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
                placeholder="Paste target job description and requirements here..."
                className="w-full h-80 p-4 text-xs font-mono rounded-2xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none transition-all leading-relaxed"
              />
            </div>
          </div>

          {/* CTA Footer */}
          <div className="bg-slate-50 border-t border-slate-200/80 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 text-center sm:text-left">
              Processes locally and securely. Resumes are evaluated in-memory and never stored.
            </div>
            <button
              onClick={handleStartAnalysis}
              disabled={!resumeText.trim() || !jdText.trim() || isUploading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-blue-500/20 transition-all hover:scale-102"
            >
              <span>Analyze Resume Alignment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive NLP Capabilities
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            Visibly mapped to fundamental Natural Language Processing coursework concepts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Explainable Match Score</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Transparent 5-component weighted aggregation: Skill Match, Keyword Coverage, TF-IDF Cosine Similarity, Semantic Clusters, and Section Completeness.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Skill Gap & Taxonomy</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Domain taxonomy of 400+ technical skills with alias normalization (e.g. ML → Machine Learning, k8s → Kubernetes).
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Evidence Map & Bullet Audit</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Traces where target JD requirements are backed up by actual project bullet excerpts, auditing action verbs and quantifiable metrics.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Academic NLP Pipeline</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Live step-by-step inspector displaying tokenization, stopword removal, morphological lemmas, POS tagging, NER entities, and cosine mathematics.
            </p>
          </div>
        </div>
      </section>

      {/* Version Compare Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
              <GitCompare className="w-3.5 h-3.5" />
              <span>Resume Version Comparison</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Compare Two Resume Drafts Side-by-Side
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Measure the exact numerical impact of tailoring: track added skills, removed terms, section word changes, and overall Match Score delta.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/comparison"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-slate-900 bg-white hover:bg-slate-100 transition-colors shadow-md"
            >
              <span>Launch Version Compare</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
