interface Window {
  gtag: (
    command: 'config' | 'event' | 'js' | 'set',
    targetIdOrName: string | Date,
    params?: Record<string, string | number | boolean>
  ) => void;
  dataLayer: Array<unknown>;
}
