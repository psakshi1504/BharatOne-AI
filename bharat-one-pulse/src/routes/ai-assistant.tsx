import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card } from "@/components/AppShell";
import { useState } from "react";
import { Send, Sparkles, Plus, MessageCircle, Bot, User } from "lucide-react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const Route = createFileRoute("/ai-assistant")({
  component: AIAssistant,
  head: () => ({ meta: [{ title: "AI Assistant — BharatOne AI" }] }),
});

const convos = [
  { id: 1, title: "PM Kisan eligibility", time: "2h ago" },
  { id: 2, title: "Water leak in Ward 12", time: "Yesterday" },
  { id: 3, title: "Rice leaf blight symptoms", time: "2d ago" },
  { id: 4, title: "Nearest primary health center", time: "3d ago" },
];

const suggestions = [
  "Report a pothole on my street",
  "Find PM Kisan Scheme details",
  "Diagnose crop disease from photo",
  "Find nearest hospital",
];

function AIAssistant() {
  const [msg, setMsg] = useState("");

  const [messages, setMessages] = useState<
    { role: "user" | "ai"; text: string }[]
  >([
    {
      role: "ai",
      text: "Namaste! I'm BharatOne AI. I can help with complaints, government schemes, crop advice and public services. How can I help you today?",
    },
  ]);

  const send = async (text?: string) => {
    const t = (text ?? msg).trim();

    if (!t) return;

    // Show user's message
    setMessages((m) => [...m, { role: "user", text: t }]);

    setMsg("");

    try {
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: t,
        }),
      });

      const data = await response.json();

      // Show backend reply
      setMessages((m) => [
        ...m,
        {
          role: "ai",
          text: data.reply,
        },
      ]);
    } catch (error) {
      setMessages((m) => [
        ...m,
        {
          role: "ai",
          text: "❌ Unable to connect to BharatOne AI Backend.",
        },
      ]);
    }
  };

  return (
    <AppShell>
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4 h-[calc(100vh-8rem)]">

        {/* LEFT SIDEBAR */}
        <Card className="p-0 flex flex-col overflow-hidden">

          <div className="p-4 border-b border-border">
            <button className="w-full h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center gap-2 hover:bg-primary/90">
              <Plus className="w-4 h-4" />
              New Chat
            </button>
          </div>

          <div className="p-2 overflow-y-auto flex-1">
            <div className="px-2 py-2 text-xs font-semibold text-muted-foreground">
              Recent Chats
            </div>

            {convos.map((c) => (
              <button
                key={c.id}
                className="w-full text-left px-3 py-3 rounded-lg hover:bg-accent flex gap-2"
              >
                <MessageCircle className="w-4 h-4 mt-1" />

                <div>
                  <div className="text-sm font-medium">
                    {c.title}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    {c.time}
                  </div>
                </div>
              </button>
            ))}
          </div>

        </Card>

        {/* CHAT WINDOW */}

        <Card className="p-0 flex flex-col overflow-hidden">

          <div className="px-5 py-4 border-b border-border flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>

            <div>
              <div className="font-semibold">
                BharatOne AI Assistant
              </div>

              <div className="text-xs text-green-600">
                ● Online
              </div>
            </div>

          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-5">

            {messages.map((m, i) => (

              <div
                key={i}
                className={`flex gap-3 ${
                  m.role === "user" ? "flex-row-reverse" : ""
                }`}
              >

                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    m.role === "user"
                      ? "bg-accent"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  {m.role === "user" ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>

                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {m.role === "ai" ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {m.text}
                    </ReactMarkdown>
                  ) : (
                    m.text
                  )}
                </div>

              </div>

            ))}

            {messages.length <= 1 && (

              <div>

                <div className="text-xs text-muted-foreground mb-3">
                  Try asking
                </div>

                <div className="grid sm:grid-cols-2 gap-2">

                  {suggestions.map((s) => (

                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="text-left border rounded-xl px-4 py-3 hover:border-primary hover:bg-primary/5"
                    >
                      {s}
                    </button>

                  ))}

                </div>

              </div>

            )}

          </div>

          <div className="border-t border-border p-4">

            <div className="flex items-center gap-2 border rounded-xl px-3 py-2">

              <input
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    send();
                  }
                }}
                placeholder="Ask BharatOne AI anything..."
                className="flex-1 bg-transparent outline-none"
              />

              <button
                onClick={() => send()}
                className="w-9 h-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>

            </div>

            <div className="text-center text-xs text-muted-foreground mt-2">
              BharatOne AI Connected to Backend
            </div>

          </div>

        </Card>

      </div>

    </AppShell>
  );
}