import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Test simple query
    const result = await prisma.$queryRaw`SELECT 1 as connected, NOW() as time`;
    
    return NextResponse.json({ 
      success: true, 
      message: "Database connected successfully!",
      result 
    });
  } catch (error: any) {
    console.error("Database error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      code: error.code,
      meta: error.meta
    }, { status: 500 });
  }
}