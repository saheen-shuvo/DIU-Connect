"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bus, Home, MessageCircle, Settings } from "lucide-react";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/diu-bus-schedule", label: "Bus", icon: Bus },
  { to: "/confessions", label: "Confess", icon: MessageCircle },
  { to: "/admin/bus", label: "Admin", icon: Settings },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 font-bold text-lg">
          <span className="text-[#0c53a1]">DIU</span>
          <span className="text-[#3ab252]">Connect</span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-1">
          {navItems.map(({ to, label, icon: Icon }) => {
            const active =
              pathname === to || (to !== "/" && pathname.startsWith(to));

            return (
              <Link
                key={to}
                href={to}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-[#0c53a1] text-white"
                    : "text-gray-500 hover:bg-gray-100 hover:text-black"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
