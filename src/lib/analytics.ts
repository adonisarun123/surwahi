// Google Analytics and performance tracking utilities

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// Type definitions for Web Vitals
interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Track events
export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Core Web Vitals tracking
export const trackWebVitals = () => {
  if (typeof window !== 'undefined') {
    // Track FCP (First Contentful Paint)
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'paint' && entry.name === 'first-contentful-paint') {
          event({
            action: 'first_contentful_paint',
            category: 'Web Vitals',
            value: Math.round(entry.startTime)
          });
        }
      }
    });
    
    try {
      observer.observe({ entryTypes: ['paint'] });
    } catch {
      // Browser doesn't support Performance Observer
    }

    // Track LCP (Largest Contentful Paint)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      event({
        action: 'largest_contentful_paint',
        category: 'Web Vitals',
        value: Math.round(lastEntry.startTime)
      });
    });
    
    try {
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch {
      // Browser doesn't support this metric
    }

    // Track CLS (Cumulative Layout Shift)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const layoutShift = entry as LayoutShift;
        if (!layoutShift.hadRecentInput) {
          clsValue += layoutShift.value;
        }
      }
      
      event({
        action: 'cumulative_layout_shift',
        category: 'Web Vitals',
        value: Math.round(clsValue * 1000) // Convert to milliseconds
      });
    });
    
    try {
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch {
      // Browser doesn't support this metric
    }
  }
};

// Track specific user interactions
export const trackBookingEvent = (step: string, roomId?: string) => {
  event({
    action: 'booking_step',
    category: 'Booking',
    label: `${step}${roomId ? `_${roomId}` : ''}`,
  });
};

export const trackContactForm = (inquiryType: string) => {
  event({
    action: 'contact_form_submission',
    category: 'Contact',
    label: inquiryType,
  });
};

export const trackNewsletterSignup = (source: string) => {
  event({
    action: 'newsletter_signup',
    category: 'Newsletter',
    label: source,
  });
};

export const trackDownload = (fileName: string) => {
  event({
    action: 'file_download',
    category: 'Downloads',
    label: fileName,
  });
};

export const trackExternalLink = (url: string) => {
  event({
    action: 'external_link_click',
    category: 'Outbound Links',
    label: url,
  });
};

// Privacy-first analytics check
export const isAnalyticsEnabled = () => {
  if (typeof window === 'undefined') return false;
  
  // Check for Do Not Track
  if (navigator.doNotTrack === '1') return false;
  
  // Check for user consent (you would implement this based on your consent management)
  const consent = localStorage.getItem('analytics_consent');
  return consent === 'true';
};

// Initialize analytics with privacy considerations
export const initAnalytics = () => {
  if (!isAnalyticsEnabled() || !GA_TRACKING_ID) return;
  
  // Load Google Analytics
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  script.async = true;
  document.head.appendChild(script);
  
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };
  
  window.gtag('js', new Date());
  window.gtag('config', GA_TRACKING_ID, {
    anonymize_ip: true, // GDPR compliance
    cookie_expires: 63072000, // 2 years
    cookie_update: true,
    cookie_flags: 'SameSite=None;Secure', // Cross-site compatibility
  });
  
  // Track initial page view
  pageview(window.location.pathname);
  
  // Initialize Web Vitals tracking
  trackWebVitals();
};

// Global type definitions for gtag
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}
