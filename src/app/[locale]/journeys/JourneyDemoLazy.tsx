'use client';

import dynamic from 'next/dynamic';

const JourneyDemoSection = dynamic(
  () => import('./JourneysClientSections').then((mod) => mod.JourneyDemoSection),
  { ssr: false, loading: () => <div className="py-32" /> }
);

export default function JourneyDemoLazy() {
  return <JourneyDemoSection />;
}
