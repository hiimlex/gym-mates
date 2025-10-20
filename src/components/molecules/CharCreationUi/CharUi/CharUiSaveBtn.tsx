import React from "react";
import { View, Image, TouchableOpacity } from "react-native";

const SaveBtn: React.FC = () => {
  return (
    <TouchableOpacity>
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
