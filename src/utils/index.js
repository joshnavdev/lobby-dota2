const formatTime = (number) => {
  return `${number < 10 ? 0 : ''}${number}`
}

export const parseTime = (number) => {
  const minutes = Math.trunc(number / 60);
  const seconds = number % 60;
  return `${formatTime(minutes)}:${formatTime(seconds)}`;
}
