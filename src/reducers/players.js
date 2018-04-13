import lodash from 'lodash';
import {
  FETCH_PLAYERS_BEGIN,
  FETCH_PLAYERS_SUCCESS,
  FETCH_PLAYERS_FAILURE,
  UPDATE_PLAYERS_COUNTS,
  UPDATE_PLAYERS
} from '../actions/playerActions';
import { getNewCount } from '../utils';

const initialState = {
  players: [],
  loading: false,
  error: null,
  currentPlayer: '',
  offlineCount: 0,
  onlineCount: 0,
  searchingCount: 0,
  waitingCount: 0,
  playingCount: 0,
  showModal: false
};

const players = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PLAYERS: {
      const { players } = action.payload;
      const newPlayers = lodash.unionBy(players, state.players, '_id');
      const newCounts = getNewCount(newPlayers);
      return ({
        ...state,
        ...newCounts,
        players: newPlayers
      });
    }
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
