import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, Badge } from "@/components/AppShell";
import { Upload, Image as ImageIcon, Sparkles, MapPin, Calendar } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/complaints")({
  component: Complaints,
  head: () => ({ meta: [{ title: "AI Complaint System — BharatOne AI" }] }),
});

const history = [
  { id: "CMP-2405", type: "Pothole", location: "MG Road, Bengaluru", date: "12 Mar 2026", status: "Resolved", tone: "success" as const },
  { id: "CMP-2401", type: "Water Leak", location: "Ward 12, Indiranagar", date: "10 Mar 2026", status: "In Progress", tone: "warning" as const },
  { id: "CMP-2398", type: "Garbage", location: "HSR Layout Sector 3", date: "08 Mar 2026", status: "Pending", tone: "danger" as const },
  { id: "CMP-2390", type: "Streetlight", location: "Whitefield Main Rd", date: "05 Mar 2026", status: "Resolved", tone: "success" as const },
];

function Complaints() {
  const [file, setFile] = useState<string | null>(null);
  return (
    <AppShell title="AI Complaint System" subtitle="Upload a photo and let AI identify the issue automatically.">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Upload */}
        <Card>
          <h3 className="font-semibold mb-3">Upload Photo</h3>
          <label className="block border-2 border-dashed border-border rounded-xl aspect-[4/3] cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors overflow-hidden">
            {file ? (
              <img src={file} alt="preview" className="w-full h-full object-cover" />
            ) : (
              <div className="h-full grid place-items-center text-center px-4">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary grid place-items-center mx-auto mb-3">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div className="text-sm font-medium">Drag & drop or click to upload</div>
                  <div className="text-xs text-muted-foreground mt-1">JPG, PNG · Max 10 MB</div>
                </div>
              </div>
            )}
            <input type="file" accept="image/*" className="hidden" onChange={(e) => {
              const f = e.target.files?.[0]; if (f) setFile(URL.createObjectURL(f));
            }} />
          </label>
          <button className="mt-4 w-full h-10 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">Analyze with AI</button>
        </Card>

        {/* AI Analysis */}
        <Card>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary grid place-items-center"><Sparkles className="w-4 h-4" /></div>
            <h3 className="font-semibold">AI Analysis</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Detected Issue</span>
              <Badge tone="info">Pothole</Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Confidence</span>
              <span className="font-semibold text-success">94%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Severity</span>
              <Badge tone="warning">Moderate</Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Recommended Dept.</span>
              <span className="font-medium">Public Works</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Est. Resolution</span>
              <span className="font-medium">3-5 days</span>
            </div>
            <div className="pt-3 mt-3 border-t border-border text-xs text-muted-foreground">
              This is placeholder analysis. Connect Gemini Vision to run real detection.
            </div>
          </div>
        </Card>

        {/* Complaint Details */}
        <Card>
          <h3 className="font-semibold mb-3">Complaint Details</h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Title</label>
              <input defaultValue="Large pothole on main road" className="mt-1 w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/40" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Location</label>
              <div className="relative mt-1">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input defaultValue="MG Road, Bengaluru" className="w-full h-10 pl-10 pr-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/40" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Description</label>
              <textarea rows={4} defaultValue="Large pothole causing traffic issues and vehicle damage." className="mt-1 w-full px-3 py-2 rounded-lg border border-input bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring/40" />
            </div>
            <button className="w-full h-10 rounded-lg bg-success text-success-foreground text-sm font-medium hover:opacity-90">Submit Complaint</button>
          </div>
        </Card>
      </div>

      {/* History */}
      <Card className="mt-6 p-0 overflow-hidden">
        <div className="p-5 flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Complaint History</h3>
            <p className="text-xs text-muted-foreground">Your recent submissions</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-muted-foreground border-y border-border bg-muted/40">
                <th className="px-5 py-2.5 font-medium">ID</th>
                <th className="px-5 py-2.5 font-medium">Type</th>
                <th className="px-5 py-2.5 font-medium">Location</th>
                <th className="px-5 py-2.5 font-medium">Date</th>
                <th className="px-5 py-2.5 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h) => (
                <tr key={h.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-5 py-3 font-mono text-xs">{h.id}</td>
                  <td className="px-5 py-3 font-medium">{h.type}</td>
                  <td className="px-5 py-3 text-muted-foreground flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{h.location}</td>
                  <td className="px-5 py-3 text-muted-foreground flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{h.date}</td>
                  <td className="px-5 py-3"><Badge tone={h.tone}>{h.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AppShell>
  );
}
