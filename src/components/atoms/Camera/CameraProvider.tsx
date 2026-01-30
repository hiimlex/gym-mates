import { StoreState } from "@store/Store";
import { useSelector } from "react-redux";

import { SlideInDown } from "react-native-reanimated";
import S from "./Camera.styles";
import CameraFullscreen from "./CameraFullscreen";
import CameraMediaPreview from "./CameraMediaPreview";

const CameraProvider = () => {
  const { showFullscreen, showPreview } = useSelector(
    (state: StoreState) => state.camera,
  );

  return (
    <>
      {showPreview && (
        <S.PreviewOverlay entering={SlideInDown}>
          <CameraMediaPreview />
        </S.PreviewOverlay>
      )}
      {showFullscreen && (
        <S.ProviderOverlay entering={SlideInDown}>
          <CameraFullscreen />
        </S.ProviderOverlay>
      )}
    </>
  );
};

export default CameraProvider;
