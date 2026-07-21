import {
  Clapperboard,
  Cloud,
  FileImage,
  FlaskConical,
  Globe,
  PenTool,
  Scissors,
  Share2,
  Smartphone,
  Sparkles,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

const icons: Record<string, LucideIcon> = {
  Globe,
  PenTool,
  Share2,
  FileImage,
  Smartphone,
  Clapperboard,
  Scissors,
  Wrench,
  Cloud,
  FlaskConical,
};

export function ProductIcon({ name, className }: { name: string; className?: string }) {
  const Icon = icons[name] ?? Sparkles;
  return <Icon className={className} />;
}
