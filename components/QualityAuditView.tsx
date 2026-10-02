'use client';

import React from 'react';
import { ShieldCheck, AlertCircle, AlertTriangle, Info, CheckCircle2, Mail, Phone, Linkedin, Github, MapPin } from 'lucide-react';
import { QualityAudit } from '@/lib/types';

interface QualityAuditViewProps {
  qualityAudit: QualityAudit;
}

export default function QualityAuditView({ qualityAudit }: QualityAuditViewProps) {
  const { overallScore, contactAudit, issues, formattingStats } = qualityAudit;

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (score >= 70) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (score >= 50) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-rose-600 bg-rose-50 border-rose-200';
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900">Resume Quality & ATS Hygiene Audit</h3>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Heuristic rules evaluating contact visibility, formatting balance, timeline presence, and readability standards.
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="text-right">
            <div className={`text-3xl font-black ${overallScore >= 75 ? 'text-emerald-600' : overallScore >= 55 ? 'text-amber-600' : 'text-rose-600'}`}>
              {overallScore}/100
            </div>
            <div className="text-[11px] font-semibold uppercase text-slate-500">Quality Score</div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getScoreColor(overallScore)}`}>
            {overallScore >= 80 ? 'ATS-Optimized' : overallScore >= 65 ? 'Acceptable' : 'Needs Optimization'}
          </span>
        </div>
      </div>

      {/* Contact Information Audit Grid */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Candidate Contact & Profile Links Verification
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {/* Email */}
          <div className={`p-3 rounded-xl border flex items-center gap-3 ${contactAudit.hasEmail ? 'bg-emerald-50/40 border-emerald-200' : 'bg-rose-50/40 border-rose-200'}`}>
            <Mail className={`w-4 h-4 ${contactAudit.hasEmail ? 'text-emerald-600' : 'text-rose-500'}`} />
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-slate-900">Email Address</div>
              <div className="text-[11px] text-slate-500 truncate">
                {contactAudit.details.email || 'Missing'}
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className={`p-3 rounded-xl border flex items-center gap-3 ${contactAudit.hasPhone ? 'bg-emerald-50/40 border-emerald-200' : 'bg-amber-50/40 border-amber-200'}`}>
            <Phone className={`w-4 h-4 ${contactAudit.hasPhone ? 'text-emerald-600' : 'text-amber-500'}`} />
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-slate-900">Phone Number</div>
              <div className="text-[11px] text-slate-500 truncate">
                {contactAudit.details.phone || 'Missing'}
              </div>
            </div>
          </div>

          {/* LinkedIn */}
          <div className={`p-3 rounded-xl border flex items-center gap-3 ${contactAudit.hasLinkedIn ? 'bg-emerald-50/40 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}>
            <Linkedin className={`w-4 h-4 ${contactAudit.hasLinkedIn ? 'text-emerald-600' : 'text-slate-400'}`} />
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-slate-900">LinkedIn Profile</div>
              <div className="text-[11px] text-slate-500 truncate">
                {contactAudit.details.linkedin || 'Not Detected'}
              </div>
            </div>
          </div>

          {/* GitHub */}
          <div className={`p-3 rounded-xl border flex items-center gap-3 ${contactAudit.hasGitHub ? 'bg-emerald-50/40 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}>
            <Github className={`w-4 h-4 ${contactAudit.hasGitHub ? 'text-emerald-600' : 'text-slate-400'}`} />
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-slate-900">GitHub / Portfolio</div>
              <div className="text-[11px] text-slate-500 truncate">
                {contactAudit.details.github || 'Not Detected'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Formatting & Vocabulary Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-sm">
          <div className="text-xs font-semibold text-slate-500">Document Length</div>
          <div className="text-xl font-bold text-slate-900 mt-1">{formattingStats.wordCount} words</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Optimal range: 450 – 750 words</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-sm">
          <div className="text-xs font-semibold text-slate-500">Sentence Structure</div>
          <div className="text-xl font-bold text-slate-900 mt-1">{formattingStats.sentenceCount} sentences</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Concise phrasing favored</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-sm">
          <div className="text-xs font-semibold text-slate-500">Reading Ease Score</div>
          <div className="text-xl font-bold text-slate-900 mt-1">{formattingStats.readingEaseEstimate} / 100</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Flesch Reading Ease estimate</p>
        </div>
      </div>

      {/* Issues & Recommendations List */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <h4 className="text-sm font-bold text-slate-900">Heuristic Audit Findings</h4>

        {issues.length === 0 ? (
          <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            No major structural defects detected. Excellent resume formatting hygiene!
          </div>
        ) : (
          <div className="space-y-3">
            {issues.map((issue, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border flex items-start gap-3.5 transition-all ${
                  issue.type === 'critical'
                    ? 'bg-rose-50/40 border-rose-200'
                    : issue.type === 'warning'
                    ? 'bg-amber-50/40 border-amber-200'
                    : 'bg-blue-50/40 border-blue-200'
                }`}
              >
                {issue.type === 'critical' ? (
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                ) : issue.type === 'warning' ? (
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                ) : (
                  <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                )}

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h5 className="text-xs font-bold text-slate-900">{issue.title}</h5>
                    <span
                      className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded ${
                        issue.type === 'critical'
                          ? 'bg-rose-200/80 text-rose-800'
                          : issue.type === 'warning'
                          ? 'bg-amber-200/80 text-amber-800'
                          : 'bg-blue-200/80 text-blue-800'
                      }`}
                    >
                      {issue.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">{issue.description}</p>
                  <p className="text-xs text-slate-700 font-medium pt-1">
                    <strong className="text-slate-900">Action:</strong> {issue.recommendation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
