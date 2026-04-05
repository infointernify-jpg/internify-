import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cities = [
      "Bangalore", "Mumbai", "Remote", "Delhi", "Pune", 
      "Hyderabad", "Chennai", "Bhubaneswar", "Kolkata", 
      "Jaipur", "Lucknow", "Ahmedabad"
    ];
    
    const cityCounts = await Promise.all(
      cities.map(async (city) => {
        let count = 0;
        
        if (city === "Remote") {
          count = await prisma.internship.count({
            where: { published: true, workMode: "Remote" }
          });
        } else {
          count = await prisma.internship.count({
            where: { published: true, location: { contains: city, mode: 'insensitive' } }
          });
        }
        
        const urlCity = city.toLowerCase().replace(/\s+/g, '');
        
        return { city, count, seoUrl: `/internships/location/${urlCity}` };
      })
    );
    
    return NextResponse.json(cityCounts);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
