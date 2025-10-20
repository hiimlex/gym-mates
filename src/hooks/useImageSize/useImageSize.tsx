import { useEffect, useState } from "react";
import { Image, ImageSourcePropType } from "react-native";

export function useImageSize(imagePath: ImageSourcePropType) {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [aspectRatio, setAspectRatio] = useState(1);

  useEffect(() => {
    const imageSrc = Image.resolveAssetSource(imagePath);

    Image.getSize(imageSrc.uri, (width, height) => {
      const aspectRatio = width / height;
      setAspectRatio(aspectRatio);
      setImageSize({ width: width, height: height });
    });
  }, [imagePath]);

  return { ...imageSize, aspectRatio };
}
