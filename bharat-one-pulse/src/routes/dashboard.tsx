import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, Badge } from "@/components/AppShell";
import {
  MessageSquareWarning, Leaf, FileText, AlertTriangle, TrendingUp, TrendingDown,
  Bot, Cloud, Droplets, Wind, Sun, ArrowUpRight,
} from "lucide-react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  head: () => ({ meta: [{ title: "Dashboard — BharatOne AI" }] }),
});

const stats = [
  { label: "Total Complaints", value: "12,438", change: "+8.2%", up: true, icon: MessageSquareWarning, tone: "bg-primary/10 text-primary" },
  { label: "Farmers Helped", value: "34,921", change: "+12.5%", up: true, icon: Leaf, tone: "bg-success/10 text-success" },
  { label: "Schemes Applied", value: "8,207", change: "+4.1%", up: true, icon: FileText, tone: "bg-saffron/15 text-[oklch(0.45_0.15_55)]" },
  { label: "Disaster Alerts", value: "27", change: "-3", up: false, icon: AlertTriangle, tone: "bg-destructive/10 text-destructive" },
];

const trend = [
  { m: "Jan", c: 620, r: 540 }, { m: "Feb", c: 780, r: 690 },
  { m: "Mar", c: 690, r: 620 }, { m: "Apr", c: 890, r: 780 },
  { m: "May", c: 980, r: 870 }, { m: "Jun", c: 1120, r: 1020 },
  { m: "Jul", c: 1240, r: 1180 },
];

const activity = [
  { d: "Mon", v: 420 }, { d: "Tue", v: 560 }, { d: "Wed", v: 480 },
  { d: "Thu", v: 720 }, { d: "Fri", v: 640 }, { d: "Sat", v: 380 }, { d: "Sun", v: 290 },
];

const complaints = [
  { id: "CMP-2401", citizen: "Ramesh Kumar", issue: "Water pipeline leak", dept: "Water", status: "Resolved", tone: "success" as const },
  { id: "CMP-2402", citizen: "Priya Sharma", issue: "Streetlight not working", dept: "Municipality", status: "In Progress", tone: "warning" as const },
  { id: "CMP-2403", citizen: "Suresh Patil", issue: "Pothole on NH-4", dept: "PWD", status: "Pending", tone: "danger" as const },
  { id: "CMP-2404", citizen: "Anjali Verma", issue: "Garbage collection missed", dept: "Municipality", status: "Resolved", tone: "success" as const },
  { id: "CMP-2405", citizen: "Vikram Singh", issue: "Power outage", dept: "Electricity", status: "In Progress", tone: "warning" as const },
];

