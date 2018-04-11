import {
  FETCH_PLAYERS_BEGIN,
  FETCH_PLAYERS_SUCCESS,
  FETCH_PLAYERS_FAILURE,
  UPDATE_PLAYERS_COUNTS
} from '../actions/playerActions';

const initialState = {
  players: [],
  loading: false,
  error: null,
  currentPlayer: '',
  waitingCounts: 0,
  offlineCounts: 0,
  playingCounts: 0,
  showModal: false
};

const players = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PLAYERS_COUNTS:
      return {
        ...state,
        ...action.payload
      };
    case FETCH_PLAYERS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_PLAYERS_SUCCESS:
      return {
        ...state,
        loading: false,
        players: action.payload.players
      };

    case FETCH_PLAYERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        players: []
      };
    default:
      return state;
  }
}

export default players;
