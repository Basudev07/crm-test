"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Loader2, Upload } from "lucide-react";

// Main component for the settings page
export default function CustomSettingsPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  
  // State for tabs
  const [activeTab, setActiveTab] = useState("profile");

  // State for Profile form
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [isProfileUpdating, setIsProfileUpdating] = useState(false);

  // State for Password form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordUpdating, setIsPasswordUpdating] = useState(false);

  // Effect to populate form when user data loads
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
    }
  }, [user]);

  if (!isLoaded || !isSignedIn) {
    return <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin"/></div>;
  }

  // Handler to update profile name
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsProfileUpdating(true);
    try {
      // Corrected: Ensure parameters are in camelCase
      await user.update({ firstName: firstName, lastName: lastName });
      await user.reload();
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error(err.errors?.[0]?.message || "Failed to update profile.");
    } finally {
      setIsProfileUpdating(false);
    }
  };

  // Handler for profile image upload
  const handleProfileImageUpload = async () => {
      if (!profileImageFile) {
          toast.error("Please select an image file first.");
          return;
      }
      setIsProfileUpdating(true);
      try {
          await user.setProfileImage({ file: profileImageFile });
          await user.reload();
          toast.success("Profile image updated!");
          setProfileImageFile(null);
      } catch (err) {
          console.error("Error uploading profile image:", err);
          toast.error(err.errors?.[0]?.message || "Failed to upload image.");
      } finally {
          setIsProfileUpdating(false);
      }
  };

  // Handler for password change
  const handlePasswordUpdate = async (e) => {
      e.preventDefault();
      if (newPassword !== confirmPassword) {
          toast.error("New passwords do not match.");
          return;
      }
      setIsPasswordUpdating(true);
      try {
          await user.updatePassword({ currentPassword, newPassword });
          toast.success("Password updated successfully!");
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
      } catch (err) {
          console.error("Error updating password:", err);
          toast.error(err.errors?.[0]?.message || "Failed to update password.");
      } finally {
          setIsPasswordUpdating(false);
      }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>
      <Separator />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Left Side Navigation */}
        <nav className="flex flex-col gap-1 md:col-span-1">
            <Button variant={activeTab === 'profile' ? 'secondary' : 'ghost'} className="justify-start" onClick={() => setActiveTab('profile')}>Profile</Button>
            <Button variant={activeTab === 'security' ? 'secondary' : 'ghost'} className="justify-start" onClick={() => setActiveTab('security')}>Security</Button>
        </nav>

        {/* Right Side Content */}
        <div className="md:col-span-3">
            {activeTab === 'profile' && (
                <Card>
                    <CardHeader>
                        <CardTitle>Profile</CardTitle>
                        <CardDescription>This is how others will see you on the site.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        {/* Profile Image Section */}
                        <div className="flex items-center gap-4">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={user.imageUrl} />
                                <AvatarFallback>{firstName.charAt(0)}{lastName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <Input id="picture" type="file" accept="image/*" onChange={(e) => setProfileImageFile(e.target.files[0])} className="max-w-xs" />
                            <Button onClick={handleProfileImageUpload} disabled={isProfileUpdating || !profileImageFile}>
                                <Upload className="mr-2 h-4 w-4"/> Upload
                            </Button>
                        </div>
                        {/* Profile Info Form */}
                        <form onSubmit={handleProfileUpdate} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2"><Label htmlFor="firstName">First Name</Label><Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} /></div>
                                <div className="space-y-2"><Label htmlFor="lastName">Last Name</Label><Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} /></div>
                            </div>
                            <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" value={user.primaryEmailAddress.emailAddress} disabled /></div>
                            <div className="flex justify-end">
                                <Button type="submit" disabled={isProfileUpdating}>
                                    {isProfileUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Update Profile
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {activeTab === 'security' && (
                <Card>
                    <CardHeader>
                        <CardTitle>Security</CardTitle>
                        <CardDescription>Update your password here.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handlePasswordUpdate} className="space-y-6">
                            <div className="space-y-2"><Label htmlFor="currentPassword">Current Password</Label><Input id="currentPassword" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} /></div>
                            <div className="space-y-2"><Label htmlFor="newPassword">New Password</Label><Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} /></div>
                            <div className="space-y-2"><Label htmlFor="confirmPassword">Confirm New Password</Label><Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /></div>
                            <div className="flex justify-end">
                                <Button type="submit" disabled={isPasswordUpdating}>
                                    {isPasswordUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Update Password
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}
        </div>
      </div>
    </div>
  );
}
