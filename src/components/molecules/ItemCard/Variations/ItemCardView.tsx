import { AchievementIcon, Row, Typography } from "@components/atoms";
import { Colors } from "@theme";
import React from "react";
import { TouchableOpacity } from "react-native";
import { CameraOff } from "react-native-feather";
import { Dot, ItemCardProps } from "../ItemCard.utils";
import S from "./ItemCardVariations.styles";

const ItemCardView: React.FC<Omit<ItemCardProps, "mode">> = ({
  item,
  touchableImage = false,
  onImagePress,
  mediaSize = 12,
  forcedView = "grid",
}) => {
  const view = forcedView;

  const isAchievement = item.category === "achievement";

  return (
    <S.Container view={view}>
      <S.MediaWrapper size={mediaSize}>
        {isAchievement && item.rarity && (
          <AchievementIcon rarity={item.rarity} size={mediaSize} />
        )}
        {!isAchievement && (
          <>
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
          </>
        )}
      </S.MediaWrapper>

      <S.Info
        style={{
          flex: 1,
          gap: 6,
        }}
      >
        <Row
          align="center"
          justify="center"
          style={{ flexWrap: "wrap", maxWidth: mediaSize }}
        >
          <Typography.Body textAlign="center">{item?.name}</Typography.Body>

          {/* {!isAchievement && (
            <Coin
              textVariant="button"
              label={item?.price?.toString()}
              textColor="tertiary"
            />
          )} */}
        </Row>

        <Row
          gap={3}
          justify="center"
          align="center"
          style={{ flexWrap: "wrap", maxWidth: mediaSize }}
        >
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
