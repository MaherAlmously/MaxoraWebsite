import type { Metadata } from 'next';
import { SouqlyPageContent } from '@/components/souqly/souqly-page-content';

export const metadata: Metadata = {
  title: 'Souqly',
  description: 'Souqly - account deletion, privacy policy, and terms and conditions.',
};

export default function SouqlyPage() {
  return <SouqlyPageContent />;
}
