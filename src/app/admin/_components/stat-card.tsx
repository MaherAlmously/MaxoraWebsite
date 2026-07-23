import type { LucideIcon } from 'lucide-react';

export function StatCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="facet-cut relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-transform duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_8px_24px_oklch(0.85_0.135_190_/_12%)]">
      <div
        className={
          accent
            ? 'absolute -top-10 -right-10 size-28 rounded-full bg-primary/15 blur-2xl'
            : 'absolute -top-10 -right-10 size-28 rounded-full bg-foreground/5 blur-2xl'
        }
      />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          <p className="mt-2 font-heading text-2xl font-semibold tracking-tight">{value}</p>
        </div>
        <div
          className={
            accent
              ? 'flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--grad-a)] to-[var(--grad-b)] text-primary-foreground'
              : 'flex size-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground'
          }
        >
          <Icon className="size-4" />
        </div>
      </div>
    </div>
  );
}
