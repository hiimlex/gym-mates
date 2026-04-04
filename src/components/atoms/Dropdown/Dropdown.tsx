import { BlurProps } from "@models/generic";
import { BlurView } from "expo-blur";
import React, { useMemo, useRef, useState } from "react";
import { Modal, View, useWindowDimensions } from "react-native";
import { Typography } from "../index";
import S from "./Dropdown.styles";

interface DropdownProps {
  children?: React.ReactNode;
}

interface DropdownAnchorProps {
  children?: (actions: {
    open: () => void;
    close: () => void;
  }) => React.ReactNode;
}

interface DropdownItemProps {
  label: string;
  onPress: () => void;
  _t?: boolean;
  danger?: boolean;
  isLast?: boolean;
  onSelect?: () => void;
}

const MENU_WIDTH = 196;
const MENU_OFFSET = 8;
const SCREEN_PADDING = 8;

const dropdownAnchorType = "DropdownAnchor";
const dropdownItemType = "DropdownItem";

type AnchorRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export function Dropdown({ children }: DropdownProps) {
  const anchorRef = useRef<View | null>(null);
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const [isOpen, setIsOpen] = useState(false);
  const [anchorRect, setAnchorRect] = useState<AnchorRect | null>(null);

  const openMenu = () => {
    anchorRef.current?.measureInWindow((x, y, width, height) => {
      setAnchorRect({ x, y, width, height });
      setIsOpen(true);
    });
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const childArray = React.Children.toArray(children);

  const anchorChild = childArray.find(
    (child) =>
      React.isValidElement(child) &&
      ((child.type as any).displayName || (child.type as any).name) ===
        dropdownAnchorType,
  );

  const itemChildren = childArray.filter(
    (child) =>
      React.isValidElement(child) &&
      ((child.type as any).displayName || (child.type as any).name) ===
        dropdownItemType,
  ) as React.ReactElement<DropdownItemProps>[];

  const availableHeightBelow = useMemo(() => {
    if (!anchorRect) {
      return 0;
    }

    const anchorBottom = anchorRect.y + anchorRect.height;
    return Math.max(
      0,
      screenHeight - anchorBottom - MENU_OFFSET - SCREEN_PADDING,
    );
  }, [anchorRect, screenHeight]);

  const menuTop = useMemo(() => {
    if (!anchorRect) {
      return SCREEN_PADDING;
    }

    return anchorRect.y + anchorRect.height + MENU_OFFSET;
  }, [anchorRect]);

  const menuLeft = useMemo(() => {
    if (!anchorRect) {
      return SCREEN_PADDING;
    }

    const centerAligned = anchorRect.x + anchorRect.width / 2 - MENU_WIDTH / 2;

    return Math.min(
      Math.max(SCREEN_PADDING, centerAligned),
      screenWidth - MENU_WIDTH - SCREEN_PADDING,
    );
  }, [anchorRect, screenWidth]);

  return (
    <>
      {React.isValidElement(anchorChild)
        ? React.cloneElement(
            anchorChild as React.ReactElement<DropdownAnchorProps>,
            {
              children: () => (
                <S.AnchorContainer ref={anchorRef} collapsable={false}>
                  {(
                    anchorChild as React.ReactElement<DropdownAnchorProps>
                  ).props.children?.({
                    open: openMenu,
                    close: closeMenu,
                  })}
                </S.AnchorContainer>
              ),
            },
          )
        : null}

      <Modal
        visible={isOpen}
        animationType="none"
        onRequestClose={closeMenu}
        transparent
      >
        <BlurView {...BlurProps} style={{ flex: 1 }}>
          <S.Backdrop onPress={closeMenu} />

          <S.Menu
            top={menuTop}
            left={menuLeft}
            width={MENU_WIDTH}
            maxHeight={availableHeightBelow}
          >
            {itemChildren.map((child, index) =>
              React.cloneElement(child, {
                key: child.key || index,
                isLast: index === itemChildren.length - 1,
                onSelect: closeMenu,
              }),
            )}
          </S.Menu>
        </BlurView>
      </Modal>
    </>
  );
}

export function DropdownAnchor({ children }: DropdownAnchorProps) {
  return <>{children?.({ open: () => {}, close: () => {} })}</>;
}
DropdownAnchor.displayName = dropdownAnchorType;

export function DropdownItem({
  label,
  onPress,
  _t,
  danger,
  isLast,
  onSelect,
}: DropdownItemProps) {
  return (
    <S.ItemButton
      activeOpacity={0.7}
      isLast={isLast}
      onPress={() => {
        onPress();
        onSelect?.();
      }}
    >
      <Typography.Body _t={_t} textColor={danger ? "danger" : "textDark"}>
        {label}
      </Typography.Body>
    </S.ItemButton>
  );
}
DropdownItem.displayName = dropdownItemType;
