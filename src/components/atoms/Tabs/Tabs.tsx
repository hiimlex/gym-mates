import { TabHeader } from "@models/generic";
import React, { useRef, useState } from "react";
import { ScrollViewProps, ViewProps, ViewStyle } from "react-native";
import PagerView, { PagerViewProps } from "react-native-pager-view";
import { OnPageSelectedEventData } from "react-native-pager-view/lib/typescript/PagerViewNativeComponent";
import { DirectEventHandler } from "react-native/Libraries/Types/CodegenTypes";
import Typography from "../Typography/Typography";
import S from "./Tabs.styles";

interface TabsProps extends PagerViewProps {
  children?: React.ReactNode;
  header?: TabHeader[];
  containerStyle?: ViewStyle;
  pagerRef?: React.RefObject<PagerView | null>;
}

const Root: React.FC<TabsProps> = ({
  children,
  header,
  containerStyle,
  pagerRef,
  ...rest
}) => {
  const [currentPage, setCurrentPage] = useState(rest.initialPage);

  const onPageChange: DirectEventHandler<OnPageSelectedEventData> = (event) => {
    setCurrentPage(event.nativeEvent.position);

    if (rest.onPageSelected) {
      rest.onPageSelected(event);
    }
  };

  const updatePage = (page: number) => {
    if (pagerRef?.current) {
      pagerRef.current.setPage(page);
    }
  };

  return (
    <S.Container style={containerStyle}>
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
      <S.Pager ref={pagerRef} {...rest} onPageSelected={(e) => onPageChange(e)}>
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

interface NoScrollItemProps extends ViewProps {
  children?: React.ReactNode;
  styles?: ViewStyle;
}

export default {
  Root,
  Item,
};
