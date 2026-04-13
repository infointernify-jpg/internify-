import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    // Check if user is admin
    const session = await getServerSession(authOptions);
    
    // More detailed admin check
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized - No session found" },
        { status: 401 }
      );
    }
    
    if ((session.user as any).role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 403 }
      );
    }

    const body = await req.json();
    
    // Log the received data for debugging
    console.log("Received internship data:", JSON.stringify(body, null, 2));
    
    const {
      title,
      company,
      companyLogo,  // Added companyLogo field
      companyWebsite,
      aboutCompany,
      location,
      category,
      workMode,
      internshipType,
      duration,
      description,
      applyLink,
      skills,
      perks,
      paid,
      stipendAmount,
      isTrending,
      verified,
      published,
    } = body;

    // Enhanced validation
    const requiredFields = [
      { field: "title", value: title },
      { field: "company", value: company },
      { field: "location", value: location },
      { field: "category", value: category },
      { field: "workMode", value: workMode },
      { field: "duration", value: duration },
      { field: "description", value: description },
      { field: "applyLink", value: applyLink },
    ];

    const missingFields = requiredFields
      .filter(field => !field.value)
      .map(field => field.field);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Validate URL format for applyLink and companyWebsite
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    
    if (!urlPattern.test(applyLink)) {
      return NextResponse.json(
        { error: "Invalid apply link URL format" },
        { status: 400 }
      );
    }

    if (companyWebsite && !urlPattern.test(companyWebsite)) {
      return NextResponse.json(
        { error: "Invalid company website URL format" },
        { status: 400 }
      );
    }

    // Validate category is from allowed list
    const allowedCategories = [
      "Investment Banking",
      "Equity Research",
      "FinTech",
      "Financial Analyst",
      "CA Articleship",
      "Risk & Compliance",
      "Corporate Finance",
      "Portfolio Management"
    ];

    if (!allowedCategories.includes(category)) {
      return NextResponse.json(
        { error: `Invalid category. Must be one of: ${allowedCategories.join(", ")}` },
        { status: 400 }
      );
    }

    // Validate work mode
    const allowedWorkModes = ["Remote", "On-site", "Hybrid"];
    if (!allowedWorkModes.includes(workMode)) {
      return NextResponse.json(
        { error: `Invalid work mode. Must be one of: ${allowedWorkModes.join(", ")}` },
        { status: 400 }
      );
    }

    // Create internship
    const internship = await prisma.internship.create({
      data: {
        title: title.trim(),
        company: company.trim(),
        companyLogo: companyLogo || null,  // Added companyLogo field
        companyWebsite: companyWebsite || null,
        aboutCompany: aboutCompany || null,
        location: location.trim(),
        category,
        workMode,
        internshipType: internshipType || null,
        duration: duration.trim(),
        description: description.trim(),
        applyLink: applyLink.trim(),
        skills: skills || [],
        perks: perks || [],
        paid: paid || false,
        stipendAmount: paid ? stipendAmount : null,
        isTrending: isTrending || false,
        verified: verified || false,
        published: published !== false,
      },
    });

    // Log successful creation
    console.log(`Internship created successfully: ${internship.id} - ${internship.title}`);

    return NextResponse.json({
      success: true,
      message: "Internship created successfully",
      data: internship,
    });

  } catch (error) {
    console.error("Error creating internship:", error);
    
    // Handle Prisma specific errors
    if (error instanceof Error) {
      if (error.message.includes("Prisma")) {
        return NextResponse.json(
          { error: "Database error. Please check your database connection." },
          { status: 500 }
        );
      }
    }
    
    return NextResponse.json(
      { error: "Failed to create internship. Please try again." },
      { status: 500 }
    );
  }
}

// Optional: Add a GET endpoint to fetch categories
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Return categories list for frontend
    const categories = [
      { value: "Investment Banking", label: "Investment Banking", tag: "Most Competitive", description: "M&A, IPOs, deal execution" },
      { value: "Equity Research", label: "Equity Research", tag: "High Demand", description: "Fundamental analysis, sector reports" },
      { value: "FinTech", label: "FinTech", tag: "Fastest Growing", description: "Payments, lending, trading platforms" },
      { value: "Financial Analyst", label: "Financial Analyst", tag: "Entry Friendly", description: "FP&A, budgeting, forecasting" },
      { value: "CA Articleship", label: "CA Articleship", tag: "ICAI Approved", description: "Audit, taxation, compliance" },
      { value: "Risk & Compliance", label: "Risk & Compliance", tag: "Banking Sector", description: "Credit risk, market risk" },
      { value: "Corporate Finance", label: "Corporate Finance", tag: "Corporates", description: "Treasury, capital structure" },
      { value: "Portfolio Management", label: "Portfolio Management", tag: "PMS & AMC", description: "Asset allocation, fund management" }
    ];

    const workModes = ["Remote", "On-site", "Hybrid"];
    const locations = [
      "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune",
      "Ahmedabad", "Jaipur", "Lucknow", "Nagpur", "Indore", "Bhopal", "Visakhapatnam",
      "Patna", "Vadodara", "Surat", "Coimbatore", "Mysore", "Chandigarh",
      "Bhubaneswar", "Guwahati", "Ranchi", "Raipur", "Thiruvananthapuram", "Kochi",
      "Mangalore", "Nashik", "Aurangabad", "Jodhpur", "Udaipur", "Varanasi",
      "Agra", "Kanpur", "Amritsar", "Ludhiana", "Madurai", "Gurgaon", "Noida", "Remote"
    ];

    return NextResponse.json({
      categories,
      workModes,
      locations
    });
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return NextResponse.json(
      { error: "Failed to fetch metadata" },
      { status: 500 }
    );
  }
}