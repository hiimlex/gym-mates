import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
} from "date-fns";

export const Months = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

export const numberToMonth: Record<number, string> = {
  0: "jan",
  1: "feb",
  2: "mar",
  3: "apr",
  4: "may",
  5: "jun",
  6: "jul",
  7: "aug",
  8: "sep",
  9: "oct",
  10: "nov",
  11: "dec",
};

export const WeekDays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
export const numberToWeekDay: Record<number, string> = {
  0: "sun",
  1: "mon",
  2: "tue",
  3: "wed",
  4: "thu",
  5: "fri",
  6: "sat",
};

export const getDaysInMonth = (month: number, year: number): Date[] => {
  const date = new Date(year, month, 1);
  // Get the first day of the month
  let firstDay = startOfMonth(date);
  // Get the last day of the month
  let lastDay = endOfMonth(date);


  // Get the first sunday before or on the first day of the month
  if (firstDay.getDay() !== 0) {
    const firstSunday = startOfWeek(firstDay, { weekStartsOn: 0 });
    // Adjust the first day to be the first sunday
    firstDay = firstSunday;
  }
  // Get the next saturday after or on the last day of the month
  if( lastDay.getDay() !== 6 ) {
    const lastSaturday = startOfWeek(lastDay, { weekStartsOn: 0 });
    lastDay = new Date(lastSaturday);
    lastDay.setDate(lastSaturday.getDate() + 6);
  }

  // Get all days within the interval
  const allDaysInMonth = eachDayOfInterval({ start: firstDay, end: lastDay });

  return allDaysInMonth;
};
