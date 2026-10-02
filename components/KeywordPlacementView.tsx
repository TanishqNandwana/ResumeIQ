'use client';

import React from 'react';
import { Table, Check, X, Layers, Sparkles } from 'lucide-react';
import { KeywordPlacementMatrix } from '@/lib/types';

interface KeywordPlacementViewProps {
  placementMatrix: KeywordPlacementMatrix[];
}

export default function KeywordPlacementView({ placementMatrix }: KeywordPlacementViewProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900">Keyword Placement Matrix</h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Cross-sectional distribution of core target keywords across the 5 canonical resume sections.
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 w-fit">
          {placementMatrix.length} Keywords Tracked
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-3.5 px-4">Target Keyword</th>
              <th className="py-3.5 px-3 text-center">Summary</th>
              <th className="py-3.5 px-3 text-center">Skills</th>
              <th className="py-3.5 px-3 text-center">Experience</th>
              <th className="py-3.5 px-3 text-center">Projects</th>
              <th className="py-3.5 px-3 text-center">Education</th>
              <th className="py-3.5 px-4 text-right">Total Count</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {placementMatrix.map((row) => {
              const sectionsCount =
                (row.inSummary ? 1 : 0) +
                (row.inSkills ? 1 : 0) +
                (row.inExperience ? 1 : 0) +
                (row.inProjects ? 1 : 0) +
                (row.inEducation ? 1 : 0);

              return (
                <tr
                  key={row.keyword}
                  className="hover:bg-slate-50/70 transition-colors"
                >
                  <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                    {row.keyword}
                  </td>

                  {/* Summary */}
                  <td className="py-3 px-3 text-center">
                    {row.inSummary ? (
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-slate-300">
                        <X className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </td>

                  {/* Skills */}
                  <td className="py-3 px-3 text-center">
                    {row.inSkills ? (
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-slate-300">
                        <X className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </td>

                  {/* Experience */}
                  <td className="py-3 px-3 text-center">
                    {row.inExperience ? (
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-slate-300">
                        <X className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </td>

                  {/* Projects */}
                  <td className="py-3 px-3 text-center">
                    {row.inProjects ? (
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-slate-300">
                        <X className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </td>

                  {/* Education */}
                  <td className="py-3 px-3 text-center">
                    {row.inEducation ? (
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-slate-300">
                        <X className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </td>

                  {/* Total Occurrences */}
                  <td className="py-3 px-4 text-right">
                    <span
                      className={`inline-block font-mono font-bold text-xs px-2 py-0.5 rounded-full ${
                        row.totalCount >= 3
                          ? 'bg-emerald-100 text-emerald-800'
                          : row.totalCount >= 1
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {row.totalCount}x ({sectionsCount}/5 sections)
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
