import { useEffect, useState } from 'react';

interface CacheEntry {
  dataUrl: string;
  timestamp: number;
}

const CACHE_PREFIX = 'img_cache_';
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

export function useImageCache() {
  const [isCacheReady, setIsCacheReady] = useState(false);

  useEffect(() => {
    setIsCacheReady(true);
  }, []);

  const getCachedImage = (url: string): string | null => {
    const cacheKey = `${CACHE_PREFIX}${btoa(url)}`;
    try {
      const cached = localStorage.getItem(cacheKey);
      if (!cached) return null;

      const entry: CacheEntry = JSON.parse(cached);
      const now = Date.now();

      // Check if cache is expired
      if (now - entry.timestamp > CACHE_DURATION) {
        localStorage.removeItem(cacheKey);
        return null;
      }

      return entry.dataUrl;
    } catch (error) {
      console.error('Error reading from cache:', error);
      return null;
    }
  };

  const cacheImage = async (url: string): Promise<string> => {
    const cacheKey = `${CACHE_PREFIX}${btoa(url)}`;
    
    // Check if already cached
    const cached = getCachedImage(url);
    if (cached) return cached;

    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const dataUrl = await blobToDataUrl(blob);

      const entry: CacheEntry = {
        dataUrl,
        timestamp: Date.now()
      };

      try {
        localStorage.setItem(cacheKey, JSON.stringify(entry));
      } catch (error) {
        // If localStorage is full, clear old entries
        if (error instanceof Error && error.name === 'QuotaExceededError') {
          clearOldCacheEntries();
          try {
            localStorage.setItem(cacheKey, JSON.stringify(entry));
          } catch (retryError) {
            console.error('Failed to cache image even after clearing:', retryError);
          }
        }
      }

      return dataUrl;
    } catch (error) {
      console.error('Error caching image:', error);
      return url; // Return original URL as fallback
    }
  };

  const clearOldCacheEntries = () => {
    const now = Date.now();
    const keysToRemove: string[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(CACHE_PREFIX)) {
        try {
          const cached = localStorage.getItem(key);
          if (cached) {
            const entry: CacheEntry = JSON.parse(cached);
            if (now - entry.timestamp > CACHE_DURATION) {
              keysToRemove.push(key);
            }
          }
        } catch (error) {
          // Invalid entry, remove it
          if (key) keysToRemove.push(key);
        }
      }
    }

    keysToRemove.forEach(key => localStorage.removeItem(key));
  };

  const clearCache = () => {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(CACHE_PREFIX)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
  };

  return {
    isCacheReady,
    getCachedImage,
    cacheImage,
    clearCache
  };
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
