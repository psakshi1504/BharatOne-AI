import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, User, Mail, Lock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const user = {
      name,
      email,
      password,
    };

    localStorage.setItem("bharatone_user", JSON.stringify(user));

    alert("Account created successfully!");

    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-md bg-card rounded-2xl border border-border shadow-soft p-8">

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground grid place-items-center">
            <Sparkles className="w-5 h-5" />
          </div>

          <div>
            <div className="font-bold text-lg">
              BharatOne AI
            </div>

            <div className="text-xs text-muted-foreground">
              Create your account
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold">
          Sign Up
        </h2>

        <p className="text-muted-foreground mt-2">
          Create your BharatOne AI account.
        </p>

        <form onSubmit={submit} className="mt-8 space-y-4">

          <div>

            <label className="text-sm font-medium">
              Full Name
            </label>

            <div className="relative mt-1">

              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/>

              <input
                required
                value={name}
                onChange={(e)=>setName(e.target.value)}
                className="w-full h-11 pl-10 rounded-lg border border-input"
              />

            </div>

          </div>

          <div>

            <label className="text-sm font-medium">
              Email
            </label>

            <div className="relative mt-1">

              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/>

              <input
                type="email"
                required
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="w-full h-11 pl-10 rounded-lg border border-input"
              />

            </div>

          </div>

          <div>

            <label className="text-sm font-medium">
              Password
            </label>

            <div className="relative mt-1">

              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/>

              <input
                type="password"
                required
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="w-full h-11 pl-10 rounded-lg border border-input"
              />

            </div>

          </div>

          <div>

            <label className="text-sm font-medium">
              Confirm Password
            </label>

            <div className="relative mt-1">

              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/>

              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                className="w-full h-11 pl-10 rounded-lg border border-input"
              />

            </div>

          </div>

          <button
            type="submit"
            className="w-full h-11 rounded-lg bg-primary text-primary-foreground flex items-center justify-center gap-2"
          >
            Create Account

            <ArrowRight className="w-4 h-4"/>

          </button>

        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">

          Already have an account?

          <Link
            to="/"
            className="text-primary font-medium ml-2"
          >
            Sign In
          </Link>

        </p>

      </div>
    </div>
  );
}
