import React from "react";
import S from "./Calendar.styles";

interface CalendarProps {
  children?: React.ReactNode;
}

const Root: React.FC<CalendarProps> = ({ children }) => {
  return <S.Container>{children}</S.Container>;
};

export default Root;
