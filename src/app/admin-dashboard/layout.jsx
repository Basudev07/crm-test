import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

/**
 * This is the dedicated layout for the admin dashboard.
 * It wraps all pages inside the /admin-dashboard route.
 */
export default function DashboardLayout({ children }) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Sidebar - visible only on medium screens and up */}
      <Sidebar />

      {/* Main Content Area */}
      {/* This is the key change: min-w-0 allows the flex container to shrink and not overflow */}
      <div className="flex flex-col min-w-0">
        {/* Header/Navbar */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:gap-6 lg:p-6 bg-muted/40">
          {children}
        </main>
      </div>
    </div>
  );
}
