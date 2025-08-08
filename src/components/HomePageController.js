"use client";

import { useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Login from "./Login";

/**
 * This component acts as a controller for the home page.
 * - If the user is logged in, it redirects them to their respective dashboard.
 * - If the user is not logged in, it shows the Login component.
 */
export default function HomePageController() {
  // Get authentication status and user data from Clerk hooks
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  // useEffect hook handles the redirection after the component has mounted
  useEffect(() => {
    // Ensure all data is loaded and the user is signed in before trying to redirect
    if (isLoaded && isSignedIn) {
      // Get the user's role from their public metadata
      const role = user?.publicMetadata?.role;

      if (role === "admin") {
        router.push("/admin-dashboard");
      } else if (role === "caller") {
        router.push("/caller-dashboard");
      }
    }
  }, [isLoaded, isSignedIn, user, router]);

  // While Clerk is loading its state, show a simple loading message
  if (!isLoaded) {
    return <p className="text-center mt-8">Loading...</p>;
  }

  // If the user is signed in, show a redirecting message while the useEffect runs
  if (isSignedIn) {
    return <p className="text-center mt-8">Redirecting...</p>;
  }

  // If the user is not signed in, render the Login component
  return <Login />;
}