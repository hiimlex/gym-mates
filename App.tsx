import "./src/i18n/i18n";
import { CombinedProviders } from "./src/providers";

import { CacheManager } from "@georstat/react-native-image-cache";
import { useEffect } from "react";
import { Dirs } from "react-native-file-access";
import { enableScreens } from "react-native-screens";

import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

if (__DEV__) {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

enableScreens();

CacheManager.config = {
  baseDir: `${Dirs.CacheDir}/images_cache/`,
  blurRadius: 12,
  cacheLimit: 0,
  maxRetries: 3 /* optional, if not provided defaults to 0 */,
  retryDelay: 3000 /* in milliseconds, optional, if not provided defaults to 0 */,
  sourceAnimationDuration: 300,
  thumbnailAnimationDuration: 300,
  getCustomCacheKey: (source: string) => {
    // Remove params from the URL for caching images (useful for caching images from Amazons S3 bucket and etc)
    let newCacheKey = source;
    if (source.includes("?")) {
      newCacheKey = source.substring(0, source.lastIndexOf("?"));
    }
    return newCacheKey;
  },
};

export default function App() {
  useEffect(() => {
    // clearSkip();
  }, []);

  return <CombinedProviders />;
}
