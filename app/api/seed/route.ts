import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const roles = [
      "Software Development", "Data Analyst", "Marketing", "Finance", 
      "UI/UX Design", "Human Resources", "Digital Marketing", "Sales",
      "Business Operations", "Content Writing", "Graphic Design", "Product Management"
    ];
    
    const cities = ["Bangalore", "Mumbai", "Delhi", "Pune", "Hyderabad", "Chennai", "Remote"];
    
    const companies = [
      "Google", "Microsoft", "Amazon", "Flipkart", "Swiggy", "Zomato", 
      "Cred", "Razorpay", "Ola", "Byju's", "Unacademy", "Myntra"
    ];
    
    let count = 0;

    // Add internships for each role
    for (const role of roles) {
      await prisma.internship.create({
        data: {
          title: `${role} Intern`,
          company: companies[Math.floor(Math.random() * companies.length)],
          location: cities[Math.floor(Math.random() * cities.length)],
          category: role,
          internshipType: "Full-time", // Add this field
          workMode: Math.random() > 0.5 ? "Remote" : "On-site",
          description: `Exciting opportunity for a ${role} intern to join our team. Learn from industry experts and work on real projects.`,
          duration: `${Math.floor(Math.random() * 6) + 3} months`,
          stipendAmount: `₹${Math.floor(Math.random() * 20) + 10},000/month`,
          paid: true,
          published: true,
          skills: ["Communication", "Teamwork", "Problem Solving"],
          perks: ["Certificate", "Flexible Hours"],
          aboutCompany: `Leading company in India.`,
          createdAt: new Date(),
        }
      });
      count++;
    }

    // Add internships for each city
    for (const city of cities) {
      for (let i = 0; i < 2; i++) {
        const role = roles[Math.floor(Math.random() * roles.length)];
        await prisma.internship.create({
          data: {
            title: `${role} Intern`,
            company: companies[Math.floor(Math.random() * companies.length)],
            location: city,
            category: role,
            internshipType: "Full-time", // Add this field
            workMode: city === "Remote" ? "Remote" : "On-site",
            description: `Join our ${city} office as a ${role} intern. Great opportunity!`,
            duration: `${Math.floor(Math.random() * 6) + 3} months`,
            stipendAmount: `₹${Math.floor(Math.random() * 25) + 8},000/month`,
            paid: true,
            published: true,
            skills: ["Communication", "Teamwork"],
            perks: ["Certificate"],
            aboutCompany: `Hiring in ${city}.`,
            createdAt: new Date(),
          }
        });
        count++;
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `✅ Added ${count} internships successfully!`,
      count: count
    });
  } catch (error) {
    console.error("Error:", error);
    // Fix the error handling too
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}