const formatTime = (number) => {
  return `${number < 10 ? 0 : ''}${number}`
}

export const parseTime = (number) => {
  if(number === undefined) {
    return '--:--'
  }
  const minutes = Math.trunc(number / 60);
  const seconds = number % 60;
  return `${formatTime(minutes)}:${formatTime(seconds)}`;
}

export const getDataFiltered = (data=[], filter, atribute) => {
  if (data.length === 0) return [];
  if (filter === 'all') return data;
  return data.filter(d => d[atribute] === filter);
}
