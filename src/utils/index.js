const formatTime = (number) => {
  return `${number < 10 ? 0 : ''}${number}`
}

export const parseTime = (number) => {
  const minutes = Math.trunc(number / 60);
  const seconds = number % 60;
  return `${formatTime(minutes)}:${formatTime(seconds)}`;
}

export const getDataFiltered = (data=[], filter, atribute) => {
  if (data.length === 0) return [];
  if (filter === 'all') return data;
  return data.filter(d => d[atribute] === filter);
}

export const getNewCount = (players) => {
  const newCount = {
    offline: 0,
    online: 0,
    searching: 0,
    waiting: 0,
    playing: 0,
  };
  players.forEach(player => {
    newCount[player.status] = (newCount[player.status] + 1 || 0)
  });
  console.log('COUNT ->', newCount);
  return ({
    offlineCount: newCount.offline,
    onlineCount: newCount.online,
    searchingCount: newCount.searching,
    waitingCount: newCount.waiting,
    playingCount: newCount.playing
  });
}
