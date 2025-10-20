import { IItem, SkinPiece, SkinSex } from "@models/collections";
import { StoreState } from "@store/Store";
import React, { useEffect, useState } from "react";
import { ViewStyle } from "react-native";
import { SlideInLeft } from "react-native-reanimated";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";
import S from "./CharUi.styles";
import { replaceSvgColors } from "./CharUi.utils";
import CharUiAvatar from "./CharUiAvatar";

const itemBox = require("../../../../assets/item_bg.png");
const itemBoxSelected = require("../../../../assets/item_bg_selected.gif");

interface ItemBoxProps {
  item?: IItem;
  isSelected?: boolean;
  onSelectItem?: (item: IItem) => void;
}

const ItemBox: React.FC<ItemBoxProps> = ({
  item,
  isSelected,
  onSelectItem,
}) => {
  const { palette, baseAssets } = useSelector(
    (state: StoreState) => state.charCreation
  );
  const [itemSvg, setItemSvg] = useState<string | null>(null);
  const [previewSvg, setPreviewSvg] = useState<string | null>(null);

  const styleByPiece: { [key in SkinPiece]?: ViewStyle } = {
    hair: { top: 28, marginLeft: 5, width: 150, height: 150 },
    top: { top: 0, marginLeft: 5, width: 150, height: 150 },
    bottom: { top: -28, marginLeft: 5, width: 150, height: 150 },
    full: { top: -62, marginLeft: 5, width: 150, height: 150 },
  };

  const style = item?.piece ? styleByPiece[item.piece] : {};

  return (
    <S.ItemBoxTouchAnimated
      activeOpacity={1}
      onPress={() => onSelectItem && item && onSelectItem(item)}
      entering={SlideInLeft}
      exiting={undefined}
    >
      <S.ItemBox source={itemBox}>
        {/* {item?.preview?.url && (
          <Image source={{ uri: item?.preview?.url }} style={{ flex: 1 }} />
        )} */}
        <CharUiAvatar
          replacePiece={item?.piece}
          replaceUrl={item?.file?.url}
          replaceStyles={{
            transform: [{ scale: 0.4 }],
            ...style,
          }}
        />
      </S.ItemBox>
      {isSelected && <S.ItemBoxSelected source={itemBoxSelected} />}
    </S.ItemBoxTouchAnimated>
  );
};

export default ItemBox;
