import React from "react";
import { TouchableOpacity, View } from "react-native";
import Typography from "../Typography/Typography";
import { useTranslation } from "react-i18next";
import S from "./Menu.styles";
import Row from "../Row/Row";
import Feather from "@react-native-vector-icons/feather";
import { Colors, setAlphaToColor } from "@theme";

interface MenuProps {
  children: React.ReactNode;
}

const Root: React.FC<MenuProps> = ({ children }) => {
  return (
    <S.Menu
      colors={[
        setAlphaToColor("#ffffff", 40),
        setAlphaToColor("#EBF2FF", 40),
      ]}
      start={{ x: 0.1, y: 0.7 }}
    >
      {children}
    </S.Menu>
  );
};

interface ItemProps {
  label: string;
  onPress: () => void;
  _t?: boolean;
  icon?: React.ReactNode;
  isLast?: boolean;
}

const Item: React.FC<ItemProps> = ({ label, onPress, _t, icon, isLast }) => {
  const { t } = useTranslation();

  return (
    <S.Item activeOpacity={0.6} onPress={onPress} isLast={isLast}>
      <Row gap={12} width={"auto"} align="center">
        {icon}
        <Typography.Button textColor="text">
          {_t ? t(label) : label}
        </Typography.Button>
      </Row>
      <Feather
        name="chevron-right"
        size={20}
        color={Colors.colors.borderDark}
      />
    </S.Item>
  );
};

export default {
  Root,
  Item,
};
