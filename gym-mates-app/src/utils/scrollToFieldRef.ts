import { RefObject } from "react";
import { ScrollView, TextInput } from "react-native";

export const scrollToFieldRef = (
  ref: RefObject<TextInput | null>,
  scrollRef: RefObject<ScrollView | null>
) => {
  if (ref.current) {
    ref.current.measureInWindow((x, y, width, height) => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          y: y - height,
          animated: true,
        });
      }
    });
  }
};
