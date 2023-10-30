export const parseHoursAndMinutesToMs = (hours, minutes) => {
  return (hours * 60 * 60 + minutes * 60) * 1000;
};
