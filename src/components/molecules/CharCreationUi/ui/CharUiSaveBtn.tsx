import React from "react";
import { Image, TouchableOpacity } from "react-native";

interface CharUiSaveBtnProps {
  onSave?: () => void;
  disabled?: boolean;
}

const SaveBtn: React.FC<CharUiSaveBtnProps> = ({
  onSave,
  disabled,
}) => {
  return (
    <TouchableOpacity onPress={onSave} activeOpacity={0.8} disabled={disabled}>
      <Image
        source={require("../../../../assets/save_btn.png")}
        style={{
          width: 100,
          height: 40,
        }}
      />
    </TouchableOpacity>
  );
};

export default SaveBtn;
