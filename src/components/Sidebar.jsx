"use client"; // 1. Convert to a client component to use hooks

import Link from "next/link";
import { usePathname } from "next/navigation"; // 2. Import the usePathname hook
import { Bell, Home, LineChart, Package2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Sidebar() {
  // 3. Get the current URL path
  const pathname = usePathname();

  return (
    <div className="hidden border-r bg-background md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span>Lead Mgmt</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          {/* 4. Apply styles conditionally based on the current pathname */}
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="/admin-dashboard"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                pathname === "/admin-dashboard"
                  ? "bg-muted text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/admin-dashboard/leads"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                pathname === "/admin-dashboard/leads"
                  ? "bg-muted text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <Users className="h-4 w-4" />
              All Leads
            </Link>
            <Link
              href="/admin-dashboard/users"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                pathname === "/admin-dashboard/users"
                  ? "bg-muted text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <Users className="h-4 w-4" />
              Users
            </Link>
            <Link
              href="/admin-dashboard/activity"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                pathname === "/admin-dashboard/activity"
                  ? "bg-muted text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <LineChart className="h-4 w-4" />
              Activity Monitor
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}