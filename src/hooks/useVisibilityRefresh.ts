import { useEffect, useCallback } from 'react';

/**
 * Hook to handle page visibility changes and refresh state when user returns to tab.
 * This helps prevent stale UI after returning from external apps like WhatsApp.
 */
export const useVisibilityRefresh = (onVisible?: () => void) => {
  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState === 'visible') {
      // Small delay to ensure the page is fully active
      setTimeout(() => {
        onVisible?.();
      }, 100);
    }
  }, [onVisible]);

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Also handle page show event for bfcache scenarios
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        // Page was restored from bfcache
        onVisible?.();
      }
    };
    
    window.addEventListener('pageshow', handlePageShow);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, [handleVisibilityChange, onVisible]);
};

export default useVisibilityRefresh;