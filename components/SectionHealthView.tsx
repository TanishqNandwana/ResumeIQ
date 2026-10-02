'use client';

import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, LayoutGrid, FileText, Check } from 'lucide-react';
import { SectionHealth } from '@/lib/types';

interface SectionHealthViewProps {
  sectionHealth: SectionHealth;
}

export default function SectionHealthView({ sectionHealth }: SectionHealthViewProps) {
  const { detectedSections, overallScore } = sectionHealth;

  const getStatusBadge = (status: 'Optimal' | 'Needs Attention' | 'Missing') => {
    switch (status) {
      case 'Optimal':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Needs Attention':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Missing':
        return 'bg-slate-100 text-slate-500 border-slate-200';
    }
  };

  const getStatusIcon = (status: 'Optimal' | 'Needs Attention' | 'Missing') => {
    switch (status) {
      case 'Optimal':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />;
      case 'Needs Attention':
        return <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />;
      case 'Missing':
        return <XCircle className="w-4 h-4 text-slate-400 shrink-0" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <LayoutGrid className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900">Resume Structural Completeness</h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Standard technical resume sections detected and evaluated for depth and structural compliance.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-2xl font-black text-slate-900">{overallScore}%</div>
            <div className="text-[11px] font-semibold uppercase text-slate-500">Completeness</div>
          </div>
          <div className="w-16 h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                overallScore >= 80 ? 'bg-emerald-500' : overallScore >= 60 ? 'bg-blue-600' : 'bg-amber-500'
              }`}
              style={{ width: `${overallScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {detectedSections.map((sec) => (
          <div
            key={sec.name}
            className={`p-4 rounded-xl border bg-white shadow-sm flex flex-col justify-between transition-all hover:shadow-md ${
              sec.status === 'Optimal'
                ? 'border-slate-200/80'
                : sec.status === 'Needs Attention'
                ? 'border-amber-200/80 bg-amber-50/20'
                : 'border-slate-200/60 bg-slate-50/40 opacity-80'
            }`}
          >
            <div>
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  {getStatusIcon(sec.status)}
                  <h4 className="text-xs font-bold text-slate-900">{sec.name}</h4>
                </div>
                <span
                  className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getStatusBadge(
                    sec.status
                  )}`}
                >
                  {sec.status}
                </span>
              </div>

              <div className="flex items-center gap-3 text-[11px] text-slate-500 mb-2">
                <span>{sec.wordCount} words</span>
                {sec.bulletCount > 0 && <span>• {sec.bulletCount} bullets</span>}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{sec.feedback}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
