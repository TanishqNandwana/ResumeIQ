'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileText,
  Search,
  Sparkles,
  Layers,
  MapPin,
  Table,
  ShieldCheck,
  Target,
  Cpu,
  MessageSquare,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  XCircle,
  FileCheck2,
  Briefcase,
  GraduationCap,
  Calendar,
  Award,
} from 'lucide-react';
import { AnalysisResponse, WeightConfig } from '@/lib/types';
import { analyzeResumeAndJobDescription } from '@/lib/nlp/analyzer';
import { SAMPLE_PRESETS } from '@/lib/sampleData';
import ScoreCard from '@/components/ScoreCard';
import SkillGapView from '@/components/SkillGapView';
import EvidenceMapView from '@/components/EvidenceMapView';
import KeywordPlacementView from '@/components/KeywordPlacementView';
import SectionHealthView from '@/components/SectionHealthView';
import QualityAuditView from '@/components/QualityAuditView';
import BulletStrengthView from '@/components/BulletStrengthView';
import NlpPipelineView from '@/components/NlpPipelineView';
import InterviewQuestionsView from '@/components/InterviewQuestionsView';
import DownloadReportButton from '@/components/DownloadReportButton';

export default function AnalyzePage() {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'skill_gap' | 'evidence_map' | 'keyword_matrix' | 'quality_health' | 'bullets' | 'nlp_pipeline' | 'interview_questions'
  >('overview');

  const [resumeText, setResumeText] = useState(SAMPLE_PRESETS[0].resume);
  const [jdText, setJdText] = useState(SAMPLE_PRESETS[0].jobDescription);
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [customWeights, setCustomWeights] = useState<WeightConfig | undefined>(undefined);

  // Load from sessionStorage if available, or compute initial analysis
  useEffect(() => {
    let rText = SAMPLE_PRESETS[0].resume;
    let jText = SAMPLE_PRESETS[0].jobDescription;

    if (typeof window !== 'undefined') {
      const storedResume = sessionStorage.getItem('resumeiq_resume');
      const storedJd = sessionStorage.getItem('resumeiq_jd');
      if (storedResume) rText = storedResume;
      if (storedJd) jText = storedJd;
    }

    setResumeText(rText);
    setJdText(jText);

    // Run initial analysis
    const initialResult = analyzeResumeAndJobDescription(rText, jText);
    setAnalysis(initialResult);
  }, []);

  const handleApplyWeights = (weights: WeightConfig) => {
    setCustomWeights(weights);
    if (analysis) {
      const updated = analyzeResumeAndJobDescription(resumeText, jdText, { weights });
      setAnalysis(updated);
    }
  };

  const handlePresetChange = (idx: number) => {
    const selected = SAMPLE_PRESETS[idx];
    setResumeText(selected.resume);
    setJdText(selected.jobDescription);
    const updated = analyzeResumeAndJobDescription(selected.resume, selected.jobDescription, {
      weights: customWeights,
    });
    setAnalysis(updated);
  };

  if (!analysis) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm font-semibold text-slate-600">Running NLP Analysis Pipeline...</p>
      </div>
    );
  }

  const navTabs = [
    { id: 'overview', label: '1. Overview', icon: Sparkles },
    { id: 'skill_gap', label: '2. Skill Gap', icon: Layers },
    { id: 'evidence_map', label: '3. Evidence Map', icon: MapPin },
    { id: 'keyword_matrix', label: '4. Keyword Matrix', icon: Table },
    { id: 'quality_health', label: '5. Quality & Sections', icon: ShieldCheck },
    { id: 'bullets', label: '6. Bullet Strength', icon: Target },
    { id: 'nlp_pipeline', label: '7. NLP Pipeline', icon: Cpu },
    { id: 'interview_questions', label: '8. Interview Prep', icon: MessageSquare },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Breadcrumb & Controls */}
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
                Analysis Dashboard
              </h1>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                {analysis.jdRequirements.roleTitle}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Generated at {new Date(analysis.timestamp).toLocaleTimeString()} • Analysis ID: {analysis.id}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Preset Selector */}
          <select
            onChange={(e) => handlePresetChange(Number(e.target.value))}
            className="text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            {SAMPLE_PRESETS.map((p, idx) => (
              <option key={p.id} value={idx}>
                Load Preset: {p.name}
              </option>
            ))}
          </select>

          <DownloadReportButton analysis={analysis} />
        </div>
      </div>

      {/* Main Score Card Banner */}
      <ScoreCard matchScore={analysis.matchScore} onUpdateWeights={handleApplyWeights} />

      {/* Navigation Tabs Bar */}
      <div className="bg-white rounded-2xl p-1.5 border border-slate-200 shadow-xs flex items-center gap-1 overflow-x-auto">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content Panels */}
      <div className="animate-in fade-in duration-200">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Matched Skills Summary */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Top Matched Competencies
                  </h3>
                  <span className="text-[11px] font-mono text-emerald-700 font-bold">
                    {analysis.skillGap.matchedSkills.length} Total
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {analysis.skillGap.matchedSkills.slice(0, 8).map((s) => (
                    <span
                      key={s.canonical}
                      className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {s.name}
                    </span>
                  ))}
                </div>
                {analysis.skillGap.matchedSkills.length > 8 && (
                  <button
                    onClick={() => setActiveTab('skill_gap')}
                    className="text-xs text-blue-600 font-bold hover:underline block pt-1"
                  >
                    View all {analysis.skillGap.matchedSkills.length} matched skills →
                  </button>
                )}
              </div>

              {/* Critical Gaps Summary */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-600" /> Key Skill Gaps
                  </h3>
                  <span className="text-[11px] font-mono text-rose-700 font-bold">
                    {analysis.skillGap.missingSkills.length} Total
                  </span>
                </div>
                {analysis.skillGap.missingSkills.length === 0 ? (
                  <p className="text-xs text-slate-500 py-3">No major skill gaps identified!</p>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {analysis.skillGap.missingSkills.slice(0, 8).map((s) => (
                      <span
                        key={s.canonical}
                        className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-rose-50 text-rose-800 border border-rose-200 flex items-center gap-1"
                      >
                        <XCircle className="w-3 h-3 text-rose-500" /> {s.name}
                      </span>
                    ))}
                  </div>
                )}
                {analysis.skillGap.missingSkills.length > 8 && (
                  <button
                    onClick={() => setActiveTab('skill_gap')}
                    className="text-xs text-rose-600 font-bold hover:underline block pt-1"
                  >
                    View all {analysis.skillGap.missingSkills.length} missing requirements →
                  </button>
                )}
              </div>

              {/* Job Requirements Extracted */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-blue-600" /> Extracted JD Requirements
                  </h3>
                  <span className="text-[11px] font-mono text-slate-500 font-bold">
                    Target Criteria
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  {analysis.jdRequirements.education.length > 0 && (
                    <div className="flex items-start gap-1.5 text-slate-700">
                      <GraduationCap className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <span><strong>Education:</strong> {analysis.jdRequirements.education.join(', ')}</span>
                    </div>
                  )}
                  {analysis.jdRequirements.experienceRequirements.length > 0 && (
                    <div className="flex items-start gap-1.5 text-slate-700">
                      <Calendar className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <span><strong>Experience:</strong> {analysis.jdRequirements.experienceRequirements.join(', ')}</span>
                    </div>
                  )}
                  {analysis.jdRequirements.certifications.length > 0 && (
                    <div className="flex items-start gap-1.5 text-slate-700">
                      <Award className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <span><strong>Certifications:</strong> {analysis.jdRequirements.certifications.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Evidence Map Preview */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Evidence Map Snapshot</h3>
                  <p className="text-xs text-slate-500">
                    Direct validation of target JD skills appearing across resume project bullets and work history.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('evidence_map')}
                  className="text-xs font-bold text-blue-600 hover:underline"
                >
                  Full Evidence Matrix →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {analysis.evidenceMap.slice(0, 6).map((item) => (
                  <div
                    key={item.skill}
                    className="p-3.5 rounded-xl border border-slate-200/70 bg-slate-50/50 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{item.skill}</span>
                      <span
                        className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded ${
                          item.found ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {item.found ? `${item.overallEvidenceStrength} Evidence` : 'Not Found'}
                      </span>
                    </div>
                    {item.found ? (
                      <div className="text-[11px] text-slate-600">
                        Citations: {item.sections.map((s) => `${s.sectionName} (${s.occurrences}x)`).join(', ')}
                      </div>
                    ) : (
                      <div className="text-[11px] text-rose-600">No project citations found</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SKILL GAP */}
        {activeTab === 'skill_gap' && <SkillGapView skillGap={analysis.skillGap} />}

        {/* TAB 3: EVIDENCE MAP */}
        {activeTab === 'evidence_map' && <EvidenceMapView evidenceMap={analysis.evidenceMap} />}

        {/* TAB 4: KEYWORD PLACEMENT MATRIX */}
        {activeTab === 'keyword_matrix' && (
          <KeywordPlacementView placementMatrix={analysis.keywordPlacement} />
        )}

        {/* TAB 5: RESUME QUALITY & SECTION HEALTH */}
        {activeTab === 'quality_health' && (
          <div className="space-y-8">
            <QualityAuditView qualityAudit={analysis.qualityAudit} />
            <SectionHealthView sectionHealth={analysis.sectionHealth} />
          </div>
        )}

        {/* TAB 6: BULLET STRENGTH */}
        {activeTab === 'bullets' && (
          <BulletStrengthView bulletStrength={analysis.bulletStrength} />
        )}

        {/* TAB 7: NLP PIPELINE DEEP-DIVE */}
        {activeTab === 'nlp_pipeline' && (
          <NlpPipelineView nlpPipeline={analysis.nlpPipeline} />
        )}

        {/* TAB 8: INTERVIEW QUESTIONS */}
        {activeTab === 'interview_questions' && (
          <InterviewQuestionsView questions={analysis.interviewQuestions} />
        )}
      </div>
    </div>
  );
}
