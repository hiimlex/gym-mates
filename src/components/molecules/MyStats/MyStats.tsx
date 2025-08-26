import { WorkoutService } from "@api/services";
import { useQuery } from "@apollo/client";
import { Card, Row, Typography } from "@components/atoms";
import {
  IWorkout,
  IWorkoutsByUser,
  IWorkoutsFilters,
} from "@models/collections";
import Feather from "@react-native-vector-icons/feather";
import { StoreState } from "@store/Store";
import { Colors } from "@theme";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { useSelector } from "react-redux";

interface MyStatsProps {
  children?: React.ReactNode;
}

const MyStats: React.FC<MyStatsProps> = ({ children }) => {
  const { t } = useTranslation();

  const { user } = useSelector((state: StoreState) => state.user);

  const [lastWorkout, setLastWorkout] = useState<IWorkout | null>(null);

  const { data } = useQuery<IWorkoutsByUser, IWorkoutsFilters>(
    WorkoutService.gql.WORKOUTS_BY_USER,
    {
      variables: { userId: user?._id, sort: "DATE_DESC", limit: 1 },
      fetchPolicy: "cache-and-network",
    }
  );

  useEffect(() => {
    if (data) {
      const workouts = data.workouts;
      if (workouts.length > 0) {
        setLastWorkout(workouts[0]);
      } else {
        setLastWorkout(null);
      }
    }
  }, [data]);

  if (!user) {
    return null;
  }

  return (
    <View style={{ gap: 12 }}>
      <Typography.Body textColor="textDark" _t>
        {"home.stats.title"}
      </Typography.Body>

      <Row gap={18}>
        <Card style={{ flex: 1 }}>
          <Row gap={6}>
            <Feather
              name="trending-up"
              size={16}
              color={Colors.colors.textLight}
            />
            <Typography.Caption textColor="textLight" _t>
              {"home.stats.myStreak"}
            </Typography.Caption>
          </Row>
          <Typography.Body fontWeight="semibold">
            {user.day_streak} {t("home.stats.days")}
          </Typography.Body>
        </Card>
        <Card style={{ flex: 1 }}>
          <Row gap={6}>
            <Feather name="clock" size={16} color={Colors.colors.textLight} />
            <Typography.Caption textColor="textLight" _t>
              {"home.stats.lastSession"}
            </Typography.Caption>
          </Row>
          <Row justify="space-between">
            {!lastWorkout && (
              <Typography.Body fontWeight="semibold" _t>
                {"home.stats.noSession"}
              </Typography.Body>
            )}
            {lastWorkout && (
              <>
                <Typography.Body fontWeight="semibold">
                  {lastWorkout?.date
                    ? format(new Date(lastWorkout.date), "dd/MM")
                    : t("home.stats.noSession")}
                </Typography.Body>
                <Typography.Body fontWeight="semibold">
                  {lastWorkout.duration} {t("home.stats.mins")}
                </Typography.Body>
              </>
            )}
          </Row>
        </Card>
      </Row>
    </View>
  );
};

export default MyStats;
