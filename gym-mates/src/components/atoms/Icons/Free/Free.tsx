import React from "react";
import { View } from "react-native";
import { IIConProps } from "../Icons";
import Svg, { Path } from "react-native-svg";

const Free: React.FC<IIConProps> = ({
  size = 24,
  fill = "#000000",
  stroke = "#000000",
  fillOpacity = 0.2,
  strokeWidth = 2,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18.3333 4.19025H6.33333V6.85691H18.3333V4.19025Z"
        fill={fill}
        fillOpacity={fillOpacity}
      />
      <Path
        d="M3 4.19025H6.33333M21 4.19025H18.3333M6.33333 4.19025H18.3333M6.33333 4.19025V6.85691M9.66667 20.1902H3H6.33333V6.85691M18.3333 4.19025V6.85691M21 20.1902H15.6667H18.3333V6.85691M6.33333 6.85691H18.3333"
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Free;
