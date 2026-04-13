"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { 
  ChevronDown, 
  LogOut, 
  User,
  Briefcase,
  Heart
} from "lucide-react";
import Avatar from "./Avatar";

export default function ProfileDropdown() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  if (status === "loading") {
    return <div className="w-10 h-10 rounded-full bg-slate-100 animate-pulse" />;
  }

  if (!session) {
    return null;
  }

  const user = session.user as any;
  const userName = user?.name || "User";
  const userEmail = user?.email || "";

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button with Name */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Profile menu"
        aria-expanded={isOpen}
        className="flex items-center gap-2 focus:outline-none hover:opacity-80 transition-opacity"
      >
        <Avatar user={user} size={44} />
        <div className="hidden md:block text-left">
          <p className="text-sm font-semibold text-slate-700">{userName.split(" ")[0]}</p>
        </div>
        <ChevronDown 
          size={14} 
          className={`text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 z-50 overflow-hidden">
            
            {/* User Info */}
            <div className="px-4 py-3 border-b border-slate-100">
              <p className="text-sm font-semibold text-slate-800 truncate">{userName}</p>
              {userEmail && (
                <p className="text-[11px] text-slate-400 truncate mt-0.5">{userEmail}</p>
              )}
            </div>

            {/* Menu Items */}
            <div className="py-1">
              <Link
                href="/dashboard/applications"
                className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Briefcase size={14} className="text-slate-400" />
                <span>My Applications</span>
              </Link>
              
              <Link
                href="/saved"
                className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Heart size={14} className="text-slate-400" />
                <span>Saved Internships</span>
              </Link>
              
              <Link
                href="/profile"
                className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <User size={14} className="text-slate-400" />
                <span>Profile Settings</span>
              </Link>
            </div>

            {/* Divider */}
            <div className="h-px bg-slate-100" />

            {/* Logout */}
            <div className="py-1">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
              >
                <LogOut size={14} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}