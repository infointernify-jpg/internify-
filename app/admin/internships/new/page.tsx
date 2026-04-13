"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { 
  Building2, Globe, MapPin, Briefcase, Calendar, 
  DollarSign, Link2, Tags, Gift, TrendingUp, 
  CheckCircle, Send, X, Plus, Trash2, Info,
  Clock, UserCircle, Mail, Phone, FileText, Image, Upload, Cloud
} from "lucide-react";

// Indian locations
const INDIAN_LOCATIONS = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune",
  "Ahmedabad", "Jaipur", "Lucknow", "Nagpur", "Indore", "Bhopal", "Visakhapatnam",
  "Patna", "Vadodara", "Surat", "Coimbatore", "Mysore", "Chandigarh",
  "Bhubaneswar", "Guwahati", "Ranchi", "Raipur", "Thiruvananthapuram", "Kochi",
  "Mangalore", "Nashik", "Aurangabad", "Jodhpur", "Udaipur", "Varanasi",
  "Agra", "Kanpur", "Amritsar", "Ludhiana", "Madurai", "Gurgaon", "Noida",
  "Remote"
];

// Finance-specific categories
const FINANCE_CATEGORIES = [
  { value: "Investment Banking", label: "Investment Banking", tag: "Most Competitive", description: "M&A, IPOs, deal execution" },
  { value: "Equity Research", label: "Equity Research", tag: "High Demand", description: "Fundamental analysis, sector reports" },
  { value: "FinTech", label: "FinTech", tag: "Fastest Growing", description: "Payments, lending, trading platforms" },
  { value: "Financial Analyst", label: "Financial Analyst", tag: "Entry Friendly", description: "FP&A, budgeting, forecasting" },
  { value: "CA Articleship", label: "CA Articleship", tag: "ICAI Approved", description: "Audit, taxation, compliance" },
  { value: "Risk & Compliance", label: "Risk & Compliance", tag: "Banking Sector", description: "Credit risk, market risk" },
  { value: "Corporate Finance", label: "Corporate Finance", tag: "Corporates", description: "Treasury, capital structure" },
  { value: "Portfolio Management", label: "Portfolio Management", tag: "PMS & AMC", description: "Asset allocation, fund management" }
];

const WORK_MODES = ["Remote", "On-site", "Hybrid"];
const INTERNSHIP_TYPES = ["Full-time", "Part-time", "Virtual"];

// Common company logo URLs for suggestions
const SUGGESTED_LOGOS = [
  { name: "Goldman Sachs", url: "https://logo.clearbit.com/goldmansachs.com" },
  { name: "Morgan Stanley", url: "https://logo.clearbit.com/morganstanley.com" },
  { name: "J.P. Morgan", url: "https://logo.clearbit.com/jpmorgan.com" },
  { name: "Razorpay", url: "https://media.glassdoor.com/sqll/1823510/razorpay-squareLogo-1647314500432.png" },
  { name: "Deloitte", url: "https://logo.clearbit.com/deloitte.com" },
  { name: "EY", url: "https://logo.clearbit.com/ey.com" },
  { name: "Kotak Mahindra Bank", url: "https://logo.clearbit.com/kotak.com" },
  { name: "Avendus", url: "https://logo.clearbit.com/avendus.com" },
];

