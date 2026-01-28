import { SkinPiece, SkinSex } from "@models/collections";
import { StoreState } from "@store/Store";
import React, { useMemo } from "react";
import { ViewStyle } from "react-native";
import ViewShot from "react-native-view-shot";
import { useSelector } from "react-redux";
import S from "./CharUi.styles";
import { CharCreationZIndex } from "./CharUi.utils";
import RemoteSkin from "./CharUiRemoteSkin";

interface CharUiAvatarProps {
  replaceUrl?: string;
  replacePiece?: SkinPiece;
  replaceStyles?: ViewStyle;
}

const CharUiAvatar = ({
  replaceUrl,
  replacePiece,
  replaceStyles,
}: CharUiAvatarProps) => {
  const { pieces, skin, baseAssets } = useSelector(
    (state: StoreState) => state.charCreation
  );

  // [TODO] - process size base on screen size
  const baseCharUrl: undefined | string = useMemo(() => {
    if (!skin || !baseAssets || !skin.sex) {
      return undefined;
    }

    return skin?.sex === SkinSex.male
      ? baseAssets?.resources.base_male
      : baseAssets?.resources.base_female;
  }, [skin?.sex, baseAssets]);

  return (
    <S.CharBaseView width={250} height={260} style={{ ...replaceStyles }}>
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
      {pieces.hair &&
        pieces.hair.item &&
        pieces.hair.item.file?.url &&
        replacePiece !== SkinPiece.hair && (
          <RemoteSkin
            uri={pieces.hair.item.file?.url}
            width={400}
            height={400}
            zIndex={CharCreationZIndex.skin}
          />
        )}
      {/* Top */}
      {pieces.top &&
        pieces.top.item &&
        pieces.top.item.file?.url &&
        replacePiece !== SkinPiece.top && (
          <RemoteSkin
            uri={pieces.top.item.file?.url}
            width={400}
            height={400}
            zIndex={CharCreationZIndex.skin}
          />
        )}

      {/* Bottom */}
      {pieces.bottom &&
        pieces.bottom.item &&
        pieces.bottom.item.file?.url &&
        replacePiece !== SkinPiece.bottom && (
          <RemoteSkin
            uri={pieces.bottom.item.file?.url}
            width={400}
            height={400}
            zIndex={CharCreationZIndex.skin}
          />
        )}

      {/* Replaced piece */}
      {replaceUrl && (
        <RemoteSkin
          uri={replaceUrl}
          width={400}
          height={400}
          zIndex={CharCreationZIndex.skin}
        />
      )}
    </S.CharBaseView>
  );
};

export default CharUiAvatar;
