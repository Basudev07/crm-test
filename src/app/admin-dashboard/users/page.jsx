"use client";

import { useState } from "react";
import { users as initialUsers } from "@/lib/dummy-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
  Users as UsersIcon,
  Wifi,
  ShieldCheck,
  BarChart,
  MoreHorizontal,
  UserCheck,
  Edit,
  CheckCircle,
  XCircle, // 1. Import the new icon for deactivation
} from "lucide-react";
import { AddUserDialog } from "@/components/AddUserDialog";
import { EditUserDialog } from "@/components/EditUserDialog";
import { toast } from "sonner";

export default function TeamManagementPage() {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editingUser, setEditingUser] = useState(null);

  const handleAddUser = (newUser) => {
    const userWithDefaults = { id: `user_${Date.now()}`, ...newUser, totalCalls: 0, conversionRate: 0.0, status: "Inactive" };
    setUsers(prevUsers => [...prevUsers, userWithDefaults]);
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
  };

  const handleApproveUser = (userId) => {
    setUsers(users.map(user => user.id === userId ? { ...user, status: 'Offline' } : user));
    toast.success("User has been approved.");
  };
  
  const handleActivateUser = (userId) => {
    setUsers(users.map(user => user.id === userId ? { ...user, status: 'Online' } : user));
    toast.success("User has been activated.");
  };

  // 2. Add the deactivate handler function
  const handleDeactivateUser = (userId) => {
    setUsers(users.map(user => user.id === userId ? { ...user, status: 'Offline' } : user));
    toast.success("User has been deactivated.");
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalUsers = users.length;
  const onlineNow = users.filter(user => user.status === "Online").length;
  const adminCount = users.filter(user => user.role === "admin").length;
  const callerCount = users.filter(user => user.role === "caller").length;
  const activationRate = 75.0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-muted p-3 rounded-lg"><UsersIcon className="h-6 w-6" /></div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Team Management</h2>
            <p className="text-muted-foreground">Manage users, roles, and access permissions.</p>
          </div>
        </div>
        <AddUserDialog onAddUser={handleAddUser} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">3 active, 0 pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Online Now</CardTitle>
            <Wifi className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{onlineNow}</div>
            <p className="text-xs text-muted-foreground">2 active today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Structure</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminCount}:{callerCount}</div>
            <p className="text-xs text-muted-foreground">Admins to Callers ratio</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activation Rate</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activationRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Users successfully activated</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>User Filters</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <Input placeholder="Search users by name, email..." className="flex-1" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="All Roles" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="caller">Caller</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="All Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Online">Online</SelectItem>
                <SelectItem value="Offline">Offline</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredUsers.map((user, index) => (
              <Card key={user.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={`/avatars/${index + 1}.png`} alt={user.name} />
                        <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {user.status === 'Inactive' && (
                          <DropdownMenuItem onClick={() => handleApproveUser(user.id)}>
                            <UserCheck className="mr-2 h-4 w-4" />
                            <span>Approve User</span>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => setEditingUser(user)}>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit User</span>
                        </DropdownMenuItem>
                        
                        {/* 3. Conditionally show Activate or Deactivate */}
                        {user.status === 'Offline' && (
                           <DropdownMenuItem onClick={() => handleActivateUser(user.id)}>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            <span>Activate</span>
                          </DropdownMenuItem>
                        )}
                        {user.status === 'Online' && (
                           <DropdownMenuItem onClick={() => handleDeactivateUser(user.id)}>
                            <XCircle className="mr-2 h-4 w-4" />
                            <span>Deactivate</span>
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                    <Badge variant="secondary">{user.role}</Badge>
                    <Badge variant={user.status === 'Online' ? 'default' : (user.status === 'Offline' ? 'outline' : 'destructive')}>
                      {user.status}
                    </Badge>
                  </div>
                  <div className="mt-4 text-sm text-muted-foreground space-y-1">
                    <p>Joined Jul 15, 2025</p>
                    <p>Last seen about 4 hours ago</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <EditUserDialog
        user={editingUser}
        onUpdateUser={handleUpdateUser}
        open={!!editingUser}
        onOpenChange={(isOpen) => !isOpen && setEditingUser(null)}
      />
    </div>
  );
}
