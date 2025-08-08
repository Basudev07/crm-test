"use client"; // Add this because Recharts components are client-side

// 1. Import all our data and the new component
import { leads, users, activities } from "@/lib/dummy-data";
import { CallerPerformance } from "@/components/CallerPerformance";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users as UsersIcon, Activity, BarChart3, ArrowUpRight } from "lucide-react";

// Import chart components from Recharts
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export default function AdminDashboard() {
  // --- Data Processing for Overview ---
  const totalLeads = leads.length;
  const unassignedLeads = leads.filter((lead) => !lead.assignedToId).length;
  const assignedLeads = totalLeads - unassignedLeads;
  const totalCallers = users.filter((user) => user.role === "caller").length;
  const activeCallers = users.filter(user => user.role === "caller" && user.status === "Online").length;
  const assignmentRate = totalLeads > 0 ? (assignedLeads / totalLeads) * 100 : 0;
  const conversionRate = 0; // Placeholder

  // --- Data Processing for Lead Distribution Card ---
  const leadDistribution = leads.reduce((acc, lead) => {
    acc[lead.disposition] = (acc[lead.disposition] || 0) + 1;
    return acc;
  }, {});

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
          <p className="text-muted-foreground">Monitor leads, assignments, and team performance.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">Export</Button>
          <Button>+ Add Lead</Button>
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        {/* --- Overview Tab --- */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
                <UsersIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalLeads}</div>
                <p className="text-xs text-muted-foreground">{unassignedLeads} unassigned</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Callers</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeCallers}</div>
                <p className="text-xs text-muted-foreground">of {totalCallers} total</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Assignment Rate</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{assignmentRate.toFixed(1)}%</div>
                <div className="w-full bg-muted rounded-full h-2.5 mt-2">
                  <div className="bg-primary h-2.5 rounded-full" style={{width: `${assignmentRate}%`}}></div>
                </div>
              </CardContent>
            </Card>
             <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{conversionRate.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground">0 interested</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-2">
              <CardHeader><CardTitle>Lead Distribution</CardTitle></CardHeader>
              <CardContent className="pl-6 space-y-2">
                {Object.entries(leadDistribution).map(([disposition, count]) => (
                  <div key={disposition} className="flex justify-between text-sm">
                    <span>{disposition}</span>
                    <span className="font-semibold">{count}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Today's Activity</CardTitle>
                <CardDescription>Assignments made today.</CardDescription>
              </CardHeader>
              <CardContent><div className="text-5xl font-bold">0</div></CardContent>
            </Card>
            <Card className="lg:col-span-2">
              <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
              <CardContent className="grid gap-2">
                <Button variant="outline">View All Leads</Button>
                <Button variant="outline">Manage Users</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* --- Performance Tab --- */}
        <TabsContent value="performance" className="space-y-4">
           <Card>
            <CardHeader>
              <CardTitle>Caller Performance</CardTitle>
              <CardDescription>Ranking of callers based on their activity.</CardDescription>
            </CardHeader>
            <CardContent>
              <CallerPerformance users={users} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- Analytics Tab --- */}
        <TabsContent value="analytics" className="space-y-4">
           <Card>
             <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>Lead generation over the last 7 days.</CardDescription>
             </CardHeader>
             <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={[{name: 'Day 1', total: 5}, {name: 'Day 2', total: 8}, {name: 'Day 3', total: 2}]}>
                        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                        <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
                    </BarChart>
                </ResponsiveContainer>
             </CardContent>
           </Card>
        </TabsContent>

        {/* --- Activity Tab --- */}
        <TabsContent value="activity" className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>A log of recent activities in the system.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activities.map(activity => (
                     <div key={activity.id} className="flex items-center gap-4">
                        <div className="text-sm text-muted-foreground">
                            {new Date(activity.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </div>
                        <div className="flex-1 text-sm">
                           <span className="font-semibold">{activity.userName}</span> {activity.description}
                        </div>
                     </div>
                  ))}
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}