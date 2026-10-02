'use client';

import React, { useState } from 'react';
import { Download, Printer, FileDown, Check } from 'lucide-react';
import { AnalysisResponse } from '@/lib/types';

interface DownloadReportButtonProps {
  analysis: AnalysisResponse;
}

export default function DownloadReportButton({ analysis }: DownloadReportButtonProps) {
  const [downloaded, setDownloaded] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(analysis, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `ResumeIQ_Report_${analysis.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handlePrint}
        className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-xs transition-colors"
      >
        <Printer className="w-3.5 h-3.5 text-slate-500" />
        Print / PDF
      </button>

      <button
        onClick={handleDownloadJson}
        className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs shadow-blue-500/20 transition-all"
      >
        {downloaded ? <Check className="w-3.5 h-3.5" /> : <FileDown className="w-3.5 h-3.5" />}
        {downloaded ? 'Downloaded JSON' : 'Export JSON Data'}
      </button>
    </div>
  );
}
