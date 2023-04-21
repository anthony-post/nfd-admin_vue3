//конвертирование даты из миллисекунд в дни/часы/минуты
export const convertToDays = (milliSeconds) => {
  let days = Math.floor(milliSeconds / (86400 * 1000));
  milliSeconds -= days * (86400 * 1000);

  let hours = Math.floor(milliSeconds / (60 * 60 * 1000));
  milliSeconds -= hours * (60 * 60 * 1000);

  let minutes = Math.floor(milliSeconds / (60 * 1000));

  return {
    days,
    hours,
    minutes,
  };
};
