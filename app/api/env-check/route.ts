import { NextResponse } from 'next/server';

export async function GET() {
  // Only check if variables exist (don't expose values)
  const vars = {
    DATABASE_URL: !!process.env.DATABASE_URL,
    NEXTAUTH_URL: !!process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
    NODE_ENV: process.env.NODE_ENV,
  };
  
  return NextResponse.json(vars);
}