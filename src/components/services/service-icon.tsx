import { Globe, Smartphone, Sparkles, Wrench, type LucideIcon } from 'lucide-react';

const icons: Record<string, LucideIcon> = {
  Globe,
  Smartphone,
  Wrench,
};

export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = icons[name] ?? Sparkles;
  return <Icon className={className} />;
}
