import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell, Card } from "@/components/AppShell";
import {
  Camera,
  Bell,
  Moon,
  Sun,
  LogOut,
  Mail
} from "lucide-react";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/profile")({
  component: Profile,
  head: () => ({ meta: [{ title: "Profile — BharatOne AI" }] }),
});

function Profile() {
  const loggedUser = JSON.parse(
    localStorage.getItem("bharatone_loggedin_user") || "{}"
  );

  const userName = loggedUser.name || "Citizen";
  const userEmail = loggedUser.email || "citizen@bharatone.ai";

  const initials = userName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase();
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <AppShell title="Profile" subtitle="Manage your account and preferences.">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-4">
        <Card>
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary to-[oklch(0.45_0.22_270)] text-primary-foreground grid place-items-center text-3xl font-bold shadow-card">{initials}</div>
              <button className="absolute bottom-0 right-0 w-9 h-9 rounded-full bg-card border border-border grid place-items-center shadow-soft hover:bg-accent">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <h2 className="text-xl font-bold mt-4">{userName}</h2>
            <div className="text-sm text-muted-foreground">Citizen Account</div>
            <div className="mt-4 w-full space-y-3 text-sm">

              <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-muted/50">
                <Mail className="w-4 h-4 text-muted-foreground" />
                {userEmail}
              </div>

              {/* Account Statistics */}
              <div className="mt-5 rounded-xl border border-border p-4 bg-muted/20">
                <h3 className="font-semibold mb-3">Account Statistics</h3>

                <div className="space-y-3">

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      📝 Complaints Submitted
                    </span>
                    <span className="font-semibold">12</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      🌾 Crop Analyses
                    </span>
                    <span className="font-semibold">8</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      🏛 Schemes Applied
                    </span>
                    <span className="font-semibold">5</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      ⭐ Member Since
                    </span>
                    <span className="font-semibold">July 2026</span>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <Card>
            <h3 className="font-semibold mb-3">User Information</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="Full Name" value={userName} />

              <Field label="Role" value="Citizen" />

              <Field
                label="User ID"
                value={
                  "BH-" +
                  userName
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")
                    .toUpperCase() +
                  "-001"
                }
              />
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-2 mb-3"><Bell className="w-4 h-4 text-primary" /><h3 className="font-semibold">Notification Preferences</h3></div>
            <div className="space-y-1">
              {["Email notifications", "SMS alerts", "Push notifications", "Weekly digest"].map((n, i) => <Toggle key={n} label={n} defaultOn={i < 3} />)}
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {dark ? <Moon className="w-4 h-4 text-primary" /> : <Sun className="w-4 h-4 text-primary" />}
                <div>
                  <h3 className="font-semibold">Appearance</h3>
                  <p className="text-xs text-muted-foreground">Toggle dark mode</p>
                </div>
              </div>
              <button
                onClick={() => setDark((v) => !v)}
                className={`w-12 h-7 rounded-full relative transition-colors ${dark ? "bg-primary" : "bg-muted"}`}
              >
                <span className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-all ${dark ? "left-[22px]" : "left-0.5"}`} />
              </button>
            </div>
          </Card>

          <button
            onClick={() => navigate({ to: "/" })}
            className="w-full h-11 rounded-xl border border-destructive/30 text-destructive font-medium hover:bg-destructive/10 flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" /> Log Out
          </button>
        </div>
      </div>
    </AppShell>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <input defaultValue={value} className="mt-1 w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/40" />
    </div>
  );
}

function Toggle({ label, defaultOn }: { label: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(!!defaultOn);
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm">{label}</span>
      <button onClick={() => setOn((v) => !v)} className={`w-11 h-6 rounded-full relative transition-colors ${on ? "bg-primary" : "bg-muted"}`}>
        <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${on ? "left-[22px]" : "left-0.5"}`} />
      </button>
    </div>
  );
}
