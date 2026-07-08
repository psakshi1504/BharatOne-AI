import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card } from "@/components/AppShell";
import { Shield, Building2, Wheat, Droplets, Zap, HeartPulse, Flame, Phone, Mail } from "lucide-react";

export const Route = createFileRoute("/departments")({
  component: Departments,
  head: () => ({ meta: [{ title: "Government Departments — BharatOne AI" }] }),
});

const depts = [
  {
    name: "Police",
    officer: "SP Rajesh Kumar",
    icon: Shield,
    color: "from-primary to-[oklch(0.4_0.22_265)]",
    phone: "100",
    email: "police@gov.in",
  },
  {
    name: "Municipality",
    officer: "Commissioner Anita Rao",
    icon: Building2,
    color: "from-[oklch(0.6_0.2_290)] to-[oklch(0.5_0.22_310)]",
    phone: "1800-425-1425",
    email: "municipality@gov.in",
  },
  {
    name: "Agriculture Dept.",
    officer: "Director Suresh Naik",
    icon: Wheat,
    color: "from-success to-[oklch(0.5_0.17_148)]",
    phone: "1551",
    email: "agriculture@gov.in",
  },
  {
    name: "Water Department",
    officer: "CE Priya Menon",
    icon: Droplets,
    color: "from-info to-[oklch(0.55_0.15_220)]",
    phone: "1916",
    email: "water@gov.in",
  },
  {
    name: "Electricity Board",
    officer: "MD Vikram Shetty",
    icon: Zap,
    color: "from-saffron to-[oklch(0.65_0.18_50)]",
    phone: "1912",
    email: "electricity@gov.in",
  },
  {
    name: "Health Department",
    officer: "DHO Dr. Kavya Rao",
    icon: HeartPulse,
    color: "from-destructive to-[oklch(0.5_0.22_25)]",
    phone: "104",
    email: "health@gov.in",
  },
  {
    name: "Fire Department",
    officer: "CFO Arun Prasad",
    icon: Flame,
    color: "from-[oklch(0.65_0.2_30)] to-[oklch(0.55_0.22_15)]",
    phone: "101",
    email: "fire@gov.in",
  },
];

function Departments() {
  return (
    <AppShell title="Government Departments" subtitle="Connect with local officers across departments.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {depts.map((d) => (
          <Card key={d.name} className="hover:-translate-y-0.5 hover:shadow-card transition-all">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${d.color} text-white grid place-items-center shadow-soft`}>
              <d.icon className="w-7 h-7" />
            </div>
            <h3 className="font-semibold text-lg mt-4">{d.name}</h3>
            <div className="mt-3 flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-muted grid place-items-center text-xs font-semibold text-muted-foreground">
                {d.officer.split(" ").slice(-1)[0].slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="text-sm font-medium">{d.officer}</div>
                <div className="text-xs text-muted-foreground">In-charge Officer</div>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>{d.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>{d.email}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-5">
              <a
                href={`tel:${d.phone}`}
                className="flex-1 h-10 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Contact
              </a>
            </div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
