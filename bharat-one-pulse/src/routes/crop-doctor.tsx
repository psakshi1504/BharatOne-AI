import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, Badge } from "@/components/AppShell";
import { Upload, Leaf, Droplets, Sprout, FlaskConical, Sparkles } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/crop-doctor")({
  component: CropDoctor,
  head: () => ({ meta: [{ title: "Crop Doctor — BharatOne AI" }] }),
});

const previous = [
  { crop: "Tomato", disease: "Early Blight", date: "10 Mar 2026", severity: "High" },
  { crop: "Rice", disease: "Leaf Blast", date: "05 Mar 2026", severity: "Moderate" },
  { crop: "Wheat", disease: "Rust", date: "28 Feb 2026", severity: "Low" },
];

function CropDoctor() {
  const [file, setFile] = useState<string | null>(null);
  return (
    <AppShell title="Crop Doctor" subtitle="AI-powered crop disease diagnosis for farmers.">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-4">
        <Card>
          <h3 className="font-semibold mb-3">Upload Crop Photo</h3>
          <label className="block border-2 border-dashed border-border rounded-xl aspect-square cursor-pointer hover:border-success hover:bg-success/5 transition-colors overflow-hidden">
            {file ? (
              <img src={file} alt="crop" className="w-full h-full object-cover" />
            ) : (
              <div className="h-full grid place-items-center text-center px-4">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-success/10 text-success grid place-items-center mx-auto mb-3">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div className="text-sm font-medium">Upload a clear photo of the leaf or crop</div>
                  <div className="text-xs text-muted-foreground mt-1">Best results in daylight</div>
                </div>
              </div>
            )}
            <input type="file" accept="image/*" className="hidden" onChange={(e) => {
              const f = e.target.files?.[0]; if (f) setFile(URL.createObjectURL(f));
            }} />
          </label>
          <button className="mt-4 w-full h-10 rounded-lg bg-success text-success-foreground text-sm font-medium hover:opacity-90">Diagnose</button>
        </Card>

        <div className="space-y-4">
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-success/10 text-success grid place-items-center"><Sparkles className="w-4 h-4" /></div>
              <h3 className="font-semibold">Disease Analysis</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <div className="p-3 rounded-lg bg-muted/50">
                <div className="text-xs text-muted-foreground">Detected</div>
                <div className="font-semibold mt-0.5">Tomato Early Blight</div>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <div className="text-xs text-muted-foreground">Confidence</div>
                <div className="font-semibold mt-0.5 text-success">92%</div>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <div className="text-xs text-muted-foreground">Severity</div>
                <div className="mt-0.5"><Badge tone="warning">Moderate</Badge></div>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <div className="text-xs text-muted-foreground">Affected Area</div>
                <div className="font-semibold mt-0.5">~35% of foliage</div>
              </div>
            </div>
          </Card>

          <div className="grid sm:grid-cols-2 gap-4">
            <Card>
              <div className="flex items-center gap-2 mb-2"><FlaskConical className="w-4 h-4 text-primary" /><h4 className="font-semibold text-sm">Treatment</h4></div>
              <p className="text-sm text-muted-foreground">Apply chlorothalonil or mancozeb-based fungicide at 7-10 day intervals. Remove infected leaves.</p>
            </Card>
            <Card>
              <div className="flex items-center gap-2 mb-2"><Leaf className="w-4 h-4 text-success" /><h4 className="font-semibold text-sm">Organic Solution</h4></div>
              <p className="text-sm text-muted-foreground">Neem oil spray (5ml/L) with compost tea. Mulch base with dry leaves and rotate crops.</p>
            </Card>
            <Card>
              <div className="flex items-center gap-2 mb-2"><Sprout className="w-4 h-4 text-saffron" /><h4 className="font-semibold text-sm">Fertilizer</h4></div>
              <p className="text-sm text-muted-foreground">NPK 10-26-26 · 50 kg/acre. Add potash to strengthen plant immunity.</p>
            </Card>
            <Card>
              <div className="flex items-center gap-2 mb-2"><Droplets className="w-4 h-4 text-info" /><h4 className="font-semibold text-sm">Irrigation Advice</h4></div>
              <p className="text-sm text-muted-foreground">Switch to drip irrigation. Water in early morning; avoid wetting foliage.</p>
            </Card>
          </div>
        </div>
      </div>

      <Card className="mt-6">
        <h3 className="font-semibold mb-4">Previous Diagnoses</h3>
        <div className="grid sm:grid-cols-3 gap-3">
          {previous.map((p) => (
            <div key={p.crop} className="p-4 rounded-xl border border-border hover:shadow-soft transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold">{p.crop}</div>
                <Badge tone={p.severity === "High" ? "danger" : p.severity === "Moderate" ? "warning" : "success"}>{p.severity}</Badge>
              </div>
              <div className="text-sm text-muted-foreground">{p.disease}</div>
              <div className="text-xs text-muted-foreground mt-2">{p.date}</div>
            </div>
          ))}
        </div>
      </Card>
    </AppShell>
  );
}
