import axios from 'axios';

export const FETCH_ROOMS_BEGIN = 'FECTH_ROOMS_BEGIN';
export const FETCH_ROOMS_SUCCESS = 'FETCH_ROOMS_SUCCESS';
export const FETCH_ROOMS_FAILURE = 'FETCH_ROOMS_FAILURE';
export const UPDATE_ROOMS_FILTER = 'UPDATE_ROOMS_FILTER';
export const AGREGATE_ROOMS = 'AGREGATE_ROOMS';
// export const UPDATE_CURRENT_COUNT = 'UPDATE_CURRENT_COUNT';
// export const INCREASE_TIME = 'INCREASE_TIME';

// export const increaseTime = () => ({
//   type: INCREASE_TIME
// });
// export const updateCurrentCount = (count) => ({
//   type: UPDATE_CURRENT_COUNT,
//   payload: { count }
// })

export const agregateRooms = (rooms) => ({
  type: AGREGATE_ROOMS,
  payload: { rooms }
});

export const updateRoomsFilter = (filter) => ({
  type: UPDATE_ROOMS_FILTER,
  payload: { filter }
});

export const fetchRoomsBegin = () => ({
  type: FETCH_ROOMS_BEGIN
})

export const fetchRoomsSuccess = (rooms) => ({
  type: FETCH_ROOMS_SUCCESS,
  payload: { rooms }
});

export const fetchRoomsFailure = (error) => ({
  type: FETCH_ROOMS_FAILURE,
  payload: { error }
});

export const fetchRooms = () => async dispatch => {
  dispatch(fetchRoomsBegin());
  try {
    const rooms = await axios.get('/api/rooms');
    dispatch(fetchRoomsSuccess(rooms.data));
  } catch (error) {
    dispatch(fetchRoomsFailure(error));
  }
}
