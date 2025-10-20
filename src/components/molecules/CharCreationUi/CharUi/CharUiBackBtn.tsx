import { useAppNavigation } from "@hooks/useAppNavigation/useAppNavigation";
import { CharCreationActions } from "@store/slices/CharCreationSlice";
import { StoreState } from "@store/Store";
import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const BackBtn: React.FC = () => {
  const { step } = useSelector((state: StoreState) => state.charCreation);
  const dispatch = useDispatch();
  const { goBack } = useAppNavigation();

  const handleBack = () => {
    if (step === "body") {
      goBack();
    }

    if (step === "clothing") {
      dispatch(CharCreationActions.setStep("body"));
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.6} onPress={handleBack}>
      <Image
        source={require("../../../../assets/back_btn.png")}
        style={{
          width: 100,
          height: 30,
        }}
      />
    </TouchableOpacity>
  );
};

export default BackBtn;
