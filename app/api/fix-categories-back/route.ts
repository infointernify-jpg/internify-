import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fix Jivox (should be Software, not Data Analyst)
    await prisma.internship.updateMany({
      where: { company: "Jivox" },
      data: { category: "Software" }
    });

    // Fix Panthera (should be Data, not Data Analyst)
    await prisma.internship.updateMany({
      where: { company: "Panthera Infotech" },
      data: { category: "Data" }
    });

    // Fix RebelCorp (keep as Marketing)
    await prisma.internship.updateMany({
      where: { company: "RebelCorp" },
      data: { category: "Marketing" }
    });

    return NextResponse.json({ 
      success: true, 
      message: " Categories fixed!",
      updates: {
        "Panthera Infotech": "Data",
        "Jivox": "Software", 
        "RebelCorp": "Marketing"
      }
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
