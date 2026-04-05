// data/internships.js - Updated with more internships
export const internships = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "Tech Corp",
    location: "Remote",
    category: "software-development",
    city: "remote",
    stipend: "₹15,000/month",
    duration: "3 months",
    description: "Looking for a frontend intern with React and Tailwind CSS skills",
    postedDate: "2026-04-01"
  },
  {
    id: 2,
    title: "Data Analyst Intern",
    company: "Analytics Pro",
    location: "Bangalore",
    category: "data-analyst",
    city: "bangalore",
    stipend: "₹13,000/month",
    duration: "6 months",
    description: "SQL and Python skills required for data analysis",
    postedDate: "2026-04-02"
  },
  {
    id: 3,
    title: "Marketing Intern",
    company: "Digital Agency",
    location: "Remote",
    category: "marketing",
    city: "remote",
    stipend: "₹10,000/month",
    duration: "3 months",
    description: "Social media and content creation for brands",
    postedDate: "2026-04-03"
  },
  {
    id: 4,
    title: "Full Stack Developer Intern",
    company: "WebSolutions",
    location: "Mumbai",
    category: "software-development",
    city: "mumbai",
    stipend: "₹20,000/month",
    duration: "6 months",
    description: "MERN stack development for web applications",
    postedDate: "2026-04-01"
  },
  {
    id: 5,
    title: "UI/UX Design Intern",
    company: "Creative Studio",
    location: "Remote",
    category: "ui-ux-design",
    city: "remote",
    stipend: "₹12,000/month",
    duration: "3 months",
    description: "Figma and Adobe XD for product design",
    postedDate: "2026-04-04"
  },
  {
    id: 6,
    title: "Finance Intern",
    company: "Investment Bank",
    location: "Mumbai",
    category: "finance",
    city: "mumbai",
    stipend: "₹15,000/month",
    duration: "3 months",
    description: "Financial analysis and accounting support",
    postedDate: "2026-04-05"
  },
  {
    id: 7,
    title: "Backend Developer Intern",
    company: "Server Labs",
    location: "Bangalore",
    category: "software-development",
    city: "bangalore",
    stipend: "₹18,000/month",
    duration: "6 months",
    description: "Node.js and database management",
    postedDate: "2026-04-05"
  }
]

export function getInternshipsByCategory(category) {
  return internships.filter(i => i.category === category)
}

export function getInternshipsByCity(city) {
  return internships.filter(i => i.city === city)
}

export function getInternshipById(id) {
  return internships.find(i => i.id === parseInt(id))
}

export function getAllCategories() {
  return [...new Set(internships.map(i => i.category))]
}

export function getAllCities() {
  return [...new Set(internships.map(i => i.city))]
}
