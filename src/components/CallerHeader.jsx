"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package2,
  Search,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "./ThemeToggle";
import { useClerk, useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function CallerHeader() {
  const { signOut } = useClerk();
  const { user } = useUser();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const pathname = usePathname();

  const handleLinkClick = () => {
    setIsSheetOpen(false);
  };

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          {/* Changed md:hidden to lg:hidden */}
          <Button variant="outline" size="icon" className="shrink-0 lg:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader className="text-left">
            <SheetTitle>
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span>Menu</span>
              </Link>
            </SheetTitle>
          </SheetHeader>
          <nav className="mt-6 flex flex-col gap-2">
            <Link
              href="/caller-dashboard"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-muted hover:text-primary ${
                pathname === "/caller-dashboard"
                  ? "text-primary bg-muted"
                  : "text-muted-foreground"
              }`}
              onClick={handleLinkClick}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/caller-dashboard/my-leads"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-muted hover:text-primary ${
                pathname === "/caller-dashboard/my-leads"
                  ? "text-primary bg-muted"
                  : "text-muted-foreground"
              }`}
              onClick={handleLinkClick}
            >
              <Users className="h-4 w-4" />
              My Leads
            </Link>
            <Link
              href="/caller-dashboard/activity"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-muted hover:text-primary ${
                pathname === "/caller-dashboard/activity"
                  ? "text-primary bg-muted"
                  : "text-muted-foreground"
              }`}
              onClick={handleLinkClick}
            >
              <LineChart className="h-4 w-4" />
              Activity Monitor
            </Link>
          </nav>
        </SheetContent>
      </Sheet>

      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>

      <ThemeToggle />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <Avatar className="h-8 w-8">
                <AvatarImage src={user?.imageUrl} />
                <AvatarFallback>
                    {user?.firstName?.charAt(0)}
                </AvatarFallback>
            </Avatar>
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user?.fullName}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.primaryEmailAddress.emailAddress}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/caller-dashboard/settings">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
