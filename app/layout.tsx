import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'ResumeIQ — Explainable NLP Resume Analyzer & JD Matching System',
  description:
    'An explainable Natural Language Processing (NLP) system evaluating resume alignment with job requirements through tokenization, POS tagging, NER, TF-IDF cosine similarity, and evidence mapping.',
  keywords: [
    'NLP',
    'Natural Language Processing',
    'Resume Analyzer',
    'Job Description Matching',
    'TF-IDF',
    'Cosine Similarity',
    'Information Extraction',
    'Skill Gap Analysis',
    'Academic NLP',
  ],
  authors: [{ name: 'Tanishq Nandwana' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
