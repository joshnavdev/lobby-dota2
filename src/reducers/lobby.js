import {
  FETCH_ROOMS_BEGIN,
  FETCH_ROOMS_SUCCESS,
  FETCH_ROOMS_FAILURE,
  UPDATE_ROOMS_FILTER,
  AGREGATE_ROOMS,
  // UPDATE_CURRENT_COUNT,
  // INCREASE_TIME
} from '../actions/lobbyActions';
import { getDataFiltered } from '../utils';

const initialState = {
  rooms: [],
  filter: 'playing',
  showModal: false,
  currentRoom: '',
  currentCount: 0,
  loading: false,
  error: null
};

const lobby = (state = initialState, action) => {
  switch (action.type) {
    // case INCREASE_TIME:
    //   return {
    //     ...state,
    //     rooms: state.rooms.map(room => {
    //       if (room.status === 'playing') {
    //         return {
    //           ...room,
    //           time: room.time + 1
    //         }
    //       }
    //       return room;
    //     })
    //   }
    // case UPDATE_CURRENT_COUNT:
    //   return {
    //     ...state,
    //     currentCount: action.payload.count
    //   };
    case AGREGATE_ROOMS: {
      const { rooms } = action.payload;
      return {
        ...state,
        rooms: [...state.rooms, ...rooms],
        currentCount: getDataFiltered(rooms, state.filter, 'status').length
      }
    }
    case FETCH_ROOMS_BEGIN:
      return {
        ...state,
        loading: true
      };

    case FETCH_ROOMS_SUCCESS: { //PARA IMPLEMENTAR
      const { rooms } = action.payload;
      console.log('LENGTH->', getDataFiltered(rooms, state.filter, 'status').length)
      return {
        ...state,
        loading: false,
        rooms: rooms,
        currentCount: getDataFiltered(rooms, state.filter, 'status').length
      };
    }

    case FETCH_ROOMS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    case UPDATE_ROOMS_FILTER: {
      const { filter } = action.payload;
      return {
        ...state,
        filter: filter,
        currentCount: getDataFiltered(state.rooms, filter, 'status').length
      };
    }

    default:
      return { ...state }
  }
};

export default lobby;
