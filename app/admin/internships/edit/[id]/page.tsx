import prisma from "@/lib/prisma";
import EditForm from "./EditForm";

export default async function EditInternship({ params }: { params: { id: string } }) {

  const internship = await prisma.internship.findUnique({
    where: { id: params.id }
  });

  if (!internship) {
    return <div>Internship not found</div>;
  }

  // Convert the data to match the expected type (handle nulls)
  const formattedInternship = {
    ...internship,
    companyLogo: internship.companyLogo || "",
    companyWebsite: internship.companyWebsite || "",
    aboutCompany: internship.aboutCompany || "",
    stipendAmount: internship.stipendAmount ? String(internship.stipendAmount) : null,
    applyLink: internship.applyLink || "",
    eligibility: internship.eligibility || "",
    internshipType: internship.internshipType || "",
    // stipendType: internship.stipendType || "",  // Removed - field doesn't exist
    openings: internship.openings || 0,
    startDate: internship.startDate || null,
    applyBy: internship.applyBy || null,
  };

  return <EditForm internship={formattedInternship} />;
}