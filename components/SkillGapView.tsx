'use client';

import React, { useState } from 'react';
import { CheckCircle2, XCircle, PlusCircle, Layers, BarChart3, Filter } from 'lucide-react';
import { SkillCategory, SkillGapResult } from '@/lib/types';

interface SkillGapViewProps {
  skillGap: SkillGapResult;
}

export default function SkillGapView({ skillGap }: SkillGapViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const { matchedSkills, missingSkills, additionalSkills, categoryBreakdown, matchRate } = skillGap;

  const allCategories = ['All', ...Array.from(new Set(categoryBreakdown.map((c) => c.category)))];

  const filterByCategory = (list: any[]) => {
    if (selectedCategory === 'All') return list;
    return list.filter((item) => item.category === selectedCategory);
  };

  const filteredMatched = filterByCategory(matchedSkills);
  const filteredMissing = filterByCategory(missingSkills);
  const filteredAdditional = filterByCategory(additionalSkills);

  return (
    <div className="space-y-6">
      {/* Top Banner Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{matchedSkills.length}</div>
            <div className="text-xs text-slate-500 font-medium">Matched Competencies</div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <XCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{missingSkills.length}</div>
            <div className="text-xs text-slate-500 font-medium">Skill Gaps to Address</div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <PlusCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{additionalSkills.length}</div>
            <div className="text-xs text-slate-500 font-medium">Additional Skill Assets</div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{matchRate}%</div>
            <div className="text-xs text-slate-500 font-medium">Skill Alignment Rate</div>
          </div>
        </div>
      </div>

      {/* Category Breakdown Table / Chart */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900">Domain Category Alignment</h3>
          </div>
          <span className="text-xs text-slate-500">Evaluated against target JD technical domains</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categoryBreakdown.map((cat) => (
            <div
              key={cat.category}
              className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">{cat.category}</span>
                <span className="text-xs font-semibold text-slate-600">
                  {cat.matched} / {cat.required} skills ({cat.score}%)
                </span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    cat.score >= 80 ? 'bg-emerald-500' : cat.score >= 50 ? 'bg-blue-600' : 'bg-rose-500'
                  }`}
                  style={{ width: `${cat.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 shrink-0">
          <Filter className="w-3.5 h-3.5" /> Filter by:
        </span>
        {allCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* The 3 Columns: Matched, Missing, Additional */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Matched Skills */}
        <div className="bg-white rounded-2xl p-5 border border-emerald-200/80 shadow-sm flex flex-col">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-emerald-100">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Matched Skills ({filteredMatched.length})</h4>
            </div>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Verified in Resume
            </span>
          </div>

          {filteredMatched.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">No matched skills in this filter.</p>
          ) : (
            <div className="space-y-2 overflow-y-auto max-h-96 pr-1">
              {filteredMatched.map((skill) => (
                <div
                  key={skill.canonical}
                  className="p-2.5 rounded-lg border border-emerald-100 bg-emerald-50/30 flex items-start justify-between gap-2"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      {skill.name}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      {skill.category} • Found in: {skill.sections?.join(', ') || 'Skills'}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-100/70 text-emerald-800 font-semibold shrink-0">
                    {skill.evidenceCount}x cited
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Missing Skills */}
        <div className="bg-white rounded-2xl p-5 border border-rose-200/80 shadow-sm flex flex-col">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-rose-100">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-rose-100 text-rose-700 flex items-center justify-center">
                <XCircle className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Missing Skills ({filteredMissing.length})</h4>
            </div>
            <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
              Target JD Requirement
            </span>
          </div>

          {filteredMissing.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">No skill gaps in this category!</p>
          ) : (
            <div className="space-y-2 overflow-y-auto max-h-96 pr-1">
              {filteredMissing.map((skill) => (
                <div
                  key={skill.canonical}
                  className="p-2.5 rounded-lg border border-rose-100 bg-rose-50/30 flex items-start justify-between gap-2"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900">{skill.name}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      {skill.category}
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-rose-700 bg-rose-100/80 px-2 py-0.5 rounded shrink-0">
                    Gap
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Additional Skills */}
        <div className="bg-white rounded-2xl p-5 border border-blue-200/80 shadow-sm flex flex-col">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-blue-100">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center">
                <PlusCircle className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Additional Skills ({filteredAdditional.length})</h4>
            </div>
            <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
              Bonus Assets
            </span>
          </div>

          {filteredAdditional.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">No additional skills identified.</p>
          ) : (
            <div className="space-y-2 overflow-y-auto max-h-96 pr-1">
              {filteredAdditional.map((skill) => (
                <div
                  key={skill.canonical}
                  className="p-2.5 rounded-lg border border-blue-100 bg-blue-50/30 flex items-start justify-between gap-2"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900">{skill.name}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      {skill.category}
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded shrink-0">
                    Candidate Asset
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
