import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(customParseFormat);

const format = "YYYY-MM-DD HH:mm:ss.SSS Z";

const convertDateToISO = (dateString: any) => {
  return dayjs(dateString, format).utc().format();
};

const parseDateDDMMYYYY = (dateString: string) => {
  if (!dayjs(dateString).isValid()) {
    return dateString;
  }

  const date = new Date(dateString);
  return dayjs(date).format("DD/MM/YYYY");
};

const parseDateMMM = (dateString: string) => {
  return dayjs(dateString).format("MMM");
};

const parseDateMMMD = (dateString: string) => {
  return dayjs(dateString).format("MMM D");
};

const parseDateDay = (dateString: string) => {
  const date = new Date(dateString);
  return dayjs(date).format("DD");
};
const parseDateHour = (dateString: string) => {
  const date = new Date(dateString);
  return dayjs(date).format("HH:mm");
};
const parseSecond = (dateString: string) => {
  const date = new Date(dateString);
  return dayjs(date).format("ss");
};

const parseSecondHour = (dateNumber: number) => {
  return dayjs.duration(dateNumber ?? 0, "seconds").format("HH[h]mm");
};

const parseTimeToSeconds = (dateString: string) => {
  const [hours, minutes, seconds] = dateString.split(":").map(parseFloat);
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  return totalSeconds;
};

function parseDueDate(inputDate: string) {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const offset = -date.getTimezoneOffset() / 60;
  const offsetStr =
    (offset >= 0 ? "+" : "-") + Math.abs(offset).toString().padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}${offsetStr}:00`;
}

export {
  parseDateDDMMYYYY,
  parseDateMMM,
  parseDateDay,
  parseDateHour,
  parseSecond,
  parseSecondHour,
  parseTimeToSeconds,
  parseDateMMMD,
  parseDueDate,
  convertDateToISO,
};
