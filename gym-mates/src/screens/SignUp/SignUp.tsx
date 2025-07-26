import React from "react";
import { View } from "react-native";

interface SignUpProps {
  children?: React.ReactNode;
}

const SignUp: React.FC<SignUpProps> = ({ children }) => {
  return <View>{children}</View>;
};

export default SignUp;
