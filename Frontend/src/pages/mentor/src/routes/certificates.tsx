import { createFileRoute } from "@tanstack/react-router";
import { Shell, Card, PageHeader, Avatar, Chip, Btn } from "@/components/mentor/Shell";
import { Award, Download, CheckCircle2, Clock, XCircle, Eye } from "lucide-react";

export const Route = createFileRoute("/certificates")({
  head: () => ({
    meta: [
      { title: "Certificates — Bynixx Mentor Portal" },
      { name: "description", content: "Review and approve student course completion certificates." },
    ],
  }),
  component: CertificatesPage,
});

const certs = [
  { id: "BX-2025-1042", student: "Karthik S", course: "AI Engineering", completion: "98%", date: "May 19", status: "Pending", tone: "amber" as const },
  { id: "BX-2025-1041", student: "Arun Kumar", course: "Full Stack Web Dev", completion: "94%", date: "May 18", status: "Pending", tone: "amber" as const },
  { id: "BX-2025-1040", student: "Divya P", course: "Data Science", completion: "96%", date: "May 17", status: "Approved", tone: "green" as const },
  { id: "BX-2025-1039", student: "Vivek M", course: "Data Science", completion: "90%", date: "May 15", status: "Approved", tone: "green" as const },
  { id: "BX-2025-1038", student: "Rohan Mehta", course: "Cybersecurity", completion: "62%", date: "May 14", status: "Rejected", tone: "red" as const },
];

function CertificatesPage() {
  return (
    <Shell>
      <PageHeader title="Certificates" subtitle="Approve certificates for students completing your courses." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Award, label: "Issued", value: "248", tint: "chip-violet" },
          { icon: Clock, label: "Pending Approval", value: "12", tint: "chip-amber" },
          { icon: CheckCircle2, label: "Approved This Month", value: "34", tint: "chip-green" },
          { icon: XCircle, label: "Rejected", value: "5", tint: "chip-red" },
        ].map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-2xl p-5">
            <div className={`grid h-11 w-11 place-items-center rounded-xl bg-${s.tint}/15 text-${s.tint} mb-3`}><s.icon size={20} /></div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
            <div className="text-2xl font-bold mt-1">{s.value}</div>
          </div>
        ))}
      </div>

      <Card title="Certificate Queue">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-muted-foreground border-b border-border">
                <th className="text-left font-medium py-2">Certificate ID</th>
                <th className="text-left font-medium py-2">Student</th>
                <th className="text-left font-medium py-2">Course</th>
                <th className="text-left font-medium py-2">Completion</th>
                <th className="text-left font-medium py-2">Date</th>
                <th className="text-left font-medium py-2">Status</th>
                <th className="text-left font-medium py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {certs.map((c) => (
                <tr key={c.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="py-3 font-mono text-xs">{c.id}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2"><Avatar name={c.student} /><span className="font-medium">{c.student}</span></div>
                  </td>
                  <td className="py-3 text-muted-foreground">{c.course}</td>
                  <td className="py-3 font-semibold">{c.completion}</td>
                  <td className="py-3 text-muted-foreground">{c.date}</td>
                  <td className="py-3"><Chip tone={c.tone}>{c.status}</Chip></td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button className="grid h-7 w-7 place-items-center rounded-md hover:bg-muted"><Eye size={14} /></button>
                      <button className="grid h-7 w-7 place-items-center rounded-md hover:bg-muted"><Download size={14} /></button>
                      {c.status === "Pending" && <Btn>Approve</Btn>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </Shell>
  );
}
