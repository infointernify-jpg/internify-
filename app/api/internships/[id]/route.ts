import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const internship = await prisma.internship.findUnique({
      where: { id: params.id }
    });
    if (!internship) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(internship);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
