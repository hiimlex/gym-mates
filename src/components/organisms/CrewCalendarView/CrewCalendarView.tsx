import { Calendar } from "@components/atoms";
import { CrewLastActivities } from "@components/molecules";
import {
  IGetActivitiesDaysFilters,
  IWorkoutsFilters,
} from "@models/collections";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import S from "./CrewCalendarView.styles";
import { DateFormat, QueryKeys } from "@models/generic";
import { CrewsService } from "@api/services";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { useSelector } from "react-redux";
import { StoreState } from "@store/Store";

interface CrewCalendarViewProps {}

const CrewCalendarView: React.FC<CrewCalendarViewProps> = () => {
  const { crewView: crew } = useSelector((state: StoreState) => state.crews);
  const [workoutFilters, setWorkoutFilters] = useState<IWorkoutsFilters>({});
  const [monthFilters, setMonthFilters] = useState<IGetActivitiesDaysFilters>({
    crew_id: crew?._id || "",
  });

  const { data } = useQuery({
    queryFn: () => {
      return CrewsService.getActivitiesDays(monthFilters);
    },
    queryKey: [QueryKeys.Crew.GetActivityDays, monthFilters],
  });

  const markedDays = useMemo(
    () => data?.data.map((item) => new Date(item.date)),
    [data]
  );

  const handleOnSelectDay = (day: Date) => {
    const startDate = format(day, DateFormat);
    const endDate = format(day, DateFormat);

    setWorkoutFilters({ range: [startDate, endDate], crewId: crew?._id || "" });

    const firstDayOfMonth = startOfMonth(day);
    const lastDayOfMonth = endOfMonth(day);
    const formattedFirstDay = format(firstDayOfMonth, DateFormat);
    const formattedLastDay = format(lastDayOfMonth, DateFormat);

    setMonthFilters((prev) => ({
      crew_id: crew?._id || "",
      start_date: formattedFirstDay,
      end_date: formattedLastDay,
    }));
  };

  return (
    <S.Container>
      <Calendar.Month onSelectDay={handleOnSelectDay} markDays={markedDays} />
      <CrewLastActivities
        filters={workoutFilters}
        label="crewView.activities"
      />
    </S.Container>
  );
};

export default CrewCalendarView;
