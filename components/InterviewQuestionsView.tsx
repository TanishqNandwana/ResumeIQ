'use client';

import React, { useState } from 'react';
import { MessageSquare, HelpCircle, CheckSquare, ChevronDown, ChevronUp, Sparkles, BookOpen } from 'lucide-react';
import { InterviewQuestion } from '@/lib/types';

interface InterviewQuestionsViewProps {
  questions: InterviewQuestion[];
}

export default function InterviewQuestionsView({ questions }: InterviewQuestionsViewProps) {
  const [expandedId, setExpandedId] = useState<string | null>(questions[0]?.id || null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const getCategoryBadge = (cat: InterviewQuestion['category']) => {
    switch (cat) {
      case 'Technical Deep-Dive':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Project Architecture':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Skill Gap / Learning':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Behavioral / Experience':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900">Tailored Technical Interview Questions</h3>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Derived deterministically from candidate project excerpts, verified skill proficiencies, and identified JD competency gaps.
          </p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
          {questions.length} Targeted Questions
        </span>
      </div>

      <div className="space-y-3">
        {questions.map((q, idx) => {
          const isExpanded = expandedId === q.id;

          return (
            <div
              key={q.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleExpand(q.id)}
                className="w-full p-5 text-left flex items-start justify-between gap-4 hover:bg-slate-50/60 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-slate-400 font-mono">Q{idx + 1}.</span>
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getCategoryBadge(
                        q.category
                      )}`}
                    >
                      {q.category}
                    </span>
                    <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      Target: {q.targetSkillOrProject}
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {q.question}
                  </h4>
                </div>

                <div className="shrink-0 text-slate-400 p-1">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50/50 space-y-4 animate-in fade-in duration-200">
                  {/* Interviewer Intent */}
                  <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200/60 text-xs text-slate-700 flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-blue-900">Interviewer Intent:</strong> {q.intent}
                    </div>
                  </div>

                  {/* Suggested Talking Points Checklist */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                      <CheckSquare className="w-3.5 h-3.5 text-emerald-600" /> Suggested Candidate Talking Points
                    </div>
                    <ul className="space-y-1.5">
                      {q.suggestedTalkingPoints.map((point, pIdx) => (
                        <li key={pIdx} className="text-xs text-slate-700 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
