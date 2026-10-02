import { NextRequest, NextResponse } from 'next/server';
import { analyzeResumeAndJobDescription } from '@/lib/nlp/analyzer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { resumeText, jdText, weights } = body;

    if (!resumeText || typeof resumeText !== 'string' || resumeText.trim().length === 0) {
      return NextResponse.json(
        { error: 'Resume text is required. Please upload a text-based PDF or paste resume text.' },
        { status: 400 }
      );
    }

    if (!jdText || typeof jdText !== 'string' || jdText.trim().length === 0) {
      return NextResponse.json(
        { error: 'Job description text is required. Please paste the target job description.' },
        { status: 400 }
      );
    }

    if (resumeText.trim().length < 30) {
      return NextResponse.json(
        { error: 'Resume text is too brief to analyze. Please provide a complete resume.' },
        { status: 400 }
      );
    }

    const analysis = analyzeResumeAndJobDescription(resumeText, jdText, { weights });

    return NextResponse.json(analysis, { status: 200 });
  } catch (err: any) {
    console.error('Error analyzing resume:', err);
    return NextResponse.json(
      { error: err.message || 'An error occurred during resume analysis.' },
      { status: 500 }
    );
  }
}
