'use client';

import React, { useState } from 'react';
import { Search, CheckCircle2, XCircle, AlertCircle, Quote, MapPin } from 'lucide-react';
import { EvidenceItem } from '@/lib/types';

interface EvidenceMapViewProps {
  evidenceMap: EvidenceItem[];
}

export default function EvidenceMapView({ evidenceMap }: EvidenceMapViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStrength, setFilterStrength] = useState<string>('All');

  const filtered = evidenceMap.filter((item) => {
    const matchesSearch =
      item.skill.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStrength =
      filterStrength === 'All' ? true : item.overallEvidenceStrength === filterStrength;
    return matchesSearch && matchesStrength;
  });

  const getStrengthBadge = (strength: EvidenceItem['overallEvidenceStrength']) => {
    switch (strength) {
      case 'Strong':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Moderate':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Weak':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'None':
        return 'bg-rose-50 text-rose-700 border-rose-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search JD requirement or skill..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          <span className="text-xs font-semibold text-slate-500 shrink-0 mr-1">Strength:</span>
          {['All', 'Strong', 'Moderate', 'Weak', 'None'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStrength(st)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                filterStrength === st
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Evidence Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div
            key={item.skill}
            className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    {item.skill}
                  </h4>
                  <span className="text-[11px] text-slate-500">{item.category}</span>
                </div>
                <span
                  className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getStrengthBadge(
                    item.overallEvidenceStrength
                  )}`}
                >
                  {item.overallEvidenceStrength} Evidence
                </span>
              </div>

              {/* Sections Checklist */}
              {item.found ? (
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {['Summary', 'Skills', 'Experience', 'Projects', 'Education'].map((sec) => {
                      const match = item.sections.find((s) => s.sectionName === sec);
                      return (
                        <span
                          key={sec}
                          className={`text-[11px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1 ${
                            match
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-slate-50 text-slate-400 border border-slate-100 line-through decoration-slate-300'
                          }`}
                        >
                          {match ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <XCircle className="w-3 h-3 text-slate-300" />}
                          {sec}
                          {match && match.occurrences > 1 && (
                            <span className="text-[9px] bg-emerald-200/80 px-1 rounded-full font-bold">
                              {match.occurrences}x
                            </span>
                          )}
                        </span>
                      );
                    })}
                  </div>

                  {/* Bullet Excerpts */}
                  <div className="space-y-2 mt-3 pt-3 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <Quote className="w-3 h-3" /> Extracted Excerpts
                    </span>
                    {item.sections.flatMap((s) =>
                      s.excerpts.map((excerpt, idx) => (
                        <div
                          key={`${s.sectionName}-${idx}`}
                          className="p-2 rounded-lg bg-slate-50 border border-slate-200/60 text-xs text-slate-700 italic flex items-start gap-2"
                        >
                          <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-100/70 text-blue-800 not-italic shrink-0">
                            {s.sectionName}
                          </span>
                          <span className="line-clamp-2">{excerpt}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ) : (
                <div className="py-6 flex flex-col items-center justify-center text-center text-slate-400 bg-rose-50/30 rounded-xl border border-dashed border-rose-200">
                  <XCircle className="w-8 h-8 text-rose-400 mb-2" />
                  <p className="text-xs font-semibold text-rose-800">Not Found in Resume</p>
                  <p className="text-[11px] text-rose-600 mt-0.5">
                    No contextual mention in summary, skills list, experience, or projects.
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
