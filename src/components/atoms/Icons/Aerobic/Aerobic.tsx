import React from "react";
import { View } from "react-native";
import { IIConProps } from "../Icons";
import Svg, { Path } from "react-native-svg";

const Aerobic: React.FC<IIConProps> = ({
  size = 24,
  fill = "#000000",
  stroke = "#000000",
  fillOpacity = 0.2,
  strokeWidth = 2,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M14 3.19025C14 4.29482 13.1046 5.19025 12 5.19025C10.8954 5.19025 10 4.29482 10 3.19025C10 2.08568 10.8954 1.19025 12 1.19025C13.1046 1.19025 14 2.08568 14 3.19025Z"
        fill={fill}
        fillOpacity={fillOpacity}
      />
      <Path
        d="M14 7.19025H10L9.22294 15.4789H14.518L14 7.19025Z"
        fill={fill}
        fillOpacity={fillOpacity}
      />
      <Path
        d="M14 7.19025H21.5M14 7.19025H10M14 7.19025L14.518 15.4789M2.5 7.19025H10M10 7.19025L9.22294 15.4789M9.22294 15.4789L8.5 23.1902M9.22294 15.4789H14.518M14.518 15.4789L15 23.1902M14 3.19025C14 4.29482 13.1046 5.19025 12 5.19025C10.8954 5.19025 10 4.29482 10 3.19025C10 2.08568 10.8954 1.19025 12 1.19025C13.1046 1.19025 14 2.08568 14 3.19025Z"
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Aerobic;
