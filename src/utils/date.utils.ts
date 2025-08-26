export const getCurrentWeek = (date: Date = new Date()): Date[] => {
  const today = new Date(date);
  // get what day of the week it is
  const dayOfWeek = today.getDay();
  // get the first day of the week (Sunday)
  const firstDayOfWeek = new Date(today);
  firstDayOfWeek.setDate(today.getDate() - dayOfWeek);
  // create an array of dates for the week
  const week: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(firstDayOfWeek);
    day.setDate(firstDayOfWeek.getDate() + i);
    week.push(day);
  }
  return week;
};
