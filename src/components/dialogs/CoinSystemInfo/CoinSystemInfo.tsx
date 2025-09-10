import { Card, Typography } from "@components/atoms";
import React from "react";
import Animated from "react-native-reanimated";

const CoinSystemInfo: React.FC = ({}) => {
  return (
    <Animated.ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ gap: 6 }}
      bounces={false}
    >
      <Typography.Body textAlign="justify" _t>
        {"coinSystem.about"}
      </Typography.Body>

      <Typography.Body textAlign="justify" _t>
        {"coinSystem.earn"}
      </Typography.Body>
      <Typography.Body textAlign="justify" _t>
        {"coinSystem.missions"}
      </Typography.Body>
      <Typography.Body textAlign="justify" _t>
        {"coinSystem.streaks"}
      </Typography.Body>
      
      <Typography.Body textAlign="justify" _t>
        {"coinSystem.dailyStreak"}
      </Typography.Body>
      <Typography.Body textAlign="justify" _t>
        {"coinSystem.weekendStreak"}
      </Typography.Body>
      <Typography.Body textAlign="justify" _t>
        {"coinSystem.weekStreak"}
      </Typography.Body>
      <Typography.Body textAlign="justify" _t>
        {"coinSystem.monthStreak"}
      </Typography.Body>
      <Typography.Body textAlign="justify" _t>
        {"coinSystem.bounties"}
      </Typography.Body>

      <Typography.Body textColor="danger" textAlign="justify" _t>
        {"coinSystem.attention"}
      </Typography.Body>
      <Typography.Body textAlign="justify" _t>
        {"coinSystem.haveFun"}
      </Typography.Body>
    </Animated.ScrollView>
  );
};

export default CoinSystemInfo;
