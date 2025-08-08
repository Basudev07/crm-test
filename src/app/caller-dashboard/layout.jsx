import { CallerHeader } from "@/components/CallerHeader"; // 1. Import the new CallerHeader
import { CallerSidebar } from "@/components/CallerSidebar";

/**
 * This is the dedicated layout for the caller dashboard.
 */
export default function CallerDashboardLayout({ children }) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <CallerSidebar />

      <div className="flex flex-col min-w-0">
        <CallerHeader /> {/* 2. Use the new CallerHeader */}

        <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-muted/40">
          {children}
        </main>
      </div>
    </div>
  );
}
