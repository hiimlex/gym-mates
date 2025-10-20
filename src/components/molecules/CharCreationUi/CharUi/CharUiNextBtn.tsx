import { useAppNavigation } from "@hooks/useAppNavigation/useAppNavigation";
import { CharCreationActions } from "@store/slices/CharCreationSlice";
import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";

const NextBtn: React.FC = () => {
  const dispatch = useDispatch();
  const goNext = () => {
    dispatch(CharCreationActions.setStep("clothing"));
  };

  return (
    <TouchableOpacity activeOpacity={0.6} onPress={goNext}>
      <Image
        source={require("../../../../assets/next_btn.png")}
        style={{
          width: 100,
          height: 30,
        }}
      />
    </TouchableOpacity>
  );
};

export default NextBtn;
