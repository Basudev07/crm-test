import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner"; // Import the Toaster component

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lead Management", // Updated title for relevance
  description: "Manage Your Leads Efficiently with CRM",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster /> {/* Add the Toaster component here */}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