export default function PostInternshipPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [logoPreview, setLogoPreview] = useState("");
  const [uploadMethod, setUploadMethod] = useState<"url" | "file">("url");
  const [uploadingFile, setUploadingFile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    companyLogo: "",
    companyWebsite: "",
    aboutCompany: "",
    location: "",
    category: "",
    workMode: "",
    internshipType: "",
    duration: "",
    description: "",
    applyLink: "",
    skills: [] as string[],
    perks: [] as string[],
    paid: false,
    stipendAmount: "",
    isTrending: false,
    verified: false,
    published: true,
  });

  // Temporary input for skills and perks
  const [newSkill, setNewSkill] = useState("");
  const [newPerk, setNewPerk] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    
    // Update logo preview when company logo URL changes
    if (name === "companyLogo") {
      setLogoPreview(value);
    }
  };

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError("Please upload an image file (PNG, JPG, JPEG, GIF)");
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError("File size should be less than 2MB");
      return;
    }

    setUploadingFile(true);
    setError("");

    try {
      // Create form data for upload
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);

      // Upload to your API endpoint
      const response = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      // Set the logo URL from the uploaded file
      setFormData(prev => ({
        ...prev,
        companyLogo: data.url
      }));
      setLogoPreview(data.url);
      setSuccess("Logo uploaded successfully!");
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
      
    } catch (err) {
      console.error("Upload error:", err);
      setError(err instanceof Error ? err.message : "Failed to upload image");
    } finally {
      setUploadingFile(false);
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const addPerk = () => {
    if (newPerk.trim() && !formData.perks.includes(newPerk.trim())) {
      setFormData(prev => ({
        ...prev,
        perks: [...prev.perks, newPerk.trim()]
      }));
      setNewPerk("");
    }
  };

  const removePerk = (perk: string) => {
    setFormData(prev => ({
      ...prev,
      perks: prev.perks.filter(p => p !== perk)
    }));
  };

  const handleSuggestedLogo = (url: string) => {
    setFormData(prev => ({
      ...prev,
      companyLogo: url
    }));
    setLogoPreview(url);
  };

  const getCategoryTag = (categoryValue: string) => {
    const category = FINANCE_CATEGORIES.find(c => c.value === categoryValue);
    return category?.tag || "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validation
    if (!formData.title || !formData.company || !formData.location || 
        !formData.category || !formData.workMode || !formData.duration || 
        !formData.description || !formData.applyLink) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/admin/internships", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create internship");
      }

      setSuccess("Internship posted successfully!");
      setTimeout(() => {
        router.push("/admin/internships");
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Get selected category details for display
  const selectedCategory = FINANCE_CATEGORIES.find(c => c.value === formData.category);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Post New Finance Internship</h1>
        <p className="text-gray-500 mt-1">Fill in the details to create a new internship opportunity in finance</p>
      </div>

      {/* Error/Success Messages */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information Section */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-5 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-2">
              <Building2 size={18} className="text-blue-600" />
              <h2 className="font-semibold text-gray-900">Basic Information</h2>
            </div>
          </div>
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Investment Banking Analyst Intern"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="e.g., Goldman Sachs"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Company Logo Section with Upload Option */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Logo
              </label>
              
              {/* Toggle between URL and File Upload */}
              <div className="flex gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => setUploadMethod("url")}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                    uploadMethod === "url" 
                      ? "bg-blue-600 text-white" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <Link2 size={14} className="inline mr-1" />
                  Add URL
                </button>
                <button
                  type="button"
                  onClick={() => setUploadMethod("file")}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                    uploadMethod === "file" 
                      ? "bg-blue-600 text-white" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <Upload size={14} className="inline mr-1" />
                  Upload Image
                </button>
              </div>

              {/* URL Input Method */}
              {uploadMethod === "url" && (
                <div className="flex gap-3">
                  <div className="flex-1">
                    <input
                      type="url"
                      name="companyLogo"
                      value={formData.companyLogo}
                      onChange={handleChange}
                      placeholder="https://example.com/logo.png"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Paste a URL from Google Images or company website
                    </p>
                  </div>
                  {logoPreview && (
                    <div className="w-12 h-12 rounded-lg border border-gray-200 overflow-hidden bg-white flex items-center justify-center">
                      <img
                        src={logoPreview}
                        alt="Logo preview"
                        className="w-8 h-8 object-contain"
                        onError={() => setLogoPreview("")}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* File Upload Method */}
              {uploadMethod === "file" && (
                <div>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="block w-full">
                        <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors cursor-pointer">
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            PNG, JPG, GIF up to 2MB
                          </p>
                        </div>
                      </label>
                    </div>
                    {logoPreview && (
                      <div className="w-12 h-12 rounded-lg border border-gray-200 overflow-hidden bg-white flex items-center justify-center">
                        <img
                          src={logoPreview}
                          alt="Logo preview"
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                    )}
                  </div>
                  {uploadingFile && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-blue-600">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      Uploading...
                    </div>
                  )}
                </div>
              )}

              {/* Suggested Logos */}
              {uploadMethod === "url" && (
                <div className="mt-3">
                  <p className="text-xs font-medium text-gray-600 mb-2">Suggested logos:</p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTED_LOGOS.map((logo) => (
                      <button
                        key={logo.name}
                        type="button"
                        onClick={() => handleSuggestedLogo(logo.url)}
                        className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                      >
                        {logo.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Website
                </label>
                <input
                  type="url"
                  name="companyWebsite"
                  value={formData.companyWebsite}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location <span className="text-red-500">*</span>
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Location</option>
                  {INDIAN_LOCATIONS.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                About Company
              </label>
              <textarea
                name="aboutCompany"
                value={formData.aboutCompany}
                onChange={handleChange}
                rows={3}
                placeholder="Tell us about the company..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Work Details Section */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-5 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-2">
              <Briefcase size={18} className="text-blue-600" />
              <h2 className="font-semibold text-gray-900">Work Details</h2>
            </div>
          </div>
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Finance Category</option>
                  {FINANCE_CATEGORIES.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label} - {cat.description}
                    </option>
                  ))}
                </select>
                {selectedCategory && (
                  <div className="mt-2 inline-flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      selectedCategory.tag === "Most Competitive" ? "bg-red-100 text-red-700" :
                      selectedCategory.tag === "High Demand" ? "bg-orange-100 text-orange-700" :
                      selectedCategory.tag === "Fastest Growing" ? "bg-green-100 text-green-700" :
                      selectedCategory.tag === "Entry Friendly" ? "bg-blue-100 text-blue-700" :
                      selectedCategory.tag === "ICAI Approved" ? "bg-purple-100 text-purple-700" :
                      selectedCategory.tag === "Banking Sector" ? "bg-indigo-100 text-indigo-700" :
                      selectedCategory.tag === "Corporates" ? "bg-cyan-100 text-cyan-700" :
                      "bg-gray-100 text-gray-700"
                    }`}>
                      {selectedCategory.tag}
                    </span>
                    <span className="text-xs text-gray-500">{selectedCategory.description}</span>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Work Mode <span className="text-red-500">*</span>
                </label>
                <select
                  name="workMode"
                  value={formData.workMode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Work Mode</option>
                  {WORK_MODES.map(mode => (
                    <option key={mode} value={mode}>{mode}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Internship Type
                </label>
                <select
                  name="internshipType"
                  value={formData.internshipType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Type</option>
                  {INTERNSHIP_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g., 3 months, 6 months"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={6}
                placeholder="Describe the internship responsibilities, requirements, and expectations..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Apply Link <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                name="applyLink"
                value={formData.applyLink}
                onChange={handleChange}
                placeholder="https://example.com/apply"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Skills & Perks Section */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-5 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-2">
              <Tags size={18} className="text-blue-600" />
              <h2 className="font-semibold text-gray-900">Skills & Perks</h2>
            </div>
          </div>
          <div className="p-5 space-y-4">
            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Required Skills
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  placeholder="e.g., Financial Modeling, Valuation, Excel"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus size={18} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="hover:text-red-600"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Perks */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Perks & Benefits
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newPerk}
                  onChange={(e) => setNewPerk(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addPerk())}
                  placeholder="e.g., Certificate, PPO, Mentorship"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={addPerk}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Plus size={18} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.perks.map((perk) => (
                  <span
                    key={perk}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm"
                  >
                    <Gift size={12} />
                    {perk}
                    <button
                      type="button"
                      onClick={() => removePerk(perk)}
                      className="hover:text-red-600"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stipend & Options Section */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-5 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-2">
              <DollarSign size={18} className="text-blue-600" />
              <h2 className="font-semibold text-gray-900">Stipend & Options</h2>
            </div>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="paid"
                checked={formData.paid}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <label className="text-sm font-medium text-gray-700">
                Paid Internship
              </label>
            </div>

            {formData.paid && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stipend Amount (per month)
                </label>
                <input
                  type="text"
                  name="stipendAmount"
                  value={formData.stipendAmount}
                  onChange={handleChange}
                  placeholder="e.g., 50000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="isTrending"
                checked={formData.isTrending}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <TrendingUp size={14} />
                Mark as Trending
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="verified"
                checked={formData.verified}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <CheckCircle size={14} />
                Verified Company
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Publishing...
              </>
            ) : (
              <>
                <Send size={16} />
                Publish Internship
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}