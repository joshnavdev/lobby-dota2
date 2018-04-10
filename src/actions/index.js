import axios from 'axios';

export const fetchPlayers = () => async dispatch => {
  const res = await axios.get('/api/players');
  dispatch({ type: 'FETCH_PLAYERS', payload: res.data })
}

export const fetchPlayer = (playerId) => {
  type: 'FETCH_PLAYER',
  playerId
}
