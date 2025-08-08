import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Log form data for debugging (remove in production)
    console.log('Contact form submission received');
    
    // This route enables Netlify Forms detection for Next.js App Router  
    // Netlify will intercept and handle the actual form processing
    
    // Return success response
    return NextResponse.json({ 
      success: true, 
      message: 'Contact form submission received' 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: 'Form submission failed' },
      { status: 500 }
    );
  }
}