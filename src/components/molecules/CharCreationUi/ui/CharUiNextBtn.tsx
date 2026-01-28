import { CharCreationActions } from "@store/slices/CharCreationSlice";
import { StoreState } from "@store/Store";
import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const NextBtn: React.FC = () => {
  const { skin, palette } = useSelector(
    (state: StoreState) => state.charCreation
  );
  const dispatch = useDispatch();
  const goNext = () => {
    dispatch(CharCreationActions.setStep("clothing"));
  };

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={goNext}
      disabled={!skin || !skin?.sex}
      style={{
        opacity: !skin || !skin?.sex ? 0.5 : 1,
      }}
    >
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
