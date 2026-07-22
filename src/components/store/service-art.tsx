/**
 * Small illustrated headers per service, drawn inline so they always match the
 * theme. Swap for real photos later by adding an `image` field to products and
 * rendering it instead of the SVG.
 */

function ArtFrame({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 320 140" className="h-full w-full" aria-hidden role="presentation">
      <defs>
        <linearGradient id="art-accent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--grad-a)" />
          <stop offset="100%" stopColor="var(--grad-b)" />
        </linearGradient>
      </defs>
      {children}
    </svg>
  );
}

const stroke = 'var(--art-line)';
const faint = 'var(--art-fill)';

function WebsiteArt() {
  return (
    <ArtFrame>
      {/* browser window */}
      <rect x="60" y="18" width="200" height="110" rx="8" fill={faint} stroke={stroke} />
      <line x1="60" y1="40" x2="260" y2="40" stroke={stroke} />
      <circle cx="74" cy="29" r="3" fill="url(#art-accent)" />
      <circle cx="86" cy="29" r="3" fill={stroke} />
      <circle cx="98" cy="29" r="3" fill={stroke} />
      {/* hero block + text lines */}
      <rect x="74" y="52" width="80" height="10" rx="3" fill="url(#art-accent)" />
      <rect x="74" y="70" width="130" height="6" rx="3" fill={stroke} />
      <rect x="74" y="82" width="110" height="6" rx="3" fill={stroke} />
      <rect x="74" y="100" width="52" height="14" rx="6" fill="url(#art-accent)" opacity="0.85" />
      <rect x="196" y="52" width="50" height="62" rx="6" fill={faint} stroke={stroke} />
    </ArtFrame>
  );
}

function LogoArt() {
  return (
    <ArtFrame>
      {/* canvas with mark */}
      <rect x="96" y="16" width="128" height="86" rx="8" fill={faint} stroke={stroke} />
      <polygon points="140,72 160,40 180,72" fill="url(#art-accent)" />
      <circle cx="184" cy="48" r="10" fill="none" stroke="url(#art-accent)" strokeWidth="4" />
      {/* swatches */}
      <rect x="112" y="112" width="24" height="12" rx="4" fill="url(#art-accent)" />
      <rect x="142" y="112" width="24" height="12" rx="4" fill={stroke} />
      <rect x="172" y="112" width="24" height="12" rx="4" fill={faint} stroke={stroke} />
    </ArtFrame>
  );
}

function SocialArt() {
  return (
    <ArtFrame>
      {/* phone with feed */}
      <rect x="126" y="12" width="68" height="118" rx="12" fill={faint} stroke={stroke} />
      <rect x="136" y="26" width="48" height="34" rx="5" fill="url(#art-accent)" opacity="0.85" />
      <rect x="136" y="66" width="48" height="6" rx="3" fill={stroke} />
      <rect x="136" y="78" width="34" height="6" rx="3" fill={stroke} />
      {/* like/share bubbles */}
      <circle cx="104" cy="46" r="12" fill={faint} stroke={stroke} />
      <path d="M100 46 l3 3 l5 -6" stroke="url(#art-accent)" strokeWidth="2.5" fill="none" />
      <circle cx="216" cy="86" r="12" fill={faint} stroke={stroke} />
      <path d="M212 86 h8 M216 82 v8" stroke="url(#art-accent)" strokeWidth="2.5" />
    </ArtFrame>
  );
}

function FlyerArt() {
  return (
    <ArtFrame>
      {/* stacked flyers */}
      <rect x="108" y="30" width="76" height="96" rx="6" fill={faint} stroke={stroke} transform="rotate(-8 146 78)" />
      <rect x="136" y="22" width="76" height="100" rx="6" fill="var(--card)" stroke={stroke} />
      <rect x="148" y="36" width="52" height="26" rx="4" fill="url(#art-accent)" opacity="0.85" />
      <rect x="148" y="72" width="52" height="6" rx="3" fill={stroke} />
      <rect x="148" y="84" width="40" height="6" rx="3" fill={stroke} />
      <rect x="148" y="102" width="28" height="10" rx="5" fill="url(#art-accent)" />
    </ArtFrame>
  );
}

function AppArt() {
  return (
    <ArtFrame>
      <rect x="132" y="14" width="56" height="112" rx="12" fill={faint} stroke={stroke} />
      <rect x="148" y="20" width="24" height="5" rx="2.5" fill={stroke} />
      <rect x="140" y="36" width="40" height="24" rx="5" fill="url(#art-accent)" opacity="0.85" />
      <rect x="140" y="66" width="18" height="18" rx="4" fill={faint} stroke={stroke} />
      <rect x="162" y="66" width="18" height="18" rx="4" fill={faint} stroke={stroke} />
      <rect x="140" y="88" width="18" height="18" rx="4" fill={faint} stroke={stroke} />
      <rect x="162" y="88" width="18" height="18" rx="4" fill="url(#art-accent)" opacity="0.6" />
      {/* code brackets */}
      <path d="M112 58 l-12 14 l12 14" stroke="url(#art-accent)" strokeWidth="3" fill="none" />
      <path d="M208 58 l12 14 l-12 14" stroke="url(#art-accent)" strokeWidth="3" fill="none" />
    </ArtFrame>
  );
}

function VideoArt() {
  return (
    <ArtFrame>
      <rect x="84" y="30" width="130" height="84" rx="8" fill={faint} stroke={stroke} />
      <polygon points="138,58 138,86 164,72" fill="url(#art-accent)" />
      {/* timeline */}
      <rect x="84" y="122" width="152" height="8" rx="4" fill={faint} stroke={stroke} />
      <rect x="84" y="122" width="64" height="8" rx="4" fill="url(#art-accent)" opacity="0.8" />
      {/* clapper */}
      <rect x="222" y="34" width="26" height="20" rx="3" fill={faint} stroke={stroke} />
      <path d="M222 40 l26 -8" stroke="url(#art-accent)" strokeWidth="2.5" />
    </ArtFrame>
  );
}

function EditArt() {
  return (
    <ArtFrame>
      {/* editing timeline tracks */}
      <rect x="70" y="40" width="180" height="14" rx="4" fill={faint} stroke={stroke} />
      <rect x="76" y="43" width="52" height="8" rx="3" fill="url(#art-accent)" opacity="0.85" />
      <rect x="134" y="43" width="36" height="8" rx="3" fill={stroke} />
      <rect x="70" y="62" width="180" height="14" rx="4" fill={faint} stroke={stroke} />
      <rect x="96" y="65" width="68" height="8" rx="3" fill="url(#art-accent)" opacity="0.55" />
      <rect x="70" y="84" width="180" height="14" rx="4" fill={faint} stroke={stroke} />
      <rect x="150" y="87" width="44" height="8" rx="3" fill={stroke} />
      {/* playhead */}
      <line x1="160" y1="32" x2="160" y2="106" stroke="url(#art-accent)" strokeWidth="2.5" />
      <polygon points="154,28 166,28 160,36" fill="url(#art-accent)" />
    </ArtFrame>
  );
}

const artBySlug: Record<string, () => React.ReactNode> = {
  'website-development': WebsiteArt,
  'logo-design': LogoArt,
  'social-media-management': SocialArt,
  'flyer-design': FlyerArt,
  'app-development': AppArt,
  'video-production': VideoArt,
  'content-editing': EditArt,
};

export function ServiceArt({ slug }: { slug: string }) {
  const Art = artBySlug[slug] ?? WebsiteArt;
  return (
    <div className="flex h-24 w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-secondary/60 to-background sm:h-36">
      <Art />
    </div>
  );
}
