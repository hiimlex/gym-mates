import { Loader, Row } from "@components/atoms";
import { useScreenSize } from "@hooks/useScreenSize/useScreenSize";
import { CharCreationActions } from "@store/slices/CharCreationSlice";
import { AppDispatch, StoreState } from "@store/Store";
import React, { useEffect, useMemo } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import S from "./CharUi/CharUi.styles";
import { CharCreationZIndex } from "./CharUi/CharUi.utils";
import CharUiAvatar from "./CharUi/CharUiAvatar";
import CharUiBackBtn from "./CharUi/CharUiBackBtn";
import CharUiBodyConfig from "./CharUi/CharUiBodyConfig";
import CharUiClothingMenu from "./CharUi/CharUiClothingMenu";
import CharUiSaveBtn from "./CharUi/CharUiSaveBtn";
import CharUiNextBtn from "./CharUi/CharUiNextBtn";
import CharUiPalette from "./CharUi/CharUiPalette";

interface CharCreationUiProps {
  children?: React.ReactNode;
}

const CharCreationUi: React.FC<CharCreationUiProps> = ({ children }) => {
  const { skin, step, pieces, baseAssets } = useSelector(
    (state: StoreState) => state.charCreation
  );
  const loaded = useMemo(() => !!baseAssets, [baseAssets]);
  const { insets, width: screenWidth, height: screenHeight } = useScreenSize();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(CharCreationActions.getBaseCharacterAssets());
  }, []);

  return (
    <View
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        flex: 1,
        gap: 18,
        paddingBottom: insets.bottom + 24,
      }}
    >
      {/* Absolute interface */}
      {/* Background */}
      <S.Bg
        style={{
          zIndex: CharCreationZIndex.bg,
          width: screenWidth,
          height: screenHeight,
        }}
      >
        <S.HalfLightBg />
        <S.HalfDarkBg />
      </S.Bg>
      {loaded && step === "clothing" && (
        <>
          <S.Mirror
            source={require("../../../assets/mirror.png")}
            style={{ zIndex: CharCreationZIndex.mirror }}
          >
            <View
              style={{
                zIndex: CharCreationZIndex.mirror + 1,
                transform: [{ scaleX: -1 }],
                position: "absolute",
                left: -60,
                top: 62,
                opacity: 0.3,
                height: 220,
                borderBottomLeftRadius: 160,
                overflow: "hidden",
                aspectRatio: 1,
              }}
            >
              <CharUiAvatar />
            </View>
            {/* Line in 30 degree to cover image */}
          </S.Mirror>

          <CharUiPalette />
        </>
      )}
      <S.Floor source={require("../../../assets/wood_floor.png")} />
      {/* Flex interface */}
      {!loaded && (
        <View
          style={{
            flex: 1,
            zIndex: CharCreationZIndex.skin,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loader color="white" />
        </View>
      )}
      {loaded && (
        <>
          <CharUiAvatar />
          {step === "body" && <CharUiBodyConfig />}
          {!!skin && step === "clothing" && <CharUiClothingMenu />}
          <Row
            justify="space-between"
            align="center"
            style={{ paddingHorizontal: 24 }}
          >
            <CharUiBackBtn />
            {step === "body" && <CharUiNextBtn />}
            {step === "clothing" && <CharUiSaveBtn />}
          </Row>
        </>
      )}
    </View>
  );
};

export default CharCreationUi;
