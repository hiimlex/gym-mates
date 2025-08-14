import { Input } from "@components/atoms";
import { Header } from "@components/molecules";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { UserInventoryActions } from "@store/slices";
import { AppDispatch } from "@store/Store";
import { useState } from "react";
import { useDispatch } from "react-redux";
import S from "./UserInventory.styles";

const InventorySearch = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [oldTimeout, setOldTimeout] = useState<NodeJS.Timeout | null>(null);

  const onShopSearch = (text: string) => {
    if (oldTimeout) {
      clearTimeout(oldTimeout);
    }

    const newTimeout = setTimeout(() => {
      dispatch(UserInventoryActions.setFilters({ search: text }));
    }, 300);

    setOldTimeout(newTimeout);
  };

  return (
    <S.SearchWrapper>
      <Input
        placeholder="Search"
        style={{ paddingTop: 12, paddingBottom: 12 }}
        onChange={onShopSearch}
      />
    </S.SearchWrapper>
  );
};

export const UserInventoryScreenOptions: NativeStackNavigationOptions = {
  headerShown: true,
  headerTransparent: true,
  headerLeft: () => <Header.BackLeft />,
  headerTitle: InventorySearch,
  headerRight: undefined,
};
