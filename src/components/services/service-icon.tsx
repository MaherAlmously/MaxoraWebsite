import { LayoutGrid, Smartphone, Sparkles, Workflow, type LucideIcon } from 'lucide-react';

const icons: Record<string, LucideIcon> = {
  LayoutGrid,
  Workflow,
  Smartphone,
};

export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = icons[name] ?? Sparkles;
  return <Icon className={className} />;
}
