import { TabHeader } from "@models/generic";
import React, { useEffect, useRef, useState } from "react";
import { ScrollViewProps, ViewStyle } from "react-native";
import PagerView, { PagerViewProps } from "react-native-pager-view";
import S from "./Tabs.styles";
import Typography from "../Typography/Typography";

interface TabsProps extends PagerViewProps {
  children?: React.ReactNode;
  header?: TabHeader[];
}

const Root: React.FC<TabsProps> = ({ children, header, ...rest }) => {
  const ref = useRef<PagerView>(null);
  const [currentPage, setCurrentPage] = useState(rest.initialPage);

  const onPageChange = (position: number) => {
    setCurrentPage(position);
  };

  const updatePage = (page: number) => {
    if (ref.current) {
      ref.current.setPage(page);
    }
  };

  return (
    <S.Container>
      {header && (
        <S.Header>
          {header.map((item, index) => {
            const isActive = index === currentPage;

            return (
              <S.HeaderItem
                key={item.key}
                active={isActive}
                activeOpacity={0.6}
                onPress={() => updatePage(item.key)}
              >
                <Typography.Button
                  _t
                  textColor={isActive ? "primary" : "textLight"}
                >
                  {item.title}
                </Typography.Button>
              </S.HeaderItem>
            );
          })}
        </S.Header>
      )}
      <S.Pager
        ref={ref}
        {...rest}
        onPageSelected={(e) => onPageChange(e.nativeEvent.position)}
      >
        {children}
      </S.Pager>
    </S.Container>
  );
};

interface TabItemProps extends ScrollViewProps {
  children?: React.ReactNode;
  styles?: ViewStyle;
}

const Item: React.FC<TabItemProps> = ({ children, styles, ...rest }) => {
  return (
    <S.Page
      contentContainerStyle={{
        gap: 24,
        flexGrow: 1,
      }}
      showsVerticalScrollIndicator={false}
      style={styles}
      {...rest}
    >
      {children}
    </S.Page>
  );
};

export default {
  Root,
  Item,
};
