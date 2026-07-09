import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Mail, Lock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    const storedUser = localStorage.getItem("bharatone_user");

    if (!storedUser) {
      alert("No account found. Please create an account first.");
      return;
    }

    const user = JSON.parse(storedUser);

    if (email === user.email && password === user.password) {

      localStorage.setItem(
        "bharatone_loggedin_user",
        JSON.stringify(user)
      );

      navigate({ to: "/dashboard" });

    } else {

      alert("Invalid email or password.");

    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Brand panel */}
      <div className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden bg-gradient-to-br from-primary via-primary to-[oklch(0.45_0.22_270)] text-primary-foreground">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 -left-24 w-96 h-96 rounded-full bg-saffron/30 blur-3xl" />
        <div className="relative flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur grid place-items-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl font-bold tracking-tight">BharatOne AI</div>
            <div className="text-xs opacity-80">Government AI Operating System</div>
          </div>
        </div>
        <div className="relative space-y-6">
          <h1 className="text-4xl xl:text-5xl font-bold leading-tight">
            One AI Platform.<br />Every Citizen. Every Farmer.<br />Every Problem.
          </h1>
          <p className="text-white/85 text-lg max-w-md">
            A unified operating system connecting villages, cities, and government departments through intelligent automation.
          </p>
          <div className="flex gap-6 pt-4">
            {[
              { n: "50L+", l: "Citizens" },
              { n: "12L+", l: "Farmers" },
              { n: "240+", l: "Departments" },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-2xl font-bold">{s.n}</div>
                <div className="text-sm opacity-75">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative text-xs opacity-70">© 2026 BharatOne AI · Digital India Initiative</div>
      </div>

      {/* Login form */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary grid place-items-center text-primary-foreground">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="font-bold text-lg">BharatOne AI</div>
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>
          <p className="text-muted-foreground mt-2">Sign in to access your AI dashboard.</p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="citizen@bharatone.gov.in"
                  className="w-full h-11 pl-10 pr-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Password</label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-11 pl-10 pr-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-input" /> Remember me
              </label>
              <a className="text-primary hover:underline" href="#">Forgot password?</a>
            </div>
            <button
              type="submit"
              className="w-full h-11 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-soft"
            >
              Sign In <ArrowRight className="w-4 h-4" />
            </button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
              <div className="relative flex justify-center"><span className="bg-background px-3 text-xs text-muted-foreground">OR</span></div>
            </div>

            <button
              type="button"
              onClick={() => navigate({ to: "/dashboard" })}
              className="w-full h-11 rounded-lg border border-input bg-background hover:bg-accent transition-colors flex items-center justify-center gap-3 text-sm font-medium"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Continue with Google
            </button>

            <p className="text-center text-sm text-muted-foreground pt-4">
              New to BharatOne?

              <Link
                to="/signup"
                className="text-primary font-medium ml-2 hover:underline"
              >
                Create Account
              </Link>

            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
