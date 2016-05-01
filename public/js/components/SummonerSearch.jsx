import React from 'react';

const SummonerSearch = () => (
  <div className="summonerName">
    <form className="summonerNameForm">
      <input type="text" name="summonername" placeholder="Please enter your summoner name!" />
      <input type="submit" name="summonerNameSubmit" />
    </form>
  </div>
);

SummonerSearch.propTypes = {
  summonerName: React.PropTypes.string,
};

export default SummonerSearch;
