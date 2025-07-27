import { WorkoutService } from "@api/services";
import { useQuery } from "@apollo/client";
import { IWorkout, IWorkoutsByUser } from "@models/collections";
import { StoreState } from "@store/store";
import { getCurrentWeek, numberToWeekDay } from "@utils/date.utils";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Typography from "../../atoms/Typography/Typography";
import S from "./styles";
import { format } from "date-fns";
import Feather from "@react-native-vector-icons/feather";
import { Colors } from "@theme";
import { CheckCircle, XCircle } from "react-native-feather";

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

  useQuery<IWorkoutsByUser>(WorkoutService.WorkoutsByUser, {
    variables: {
      userId: user?._id,
      range: [
        format(firstDayOfWeek, "MM-dd-yy"),
        format(lastDayOfWeek, "MM-dd-yy"),
      ],
    },
    onCompleted: (data) => {
      const { workouts } = data;
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
    },
    onError: (error) => {
      console.error("Error fetching workouts:", { ...error });
    },
  });

  return (
    <S.Container>
      {currentWeek.map((day, index) => {
        const isCurrentDay = day.getDate() === current.getDate();
        const textColor = isCurrentDay ? "primary" : "textLight";

        return (
          <S.DayItem key={day.getDay()}>
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

            {day < current && !workoutsByDay[index] && (
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

            {day > current && (
              <Typography.Body textColor="textDark">
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
