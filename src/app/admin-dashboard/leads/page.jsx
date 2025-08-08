import { leads, users } from "@/lib/dummy-data";
import { columns } from "./columns";
import { LeadsTable } from "@/components/LeadsTable"; // We will create this next
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Phone, CheckCircle, BarChart, PlusCircle } from "lucide-react";

export default function AllLeadsPage() {
  // Calculate stats from data
  const totalLeads = leads.length;
  const contactedLeads = leads.filter(
    (l) => l.disposition === "Contacted"
  ).length;
  const convertedLeads = leads.filter(
    (l) => l.disposition === "Interested"
  ).length;
  const conversionRate =
    totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Leads Management</h2>
          <p className="text-muted-foreground">
            Filter, view, and assign leads to your team.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">Export</Button>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Lead
          </Button>
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
            <p className="text-xs text-muted-foreground">leads</p>
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

      {/* The New Data Table Component */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <LeadsTable columns={columns} data={leads} />
        </CardContent>
      </Card>
    </div>
  );
}
