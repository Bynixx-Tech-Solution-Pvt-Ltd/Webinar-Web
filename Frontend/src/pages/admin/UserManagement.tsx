import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/dashboard-shell";

const users = [
  { name: "Aarav Sharma", email: "aarav@example.com", role: "Student", joined: "May 12, 2026" },
  { name: "Priya Nair", email: "priya@example.com", role: "Student", joined: "May 18, 2026" },
  { name: "Anil Kumar", email: "anil@example.com", role: "Mentor", joined: "Jan 02, 2026" },
  { name: "Meera Joshi", email: "meera@example.com", role: "Mentor", joined: "Feb 14, 2026" },
  { name: "Vikram Singh", email: "vikram@example.com", role: "Admin", joined: "Dec 01, 2025" },
];

export function UsersPage() {
  return (
    <>
      <PageHeader
        title="User Management"
        subtitle="Manage students, mentors and admins"
        action={<Button><UserPlus className="h-4 w-4" /> Invite User</Button>}
      />
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50 text-muted-foreground">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Name</th>
              <th className="text-left px-4 py-3 font-medium">Email</th>
              <th className="text-left px-4 py-3 font-medium">Role</th>
              <th className="text-left px-4 py-3 font-medium">Joined</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.email} className="border-t border-border">
                <td className="px-4 py-3 font-medium text-foreground">{u.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    u.role === "Admin" ? "bg-primary text-primary-foreground" :
                    u.role === "Mentor" ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground"
                  }`}>{u.role}</span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{u.joined}</td>
                <td className="px-4 py-3 text-right">
                  <Button variant="ghost" size="sm">Manage</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
