import { useState, type ReactNode } from "react";
import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Bot,
  MessageSquareWarning,
  Leaf,
  FileText,
  Map,
  BarChart3,
  Building2,
  User,
  Settings,
  Sparkles,
  Search,
  Bell,
  Menu,
  X,
  LogOut,
  ChevronDown,
} from "lucide-react";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/ai-assistant", label: "AI Assistant", icon: Bot },
  { to: "/complaints", label: "AI Complaint System", icon: MessageSquareWarning },
  { to: "/crop-doctor", label: "Crop Doctor", icon: Leaf },
  { to: "/schemes", label: "Government Schemes", icon: FileText },
  { to: "/map", label: "Smart Map", icon: Map },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/departments", label: "Government Departments", icon: Building2 },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppShell({ children, title, subtitle }: { children: ReactNode; title?: string; subtitle?: string }) {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const current = nav.find((n) => path.startsWith(n.to));

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-72 bg-sidebar border-r border-sidebar-border transform transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="h-16 flex items-center justify-between px-5 border-b border-sidebar-border">
          <Link to="/dashboard" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary grid place-items-center text-primary-foreground shadow-soft">
              <Sparkles className="w-4.5 h-4.5" strokeWidth={2.5} />
            </div>
            <div>
              <div className="font-bold text-sm tracking-tight text-sidebar-foreground">BharatOne AI</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Gov · Smart OS</div>
            </div>
          </Link>
          <button className="lg:hidden text-muted-foreground" onClick={() => setOpen(false)}><X className="w-5 h-5" /></button>
        </div>
        <nav className="p-3 space-y-0.5 overflow-y-auto h-[calc(100vh-4rem)]">
          <div className="px-3 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Menu</div>
          {nav.map((item) => {
            const active = path === item.to || (item.to !== "/dashboard" && path.startsWith(item.to));
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                }`}
              >
                <item.icon className="w-4.5 h-4.5 shrink-0" strokeWidth={2} />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
          <div className="pt-4 mt-4 border-t border-sidebar-border">
            <button
              onClick={() => navigate({ to: "/" })}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <LogOut className="w-4.5 h-4.5" /> Logout
            </button>
          </div>
        </nav>
      </aside>

      {open && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 h-16 bg-background/80 backdrop-blur border-b border-border flex items-center gap-4 px-4 sm:px-6">
          <button className="lg:hidden" onClick={() => setOpen(true)}><Menu className="w-5 h-5" /></button>
          <div className="relative flex-1 max-w-xl hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              placeholder="Search citizens, complaints, schemes..."
              className="w-full h-10 pl-10 pr-4 rounded-lg bg-muted/60 border border-transparent focus:border-input focus:bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
            />
          </div>
          <div className="flex-1 sm:hidden" />
          <button className="relative w-10 h-10 rounded-lg hover:bg-accent grid place-items-center">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-destructive" />
          </button>
          <div className="hidden sm:flex items-center gap-2.5 pl-3 border-l border-border">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-[oklch(0.45_0.22_270)] text-primary-foreground grid place-items-center text-sm font-semibold">AR</div>
            <div className="text-sm">
              <div className="font-semibold leading-tight">Arjun Reddy</div>
              <div className="text-xs text-muted-foreground">District Officer</div>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {(title || subtitle) && (
            <div className="mb-6">
              {title && <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h1>}
              {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-card rounded-2xl border border-border shadow-soft p-5 ${className}`}>
      {children}
    </div>
  );
}

export function Badge({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "success" | "warning" | "danger" | "info" | "saffron" }) {
  const tones: Record<string, string> = {
    default: "bg-muted text-muted-foreground",
    success: "bg-success/10 text-success",
    warning: "bg-warning/15 text-[oklch(0.45_0.15_60)]",
    danger: "bg-destructive/10 text-destructive",
    info: "bg-primary/10 text-primary",
    saffron: "bg-saffron/15 text-[oklch(0.45_0.15_55)]",
  };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${tones[tone]}`}>{children}</span>;
}
