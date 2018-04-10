const players = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_PLAYERS':
      return action.payload || false;
    case 'FETCH_PLAYER':
    default:
      return state;
  }
}

export default players;
