import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card } from "@/components/AppShell";
import { Shield, Bell, Lock, Database, HelpCircle } from "lucide-react";

export const Route = createFileRoute("/settings")({
  component: Settings,
  head: () => ({ meta: [{ title: "Settings — BharatOne AI" }] }),
});

function Settings() {
  return (
    <AppShell title="Settings" subtitle="Configure platform-wide preferences.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <div className="flex items-center gap-2 mb-3"><Shield className="w-4 h-4 text-primary" /><h3 className="font-semibold">Security</h3></div>
          <Row title="Two-factor authentication" desc="Add an extra layer of security" />
          <Row title="Login alerts" desc="Get notified on new device login" />
          <Row title="Session timeout" desc="Auto logout after inactivity" />
        </Card>
        <Card>
          <div className="flex items-center gap-2 mb-3"><Bell className="w-4 h-4 text-primary" /><h3 className="font-semibold">Notifications</h3></div>
          <Row title="Complaint updates" desc="Real-time status alerts" />
          <Row title="Scheme announcements" desc="Latest govt scheme launches" />
          <Row title="Disaster warnings" desc="Emergency alerts by region" />
        </Card>
        <Card>
          <div className="flex items-center gap-2 mb-3"><Lock className="w-4 h-4 text-primary" /><h3 className="font-semibold">Privacy</h3></div>
          <Row title="Data sharing" desc="Share anonymized usage with govt" />
          <Row title="Location services" desc="Enable location-based services" />
          <Row title="Analytics tracking" desc="Help improve the platform" />
        </Card>
        <Card>
          <div className="flex items-center gap-2 mb-3"><Database className="w-4 h-4 text-primary" /><h3 className="font-semibold">Data & Storage</h3></div>
          <Row title="Cache size" desc="Currently using 128 MB" />
          <Row title="Auto-sync" desc="Sync data across devices" />
          <Row title="Export data" desc="Download your data archive" />
        </Card>
        <Card className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-3"><HelpCircle className="w-4 h-4 text-primary" /><h3 className="font-semibold">Support</h3></div>
          <div className="grid sm:grid-cols-3 gap-3">
            <button className="p-4 rounded-xl border border-border text-left hover:bg-accent">
              <div className="font-medium">Help Center</div>
              <div className="text-xs text-muted-foreground mt-0.5">Browse guides & FAQs</div>
            </button>
            <button className="p-4 rounded-xl border border-border text-left hover:bg-accent">
              <div className="font-medium">Contact Support</div>
              <div className="text-xs text-muted-foreground mt-0.5">24×7 helpdesk</div>
            </button>
            <button className="p-4 rounded-xl border border-border text-left hover:bg-accent">
              <div className="font-medium">Report a Bug</div>
              <div className="text-xs text-muted-foreground mt-0.5">Help us improve</div>
            </button>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}

function Row({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-t border-border first:border-0">
      <div>
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>
      </div>
      <button className="w-11 h-6 rounded-full bg-primary relative">
        <span className="absolute top-0.5 left-[22px] w-5 h-5 rounded-full bg-white shadow" />
      </button>
    </div>
  );
}
