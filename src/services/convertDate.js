//конвертирование даты из миллисекунд в формат DD.MM.YY HH:MM
export const convertToDate = (mlsDate) => {

  let mls = mlsDate;

  if (typeof mlsDate === "string") {
    mls = +mlsDate;
  } else {
    mls = mlsDate;
  }

  const dateObj = new Date(mls);

  let dd = dateObj.getDate();
  if (dd < 10) dd = "0" + dd;

  let mm = dateObj.getMonth() + 1;
  if (mm < 10) mm = "0" + mm;

  let yy = dateObj.getFullYear();
  if (yy < 10) yy = "0" + yy;

  let hh = dateObj.getHours();
  if (hh < 10) hh = "0" + hh;

  let min = dateObj.getMinutes();
  if (min < 10) min = "0" + min;

  return dd + "." + mm + "." + yy + " " + hh + ":" + min;
};
