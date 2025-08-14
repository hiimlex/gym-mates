import React from "react";
import { View } from "react-native";
import { IIConProps } from "../Icons";
import Svg, { Path } from "react-native-svg";

const Swimming: React.FC<IIConProps> = ({
  size = 24,
  fill = "#000000",
  stroke = "#000000",
  fillOpacity = 0.2,
  strokeWidth = 2,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M14.6474 17.086C13.3322 15.4677 8.5 17.086 8.5 18.5C8.23731 16.3985 4.17395 16.2002 1.65649 16.638C2.64159 16.2002 4.94014 15.1275 6.25359 14.3395C7.89541 13.3544 7.89542 14.0111 5.59687 10.0707C3.75803 6.91843 5.92523 5.69254 7.23869 5.47363L16.1045 3.8318C16.9802 3.61289 18.7971 3.70046 19.0598 5.80199C19.3225 7.90352 14.1343 8.10054 10.8507 8.75726C9.8656 9.08564 11.1791 10.7275 11.1791 10.7275L14.6474 17.086ZM14.6474 17.086C14.831 17.312 14.9907 17.5974 15.1194 17.9515L14.6474 17.086ZM22.3434 13.6827C22.3434 15.6776 20.7263 17.2947 18.7314 17.2947C16.7366 17.2947 15.1194 15.6776 15.1194 13.6827C15.1194 11.6879 16.7366 10.0707 18.7314 10.0707C20.7263 10.0707 22.3434 11.6879 22.3434 13.6827Z"
        stroke={stroke}
        fill={fill}
        strokeLinejoin="round"
        fillOpacity={fillOpacity}
      />
    </Svg>
  );
};



export default Swimming;
