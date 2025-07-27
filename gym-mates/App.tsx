import { CombinedProviders } from "./src/providers";
import "./src/i18n/i18n";

import { enableScreens } from "react-native-screens";
import { CacheManager } from "@georstat/react-native-image-cache";
import {Dirs} from 'react-native-file-access';

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
  return <CombinedProviders />;
}
