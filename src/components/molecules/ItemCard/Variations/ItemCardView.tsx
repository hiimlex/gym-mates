import { Row, Typography } from "@components/atoms";
import { Colors } from "@theme";
import React, { useMemo } from "react";
import { TouchableOpacity, useWindowDimensions } from "react-native";
import { CameraOff } from "react-native-feather";
import Header from "../../Header/Header";
import { calculateMediaSize, Dot, ItemCardProps } from "../ItemCard.utils";
import S from "./ItemCardVariations.styles";

const ItemCardView: React.FC<Omit<ItemCardProps, "mode">> = ({
  item,
  itemsPerRow = 2,
  touchableImage = false,
  onImagePress,
}) => {
  const view = "grid";
  const { width } = useWindowDimensions();

  const mediaSize = useMemo(
    () => calculateMediaSize(width, itemsPerRow, view),
    [itemsPerRow]
  );

  return (
    <S.Container view={view}>
      <S.MediaWrapper size={mediaSize}>
        {item.preview?.url && (
          <TouchableOpacity
            style={{ width: "100%", height: "100%" }}
            disabled={!touchableImage}
            activeOpacity={0.6}
            onPress={() => onImagePress?.(item)}
          >
            <S.MediaImage source={item.preview?.url} onError={() => {}} />
          </TouchableOpacity>
        )}
        {!item.preview?.url && (
          <CameraOff
            width={mediaSize / 4}
            height={mediaSize / 4}
            stroke={Colors.colors.border}
            fill={Colors.colors.border}
            fillOpacity={0.2}
            strokeWidth={2}
          />
        )}
      </S.MediaWrapper>

      <S.Info
        style={{
          flex: 1,
          gap: 6,
        }}
      >
        <Row align="center" justify="space-between" width={"auto"}>
          <Typography.Body>{item.name}</Typography.Body>

          <Header.Coins
            size={6}
            textVariant="button"
            coinValue={item.price.toString()}
            disabled
            textColor="tertiary"
          />
        </Row>

        <Row gap={3} align="center" style={{ flexWrap: "wrap", flex: 1 }}>
          <Typography.Caption
            textColor="textLight"
            _t
          >{`itemCategoryTypes.${item.category}`}</Typography.Caption>
          {item.sex && (
            <>
              <Dot />
              <Typography.Caption
                textColor="textLight"
                _t
              >{`itemSex.${item.sex}`}</Typography.Caption>
            </>
          )}
        </Row>
      </S.Info>
    </S.Container>
  );
};

export default ItemCardView;
