type AnalyticsParams = Record<string, string | number | boolean>

declare global {
  interface Window {
    gtag?: (command: 'event', eventName: string, params?: AnalyticsParams) => void
  }
}

export function trackEvent(eventName: string, params: AnalyticsParams = {}) {
  window.gtag?.('event', eventName, params)
}
