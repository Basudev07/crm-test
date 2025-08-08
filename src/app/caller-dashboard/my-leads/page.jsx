import { leads, users } from "@/lib/dummy-data";
import { columns } from "./columns";
import { LeadsTable } from "@/components/LeadsTable";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Phone, CheckCircle, BarChart } from "lucide-react";

export default function MyLeadsPage() {
  // --- Filter leads for the current caller ---
  // In a real app, you would get the current user's ID dynamically.
  const currentCaller = users.find(u => u.name === "Sara Smith");
  const myLeads = leads.filter(l => l.assignedToId === currentCaller.id);

  // --- Calculate stats based on the filtered leads ---
  const totalLeads = myLeads.length;
  const contactedLeads = myLeads.filter(l => l.disposition === "Contacted").length;
  const convertedLeads = myLeads.filter(l => l.disposition === "Interested").length;
  const conversionRate = totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">My Leads</h2>
          <p className="text-muted-foreground">
            Here are all the leads assigned to you.
          </p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLeads}</div>
            <p className="text-xs text-muted-foreground">leads assigned</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contacted</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contactedLeads}</div>
            <p className="text-xs text-muted-foreground">reached</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Converted</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{convertedLeads}</div>
            <p className="text-xs text-muted-foreground">interested</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rate</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">conversion</p>
          </CardContent>
        </Card>
      </div>

      {/* The Data Table */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <LeadsTable columns={columns} data={myLeads} />
        </CardContent>
      </Card>
    </div>
  );
}
