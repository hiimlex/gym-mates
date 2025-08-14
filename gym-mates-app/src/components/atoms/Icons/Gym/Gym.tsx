import React from "react";
import { View } from "react-native";
import { IIConProps } from "../Icons";
import Svg, { Path } from "react-native-svg";

const Gym: React.FC<IIConProps> = ({
  size = 24, 
  fill = '#000000',
  stroke = '#000000',
  fillOpacity = 0.2,
  strokeWidth = 2,
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M4.85714 16H2V9H4.85714V7H7.71429V11.5H16.2857V7H19.1429V9H22V16H19.1429V18H16.2857V13.5H7.71429V18H4.85714V16Z"
        fill={fill}
        fillOpacity={fillOpacity}
      />
      <Path
        d="M4.85714 16H2V9H4.85714M4.85714 16V18H7.71429V13.5M4.85714 16V9M4.85714 9V7H7.71429V11.5M7.71429 11.5H16.2857M7.71429 11.5V13.5M16.2857 11.5V7H19.1429V9M16.2857 11.5V13.5M19.1429 9H22V16H19.1429M19.1429 9V16M19.1429 16V18H16.2857V13.5M16.2857 13.5H7.71429"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Gym;
