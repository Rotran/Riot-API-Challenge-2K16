const initState = {
  championId: 0,
  championName: '',
};


const championReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_CHAMPION_INFO':
      return action;
    default:
      return state;
  }
};

export default championReducer;
