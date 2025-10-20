import React, { useEffect, useMemo } from "react";
import S from "./CharUi.styles";
import RemoteSkin from "./CharUiRemoteSkin";
import { useSelector } from "react-redux";
import { StoreState } from "@store/Store";
import { CharCreationZIndex } from "./CharUi.utils";
import { SkinSex } from "@models/collections";

const CharUiAvatar: React.FC = () => {
  const { pieces, skin, baseAssets } = useSelector(
    (state: StoreState) => state.charCreation
  );

  // [TODO] - process size base on screen size

  const baseCharUrl: undefined | string = useMemo(() => {
    if (!skin || !baseAssets) {
      return undefined;
    }

    return skin.sex === SkinSex.male
      ? baseAssets?.resources.base_male
      : baseAssets?.resources.base_female;
  }, [skin?.sex, baseAssets]);

  return (
    <S.CharBaseView
      width={250}
      height={250}
      style={{ zIndex: CharCreationZIndex.charBase }}
    >
      {/* Base char */}
      {baseCharUrl && (
        <RemoteSkin
          uri={baseCharUrl}
          width={400}
          height={400}
          zIndex={CharCreationZIndex.charBase}
        />
      )}
      {/* Hair */}
      {pieces.hair && pieces.hair.item && pieces.hair.item.file?.url && (
        <RemoteSkin
          uri={pieces.hair.item.file?.url}
          width={400}
          height={400}
          zIndex={CharCreationZIndex.skin}
        />
      )}
      {/* Top */}
      {pieces.top && pieces.top.item && pieces.top.item.file?.url && (
        <RemoteSkin
          uri={pieces.top.item.file?.url}
          width={400}
          height={400}
          zIndex={CharCreationZIndex.skin}
        />
      )}

      {/* Bottom */}
      {pieces.bottom && pieces.bottom.item && pieces.bottom.item.file?.url && (
        <RemoteSkin
          uri={pieces.bottom.item.file?.url}
          width={400}
          height={400}
          zIndex={CharCreationZIndex.skin}
        />
      )}
    </S.CharBaseView>
  );
};

export default CharUiAvatar;