function Dashboard() {
  return (
    <AppShell>
      {/* Welcome */}
      <div className="mb-6 rounded-2xl bg-gradient-to-br from-primary via-primary to-[oklch(0.45_0.22_270)] text-primary-foreground p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 -right-8 w-40 h-40 rounded-full bg-saffron/40 blur-3xl" />
        <div className="relative">
          <div className="text-sm opacity-80">Namaste, Arjun 👋</div>
          <h2 className="text-2xl sm:text-3xl font-bold mt-1">Welcome back to BharatOne AI</h2>
          <p className="opacity-85 mt-2 max-w-2xl">You have <b>18 pending complaints</b> and <b>4 new scheme applications</b> that need review today.</p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <Card key={s.label}>
            <div className="flex items-start justify-between">
              <div className={`w-11 h-11 rounded-xl grid place-items-center ${s.tone}`}>
                <s.icon className="w-5 h-5" />
              </div>
              <span className={`inline-flex items-center gap-1 text-xs font-semibold ${s.up ? "text-success" : "text-destructive"}`}>
                {s.up ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                {s.change}
              </span>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold tracking-tight">{s.value}</div>
              <div className="text-sm text-muted-foreground mt-0.5">{s.label}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        <Card className="xl:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Complaint Trends</h3>
              <p className="text-xs text-muted-foreground">Received vs Resolved · Last 7 months</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-primary" /> Received</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-success" /> Resolved</span>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer>
              <AreaChart data={trend}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.55 0.22 260)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="oklch(0.55 0.22 260)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.63 0.17 148)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="oklch(0.63 0.17 148)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="oklch(0.92 0.01 250)" />
                <XAxis dataKey="m" stroke="oklch(0.5 0.02 260)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(0.5 0.02 260)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.01 250)" }} />
                <Area type="monotone" dataKey="c" stroke="oklch(0.55 0.22 260)" strokeWidth={2.5} fill="url(#g1)" />
                <Area type="monotone" dataKey="r" stroke="oklch(0.63 0.17 148)" strokeWidth={2.5} fill="url(#g2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <div className="mb-4">
            <h3 className="font-semibold">Citizen Activity</h3>
            <p className="text-xs text-muted-foreground">Weekly engagement</p>
          </div>
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={activity}>
                <CartesianGrid vertical={false} stroke="oklch(0.92 0.01 250)" />
                <XAxis dataKey="d" stroke="oklch(0.5 0.02 260)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(0.5 0.02 260)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.01 250)" }} />
                <Bar dataKey="v" fill="oklch(0.55 0.22 260)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Complaints table + weather */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        <Card className="xl:col-span-2 p-0 overflow-hidden">
          <div className="p-5 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Recent Complaints</h3>
              <p className="text-xs text-muted-foreground">Latest citizen reports across departments</p>
            </div>
            <Link to="/complaints" className="text-xs font-medium text-primary hover:underline flex items-center gap-1">View all <ArrowUpRight className="w-3.5 h-3.5" /></Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-muted-foreground border-y border-border bg-muted/40">
                  <th className="px-5 py-2.5 font-medium">ID</th>
                  <th className="px-5 py-2.5 font-medium">Citizen</th>
                  <th className="px-5 py-2.5 font-medium">Issue</th>
                  <th className="px-5 py-2.5 font-medium">Dept</th>
                  <th className="px-5 py-2.5 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((c) => (
                  <tr key={c.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="px-5 py-3 font-mono text-xs">{c.id}</td>
                    <td className="px-5 py-3 font-medium">{c.citizen}</td>
                    <td className="px-5 py-3 text-muted-foreground">{c.issue}</td>
                    <td className="px-5 py-3 text-muted-foreground">{c.dept}</td>
                    <td className="px-5 py-3"><Badge tone={c.tone}>{c.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-[oklch(0.7_0.12_220)] to-[oklch(0.55_0.15_240)] text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm opacity-90">Bengaluru, KA</div>
              <div className="text-xs opacity-75">Today · Partly Cloudy</div>
            </div>
            <Cloud className="w-10 h-10 opacity-90" />
          </div>
          <div className="mt-6 flex items-end gap-1">
            <span className="text-5xl font-bold">27°</span>
            <span className="text-lg opacity-80 pb-2">C</span>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-white/20">
            <div className="text-center">
              <Droplets className="w-4 h-4 mx-auto opacity-90" />
              <div className="text-xs opacity-75 mt-1">Humidity</div>
              <div className="text-sm font-semibold">68%</div>
            </div>
            <div className="text-center">
              <Wind className="w-4 h-4 mx-auto opacity-90" />
              <div className="text-xs opacity-75 mt-1">Wind</div>
              <div className="text-sm font-semibold">12 km/h</div>
            </div>
            <div className="text-center">
              <Sun className="w-4 h-4 mx-auto opacity-90" />
              <div className="text-xs opacity-75 mt-1">UV</div>
              <div className="text-sm font-semibold">Mod</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick actions */}
      <div>
        <h3 className="font-semibold mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { to: "/complaints", label: "Report Complaint", desc: "File a new civic issue", icon: MessageSquareWarning, color: "from-primary to-[oklch(0.45_0.22_270)]" },
            { to: "/crop-doctor", label: "Crop Doctor", desc: "Diagnose crop disease", icon: Leaf, color: "from-success to-[oklch(0.5_0.17_148)]" },
            { to: "/ai-assistant", label: "AI Assistant", desc: "Ask anything, anytime", icon: Bot, color: "from-[oklch(0.6_0.2_290)] to-[oklch(0.5_0.22_310)]" },
            { to: "/schemes", label: "Government Schemes", desc: "Explore benefits", icon: FileText, color: "from-saffron to-[oklch(0.65_0.18_50)]" },
          ].map((q) => (
            <Link key={q.to} to={q.to} className="group">
              <div className={`rounded-2xl p-5 bg-gradient-to-br ${q.color} text-white shadow-soft hover:shadow-card transition-all group-hover:-translate-y-0.5`}>
                <q.icon className="w-6 h-6 mb-8 opacity-95" />
                <div className="font-semibold">{q.label}</div>
                <div className="text-xs opacity-85 mt-0.5">{q.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
