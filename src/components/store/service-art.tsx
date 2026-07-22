import Image from 'next/image';

const imageBySlug: Record<string, string> = {
  'website-development': '/images/services/website-development.jpg',
  'logo-design': '/images/services/logo-design.jpg',
  'social-media-management': '/images/services/social-media-management.jpg',
  'flyer-design': '/images/services/flyer-design.jpg',
  'app-development': '/images/services/app-development.jpg',
  'video-production': '/images/services/video-production.jpg',
  'content-editing': '/images/services/content-editing.jpg',
  'website-care-plan': '/images/services/website-care-plan.jpg',
  'saas-development': '/images/services/saas-development.jpg',
};

export function ServiceArt({ slug }: { slug: string }) {
  const src = imageBySlug[slug] ?? imageBySlug['website-development'];
  return (
    <div className="relative h-24 w-full overflow-hidden rounded-xl bg-secondary/40 sm:h-36">
      <Image
        src={src}
        alt=""
        fill
        sizes="(min-width: 1024px) 25vw, 50vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );
}
