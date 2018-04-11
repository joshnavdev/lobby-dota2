import { combineReducers } from 'redux';
import players from './players';
import lobby from './lobby';

export default combineReducers({
  players,
  lobby
});
