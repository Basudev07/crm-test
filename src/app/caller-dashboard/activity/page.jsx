"use client";

import { useState } from "react";
import { activities, users } from "@/lib/dummy-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  RefreshCw,
  Download,
  ListFilter,
  Calendar as CalendarIcon,
  AlertTriangle,
  MapPin,
  Eye,
  Activity as ActivityIcon,
  LogIn,
  Map,
  ShieldAlert,
  ShieldQuestion
} from "lucide-react";
import { format } from "date-fns";

export default function CallerActivityPage() {
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);

  // In a real app, you'd get the current user dynamically
  const currentUser = users.find(u => u.name === "Sara Smith");
  
  // Filter activities to show only the current user's actions
  const myActivities = activities.filter(act => act.userName === currentUser.name);

  // --- Placeholder data for stat cards (can be made dynamic later) ---
  const totalActivities = myActivities.length;
  const loginSuccessRate = 100; // Assuming all logins are successful for a caller
  const locationViolations = 0; // Placeholder
  const riskScore = 0; // Placeholder
  const securityAlerts = 0; // Placeholder


  return (
    <div className="space-y-6">
      {/* --- Header --- */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-muted p-3 rounded-lg">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">My Activity Monitor</h2>
            <p className="text-muted-foreground">
              A log of your recent actions and security events.
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
            <Button variant="outline"><RefreshCw className="mr-2 h-4 w-4"/> Refresh</Button>
            <Button variant="outline"><Download className="mr-2 h-4 w-4"/> Export</Button>
        </div>
      </div>

      {/* --- Stat Cards --- */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total Activities</CardTitle><ActivityIcon className="h-4 w-4 text-muted-foreground"/></CardHeader><CardContent><div className="text-2xl font-bold">{totalActivities}</div><p className="text-xs text-muted-foreground">Your recent actions</p></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Login Success</CardTitle><LogIn className="h-4 w-4 text-muted-foreground"/></CardHeader><CardContent><div className="text-2xl font-bold">{loginSuccessRate}%</div><p className="text-xs text-muted-foreground">Your success rate</p></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Location Violations</CardTitle><Map className="h-4 w-4 text-muted-foreground"/></CardHeader><CardContent><div className="text-2xl font-bold">{locationViolations}</div><p className="text-xs text-muted-foreground">Outside geofence</p></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Risk Score</CardTitle><ShieldAlert className="h-4 w-4 text-muted-foreground"/></CardHeader><CardContent><div className="text-2xl font-bold">{riskScore}</div><p className="text-xs text-muted-foreground">High risk activities</p></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Security Alerts</CardTitle><ShieldQuestion className="h-4 w-4 text-muted-foreground"/></CardHeader><CardContent><div className="text-2xl font-bold">{securityAlerts}</div><p className="text-xs text-muted-foreground">Requires investigation</p></CardContent></Card>
      </div>

      {/* --- Filters & Activity Log --- */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <ListFilter className="h-5 w-5"/>
            <CardTitle>Filters</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Select defaultValue="currentUser"><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="currentUser">{currentUser.name}</SelectItem></SelectContent></Select>
            <Select><SelectTrigger><SelectValue placeholder="Activity Type"/></SelectTrigger><SelectContent><SelectItem value="all">All Activities</SelectItem></SelectContent></Select>
            <Popover><PopoverTrigger asChild><Button variant="outline" className="justify-start font-normal"><CalendarIcon className="mr-2 h-4 w-4"/>{dateFrom ? format(dateFrom, "PPP") : <span>Date From</span>}</Button></PopoverTrigger><PopoverContent className="w-auto p-0"><Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus/></PopoverContent></Popover>
            <Popover><PopoverTrigger asChild><Button variant="outline" className="justify-start font-normal"><CalendarIcon className="mr-2 h-4 w-4"/>{dateTo ? format(dateTo, "PPP") : <span>Date To</span>}</Button></PopoverTrigger><PopoverContent className="w-auto p-0"><Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus/></PopoverContent></Popover>
          </div>
          
          <div className="border rounded-lg overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Risk</TableHead>
                  <TableHead>Device</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myActivities.map(activity => (
                  <TableRow key={activity.id}>
                    <TableCell className="font-medium">{format(new Date(activity.timestamp), "PP pp")}</TableCell>
                    <TableCell>{activity.userName}</TableCell>
                    <TableCell><Badge variant="outline" className="flex items-center gap-1">Lead Update</Badge></TableCell>
                    <TableCell>N/A</TableCell>
                    <TableCell><Badge variant="outline">0</Badge></TableCell>
                    <TableCell>desktop</TableCell>
                    <TableCell><Button variant="ghost" size="icon"><Eye className="h-4 w-4"/></Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
