// Array of days of the week
const DAYS = [
  "Sunday",
  "Monday", 
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Function to get the day of the week from a timestamp
const getWeekDay = (date) => {
  // Convert the UNIX timestamp (in seconds) to milliseconds, create a Date object, and return the corresponding day name
  return DAYS[new Date(date * 1000).getDay()];
};


export { getWeekDay };
