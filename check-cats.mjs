import { prisma } from "@/lib/prisma";

async function check() {
  const internships = await prisma.internship.findMany({
    select: { title: true, category: true, company: true }
  });
  console.log("Current internships:");
  internships.forEach(i => {
    console.log(`  - ${i.title} | Category: "${i.category}" | Company: ${i.company}`);
  });
}
check();
