// data/internships.ts

export interface Internship {
  id: number
  title: string
  company: string
  location: string
  category: string
  city: string
  stipend: string
  duration: string
  description: string
  postedDate: string
  applyLink?: string  // ✅ ADD THIS - optional since not all internships may have it
  companyLogo?: string
  skills?: string[]
  isPaid?: boolean
}

// Sample internships data
export const internships: Internship[] = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "Google",
    location: "Bangalore",
    category: "Software Development",
    city: "Bangalore",
    stipend: "₹25,000/month",
    duration: "6 months",
    description: "Join Google's frontend team to build world-class web applications. You'll work with React, TypeScript, and modern web technologies.",
    postedDate: "2026-04-01",
    applyLink: "https://careers.google.com/internship",
    skills: ["React", "TypeScript", "JavaScript", "HTML/CSS"],
    isPaid: true
  },
  {
    id: 2,
    title: "Data Analyst Intern",
    company: "Amazon",
    location: "Bangalore",
    category: "Data Science",
    city: "Bangalore",
    stipend: "₹30,000/month",
    duration: "6 months",
    description: "Analyze customer data and drive business decisions at Amazon. Work with large datasets and create insights.",
    postedDate: "2026-04-02",
    applyLink: "https://amazon.jobs/internship",
    skills: ["SQL", "Python", "Excel", "Tableau"],
    isPaid: true
  },
  {
    id: 3,
    title: "UI/UX Design Intern",
    company: "Microsoft",
    location: "Bangalore",
    category: "Design",
    city: "Bangalore",
    stipend: "₹35,000/month",
    duration: "6 months",
    description: "Design beautiful interfaces for Microsoft products. Work with product teams to create user-friendly designs.",
    postedDate: "2026-04-03",
    applyLink: "https://careers.microsoft.com/internship",
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
    isPaid: true
  },
  {
    id: 4,
    title: "Digital Marketing Intern",
    company: "Flipkart",
    location: "Bangalore",
    category: "Marketing",
    city: "Bangalore",
    stipend: "₹20,000/month",
    duration: "3 months",
    description: "Drive digital marketing campaigns for India's largest e-commerce platform.",
    postedDate: "2026-04-04",
    applyLink: "https://flipkart.com/careers/internship",
    skills: ["SEO", "Social Media", "Content Marketing", "Google Analytics"],
    isPaid: true
  },
  {
    id: 5,
    title: "Software Development Intern",
    company: "Oracle",
    location: "Hyderabad",
    category: "Software Development",
    city: "Hyderabad",
    stipend: "₹40,000/month",
    duration: "6 months",
    description: "Build scalable backend systems at Oracle. Work with Java, Spring Boot, and cloud technologies.",
    postedDate: "2026-04-05",
    applyLink: "https://oracle.com/careers/internship",
    skills: ["Java", "Spring Boot", "SQL", "Microservices"],
    isPaid: true
  },
];

// Helper functions
export function getAllInternships(): Internship[] {
  return internships;
}

export function getInternshipById(id: number): Internship | undefined {
  return internships.find(internship => internship.id === id);
}

export function getInternshipsByCategory(category: string): Internship[] {
  return internships.filter(internship => internship.category === category);
}

export function getInternshipsByCity(city: string): Internship[] {
  return internships.filter(internship => internship.city === city);
}