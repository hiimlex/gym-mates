import { IItem, SkinPiece, SkinSex } from "@models/collections";
import { StoreState } from "@store/Store";
import React, { useEffect, useState } from "react";
import { ViewStyle } from "react-native";
import { SlideInLeft } from "react-native-reanimated";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";
import S from "./CharUi.styles";
import { replaceSvgColors } from "./CharUi.utils";

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
    hair: { top: -22, marginLeft: 5, width: 150, height: 150 },
    top: { top: -62, marginLeft: 5, width: 150, height: 150 },
    bottom: { top: -62, marginLeft: 5, width: 150, height: 150 },
    full: { top: -62, marginLeft: 5, width: 150, height: 150 },
  };

  const style = item?.piece ? styleByPiece[item.piece] : {};

  const loadPreviewSvg = async () => {
    if (baseAssets && item && item.piece) {
      if (item.piece === SkinPiece.hair) {
        const url =
          item.sex === SkinSex.male
            ? baseAssets.resources.male_hair_preview
            : baseAssets.resources.female_hair_preview;

        fetch(url)
          .then((res) => res.text())
          .then((svg) => {
            const replacedSvg = replaceSvgColors(svg, palette);
            setPreviewSvg(replacedSvg);
          });
      }

      if (
        [SkinPiece.full, SkinPiece.top, SkinPiece.bottom].includes(item.piece)
      ) {
        const url =
          item.sex === SkinSex.male
            ? baseAssets.resources.male_clothes_preview
            : baseAssets.resources.female_clothes_preview;

        fetch(url)
          .then((res) => res.text())
          .then((svg) => {
            const replacedSvg = replaceSvgColors(svg, palette);
            setPreviewSvg(replacedSvg);
          });
      }
    }
  };

  const loadItemSvg = async () => {
    if (item?.file?.url) {
      fetch(item.file.url)
        .then((res) => res.text())
        .then((svg) => {
          setItemSvg(replaceSvgColors(svg, palette));
        });
    }
  };

  useEffect(() => {
    loadPreviewSvg();
    loadItemSvg();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [palette, baseAssets]);

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
        {itemSvg && (
          <SvgXml
            xml={itemSvg}
            style={{
              zIndex: 1,
              position: "absolute",
              ...style,
            }}
          />
        )}
        {previewSvg && (
          <SvgXml
            xml={previewSvg}
            style={{
              zIndex: 0,
              position: "absolute",
              ...style,
            }}
          />
        )}
      </S.ItemBox>
      {isSelected && <S.ItemBoxSelected source={itemBoxSelected} />}
    </S.ItemBoxTouchAnimated>
  );
};

export default ItemBox;
