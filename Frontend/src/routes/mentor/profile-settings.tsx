import { createFileRoute } from "@tanstack/react-router";
import { Shell, Card, PageHeader, Btn } from "@/components/mentor/Shell";
import { Camera, Lock, Bell, Globe, Award } from "lucide-react";

export const Route = createFileRoute("/mentor/profile-settings")({
  head: () => ({
    meta: [
      { title: "Profile Settings — Bynixx Mentor Portal" },
      { name: "description", content: "Manage your mentor profile, account and notification preferences." },
    ],
  }),
  component: ProfileSettingsPage,
});

function ProfileSettingsPage() {
  return (
    <Shell>
      <PageHeader title="Profile Settings" subtitle="Manage your account, preferences and notifications." />

      <div className="grid grid-cols-1 xl:grid-cols-[260px_1fr] gap-6">
        <Card>
          <nav className="space-y-1 text-sm">
            {[
              { icon: Globe, label: "Profile", active: true },
              { icon: Lock, label: "Account & Security" },
              { icon: Bell, label: "Notifications" },
              { icon: Award, label: "Credentials" },
            ].map((t) => (
              <button key={t.label} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg ${t.active ? "bg-brand/10 text-brand font-semibold" : "hover:bg-muted"}`}>
                <t.icon size={16} /> {t.label}
              </button>
            ))}
          </nav>
        </Card>

        <div className="space-y-6">
          <Card title="Profile">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-chip-pink to-chip-violet grid place-items-center text-white text-2xl font-bold">PS</div>
                <button className="absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full bg-brand text-brand-foreground border-2 border-card"><Camera size={12} /></button>
              </div>
              <div>
                <div className="text-lg font-bold">Dr. Priya Sharma</div>
                <div className="text-sm text-muted-foreground">Senior Mentor · AI Engineering</div>
                <div className="text-xs text-chip-green mt-1">★ 4.8/5 · 120+ students mentored</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <Field label="Full Name" value="Dr. Priya Sharma" />
              <Field label="Email" value="priya.sharma@bynixx.com" />
              <Field label="Phone" value="+91 98765 43210" />
              <Field label="Location" value="Bengaluru, India" />
              <Field label="Specialization" value="AI / Machine Learning" />
              <Field label="Years of Experience" value="12" />
            </div>
            <div className="mt-4">
              <label className="text-xs text-muted-foreground">Bio</label>
              <textarea
                className="w-full mt-1 p-3 rounded-lg border border-border bg-card outline-none text-sm resize-none"
                rows={3}
                defaultValue="Senior AI mentor with 12+ years of experience building production ML systems and teaching engineering teams."
              />
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Btn variant="outline">Cancel</Btn>
              <Btn>Save Changes</Btn>
            </div>
          </Card>

          <Card title="Notification Preferences">
            <div className="space-y-4">
              {[
                { label: "New task submissions", desc: "Email when a student submits a task you mentor." },
                { label: "Live session reminders", desc: "Push notification 15 minutes before each session." },
                { label: "Community mentions", desc: "Get notified when a student tags you in a thread." },
                { label: "Weekly summary", desc: "Receive a weekly performance summary every Monday." },
              ].map((p, i) => (
                <div key={p.label} className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold">{p.label}</div>
                    <div className="text-xs text-muted-foreground">{p.desc}</div>
                  </div>
                  <button className={`relative h-6 w-11 rounded-full transition ${i % 2 === 0 ? "bg-brand" : "bg-muted"}`}>
                    <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${i % 2 === 0 ? "left-5" : "left-0.5"}`} />
                  </button>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Account & Security">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Current Password" type="password" value="" />
              <Field label="New Password" type="password" value="" />
            </div>
            <div className="flex items-center justify-between mt-4 p-3 rounded-lg border border-border">
              <div>
                <div className="text-sm font-semibold">Two-Factor Authentication</div>
                <div className="text-xs text-muted-foreground">Add an extra layer of security to your account.</div>
              </div>
              <Btn variant="outline">Enable</Btn>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Btn>Update Password</Btn>
            </div>
          </Card>
        </div>
      </div>
    </Shell>
  );
}

function Field({ label, value, type = "text" }: { label: string; value: string; type?: string }) {
  return (
    <div>
      <label className="text-xs text-muted-foreground">{label}</label>
      <input type={type} defaultValue={value} className="w-full mt-1 px-3 py-2 rounded-lg border border-border bg-card outline-none text-sm focus:border-ring" />
    </div>
  );
}
