import { Loader, Row } from "@components/atoms";
import { useScreenSize } from "@hooks/useScreenSize/useScreenSize";
import { UserActions } from "@store/slices";
import { CharCreationActions } from "@store/slices/CharCreationSlice";
import { AppDispatch, StoreState } from "@store/Store";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo, useRef } from "react";
import { View } from "react-native";
import ViewShot from "react-native-view-shot";
import { useDispatch, useSelector } from "react-redux";
import S from "./ui/CharUi.styles";
import { buildCharacterPayload, CharCreationZIndex } from "./ui/CharUi.utils";
import CharUiAvatar from "./ui/CharUiAvatar";
import CharUiBackBtn from "./ui/CharUiBackBtn";
import CharUiBodyConfig from "./ui/CharUiBodyConfig";
import CharUiClothingMenu from "./ui/CharUiClothingMenu";
import CharUiNextBtn from "./ui/CharUiNextBtn";
import CharUiPalette from "./ui/CharUiPalette";
import CharUiSaveBtn from "./ui/CharUiSaveBtn";
import { UserCharacterService } from "@api/services";
import { QueryKeys } from "@models/generic";
import { queryClient } from "@config/queryClient";
import { useNotifier } from "@hooks/useNotifier";

interface CharCreationUiProps {
  children?: React.ReactNode;
}

const CharUi: React.FC<CharCreationUiProps> = ({ children }) => {
  const { skin, pieces, step, baseAssets } = useSelector(
    (state: StoreState) => state.charCreation
  );
  const { user } = useSelector((state: StoreState) => state.user);
  const loaded = useMemo(() => !!baseAssets, [baseAssets]);
  const { insets, width: screenWidth, height: screenHeight } = useScreenSize();
  const dispatch = useDispatch<AppDispatch>();
  const viewShotRef = useRef<ViewShot>(null);
  const { notify } = useNotifier();

  const { mutate: handleSavePress, isPending: isSaving } = useMutation({
    mutationFn: async () => {
      if (viewShotRef.current) {
        const uri = await viewShotRef?.current?.capture?.();

        if (!uri) {
          throw new Error("Failed to capture character image");
        }

        const normalizedUri = uri.startsWith("file://") ? uri : `file://${uri}`;

        const fileName = `${user?._id}_character.png`;

        if (skin) {
          const payload = buildCharacterPayload(skin, pieces);

          if (payload) {
            if (user?.character) {
              console.log("updating user character...");
              return await UserCharacterService.updateUserCharacter(
                normalizedUri,
                fileName,
                payload
              );
            } else {
              console.log("creating user character...");
              return await UserCharacterService.createUserCharacter(
                normalizedUri,
                fileName,
                payload
              );
            }
          }
        }
      }
    },
    onSuccess: () => {
      dispatch(UserActions.fetchCurrentUser());
      refetchUserCharacter();
      notify({
        type: "success",
        message: "Character saved successfully!",
        id: "char-save",
      });
    },
  });

  const { data: savedCharacter, refetch: refetchUserCharacter } = useQuery({
    queryKey: [QueryKeys.User.GetCharacter],
    queryFn: () => UserCharacterService.getUserCharacter(),
  });

  useEffect(() => {
    dispatch(CharCreationActions.getBaseCharacterAssets());
  }, []);

  useEffect(() => {
    if (savedCharacter) {
      dispatch(CharCreationActions.loadCharacter(savedCharacter));
    }
  }, [savedCharacter]);

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
      {loaded && step === "body" && (
        <>
          <CharUiAvatar />
          {step === "body" && <CharUiBodyConfig />}
        </>
      )}
      {!!skin && step === "clothing" && (
        <>
          <ViewShot
            ref={viewShotRef}
            options={{ format: "png", quality: 1 }}
            style={{
              width: 180,
              zIndex: CharCreationZIndex.charBase,
              overflow: "hidden",
            }}
          >
            <CharUiAvatar />
          </ViewShot>
          <CharUiClothingMenu />
        </>
      )}

      {loaded && (
        <Row
          justify="space-between"
          align="center"
          style={{ paddingHorizontal: 24 }}
        >
          <CharUiBackBtn />
          {step === "body" && <CharUiNextBtn />}
          {step === "clothing" && (
            <CharUiSaveBtn disabled={isSaving} onSave={handleSavePress} />
          )}
        </Row>
      )}
    </View>
  );
};

export default CharUi;
