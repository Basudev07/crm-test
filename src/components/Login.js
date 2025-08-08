"use client";

// 1. Import your new custom component instead of Clerk's
import CustomSignInForm from "./CustomSignInForm";

/**
 * This component now acts as a simple layout container.
 * Its only job is to center whatever content we give it.
 */
export default function Login() {
  return (
    // This div centers the form on the page
    <div className="min-h-screen flex items-center justify-center">
      {/* 2. Render your custom form component */}
      <CustomSignInForm />
    </div>
  );
}