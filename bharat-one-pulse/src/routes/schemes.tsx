import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, Badge } from "@/components/AppShell";
import { Search, FileText, ArrowRight } from "lucide-react";
import { useState } from "react";
import axios from "axios";

export const Route = createFileRoute("/schemes")({
  component: Schemes,
  head: () => ({ meta: [{ title: "Government Schemes — BharatOne AI" }] }),
});

const chips = ["All", "Farmer", "Women", "Youth", "Senior Citizen", "Health", "Education", "Housing"];
const states = [
  "Maharashtra",
  "Gujarat",
  "Karnataka",
  "Tamil Nadu",
  "Delhi",
  "Uttar Pradesh",
  "Rajasthan",
  "Punjab",
  "Madhya Pradesh",
  "Bihar",
];

const occupations = [
  "Farmer",
  "Student",
  "Business",
  "Employee",
  "Self Employed",
  "Homemaker",
  "Unemployed",
];

const genders = [
  "Male",
  "Female",
  "Other",
];

const categories = [
  "General",
  "OBC",
  "SC",
  "ST",
  "EWS",
  "SEBC"
];


function Schemes() {
  const [q, setQ] = useState("");
  const [active, setActive] = useState("All");

  const [schemes, setSchemes] = useState<any[]>([]);

  const [state, setState] = useState("");
  const [occupation, setOccupation] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");
  const [income, setIncome] = useState("");

  const [loading, setLoading] = useState(false);
  const findSchemes = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "https://bharatone-ai-production.up.railway.app/government-schemes",
        {
          state,
          occupation,
          age: Number(age),
          gender,
          category,
          income: Number(income),
        }
      );

    

// If backend returns an array
      if (Array.isArray(response.data)) {
        setSchemes(response.data);
      }
// If backend returns an object with "schemes"
      else {
        setSchemes(response.data.schemes || []);
      }

    } catch (error) {
      console.error(error);
      alert("Failed to fetch schemes.");
    } finally {
      setLoading(false);
    }
  };
  const filtered = Array.isArray(schemes)
    ? schemes.filter((s) =>
        (active === "All" || s.category?.includes(active)) &&
        s.name.toLowerCase().includes(q.toLowerCase())
      )
    : [];
  return (
    <AppShell title="Government Schemes" subtitle="Explore benefits, eligibility, and apply in minutes.">

      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">
          🤖 AI Government Scheme Finder
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="border rounded-lg p-3"
          >
            <option value="">Select State</option>

            {states.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            className="border rounded-lg p-3"
          >
            <option value="">Select Occupation</option>

            {occupations.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="border rounded-lg p-3"
          />

          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="border rounded-lg p-3"
          >
            <option value="">Select Gender</option>

            {genders.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded-lg p-3"
          >
            <option value="">Select Category</option>

            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Annual Income"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="border rounded-lg p-3"
           />

        </div>

        <button
          onClick={findSchemes}
          disabled={loading}
          className="mt-5 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90"
        >
          {loading ? "Finding Schemes..." : "Find Eligible Schemes"}
        </button>
      </Card>

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
              <Badge tone="saffron">{s.category}</Badge>
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
                <dd className="mt-0.5 text-muted-foreground">{s.documents}</dd>
              </div>
            </dl>
            <a
              href={s.apply_link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-5 h-10 rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${
                s.apply_link
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none"
              }`}
            >
              Apply Now
              <ArrowRight className="w-4 h-4" />
            </a>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
