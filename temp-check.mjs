import { prisma } from "@/lib/prisma";

async function check() {
  const internships = await prisma.internship.findMany({
    select: { id: true, title: true, published: true }
  });
  console.log("Internships in DB:");
  console.log(internships);
}
check();
