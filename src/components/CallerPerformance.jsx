import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function CallerPerformance({ users }) {
  // Filter for callers and sort them by total calls
  const callers = users
    .filter((user) => user.role === "caller")
    .sort((a, b) => b.totalCalls - a.totalCalls);

  return (
    <div className="space-y-4">
      {callers.map((user, index) => (
        <div key={user.id} className="flex items-center">
          <div className="text-lg font-semibold text-muted-foreground mr-4">
            #{index + 1}
          </div>
          <Avatar className="h-9 w-9">
            {/* Placeholder for user avatar images */}
            <AvatarImage src={`/avatars/${index + 1}.png`} alt="Avatar" />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <div className="font-medium text-right">
                <div>{user.conversionRate.toFixed(1)}%</div>
                <div className="text-xs text-muted-foreground">{user.totalCalls} calls</div>
            </div>
            <Badge variant={user.status === "Online" ? "default" : "outline"}>
              {user.status}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}