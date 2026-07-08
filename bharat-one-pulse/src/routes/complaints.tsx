import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, Badge } from "@/components/AppShell";
import { Upload, Image as ImageIcon, Sparkles, MapPin, Calendar } from "lucide-react";
import { useState } from "react";
import axios from "axios";

export const Route = createFileRoute("/complaints")({
  component: Complaints,
  head: () => ({ meta: [{ title: "AI Complaint System — BharatOne AI" }] }),
});

const initialHistory = [
  {
    id: "CMP-2405",
    type: "Pothole",
    location: "MG Road, Bengaluru",
    date: "12 Mar 2026",
    status: "Resolved",
    tone: "success" as const,
  },
  {
    id: "CMP-2401",
    type: "Water Leak",
    location: "Ward 12, Indiranagar",
    date: "10 Mar 2026",
    status: "In Progress",
    tone: "warning" as const,
  },
  {
    id: "CMP-2398",
    type: "Garbage",
    location: "HSR Layout Sector 3",
    date: "08 Mar 2026",
    status: "Pending",
    tone: "danger" as const,
  },
  {
    id: "CMP-2390",
    type: "Streetlight",
    location: "Whitefield Main Rd",
    date: "05 Mar 2026",
    status: "Resolved",
    tone: "success" as const,
  },
];

function Complaints() {
  const [file, setFile] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [history, setHistory] = useState(initialHistory);
  const [loading, setLoading] = useState(false);
  const analyzeComplaint = async () => {

    if (!selectedFile) {
      alert("Please upload an image first.");
      return;
    }

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("image", selectedFile);

      const response = await axios.post(
        "http://127.0.0.1:8000/analyze-complaint",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setAnalysis(response.data);

      setTitle(response.data.title || "");
      setDescription(response.data.description || "");
      setLocation(response.data.location || "");

    } catch (error) {

      console.error(error);

      alert("Failed to analyze image.");

    } finally {

      setLoading(false);

    }

  };

  const submitComplaint = () => {

    if (!title || !description || !location) {
      alert("Please complete all complaint details.");
      return;
    }

    const complaintId =
      "CMP-" + new Date().getFullYear() + "-" + Math.floor(1000 + Math.random() * 9000);

    const today = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const newComplaint = {
      id: complaintId,
      type: analysis?.issue || "General",
      location: location,
      date: today,
      status: "Pending",
      tone: "danger" as const,
    };

    setHistory([newComplaint, ...history]);

    alert(
      `✅ Complaint Submitted Successfully!\n\nComplaint ID: ${complaintId}`
    );

    setTitle("");
    setDescription("");
    setLocation("");
    setAnalysis(null);
    setFile(null);
    setSelectedFile(null);

  };
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
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                setSelectedFile(f);
                setFile(URL.createObjectURL(f));
              }} 
            />
          </label>
          <button
            onClick={analyzeComplaint}
            disabled={loading}
            className="mt-4 w-full h-10 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90"
          >
            {loading ? "Analyzing..." : "Analyze with AI"}
          </button>
        </Card>

        {/* AI Analysis */}
        <Card>

          <div className="flex items-center gap-2 mb-3">

            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary grid place-items-center">
              <Sparkles className="w-4 h-4" />
            </div>

            <h3 className="font-semibold">
              AI Analysis
            </h3>

          </div>

          {!analysis ? (

            <div className="text-center py-10 text-muted-foreground">

              Upload an image and click

              <br />

              <strong>Analyze with AI</strong>

            </div>

          ) : (

            <div className="space-y-3">

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Detected Issue
                </span>

                <Badge tone="info">
                  {analysis.issue}
                </Badge>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Confidence
                </span>

                <span className="font-semibold text-success">
                  {analysis.confidence}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Severity
                </span>

                <Badge tone="warning">
                  {analysis.severity}
                </Badge>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Department
                </span>

                <span className="font-medium">
                  {analysis.department}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Resolution
                </span>

                <span className="font-medium">
                  {analysis.resolution}
                </span>
              </div>

            </div>

          )}

        </Card>

        {/* Complaint Details */}
        <Card>
          <h3 className="font-semibold mb-3">Complaint Details</h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Title
              </label>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/40"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Location
              </label>

              <div className="relative mt-1">

                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter complaint location"
                  className="w-full h-10 pl-10 pr-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/40"
                />

              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Description</label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 w-full px-3 py-2 rounded-lg border border-input bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring/40"
              />
            </div>
            <button
              onClick={submitComplaint}
              className="w-full h-10 rounded-lg bg-success text-success-foreground text-sm font-medium hover:opacity-90"
            >
              Submit Complaint
            </button>
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
