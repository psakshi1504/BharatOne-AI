import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, Badge } from "@/components/AppShell";
import { Search, Filter } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/citizen-requests")({
  component: CitizenRequests,
  head: () => ({ meta: [{ title: "Citizen Requests — BharatOne AI" }] }),
});

type Row = { id: string; name: string; service: string; status: "Approved" | "Pending" | "In Review" | "Rejected"; priority: "High" | "Medium" | "Low"; date: string };
const rows: Row[] = [
  { id: "REQ-8821", name: "Ravi Iyer", service: "Ration Card Update", status: "Approved", priority: "Low", date: "12 Mar 2026" },
  { id: "REQ-8822", name: "Meena Devi", service: "Birth Certificate", status: "In Review", priority: "Medium", date: "12 Mar 2026" },
  { id: "REQ-8823", name: "Karan Singh", service: "Water Connection", status: "Pending", priority: "High", date: "11 Mar 2026" },
  { id: "REQ-8824", name: "Aisha Khan", service: "Scholarship Application", status: "Approved", priority: "Medium", date: "11 Mar 2026" },
  { id: "REQ-8825", name: "Rohit Patel", service: "Property Tax", status: "Rejected", priority: "Low", date: "10 Mar 2026" },
  { id: "REQ-8826", name: "Sunita Reddy", service: "Voter ID Update", status: "In Review", priority: "Medium", date: "10 Mar 2026" },
  { id: "REQ-8827", name: "Deepak Naik", service: "Business License", status: "Pending", priority: "High", date: "09 Mar 2026" },
  { id: "REQ-8828", name: "Kavitha M", service: "Pension Enrollment", status: "Approved", priority: "Low", date: "09 Mar 2026" },
];

const tone = (s: Row["status"]): "success" | "warning" | "danger" | "info" =>
  s === "Approved" ? "success" : s === "Pending" ? "warning" : s === "Rejected" ? "danger" : "info";
const pTone = (p: Row["priority"]): "danger" | "warning" | "default" =>
  p === "High" ? "danger" : p === "Medium" ? "warning" : "default";

function CitizenRequests() {
  const [q, setQ] = useState("");
  const filtered = rows.filter((r) => (r.name + r.service + r.id).toLowerCase().includes(q.toLowerCase()));
  return (
    <AppShell title="Citizen Requests" subtitle="Track service requests submitted by citizens.">
      <Card className="p-0 overflow-hidden">
        <div className="p-4 flex flex-col sm:flex-row gap-3 border-b border-border">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, service, or ID..."
              className="w-full h-10 pl-10 pr-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/40"
            />
          </div>
          <button className="h-10 px-4 rounded-lg border border-input bg-background text-sm font-medium hover:bg-accent flex items-center gap-2"><Filter className="w-4 h-4" /> Filter</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-muted-foreground border-b border-border bg-muted/40">
                <th className="px-5 py-3 font-medium">Request ID</th>
                <th className="px-5 py-3 font-medium">Citizen</th>
                <th className="px-5 py-3 font-medium">Service</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Priority</th>
                <th className="px-5 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-5 py-3 font-mono text-xs">{r.id}</td>
                  <td className="px-5 py-3 font-medium">{r.name}</td>
                  <td className="px-5 py-3 text-muted-foreground">{r.service}</td>
                  <td className="px-5 py-3"><Badge tone={tone(r.status)}>{r.status}</Badge></td>
                  <td className="px-5 py-3"><Badge tone={pTone(r.priority)}>{r.priority}</Badge></td>
                  <td className="px-5 py-3 text-muted-foreground">{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AppShell>
  );
}
