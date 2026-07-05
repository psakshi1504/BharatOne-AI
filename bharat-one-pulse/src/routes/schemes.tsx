import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, Badge } from "@/components/AppShell";
import { Search, FileText, ArrowRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/schemes")({
  component: Schemes,
  head: () => ({ meta: [{ title: "Government Schemes — BharatOne AI" }] }),
});

const chips = ["All", "Farmer", "Women", "Youth", "Senior Citizen", "Health", "Education", "Housing"];

const schemes = [
  { name: "PM Kisan Samman Nidhi", tag: "Farmer", eligibility: "All landholding farmer families", benefits: "₹6,000/year direct benefit", docs: "Aadhaar, Bank Passbook, Land Records" },
  { name: "Ayushman Bharat", tag: "Health", eligibility: "Low-income households (SECC 2011)", benefits: "₹5 lakh health cover per family/year", docs: "Aadhaar, Ration Card, Family ID" },
  { name: "Beti Bachao Beti Padhao", tag: "Women", eligibility: "Girl children under 10 years", benefits: "Educational support & incentives", docs: "Birth Certificate, School Records" },
  { name: "PM Awas Yojana", tag: "Housing", eligibility: "EWS/LIG households without pucca house", benefits: "Up to ₹2.67 lakh subsidy", docs: "Aadhaar, Income Cert, Land Papers" },
  { name: "Skill India Mission", tag: "Youth", eligibility: "Youth aged 15-45", benefits: "Free vocational training + certification", docs: "Aadhaar, Educational Certificates" },
  { name: "Atal Pension Yojana", tag: "Senior Citizen", eligibility: "Indian citizens 18-40 years", benefits: "₹1,000 to ₹5,000 monthly pension", docs: "Aadhaar, Bank Account, Mobile" },
];

function Schemes() {
  const [q, setQ] = useState("");
  const [active, setActive] = useState("All");
  const filtered = schemes.filter((s) =>
    (active === "All" || s.tag === active) && s.name.toLowerCase().includes(q.toLowerCase())
  );
  return (
    <AppShell title="Government Schemes" subtitle="Explore benefits, eligibility, and apply in minutes.">
      <div className="flex flex-col lg:flex-row gap-4 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search schemes..."
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring/40"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {chips.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`px-4 h-9 rounded-full text-sm font-medium transition-colors ${
              active === c ? "bg-primary text-primary-foreground" : "bg-card border border-border hover:bg-accent"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((s) => (
          <Card key={s.name} className="flex flex-col hover:-translate-y-0.5 hover:shadow-card transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="w-11 h-11 rounded-xl bg-saffron/15 text-[oklch(0.45_0.15_55)] grid place-items-center">
                <FileText className="w-5 h-5" />
              </div>
              <Badge tone="saffron">{s.tag}</Badge>
            </div>
            <h3 className="font-semibold text-lg leading-tight">{s.name}</h3>
            <dl className="mt-4 space-y-2.5 text-sm flex-1">
              <div>
                <dt className="text-xs font-medium text-muted-foreground">Eligibility</dt>
                <dd className="mt-0.5">{s.eligibility}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-muted-foreground">Benefits</dt>
                <dd className="mt-0.5 font-medium text-success">{s.benefits}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-muted-foreground">Documents</dt>
                <dd className="mt-0.5 text-muted-foreground">{s.docs}</dd>
              </div>
            </dl>
            <button className="mt-5 h-10 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 flex items-center justify-center gap-2">
              Apply Now <ArrowRight className="w-4 h-4" />
            </button>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
