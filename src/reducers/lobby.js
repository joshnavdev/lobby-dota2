import {
  FETCH_ROOMS_BEGIN,
  FETCH_ROOMS_SUCCESS,
  FETCH_ROOMS_FAILURE,
  UPDATE_ROOMS_FILTER,
  AGREGATE_ROOMS,
  // INCREASE_TIME
} from '../actions/lobbyActions';

const initialState = {
  rooms: [],
  filter: 'playing',
  showModal: false,
  currentRoom: '',
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
    case AGREGATE_ROOMS:
      return {
        ...state,
        rooms: [...state.rooms, ...action.payload.rooms]
      }
    case FETCH_ROOMS_BEGIN:
      return {
        ...state,
        loading: true
      };
    
    case FETCH_ROOMS_SUCCESS:
      return {
        ...state,
        loading: false,
        rooms: action.payload.rooms
      };

    case FETCH_ROOMS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    case UPDATE_ROOMS_FILTER:
      return {
        ...state,
        filter: action.payload.filter
      };

    default:
      return { ...state }
  }
};

export default lobby;
