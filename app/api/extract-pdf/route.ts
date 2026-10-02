import { NextRequest, NextResponse } from 'next/server';
import pdfParse from 'pdf-parse';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No PDF file uploaded.' }, { status: 400 });
    }

    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Invalid file format. Please upload a PDF file.' }, { status: 400 });
    }

    // 10MB limit
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size exceeds 10MB limit.' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const pdfData = await pdfParse(buffer);
    const extractedText = (pdfData.text || '').trim();

    if (extractedText.length === 0) {
      return NextResponse.json(
        {
          error: 'Text could not be extracted from this PDF. Please upload a text-based PDF.',
        },
        { status: 422 }
      );
    }

    return NextResponse.json({
      text: extractedText,
      pageCount: pdfData.numpages,
      info: pdfData.info,
    });
  } catch (err: any) {
    console.error('PDF parsing error:', err);
    return NextResponse.json(
      {
        error:
          'Text could not be extracted from this PDF. Please upload a text-based PDF.',
      },
      { status: 422 }
    );
  }
}
