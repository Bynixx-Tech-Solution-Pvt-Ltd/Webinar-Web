import { PageHeader } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";

export function SettingsPage() {
  return (
    <>
      <PageHeader title="Settings" subtitle="Platform configuration" />
      <div className="grid gap-4 max-w-2xl">
        {[
          { title: "Branding", desc: "Logo, colors, and email templates" },
          { title: "Zoom Integration", desc: "API credentials for live sessions" },
          { title: "Notifications", desc: "Email and in-app notification rules" },
          { title: "Certificates", desc: "Certificate template and signing authority" },
          { title: "Security", desc: "Authentication and access policies" },
        ].map((s) => (
          <div key={s.title} className="rounded-xl border border-border bg-card p-5 flex items-center justify-between">
            <div>
              <div className="font-semibold text-foreground">{s.title}</div>
              <div className="text-sm text-muted-foreground">{s.desc}</div>
            </div>
            <Button variant="outline" size="sm">Configure</Button>
          </div>
        ))}
      </div>
    </>
  );
}
