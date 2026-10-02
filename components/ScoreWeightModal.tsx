'use client';

import React, { useState } from 'react';
import { Sliders, RotateCcw, X, Check } from 'lucide-react';
import { WeightConfig } from '@/lib/types';
import { DEFAULT_WEIGHTS } from '@/lib/nlp/scorer';

interface ScoreWeightModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentWeights: WeightConfig;
  onApplyWeights: (weights: WeightConfig) => void;
}

export default function ScoreWeightModal({
  isOpen,
  onClose,
  currentWeights,
  onApplyWeights,
}: ScoreWeightModalProps) {
  const [weights, setWeights] = useState<WeightConfig>({ ...currentWeights });

  if (!isOpen) return null;

  const total =
    weights.skillMatch +
    weights.keywordCoverage +
    weights.tfidfSimilarity +
    weights.semanticSimilarity +
    weights.completeness;

  const handleSliderChange = (key: keyof WeightConfig, value: number) => {
    setWeights((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleReset = () => {
    setWeights({ ...DEFAULT_WEIGHTS });
  };

  const handleSave = () => {
    onApplyWeights(weights);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Custom Scoring Weights</h3>
              <p className="text-xs text-slate-500">Fine-tune the explainable match score formula</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-5 space-y-4">
          <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-3 text-xs text-blue-900 flex justify-between items-center">
            <span>
              Total Weight: <strong className={total === 100 ? 'text-blue-700 font-bold' : 'text-amber-600 font-bold'}>{total}%</strong>
            </span>
            <span className="text-[11px] text-blue-700">
              {total === 100 ? 'Formula Balanced' : 'Weights will be auto-normalized to 100%'}
            </span>
          </div>

          {/* Skill Match */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-slate-700">
              <span>Skill Match Weight</span>
              <span className="text-blue-600">{weights.skillMatch}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="70"
              step="5"
              value={weights.skillMatch}
              onChange={(e) => handleSliderChange('skillMatch', Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">Overlap between resume skills and extracted JD skills</p>
          </div>

          {/* Keyword Coverage */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-slate-700">
              <span>Keyword Coverage Weight</span>
              <span className="text-blue-600">{weights.keywordCoverage}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="60"
              step="5"
              value={weights.keywordCoverage}
              onChange={(e) => handleSliderChange('keywordCoverage', Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">Broad vocabulary coverage of job description domain terms</p>
          </div>

          {/* TF-IDF Similarity */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-slate-700">
              <span>TF-IDF Cosine Similarity Weight</span>
              <span className="text-blue-600">{weights.tfidfSimilarity}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="5"
              value={weights.tfidfSimilarity}
              onChange={(e) => handleSliderChange('tfidfSimilarity', Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">Statistical term frequency inverse document frequency alignment</p>
          </div>

          {/* Semantic Similarity */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-slate-700">
              <span>Semantic Similarity Weight</span>
              <span className="text-blue-600">{weights.semanticSimilarity}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              step="5"
              value={weights.semanticSimilarity}
              onChange={(e) => handleSliderChange('semanticSimilarity', Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">Conceptual domain and synset cluster projection</p>
          </div>

          {/* Completeness */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-slate-700">
              <span>Resume Completeness Weight</span>
              <span className="text-blue-600">{weights.completeness}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              step="5"
              value={weights.completeness}
              onChange={(e) => handleSliderChange('completeness', Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">Structural integrity, contact completeness, and section health</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-500/20 transition-all"
            >
              <Check className="w-3.5 h-3.5" />
              Apply Formula
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
