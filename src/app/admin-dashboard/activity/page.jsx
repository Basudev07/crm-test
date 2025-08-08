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

export default function ActivityMonitorPage() {
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);

  // --- Placeholder data for stat cards ---
  const totalActivities = 304;
  const loginSuccessRate = 91;
  const locationViolations = 43;
  const riskScore = 21;
  const securityAlerts = 22;

  return (
    <div className="space-y-6">
      {/* --- Header --- */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-muted p-3 rounded-lg">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Security & Activity Monitor</h2>
            <p className="text-muted-foreground">
              Comprehensive monitoring of user authentication and security events.
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
        <Card><CardHeader><CardTitle className="text-sm font-medium">Total Activities</CardTitle><ActivityIcon className="h-4 w-4 text-muted-foreground"/></CardHeader><CardContent><div className="text-2xl font-bold">{totalActivities}</div><p className="text-xs text-muted-foreground">183 logins, 18 logouts</p></CardContent></Card>
        <Card><CardHeader><CardTitle className="text-sm font-medium">Login Success</CardTitle><LogIn className="h-4 w-4 text-muted-foreground"/></CardHeader><CardContent><div className="text-2xl font-bold">{loginSuccessRate}%</div><p className="text-xs text-muted-foreground">Success rate</p></CardContent></Card>
        <Card><CardHeader><CardTitle className="text-sm font-medium">Location Violations</CardTitle><Map className="h-4 w-4 text-muted-foreground"/></CardHeader><CardContent><div className="text-2xl font-bold">{locationViolations}</div><p className="text-xs text-muted-foreground">65 outside geofence</p></CardContent></Card>
        <Card><CardHeader><CardTitle className="text-sm font-medium">Risk Score</CardTitle><ShieldAlert className="h-4 w-4 text-muted-foreground"/></CardHeader><CardContent><div className="text-2xl font-bold">{riskScore}</div><p className="text-xs text-muted-foreground">65 high risk activities</p></CardContent></Card>
        <Card><CardHeader><CardTitle className="text-sm font-medium">Security Alerts</CardTitle><ShieldQuestion className="h-4 w-4 text-muted-foreground"/></CardHeader><CardContent><div className="text-2xl font-bold">{securityAlerts}</div><p className="text-xs text-muted-foreground">Requires investigation</p></CardContent></Card>
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
            <Select><SelectTrigger><SelectValue placeholder="Select User"/></SelectTrigger><SelectContent><SelectItem value="all">All Users</SelectItem>{users.map(u=><SelectItem key={u.id} value={u.id}>{u.name}</SelectItem>)}</SelectContent></Select>
            <Select><SelectTrigger><SelectValue placeholder="Activity Type"/></SelectTrigger><SelectContent><SelectItem value="all">All Activities</SelectItem></SelectContent></Select>
            <Popover><PopoverTrigger asChild><Button variant="outline" className="justify-start font-normal"><CalendarIcon className="mr-2 h-4 w-4"/>{dateFrom ? format(dateFrom, "PPP") : <span>Date From</span>}</Button></PopoverTrigger><PopoverContent className="w-auto p-0"><Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus/></PopoverContent></Popover>
            <Popover><PopoverTrigger asChild><Button variant="outline" className="justify-start font-normal"><CalendarIcon className="mr-2 h-4 w-4"/>{dateTo ? format(dateTo, "PPP") : <span>Date To</span>}</Button></PopoverTrigger><PopoverContent className="w-auto p-0"><Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus/></PopoverContent></Popover>
          </div>
          
          <div className="border rounded-lg">
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
                {activities.map(activity => (
                  <TableRow key={activity.id}>
                    <TableCell>{format(new Date(activity.timestamp), "PP pp")}</TableCell>
                    <TableCell>{activity.userName}</TableCell>
                    <TableCell><Badge variant="destructive" className="flex items-center gap-1"><AlertTriangle className="h-3 w-3"/> Location Violation</Badge></TableCell>
                    <TableCell>99.3km Outside geofence</TableCell>
                    <TableCell><Badge variant="destructive">75</Badge></TableCell>
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
