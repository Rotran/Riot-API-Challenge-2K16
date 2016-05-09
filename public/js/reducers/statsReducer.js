const initState = {
  summonerName: '',
  championPoints: 0,
  championLevel: 0,
  championPointsSinceLastLevel: 0,
  championPointsUntilNextLevel: 0,
  chestGranted: false,
  highestGrade: 'D',
  lastPlayTime: '',
};

const stats = (state = initState, action) => {
  switch (action.type) {
    case 'GET_CHAMPION_STATS':  // this needs to issue an api request and then update the state
      return {
        id: action.id,
        text: action.text,
        completed: false,
      };
    case 'SET_SUMMONER_NAME':
      return (action.state.summonerName = action.summonerName);
    default:
      return state;
  }
};

export default stats;
