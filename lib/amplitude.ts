// lib/amplitude.ts
'use client';

import * as amplitude from '@amplitude/unified';

// Your API Key
const AMPLITUDE_API_KEY = 'c66e28122c6cfea9315d9422db79a9d5';

export function initAmplitude() {
  if (typeof window !== 'undefined') {
    amplitude.initAll(AMPLITUDE_API_KEY, {
      analytics: {
        autocapture: true,  // Automatically tracks clicks, form submissions, etc.
      },
      sessionReplay: {
        sampleRate: 1,  // 1 = 100% of sessions recorded (for debugging)
      }
    });
    console.log('Amplitude initialized');
  }
}

// Export amplitude instance for tracking custom events
export default amplitude;

// Helper function for tracking events
export const trackEvent = (eventName: string, eventProperties?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    amplitude.track(eventName, eventProperties);
    console.log(`Amplitude event: ${eventName}`, eventProperties);
  }
};