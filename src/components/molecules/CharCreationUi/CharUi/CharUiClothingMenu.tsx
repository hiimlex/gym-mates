import { UsersService } from "@api/services";
import { Tabs } from "@components/atoms";
import { useImageSize } from "@hooks/useImageSize/useImageSize";
import { IGetSkinsFilters, IItem, SkinPiece } from "@models/collections";
import { QueryKeys } from "@models/generic";
import { StoreState } from "@store/Store";
import { CharCreationActions } from "@store/slices/CharCreationSlice";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import { useWindowDimensions, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import S from "./CharUi.styles";
import { CharCreationZIndex } from "./CharUi.utils";
import MenuTabs, { SkinMenuTab } from "./CharUiClothingMenuTabs";
import ItemBox from "./CharUiItemBox";

const menuSvg = require("../../../../assets/skin_menu.png");
const innerPadding = 24 * 2; // 24 padding on each side
const itemsPerPage = 8;

const Menu: React.FC = () => {
  const { width: windowWidth } = useWindowDimensions();
  const { width: imgWidth, height: imgHeight } = useImageSize(menuSvg);
  const { pieces, skin, tab } = useSelector(
    (state: StoreState) => state.charCreation
  );
  const [filters, setFilters] = useState<IGetSkinsFilters>({
    itemsPerRow: itemsPerPage,
    piece: SkinPiece.hair,
    sex: skin?.sex,
  });
  const selectedIds = useMemo(
    () =>
      Object.values(pieces)
        .map((p) => p?.item?._id)
        .filter(Boolean) as string[],
    [pieces]
  );

  const resizePercent = useMemo(
    () => (windowWidth - innerPadding) / imgWidth,
    [windowWidth, imgWidth]
  );
  const desiredSize = useMemo(
    () => ({
      width: windowWidth - innerPadding,
      height: imgHeight * resizePercent,
    }),
    [windowWidth, imgHeight, resizePercent, innerPadding]
  );

  const { data, isLoading } = useQuery({
    queryFn: () => UsersService.getSkins(filters),
    queryKey: [
      QueryKeys.User.Skins,
      filters.itemsPerRow,
      filters.piece,
      skin?.sex,
    ],
  });

  const dispatch = useDispatch();

  const handleTabPress = (tab: SkinMenuTab) => {
    const pieceByTab: Record<SkinMenuTab, SkinPiece | undefined> = {
      bottom: SkinPiece.bottom,
      hair: SkinPiece.hair,
      top: SkinPiece.top,
    };

    dispatch(CharCreationActions.setTab(tab));
    setFilters({ ...filters, piece: pieceByTab[tab] });
  };

  const handleSelectItem = (item: IItem) => {
    dispatch(
      CharCreationActions.selectPiece({
        piece: tab,
        item: {
          colorName: "default",
          item,
        },
      })
    );
  };

  return (
    <View>
      <MenuTabs
        tab={tab}
        resizePercent={resizePercent}
        onTabPress={handleTabPress}
      />
      <S.Menu
        source={menuSvg}
        style={{ ...desiredSize, zIndex: CharCreationZIndex.menu }}
      >
        <Tabs.Root
          style={{ height: desiredSize.height - 24 }}
          orientation="horizontal"
          initialPage={0}
        >
          {data?.grouped.map((group, index) => (
            <S.ItemPage key={index}>
              {group.map((item) => (
                <ItemBox
                  key={item._id}
                  item={item}
                  isSelected={selectedIds.includes(item._id)}
                  onSelectItem={handleSelectItem}
                />
              ))}
            </S.ItemPage>
          ))}
        </Tabs.Root>
      </S.Menu>
    </View>
  );
};

export default Menu;
