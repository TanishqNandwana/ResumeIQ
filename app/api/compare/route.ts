import { NextRequest, NextResponse } from 'next/server';
import { analyzeResumeAndJobDescription } from '@/lib/nlp/analyzer';
import { compareResumeAnalyses } from '@/lib/nlp/comparisonEngine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { resumeV1Text, resumeV2Text, jdText, weights } = body;

    if (!resumeV1Text || !resumeV2Text || !jdText) {
      return NextResponse.json(
        { error: 'Both resume versions (V1, V2) and the job description are required for comparison.' },
        { status: 400 }
      );
    }

    if (resumeV1Text.trim().length < 30 || resumeV2Text.trim().length < 30) {
      return NextResponse.json(
        { error: 'One or both resumes are too brief to perform meaningful comparison.' },
        { status: 400 }
      );
    }

    const analysis1 = analyzeResumeAndJobDescription(resumeV1Text, jdText, {
      weights,
      customId: 'resume-v1',
    });
    const analysis2 = analyzeResumeAndJobDescription(resumeV2Text, jdText, {
      weights,
      customId: 'resume-v2',
    });

    const comparison = compareResumeAnalyses(analysis1, analysis2);

    return NextResponse.json(comparison, { status: 200 });
  } catch (err: any) {
    console.error('Error comparing resumes:', err);
    return NextResponse.json(
      { error: err.message || 'An error occurred during resume version comparison.' },
      { status: 500 }
    );
  }
}
