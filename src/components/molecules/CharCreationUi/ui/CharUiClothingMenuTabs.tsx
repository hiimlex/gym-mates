import React, { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { Image, ImageBackground, TouchableOpacity, View } from "react-native";
import { useImageSize } from "@hooks/useImageSize/useImageSize";
import { CharCreationZIndex } from "./CharUi.utils";

const menuTab = require("../../../../assets/skin_tab.png");

export type SkinMenuTab = "hair" | "top" | "bottom";

interface MenuHeaderProps {
  tab: SkinMenuTab;
  width?: number;
  height?: number;
  selectedTab?: SkinMenuTab;
  resizePercent?: number;

  onTabPress?: (tab: SkinMenuTab) => void;
}

interface MenuTabProps {
  onPress: () => void;
  onLoad?: (imgWidth: number, imgHeight: number) => void;
  resizePercent?: number;
}

const MenuTab: React.FC<MenuTabProps & PropsWithChildren> = ({
  onPress,
  children,
  resizePercent = 1,
  onLoad,
}) => {
  const { width, height } = useImageSize(menuTab);
  const desiredSize = useMemo(() => {
    return {
      width: width * resizePercent,
      height: height * resizePercent,
    };
  }, [width, height, resizePercent]);
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1}>
      <ImageBackground
        source={require("../../../../assets/skin_tab.png")}
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          ...desiredSize,
        }}
      >
        {children}
      </ImageBackground>
    </TouchableOpacity>
  );
};

const MenuTabs: React.FC<MenuHeaderProps> = ({
  onTabPress,
  resizePercent,
  tab,
}) => {
  const setSelectedTab = (tab: SkinMenuTab) => {
    if (onTabPress) {
      onTabPress(tab);
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: -14.5,
        zIndex: CharCreationZIndex.menuTabs,
      }}
    >
      <MenuTab
        onPress={() => setSelectedTab("hair")}
        resizePercent={resizePercent}
      >
        <Image
          style={{
            width: 32,
            height: 32,
            opacity: tab === "hair" ? 1 : 0.4,
          }}
          source={require("../../../../assets/skin_tab_hair.png")}
        />
      </MenuTab>
      <MenuTab
        onPress={() => setSelectedTab("top")}
        resizePercent={resizePercent}
      >
        <Image
          style={{
            width: 32,
            height: 32,
            opacity: tab === "top" ? 1 : 0.4,
          }}
          source={require("../../../../assets/skin_tab_shirt.png")}
        />
      </MenuTab>
      <MenuTab
        onPress={() => setSelectedTab("bottom")}
        resizePercent={resizePercent}
      >
        <Image
          style={{
            width: 32,
            height: 32,
            opacity: tab === "bottom" ? 1 : 0.4,
          }}
          source={require("../../../../assets/skin_tab_pants.png")}
        />
      </MenuTab>
    </View>
  );
};

export default MenuTabs;
