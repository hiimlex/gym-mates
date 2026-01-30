import Feather from "@react-native-vector-icons/feather";
import { Colors, setAlphaToColor } from "@theme";
import React from "react";
import { useTranslation } from "react-i18next";
import Row from "../Row/Row";
import Typography from "../Typography/Typography";
import S from "./Menu.styles";

interface MenuProps {
  children: React.ReactNode;
}

const Root: React.FC<MenuProps> = ({ children }) => {
  return (
    <S.GradientMenu
      colors={[setAlphaToColor("#ffffff", 40), setAlphaToColor("#EBF2FF", 40)]}
      start={{ x: 0.1, y: 0.7 }}
    >
      {children}
    </S.GradientMenu>
  );
};

interface ItemProps {
  label: string;
  onPress: () => void;
  _t?: boolean;
  icon?: React.ReactNode;
  isLast?: boolean;
  rightIcon?: React.ReactNode;
}

const Item: React.FC<ItemProps> = ({
  label,
  onPress,
  _t,
  icon,
  isLast,
  rightIcon,
}) => {
  const { t } = useTranslation();

  return (
    <S.Item activeOpacity={0.6} onPress={onPress} isLast={isLast}>
      <Row gap={12} width={"auto"} align="center">
        {icon}
        <Typography.Button textColor="text">
          {_t ? t(label) : label}
        </Typography.Button>
      </Row>
      {rightIcon || (
        <Feather
          name="chevron-right"
          size={20}
          color={Colors.colors.borderDark}
        />
      )}
    </S.Item>
  );
};

export default {
  Root,
  Item,
};
