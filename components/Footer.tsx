import Link from 'next/link';
import { BookOpen, Github, ShieldAlert, GraduationCap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-white tracking-tight">
                Resume<span className="text-blue-400">IQ</span>
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-blue-900/60 text-blue-300 border border-blue-700/50">
                Academic Project
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              An explainable Natural Language Processing (NLP) system evaluating resume alignment with job requirements through tokenization, POS tagging, NER, TF-IDF cosine similarity, and evidence mapping.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-300/90 bg-amber-950/40 border border-amber-800/40 rounded-lg p-2.5 max-w-md">
              <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400" />
              <span>
                <strong>Educational Notice:</strong> The ResumeIQ Match Score is an academic similarity indicator, not a commercial ATS replacement or automated hiring prediction.
              </span>
            </div>
          </div>

          {/* Core Modules */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Application Modules
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/analyze" className="hover:text-blue-400 transition-colors">
                  Resume & JD Analyzer
                </Link>
              </li>
              <li>
                <Link href="/comparison" className="hover:text-blue-400 transition-colors">
                  Version Comparison (V1 vs V2)
                </Link>
              </li>
              <li>
                <Link href="/methodology" className="hover:text-blue-400 transition-colors">
                  NLP Pipeline Methodology
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/tanishqnandwana/ResumeIQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>

          {/* Academic & Author Info */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Course Details
            </h4>
            <div className="space-y-2 text-sm text-slate-400">
              <p className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Natural Language Processing</span>
              </p>
              <p className="text-xs text-slate-500">
                Semester VII Mini-Project Submission
              </p>
              <p className="text-xs text-slate-400 pt-2 border-t border-slate-800">
                Author: <strong className="text-slate-200">Tanishq Nandwana</strong>
                <br />
                <span className="text-slate-500">tanishqnandwana@gmail.com</span>
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} ResumeIQ. Built for educational NLP coursework.</p>
          <div className="flex items-center gap-4">
            <Link href="/methodology" className="hover:text-slate-400">Methodology & Algorithms</Link>
            <span>•</span>
            <a
              href="https://github.com/tanishqnandwana/ResumeIQ"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-slate-400"
            >
              <Github className="w-3.5 h-3.5" />
              Source Code
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
