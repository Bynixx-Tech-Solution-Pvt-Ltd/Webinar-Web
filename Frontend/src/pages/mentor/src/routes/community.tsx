import { createFileRoute } from "@tanstack/react-router";
import { Shell, Card, PageHeader, Avatar, Btn, Chip } from "@/components/mentor/Shell";
import { Search, Send, Heart, MessageCircle, Pin } from "lucide-react";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community — Bynixx Mentor Portal" },
      { name: "description", content: "Engage with students through community discussions and Q&A." },
    ],
  }),
  component: CommunityPage,
});

const threads = [
  { author: "Karthik S", time: "2h ago", course: "AI Engineering", title: "How do I handle class imbalance in my dataset?", body: "I tried SMOTE but my recall drops on the minority class. Any best practices?", likes: 14, replies: 6, pinned: true },
  { author: "Priya N", time: "5h ago", course: "Cybersecurity", title: "Nmap scan returning incomplete results", body: "Running nmap -sV against a lab box, but service detection is patchy. Could it be firewall related?", likes: 9, replies: 4 },
  { author: "Arun Kumar", time: "1d ago", course: "Full Stack", title: "JWT refresh token best practices?", body: "Should I rotate refresh tokens on every use, or only on suspicious activity?", likes: 22, replies: 11 },
  { author: "Sneha R", time: "1d ago", course: "Prompt Engineering", title: "Few-shot vs chain-of-thought for math tasks", body: "Which one generally performs better on grade-school math style prompts?", likes: 17, replies: 8 },
];

const channels = ["All", "Announcements", "AI Engineering", "Cybersecurity", "Full Stack", "Prompt Engineering", "Data Science"];

function CommunityPage() {
  return (
    <Shell>
      <PageHeader title="Community" subtitle="Discussions, Q&A and announcements across your courses." />

      <div className="grid grid-cols-1 xl:grid-cols-[260px_1fr_320px] gap-6">
        <Card title="Channels">
          <ul className="space-y-1">
            {channels.map((c, i) => (
              <li key={c}>
                <button className={`w-full text-left text-sm px-3 py-2 rounded-lg ${i === 0 ? "bg-brand/10 text-brand font-semibold" : "hover:bg-muted"}`}>
                  # {c}
                </button>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <input className="w-full pl-9 pr-3 py-2 rounded-lg bg-muted/60 outline-none text-sm" placeholder="Search discussions" />
            </div>
            <Btn>New Post</Btn>
          </div>
          <div className="space-y-4">
            {threads.map((t) => (
              <div key={t.title} className="p-4 rounded-xl border border-border hover:border-brand transition">
                <div className="flex items-start gap-3">
                  <Avatar name={t.author} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground">{t.author}</span>
                      <span>·</span><span>{t.time}</span>
                      <Chip tone="violet">{t.course}</Chip>
                      {t.pinned && <span className="ml-auto text-chip-amber flex items-center gap-1"><Pin size={12} /> Pinned</span>}
                    </div>
                    <div className="font-semibold mt-1">{t.title}</div>
                    <p className="text-sm text-muted-foreground mt-1">{t.body}</p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Heart size={14} /> {t.likes}</span>
                      <span className="flex items-center gap-1"><MessageCircle size={14} /> {t.replies} replies</span>
                      <button className="ml-auto text-brand font-semibold">Reply</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-2 p-3 rounded-xl border border-border bg-muted/30">
            <input className="flex-1 bg-transparent outline-none text-sm px-2" placeholder="Write a message…" />
            <Btn><Send size={14} /></Btn>
          </div>
        </Card>

        <Card title="Active Students">
          <ul className="space-y-3">
            {["Karthik S","Priya N","Arun Kumar","Sneha R","Vivek M","Divya P","Rohan Mehta"].map((n) => (
              <li key={n} className="flex items-center gap-3">
                <div className="relative">
                  <Avatar name={n} />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-chip-green ring-2 ring-card" />
                </div>
                <div className="flex-1 text-sm">{n}</div>
                <button className="text-xs text-brand font-semibold">DM</button>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Shell>
  );
}
