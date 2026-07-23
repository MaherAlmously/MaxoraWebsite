export function InitialsAvatar({ name }: { name: string }) {
  const initials =
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('') || '?';

  return (
    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--grad-a)] to-[var(--grad-b)] font-heading text-sm font-semibold text-primary-foreground">
      {initials}
    </div>
  );
}
