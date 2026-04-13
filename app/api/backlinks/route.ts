import { NextResponse } from "next/server";

export async function GET() {
  // This would be connected to a database in production
  const backlinks = [
    { source: "LinkedIn", url: "https://linkedin.com/company/internify", type: "Social" },
    { source: "Twitter", url: "https://twitter.com/internify", type: "Social" },
    { source: "Instagram", url: "https://instagram.com/internify.in", type: "Social" },
  ];
  
  return NextResponse.json({ 
    total: backlinks.length,
    backlinks,
    message: "Build more backlinks to improve SEO ranking"
  });
}