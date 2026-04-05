import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const internships = await prisma.internship.findMany({
      select: {
        id: true,
        title: true,
        published: true,
        createdAt: true
      },
      orderBy: { createdAt: "desc" }
    });
    
    return NextResponse.json({
      count: internships.length,
      internships: internships
    });
  } catch (error) {
    console.error("Debug error:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
