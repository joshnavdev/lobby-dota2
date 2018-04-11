import axios from 'axios';

export const FETCH_PLAYERS_BEGIN = 'FETCH_PLAYERS_BEGIN';
export const FETCH_PLAYERS_SUCCESS = 'FETCH_PLAYERS_SUCCESS';
export const FETCH_PLAYERS_FAILURE = 'FETCH_PLAYERS_FAILURE';
export const UPDATE_PLAYERS_COUNTS = 'UPDATE_PLAYERS_COUNTS';

export const updatePlayersCounts = (counts) => ({
  type: UPDATE_PLAYERS_COUNTS,
  payload: { ...counts }
});

export const fetchPlayersBegin = () => ({
  type: FETCH_PLAYERS_BEGIN
});

export const fetchPlayersSucces = players => ({
  type: FETCH_PLAYERS_SUCCESS,
  payload: { players }
});

export const fetchPlayersFailure = error => ({
  type: FETCH_PLAYERS_FAILURE,
  payload: { error }
});

export const fetchPlayers = () => dispatch => {
  dispatch(fetchPlayersBegin());
  axios.get('/api/players')
    .then(resp => {
      const offlineCounts = resp.data.filter(player => player.status === 'offline').length;
      const waitingCounts = resp.data.length - offlineCounts;
      dispatch(fetchPlayersSucces(resp.data));
      dispatch(updatePlayersCounts({offlineCounts, waitingCounts, playingCounts: 0 }));

    })
    .catch(err => dispatch(fetchPlayersFailure(err)));
  // try {
  //   axios
  //   const response = await axios.get('http://localhost:8000/api/players');
  //   console.log(response)
  //   dispatch(fetchPlayersSucces(response.data));
  //   return response.data;
  // } catch (error) {
  //   dispatch(fetchPlayersFailure(error));
  // }
}
