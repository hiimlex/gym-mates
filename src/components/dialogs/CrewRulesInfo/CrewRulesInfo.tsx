import { Typography } from "@components/atoms";
import React from "react";
import { ScrollView, View } from "react-native";

interface CrewRulesInfoProps {}

const CrewRulesInfo: React.FC<CrewRulesInfoProps> = ({}) => {
  return (
    <ScrollView
      contentContainerStyle={{ gap: 6 }}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <Typography.Body _t>{"crewRulesInfo.about"}</Typography.Body>
      <Typography.Body _t>{"crewRulesInfo.gymFocused"}</Typography.Body>
      <Typography.Body _t>{"crewRulesInfo.freeWeekends"}</Typography.Body>
      <Typography.Body _t>{"crewRulesInfo.payOnPast"}</Typography.Body>
      <Typography.Body _t>{"crewRulesInfo.payWithoutPicture"}</Typography.Body>
    </ScrollView>
  );
};

export default CrewRulesInfo;
