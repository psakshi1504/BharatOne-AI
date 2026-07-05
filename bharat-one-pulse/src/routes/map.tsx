import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card } from "@/components/AppShell";
import { MapPin, Hospital, GraduationCap, Droplets, Leaf, AlertTriangle, Layers, Plus, Minus } from "lucide-react";

export const Route = createFileRoute("/map")({
  component: SmartMap,
  head: () => ({ meta: [{ title: "Smart Map — BharatOne AI" }] }),
});

const legend = [
  { label: "Complaints", color: "bg-primary", icon: MapPin, count: 128 },
  { label: "Hospitals", color: "bg-destructive", icon: Hospital, count: 42 },
  { label: "Schools", color: "bg-info", icon: GraduationCap, count: 96 },
  { label: "Water Leaks", color: "bg-[oklch(0.65_0.15_220)]", icon: Droplets, count: 17 },
  { label: "Crop Disease", color: "bg-success", icon: Leaf, count: 34 },
  { label: "Disaster Alerts", color: "bg-saffron", icon: AlertTriangle, count: 8 },
];

function SmartMap() {
  return (
    <AppShell title="Smart Map" subtitle="Live visualization of civic events across the district.">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
        <Card className="p-0 overflow-hidden">
          <div className="relative h-[70vh] bg-gradient-to-br from-[oklch(0.95_0.02_220)] to-[oklch(0.92_0.03_180)] overflow-hidden">
            {/* Fake map lines */}
            <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 800 600" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="oklch(0.75 0.05 220)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="800" height="600" fill="url(#grid)" />
              <path d="M 0 200 Q 200 150 400 220 T 800 250" stroke="oklch(0.7 0.08 220)" strokeWidth="3" fill="none" />
              <path d="M 100 0 Q 200 300 350 400 T 600 600" stroke="oklch(0.7 0.08 220)" strokeWidth="2" fill="none" />
              <path d="M 500 0 Q 550 200 650 300 T 800 500" stroke="oklch(0.7 0.08 220)" strokeWidth="2" fill="none" />
              <circle cx="400" cy="280" r="80" fill="oklch(0.75 0.1 148)" fillOpacity="0.2" />
              <circle cx="200" cy="380" r="60" fill="oklch(0.75 0.1 148)" fillOpacity="0.2" />
            </svg>

            {/* Pins */}
            {[
              { x: "22%", y: "35%", icon: MapPin, color: "bg-primary" },
              { x: "45%", y: "50%", icon: Hospital, color: "bg-destructive" },
              { x: "62%", y: "30%", icon: GraduationCap, color: "bg-info" },
              { x: "35%", y: "70%", icon: Droplets, color: "bg-[oklch(0.65_0.15_220)]" },
              { x: "72%", y: "62%", icon: Leaf, color: "bg-success" },
              { x: "55%", y: "22%", icon: AlertTriangle, color: "bg-saffron" },
              { x: "80%", y: "45%", icon: MapPin, color: "bg-primary" },
              { x: "18%", y: "62%", icon: Hospital, color: "bg-destructive" },
            ].map((p, i) => (
              <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: p.x, top: p.y }}>
                <div className={`w-9 h-9 rounded-full ${p.color} text-white grid place-items-center shadow-card ring-4 ring-white/60 animate-pulse`}>
                  <p.icon className="w-4 h-4" />
                </div>
              </div>
            ))}

            {/* Map controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-1 bg-card rounded-xl shadow-card border border-border overflow-hidden">
              <button className="w-10 h-10 grid place-items-center hover:bg-accent"><Plus className="w-4 h-4" /></button>
              <button className="w-10 h-10 grid place-items-center hover:bg-accent border-t border-border"><Minus className="w-4 h-4" /></button>
            </div>
            <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur rounded-xl shadow-card border border-border px-4 py-3">
              <div className="text-xs text-muted-foreground">Placeholder Map</div>
              <div className="text-sm font-semibold">Connect Google Maps API</div>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <Layers className="w-4 h-4 text-primary" />
              <h3 className="font-semibold">Legend</h3>
            </div>
            <div className="space-y-2">
              {legend.map((l) => (
                <div key={l.label} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg ${l.color} text-white grid place-items-center`}>
                      <l.icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">{l.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-muted-foreground">{l.count}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold mb-2">Live Alerts</h3>
            <div className="space-y-2 text-sm">
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <div className="font-medium text-destructive">Water leak reported</div>
                <div className="text-xs text-muted-foreground mt-0.5">Ward 12, Indiranagar · 2 min ago</div>
              </div>
              <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                <div className="font-medium">Flood warning</div>
                <div className="text-xs text-muted-foreground mt-0.5">Yelahanka Zone · 18 min ago</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
