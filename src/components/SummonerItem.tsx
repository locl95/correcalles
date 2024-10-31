import React, { useState } from 'react';
import { Summoner } from '../App';
import MatchesList from './MatchesList';
import { Progress } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';

const SummonerItem: React.FC<{summoner: Summoner, type: string, ccRank: number, maxGames: number}> = ({ summoner, type, ccRank, maxGames }) => {

  const [visible, setVisible] = useState(false);
  const tier = type === `FLEX` ? summoner.leagues.RANKED_FLEX_SR.tier : summoner.leagues.RANKED_SOLO_5x5.tier;
  const rank = type === `FLEX` ? summoner.leagues.RANKED_FLEX_SR.rank : summoner.leagues.RANKED_SOLO_5x5.rank;
  const leaguePoints = type === `FLEX` ? summoner.leagues.RANKED_FLEX_SR.leaguePoints : summoner.leagues.RANKED_SOLO_5x5.leaguePoints;
  const gamesPlayed = type === `FLEX` ? summoner.leagues.RANKED_FLEX_SR.gamesPlayed : summoner.leagues.RANKED_SOLO_5x5.gamesPlayed;
  const winrate = type === `FLEX` ? summoner.leagues.RANKED_FLEX_SR.winrate : summoner.leagues.RANKED_SOLO_5x5.winrate;

  return (
    <div className="row border-5-blue">
      <div className="headrow blue" onClick={() => setVisible(!visible)}>
        <div className='col small-col'>{ccRank}</div>
        <div className='col icon-image flex-start-lineal'>
          <img className="summoner-icon"
            src={`https://ddragon.leagueoflegends.com/cdn/14.11.1/img/profileicon/${summoner.summonerIcon}.png`}
            alt='icon'
          /><span>{summoner.summonerName}</span>
        </div>
        <div className="col col-tier">
          <img className="tier-img" src={`/icons/${tier.toLocaleLowerCase()}.webp`} alt={tier} />
          <div className="tier">{tier + ` ` + rank + ` - ` + leaguePoints + ` LP`} </div>
          </div>
        <div className="col flex-center-align progress-games"><span>{gamesPlayed}</span>
          <Progress strokeLinecap="butt" percent={(Math.floor(gamesPlayed/maxGames * 100))} strokeColor='#1677ff' showInfo={false} />
        </div>
        <Progress strokeColor={winrate<0.5 ? "#b30000" : "#00b120"} strokeWidth={15} strokeLinecap="butt" className="col" type="circle" size={60} percent={(Math.floor(winrate * 100))} />
        <div className="icon-line">
          <div className="icon-button op-gg" onClick={(e) => {
            e.stopPropagation();
            window.open(`https://www.op.gg/summoners/euw/${summoner.summonerName}-EUW`, '_blank')}
          }><img src={`/icons/op.jpeg`} alt="op.gg"/></div>
          {!visible && <div className="icon-button" onClick={() => setVisible(!visible)}><CaretDownOutlined /></div>}
          {visible && <div className="icon-button" onClick={() => setVisible(!visible)}><CaretUpOutlined /></div>}
        </div>
      </div>
      {visible && <div className="summonerContent">
        {type === `FLEX` ? <MatchesList item={summoner.leagues.RANKED_FLEX_SR} /> :
                                      <MatchesList item={summoner.leagues.RANKED_SOLO_5x5} />}
      </div>}
    </div>
  );
}

export default SummonerItem;
