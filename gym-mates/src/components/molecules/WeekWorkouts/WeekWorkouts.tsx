import { WorkoutService } from "@api/services";
import { useQuery } from "@apollo/client";
import { IWorkout, IWorkoutsByUser } from "@models/collections";
import { StoreState } from "@store/Store";
import { Colors } from "@theme";
import { getCurrentWeek, numberToWeekDay } from "@utils/date.utils";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CheckCircle, XCircle } from "react-native-feather";
import { useSelector } from "react-redux";
import Typography from "../../atoms/Typography/Typography";
import S from "./WeekWorkouts.styles";

interface WeekWorkoutsProps {
  children?: React.ReactNode;
}

const WeekWorkouts: React.FC<WeekWorkoutsProps> = ({ children }) => {
  const { user } = useSelector((state: StoreState) => state.user);
  const { t } = useTranslation();

  const currentWeek = getCurrentWeek();
  const current = new Date();
  const firstDayOfWeek = currentWeek[0];
  const lastDayOfWeek = currentWeek[currentWeek.length - 1];

  const [workoutsByDay, setWorkoutsByDay] = useState<(IWorkout | undefined)[]>(
    []
  );

  const opacityPace = 0.08;

  const { data } = useQuery<IWorkoutsByUser>(
    WorkoutService.gql.WORKOUTS_BY_USER,
    {
      variables: {
        userId: user?._id,
        range: [
          format(firstDayOfWeek, "MM-dd-yy"),
          format(lastDayOfWeek, "MM-dd-yy"),
        ],
      },
      fetchPolicy: "cache-and-network",
    }
  );

  const handleDataUpdate = (newData: IWorkoutsByUser) => {
    const { workouts } = newData;
    const workoutsMap = currentWeek.map((day) => {
      return workouts.find((workout) => {
        const workoutDate = new Date(workout.date);

        return (
          workoutDate.getDate() === day.getDate() &&
          workoutDate.getMonth() === day.getMonth() &&
          workoutDate.getFullYear() === day.getFullYear()
        );
      });
    });
    setWorkoutsByDay(workoutsMap);
  };

  useEffect(() => {
    if (data) {
      handleDataUpdate(data);
    }
  }, [data]);

  return (
    <S.Container>
      {currentWeek.map((day, index) => {
        const isCurrentDay = day.getDate() === current.getDate();
        const isPast = day < current;
        const isFuture = day > current;
        const textColor = isCurrentDay ? "primary" : "textLight";
        const opacity = isPast
          ? 1 - (current.getDay() - day.getDay()) * opacityPace
          : 1;

        return (
          <S.DayItem key={day.getDay()} opacity={opacity}>
            <Typography.Caption textColor={textColor}>
              {t(`weekDays.short.${numberToWeekDay[day.getDay()]}`)}
            </Typography.Caption>

            {workoutsByDay[index] && (
              <>
                <CheckCircle
                  width={20}
                  height={20}
                  fill={Colors.colors.primary}
                  stroke={Colors.colors.primary}
                  fillOpacity={0.2}
                />
                <Typography.Tip textColor={textColor}>
                  {day.getDate().toString().padStart(2, "0")}
                </Typography.Tip>
              </>
            )}

            {isPast && !workoutsByDay[index] && (
              <>
                <XCircle
                  width={20}
                  height={20}
                  fill={Colors.colors.border}
                  stroke={Colors.colors.border}
                  fillOpacity={0.2}
                />
                <Typography.Tip textColor={textColor}>
                  {day.getDate().toString().padStart(2, "0")}
                </Typography.Tip>
              </>
            )}

            {isFuture && (
              <Typography.Body textColor="textDark">
                {day.getDate().toString().padStart(2, "0")}
              </Typography.Body>
            )}

            {isCurrentDay && !workoutsByDay[index] && (
              <Typography.Body textColor="primary">
                {day.getDate().toString().padStart(2, "0")}
              </Typography.Body>
            )}
          </S.DayItem>
        );
      })}
    </S.Container>
  );
};

export default WeekWorkouts;
