'use client';

import { useEffect, useState } from 'react';
import Analytics from './Analytics';

const COOKIE_CONSENT_KEY = 'dynamo-cookie-consent';

export default function ConsentAwareAnalytics() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    setConsented(consent === 'accepted');
  }, []);

  if (!consented) return null;
  return <Analytics />;
}
