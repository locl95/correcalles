import React, { useState } from 'react';
import { Summoner } from '../App';
import MatchesList from './MatchesList';
import { Progress } from 'antd';

const SummonerItem: React.FC<{summoner: Summoner, type: string}> = ({ summoner, type }) => {

  const [visible, setVisible] = useState(false);

  return (
    <div className="row">
      <div className="headrow blue" onClick={() => setVisible(!visible)}>
        <div className='col icon-image'>
          <img 
            src={`https://ddragon.leagueoflegends.com/cdn/14.11.1/img/profileicon/${summoner.summonerIcon}.png`}
            alt='icon'
          /><span>{summoner.summonerName}</span>
        </div>
        <div className="col">{type === `FLEX` ? summoner.leagues.RANKED_FLEX_SR.tier + ` ` + summoner.leagues.RANKED_FLEX_SR.rank : 
                                  summoner.leagues.RANKED_SOLO_5x5.tier + ` ` + summoner.leagues.RANKED_SOLO_5x5.rank}</div>
        <div className="col">{type === `FLEX` ? summoner.leagues.RANKED_FLEX_SR.leaguePoints : summoner.leagues.RANKED_SOLO_5x5.leaguePoints}LP</div>
        <div className="col">{type === `FLEX` ? summoner.leagues.RANKED_FLEX_SR.gamesPlayed : summoner.leagues.RANKED_SOLO_5x5.gamesPlayed} games</div>
        <Progress className="col" type="circle" size={60} percent={(Math.floor(type === `FLEX` ? summoner.leagues.RANKED_FLEX_SR.winrate * 100 : summoner.leagues.RANKED_SOLO_5x5.winrate * 100))} />
      </div>
      {visible && <div className="summonerContent">
        {type === `FLEX` ? <MatchesList item={summoner.leagues.RANKED_FLEX_SR} /> :
                                      <MatchesList item={summoner.leagues.RANKED_SOLO_5x5} />}
      </div>}
    </div>
  );
}

export default SummonerItem;
