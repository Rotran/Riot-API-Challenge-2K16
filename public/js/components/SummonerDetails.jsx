import React from 'react';
import ChampionIcon from './ChampionIcon';
import moment from 'moment';

const SummonerDetails = () => {
  const level = this.props.championMastery.level;
  return (
    <div className="detailsContainer">
      <ChampionIcon champion={this.props.champion} />
      <div className="details champName">{this.props.champion.name}</div>
      <div className="mastery">{level}</div>
      <div className="mastery">{this.props.championMastery.points}</div>
      <div className="mastery">{level === 5 ? this.props.championMastery.championPointsSinceLastLevel : ''}</div>
      <div className="mastery">{level < 5 ? this.props.championMastery.championPointsUntilNextLevel : ''}</div>
      <div className="mastery">{this.props.isPro ? this.props.championMastery.chestGranted : ''}</div>
      <div className="mastery">{this.props.championMastery.highestGrade}</div>
      <div className="mastery">{moment(this.props.championMastery.lastPlayTime).toString()}</div>
    </div>
  ); };

SummonerDetails.propTypes = {
  champion: React.PropTypes.object.isRequired,
  championMastery: React.PropTypes.object.isRequired,
  isPro: React.PropTypes.boolean,
};
export default SummonerDetails;
