import { leads, users } from "@/lib/dummy-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Users as UsersIcon,
  Target,
  CalendarClock,
  BarChart,
  AlertTriangle,
  PhoneCall,
  MapPin,
  Building,
  CalendarDays,
  Star,
  TrendingUp,
} from "lucide-react";
import Link from "next/link"; // 1. Import the Link component

export default function CallerDashboardPage() {
  // Assuming the logged-in user is Sara Smith for this example
  const currentUser = users.find(u => u.name === "Sara Smith");
  const myLeads = leads.filter(l => l.assignedToId === currentUser.id);
  const newLeadsCount = myLeads.filter(l => l.disposition === "New").length;

  // --- Find the next lead to call ---
  const nextUpLead = myLeads.find(l => l.disposition === "New");

  // --- Data for Performance Tab ---
  const dispositionBreakdown = myLeads.reduce((acc, lead) => {
    const disposition = lead.disposition || "Unknown";
    acc[disposition] = (acc[disposition] || 0) + 1;
    return acc;
  }, {});

  // --- Dummy Data for Schedule Tab ---
  const upcomingFollowUps = [
      { id: 69, name: "Lead No. 69", phone: "6307399035", school: "Silliguri Boys' High School", date: "Aug 20, 00:00", daysLeft: "12 days"},
      { id: 83, name: "Lead No. 83", phone: "8046516377", school: "G.D. Goenka Public School", date: "Aug 13, 00:00", daysLeft: "5 days"},
  ];

  return (
    <div className="space-y-6">
      {/* --- Header --- */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-3xl font-bold tracking-tight">My Dashboard</h2>
            <Badge variant="outline" className="border-green-500 text-green-500">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Online
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Welcome back, {currentUser.name}! Ready to make some calls?
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">Take Break</Button>
          {/* 2. Wrap the button in a Link if there's a lead to call */}
          {nextUpLead ? (
            <a href={`tel:${nextUpLead.phone}`}>
              <Button>Start Calling</Button>
            </a>
          ) : (
            <Button disabled>Start Calling</Button>
          )}
        </div>
      </div>

      {/* --- Stat Cards (Consistent Design) --- */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">My Leads</CardTitle><UsersIcon className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{myLeads.length}</div><p className="text-xs text-muted-foreground">{newLeadsCount} new</p></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Conversion Rate</CardTitle><Target className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">0.0%</div><p className="text-xs text-muted-foreground">0 interested</p></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Follow-ups</CardTitle><CalendarClock className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">2</div><p className="text-xs text-muted-foreground">0 today</p></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">This Week</CardTitle><BarChart className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">27</div><p className="text-xs text-muted-foreground">calls made</p></CardContent></Card>
      </div>

      {/* --- Priority Actions --- */}
      {newLeadsCount > 0 && nextUpLead && (
        <Card className="border-destructive bg-destructive/10">
          <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <AlertTriangle className="h-6 w-6 text-destructive" />
              <div>
                <h3 className="font-semibold">Priority Actions Required</h3>
                <p className="text-sm text-destructive/80">{newLeadsCount} new leads need attention</p>
              </div>
            </div>
            {/* 3. Wrap the button in a Link */}
            <a href={`tel:${nextUpLead.phone}`}>
              <Button variant="destructive">Call Now &rarr;</Button>
            </a>
          </CardContent>
        </Card>
      )}

      {/* --- Main Content Tabs --- */}
      <Tabs defaultValue="today">
        <TabsList>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>
        <TabsContent value="today" className="grid gap-6 md:grid-cols-2 mt-4">
          <Card>
            <CardHeader><CardTitle>Next Up</CardTitle></CardHeader>
            <CardContent>
              {nextUpLead ? (
                <div className="border bg-muted/40 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold">Lead No. {nextUpLead.id}</h4>
                    <Badge variant="outline">{nextUpLead.campaign || "No Campaign"}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p className="flex items-center gap-2"><PhoneCall className="h-4 w-4"/> {nextUpLead.phone}</p>
                    <p className="flex items-center gap-2"><Building className="h-4 w-4"/> {nextUpLead.school}</p>
                    <p className="flex items-center gap-2"><MapPin className="h-4 w-4"/> {nextUpLead.locality}, {nextUpLead.district}</p>
                  </div>
                  {/* 4. Wrap the button in a Link */}
                  <a href={`tel:${nextUpLead.phone}`} className="block w-full">
                    <Button className="w-full mt-2">Start Calling</Button>
                  </a>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <p>No new leads to call. Great job!</p>
                </div>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Today's Follow-ups</CardTitle></CardHeader>
            <CardContent className="flex flex-col items-center justify-center text-center h-full min-h-[200px]">
              <CalendarDays className="h-12 w-12 text-muted-foreground mb-4"/>
              <p className="text-muted-foreground">No follow-ups scheduled for today</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="performance" className="grid gap-6 md:grid-cols-2 mt-4">
            <Card>
                <CardHeader><CardTitle>My Stats</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-2"><Star className="h-5 w-5 text-primary"/> Conversion Rate</div>
                        <div className="font-bold">0.0%</div>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-2"><PhoneCall className="h-5 w-5 text-primary"/> Total Calls</div>
                        <div className="font-bold">{myLeads.length}</div>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary"/> This Week</div>
                        <div className="font-bold">27</div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Disposition Breakdown</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    {Object.entries(dispositionBreakdown).map(([disposition, count]) => (
                        <div key={disposition}>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-primary"></span>
                                    {disposition}
                                </span>
                                <span>{count}</span>
                            </div>
                            <Progress value={(count / myLeads.length) * 100} />
                        </div>
                    ))}
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="schedule" className="mt-4">
            <Card>
                <CardHeader><CardTitle>Upcoming Follow-ups</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    {upcomingFollowUps.map(lead => (
                        <div key={lead.id} className="flex items-center justify-between p-3 rounded-lg border">
                            <div>
                                <p className="font-semibold">{lead.name}</p>
                                <p className="text-sm text-muted-foreground">{lead.phone} • {lead.school}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold">{lead.date}</p>
                                <p className="text-sm text-muted-foreground">{lead.daysLeft}</p>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
