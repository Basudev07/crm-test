"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { users } from "@/lib/dummy-data";
import { Phone } from "lucide-react"; // 1. Import the Phone icon

// This file defines the structure of the caller's leads table.
export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="max-w-[500px] truncate font-medium text-primary hover:underline cursor-pointer">
          Lead No. {row.original.id}
        </span>
        <span className="text-muted-foreground">{row.getValue("name")}</span>
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    // 2. Add a custom cell renderer for the phone number
    cell: ({ row }) => {
      const phone = row.getValue("phone");
      return (
        <a
          href={`tel:${phone}`}
          className="flex items-center gap-2 hover:text-primary"
        >
          <Phone className="h-4 w-4" />
          {phone}
        </a>
      );
    },
  },
  {
    accessorKey: "disposition",
    header: "Disposition",
    cell: ({ row }) => {
      const disposition = row.getValue("disposition");
      const variant =
        {
          New: "default",
          "Not Interested": "destructive",
          Contacted: "secondary",
        }[disposition] || "outline";
      return <Badge variant={variant}>{disposition}</Badge>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formatted = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "2-digit",
      });
      return <div className="font-medium">{formatted}</div>;
    },
  },
];
