import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.formData();
  
  // This route exists to make Netlify Forms work with Next.js App Router
  // The actual form submission will be handled by Netlify
  return NextResponse.redirect(new URL('/contact?success=true', request.url));
}