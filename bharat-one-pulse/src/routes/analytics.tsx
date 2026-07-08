import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card } from "@/components/AppShell";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";

export const Route = createFileRoute("/analytics")({
  component: Analytics,
  head: () => ({ meta: [{ title: "Analytics — BharatOne AI" }] }),
});

const trend = [{ m: "Jan", v: 620 }, { m: "Feb", v: 780 }, { m: "Mar", v: 690 }, { m: "Apr", v: 890 }, { m: "May", v: 980 }, { m: "Jun", v: 1120 }];
const farmers = [{ m: "Jan", v: 320 }, { m: "Feb", v: 480 }, { m: "Mar", v: 590 }, { m: "Apr", v: 620 }, { m: "May", v: 780 }, { m: "Jun", v: 890 }];
const schemes = [
  { name: "PM Kisan", value: 3200, color: "oklch(0.55 0.22 260)" },
  { name: "Ayushman", value: 2100, color: "oklch(0.63 0.17 148)" },
  { name: "PM Awas", value: 1400, color: "oklch(0.75 0.17 55)" },
  { name: "Others", value: 1500, color: "oklch(0.7 0.12 220)" },
];
const participation = [{ d: "Mon", v: 340 }, { d: "Tue", v: 480 }, { d: "Wed", v: 420 }, { d: "Thu", v: 620 }, { d: "Fri", v: 560 }, { d: "Sat", v: 380 }, { d: "Sun", v: 290 }];
const pollution = [{ m: "Jan", v: 180 }, { m: "Feb", v: 210 }, { m: "Mar", v: 250 }, { m: "Apr", v: 190 }, { m: "May", v: 165 }, { m: "Jun", v: 140 }];
const water = [{ m: "Jan", v: 4.2 }, { m: "Feb", v: 4.8 }, { m: "Mar", v: 5.6 }, { m: "Apr", v: 6.1 }, { m: "May", v: 7.2 }, { m: "Jun", v: 8.4 }];

const grid = "oklch(0.92 0.01 250)";
const axis = "oklch(0.5 0.02 260)";

function Analytics() {
  return (
    <AppShell title="Analytics" subtitle="Real-time insights across citizen services.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <div className="mb-3"><h3 className="font-semibold">Complaint Trends</h3><p className="text-xs text-muted-foreground">Last 6 months</p></div>
          <div className="h-64"><ResponsiveContainer><AreaChart data={trend}>
            <defs><linearGradient id="a1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="oklch(0.55 0.22 260)" stopOpacity={0.35}/><stop offset="100%" stopColor="oklch(0.55 0.22 260)" stopOpacity={0}/></linearGradient></defs>
            <CartesianGrid vertical={false} stroke={grid}/><XAxis dataKey="m" stroke={axis} fontSize={12} tickLine={false} axisLine={false}/><YAxis stroke={axis} fontSize={12} tickLine={false} axisLine={false}/>
            <Tooltip contentStyle={{borderRadius:12,border:`1px solid ${grid}`}}/>
            <Area type="monotone" dataKey="v" stroke="oklch(0.55 0.22 260)" strokeWidth={2.5} fill="url(#a1)"/>
          </AreaChart></ResponsiveContainer></div>
        </Card>

        <Card>
          <div className="mb-3"><h3 className="font-semibold">Farmer Assistance</h3><p className="text-xs text-muted-foreground">Farmers helped per month</p></div>
          <div className="h-64"><ResponsiveContainer><BarChart data={farmers}>
            <CartesianGrid vertical={false} stroke={grid}/><XAxis dataKey="m" stroke={axis} fontSize={12} tickLine={false} axisLine={false}/><YAxis stroke={axis} fontSize={12} tickLine={false} axisLine={false}/>
            <Tooltip contentStyle={{borderRadius:12,border:`1px solid ${grid}`}}/>
            <Bar dataKey="v" fill="oklch(0.63 0.17 148)" radius={[8,8,0,0]}/>
          </BarChart></ResponsiveContainer></div>
        </Card>

        <Card>
          <div className="mb-3"><h3 className="font-semibold">AI Scheme Recommendations</h3><p className="text-xs text-muted-foreground">Recommended Schemes by Category</p></div>
          <div className="h-64 flex items-center">
            <ResponsiveContainer width="60%" height="100%">
              <PieChart>
                <Pie data={schemes} dataKey="value" innerRadius={55} outerRadius={90} paddingAngle={2}>
                  {schemes.map((s, i) => <Cell key={i} fill={s.color} />)}
                </Pie>
                <Tooltip contentStyle={{borderRadius:12,border:`1px solid ${grid}`}}/>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {schemes.map((s) => (
                <div key={s.name} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full" style={{background:s.color}}/>{s.name}</span>
                  <span className="font-semibold">{s.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <div className="mb-3">
            <h3 className="font-semibold">AI Assistant Usage</h3>
            <p className="text-xs text-muted-foreground">
              Daily Conversations
            </p>
          </div>
          <div className="h-64"><ResponsiveContainer><LineChart data={participation}>
            <CartesianGrid vertical={false} stroke={grid}/><XAxis dataKey="d" stroke={axis} fontSize={12} tickLine={false} axisLine={false}/><YAxis stroke={axis} fontSize={12} tickLine={false} axisLine={false}/>
            <Tooltip contentStyle={{borderRadius:12,border:`1px solid ${grid}`}}/>
            <Line type="monotone" dataKey="v" stroke="oklch(0.75 0.17 55)" strokeWidth={3} dot={{r:4,fill:"oklch(0.75 0.17 55)"}}/>
          </LineChart></ResponsiveContainer></div>
        </Card>

        <Card>
          <div className="mb-3">
            <h3 className="font-semibold">Crop Disease Detection</h3>
            <p className="text-xs text-muted-foreground">
              AI Crop Analysis
            </p>
          </div>
          <div className="h-64"><ResponsiveContainer><AreaChart data={pollution}>
            <defs><linearGradient id="a2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="oklch(0.6 0.22 25)" stopOpacity={0.35}/><stop offset="100%" stopColor="oklch(0.6 0.22 25)" stopOpacity={0}/></linearGradient></defs>
            <CartesianGrid vertical={false} stroke={grid}/><XAxis dataKey="m" stroke={axis} fontSize={12} tickLine={false} axisLine={false}/><YAxis stroke={axis} fontSize={12} tickLine={false} axisLine={false}/>
            <Tooltip contentStyle={{borderRadius:12,border:`1px solid ${grid}`}}/>
            <Area type="monotone" dataKey="v" stroke="oklch(0.6 0.22 25)" strokeWidth={2.5} fill="url(#a2)"/>
          </AreaChart></ResponsiveContainer></div>
        </Card>

        <Card>
          <div className="mb-3">
            <h3 className="font-semibold">Government Service Requests</h3>
            <p className="text-xs text-muted-foreground">
              Requests Processed
            </p>
          </div>
          <div className="h-64"><ResponsiveContainer><BarChart data={water}>
            <CartesianGrid vertical={false} stroke={grid}/><XAxis dataKey="m" stroke={axis} fontSize={12} tickLine={false} axisLine={false}/><YAxis stroke={axis} fontSize={12} tickLine={false} axisLine={false}/>
            <Tooltip contentStyle={{borderRadius:12,border:`1px solid ${grid}`}}/>
            <Bar dataKey="v" fill="oklch(0.7 0.12 220)" radius={[8,8,0,0]}/>
          </BarChart></ResponsiveContainer></div>
        </Card>
      </div>
    </AppShell>
  );
}
