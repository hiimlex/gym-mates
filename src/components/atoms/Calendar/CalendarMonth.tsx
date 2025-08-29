import {
  getDaysInMonth,
  Months,
  numberToMonth,
  WeekDays,
} from "@models/generic";
import { Colors } from "@theme";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Platform, TouchableOpacity, useWindowDimensions } from "react-native";
import { ChevronLeft, ChevronRight } from "react-native-feather";
import {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SvgProps } from "react-native-svg";
import Tabs from "../Tabs/Tabs";
import Typography from "../Typography/Typography";
import S from "./Calendar.styles";

interface CalendarMonthProps {
  markDays?: Date[];
  onChangeMonth?: (month: number) => void;
  onSelectDay?: (day: Date) => void;
}

const CalendarMonth: React.FC<CalendarMonthProps> = ({
  markDays,
  onSelectDay,
  onChangeMonth,
}) => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const currentDay = new Date().getDate();
  const { width } = useWindowDimensions();
  const pagerRef = useRef(null);

  const [selectedDay, setSelectedDay] = useState<number>(currentDay);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date(currentYear, currentMonth, currentDay)
  );
  const [daysInMonth, setDaysInMonth] = useState<Date[]>(
    getDaysInMonth(currentMonth, currentYear)
  );
  const [daysRowsCount, setDaysRowsCount] = useState<number>(0);

  const dayItemHeight = Platform.OS === "ios" ? 42 : 42;

  // width - scree padding - card padding - gaps between days
  const daysGap = 6;
  const daysWidth = useMemo(() => (width - 48 - 28 - 6 * daysGap) / 7, [width]);

  const iconProps: SvgProps = {
    width: 20,
    height: 20,
    stroke: Colors.colors.text,
  };

  const moveTo = (month: number) => {
    if (pagerRef.current && month >= 0 && month <= 11) {
      // @ts-ignore
      pagerRef.current.setPage(month);
    }
  };

  const isMarkedDay = (date: Date) => {
    return (
      markDays?.some(
        (d) =>
          d.getDate() === date.getDate() &&
          d.getMonth() === date.getMonth() &&
          d.getFullYear() === date.getFullYear()
      ) ?? false
    );
  };

  const isSelectedWeekDay = (dayIndex: number) => {
    return selectedDate.getDay() === dayIndex;
  };

  const isDayInMonth = (day: Date) => {
    return day.getMonth() === selectedMonth;
  };

  const handleSelectDay = (day: Date, isInMonth?: boolean) => {
    setSelectedDay(day.getDate());
    setSelectedDate(day);

    onSelectDay?.(day);

    if (!isInMonth) {
      moveTo(day.getMonth());
    }
  };

  const handleChangeMonth = (month: number) => {
    setSelectedMonth(month);
    const newDate = new Date(currentYear, month, selectedDate.getDate());
    setSelectedDate(newDate);
    const newDaysInMonth = getDaysInMonth(month, currentYear);
    const newDaysRowsCount = Math.ceil(newDaysInMonth.length / 7) + 1;
    setDaysInMonth(newDaysInMonth);
    setDaysRowsCount(newDaysRowsCount);

    onSelectDay?.(newDate);
    onChangeMonth?.(month);
  };

  useEffect(() => {
    const newDaysInMonth = getDaysInMonth(currentMonth, currentYear);
    const newDaysRowsCount = Math.ceil(newDaysInMonth.length / 7) + 1;
    setDaysInMonth(newDaysInMonth);
    setDaysRowsCount(newDaysRowsCount);
  }, []);

  useEffect(() => {
    cardHeight.value = withTiming(dayItemHeight * daysRowsCount + 72, {
      duration: 300,
    });
  }, [daysRowsCount]);

  const minHeight = 60;
  const cardHeight = useSharedValue(minHeight);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: cardHeight.value,
    };
  });

  return (
    <S.Card style={animatedStyle}>
      <S.MonthHeader>
        <Typography.Body fontWeight="semibold" _t>
          {`months.long.` + numberToMonth[selectedMonth]}
        </Typography.Body>
        <S.MonthHeaderActions>
          <TouchableOpacity
            disabled={selectedMonth <= 0}
            activeOpacity={0.6}
            onPress={() => moveTo(selectedMonth - 1)}
          >
            <ChevronLeft
              {...iconProps}
              stroke={
                selectedMonth <= 0 ? Colors.colors.disabled : Colors.colors.text
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={selectedMonth >= 11}
            activeOpacity={0.6}
            onPress={() => moveTo(selectedMonth + 1)}
          >
            <ChevronRight
              {...iconProps}
              stroke={
                selectedMonth >= 11
                  ? Colors.colors.disabled
                  : Colors.colors.text
              }
            />
          </TouchableOpacity>
        </S.MonthHeaderActions>
      </S.MonthHeader>
      <S.MonthHR />
      <Tabs.Root
        pagerRef={pagerRef}
        initialPage={selectedMonth}
        onPageSelected={(e) => handleChangeMonth(e.nativeEvent.position)}
      >
        {Months.map((_, index) => (
          <Tabs.Item key={index} bounces={false}>
            {index === selectedMonth && (
              <S.WeekDaysGrid entering={FadeIn.duration(100)}>
                {WeekDays.map((day, index) => {
                  return (
                    <S.DayItem
                      key={index}
                      width={daysWidth}
                      disabled
                      height={24}
                    >
                      <Typography.Body
                        fontWeight={
                          isSelectedWeekDay(index) ? "bold" : "medium"
                        }
                        textColor={
                          isSelectedWeekDay(index) ? "primary" : "textLight"
                        }
                      >
                        {day[0].toUpperCase()}
                      </Typography.Body>
                    </S.DayItem>
                  );
                })}

                {daysInMonth.map((day) => {
                  const isSelectedDay =
                    selectedDate.getDate() === day.getDate();
                  const isInMonth = isDayInMonth(day);

                  return (
                    <S.DayItem
                      height={40}
                      key={day.getTime()}
                      width={daysWidth}
                      onPress={() => handleSelectDay(day, isInMonth)}
                    >
                      <Typography.Body
                        fontWeight={isSelectedDay ? "bold" : "medium"}
                        textColor={
                          !isInMonth
                            ? "border"
                            : isSelectedDay
                              ? "primary"
                              : "text"
                        }
                      >
                        {day.getDate()}
                      </Typography.Body>
                      <S.HasWorkoutDot active={isMarkedDay(day)} />
                    </S.DayItem>
                  );
                })}
              </S.WeekDaysGrid>
            )}
          </Tabs.Item>
        ))}
      </Tabs.Root>
    </S.Card>
  );
};

export default CalendarMonth;
