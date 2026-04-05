import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Update all internships to have correct category names
    const result = await prisma.internship.updateMany({
      where: {
        OR: [
          { category: "Data" },
          { category: "Software" },
          { category: "data" },
          { category: "software" },
        ]
      },
      data: {
        category: {
          set: "Data Analyst"
        }
      }
    });

    // Also update any with "Software" category
    const result2 = await prisma.internship.updateMany({
      where: {
        OR: [
          { category: "Software" },
          { category: "software" },
          { category: "Software Development" },
        ]
      },
      data: {
        category: "Software Development"
      }
    });

    // Update Marketing
    const result3 = await prisma.internship.updateMany({
      where: {
        category: { contains: "Marketing", mode: "insensitive" }
      },
      data: {
        category: "Marketing"
      }
    });

    return NextResponse.json({ 
      success: true, 
      updated: result.count + result2.count + result3.count,
      message: `✅ Updated ${result.count + result2.count + result3.count} internships`
    });
  } catch (error) {
    console.error("Error:", error);
    // Fix: Handle unknown error type
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}