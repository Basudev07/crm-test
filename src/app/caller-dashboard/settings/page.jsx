import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";

export default function CallerSettingsPage() {
  return (
    <div className="flex items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto bg-muted rounded-full p-3 w-fit">
            <ShieldAlert className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle className="mt-4">Account Settings</CardTitle>
          <CardDescription>
            Your account settings are managed by your administrator.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-sm text-muted-foreground">
            To make changes to your profile, update your password, or manage other account details, please contact your team administrator.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
