import React from "react";
import { View } from "react-native";
import { IIConProps } from "../Icons";
import Svg, { Path } from "react-native-svg";

const Gym: React.FC<IIConProps> = ({
  size = 24,
  fill = "#000000",
  stroke = "#000000",
  fillOpacity = 0.2,
  strokeWidth = 2,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M14.5714 15.0036L15.4286 16.8486C15.4286 16.8486 19.2857 17.6678 19.2857 19.6162C19.2857 21 17.5714 21 17.5714 21H13L10.75 19.75"
        stroke={stroke}
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
      <Path
        d="M9.42864 15.0036L8.57149 16.8486C8.57149 16.8486 4.71436 17.6678 4.71436 19.6162C4.71436 21 6.42863 21 6.42863 21H8.50006L10.7501 19.75L13.5001 18"
        stroke={stroke}
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />

      <Path
        d="M3 15.9261C3 15.9261 5.14286 15.4649 6.42857 15.0036C7.71429 8.54595 11.5714 9.00721 12 9.00721C12.4286 9.00721 16.2857 8.54595 17.5714 15.0036C18.8571 15.4649 21 15.9261 21 15.9261"
        fill={fill}
        fillOpacity={fillOpacity}
      />

      <Path
        d="M3 15.9261C3 15.9261 5.14286 15.4649 6.42857 15.0036C7.71429 8.54595 11.5714 9.00721 12 9.00721C12.4286 9.00721 16.2857 8.54595 17.5714 15.0036C18.8571 15.4649 21 15.9261 21 15.9261"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="M12 7C13.1046 7 14 6.10457 14 5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5C10 6.10457 10.8954 7 12 7Z"
        fill={fill}
        fillOpacity={fillOpacity}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Gym;
