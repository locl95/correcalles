import React, { useState } from 'react';
import { Summoner } from '../App';
import MatchesList from './MatchesList';
import { Progress } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, LinkOutlined } from '@ant-design/icons';

const SummonerItem: React.FC<{summoner: Summoner, type: string}> = ({ summoner, type }) => {

  const [visible, setVisible] = useState(false);

  return (
    <div className="row border-5-blue">
      <div className="headrow blue" onClick={() => setVisible(!visible)}>
        <div className='col icon-image flex-start-lineal'>
          <img 
            src={`https://ddragon.leagueoflegends.com/cdn/14.11.1/img/profileicon/${summoner.summonerIcon}.png`}
            alt='icon'
          /><span>{summoner.summonerName}</span>
        </div>
        <div className="col">{type === `FLEX` ? summoner.leagues.RANKED_FLEX_SR.tier + ` ` + summoner.leagues.RANKED_FLEX_SR.rank : 
                                  summoner.leagues.RANKED_SOLO_5x5.tier + ` ` + summoner.leagues.RANKED_SOLO_5x5.rank}</div>
        <div className="col">{type === `FLEX` ? summoner.leagues.RANKED_FLEX_SR.leaguePoints : summoner.leagues.RANKED_SOLO_5x5.leaguePoints}LP</div>
        <div className="col">{type === `FLEX` ? summoner.leagues.RANKED_FLEX_SR.gamesPlayed : summoner.leagues.RANKED_SOLO_5x5.gamesPlayed} games</div>
        <Progress strokeColor="#00b120" strokeLinecap="butt" className="col" type="circle" size={60} percent={(Math.floor(type === `FLEX` ? summoner.leagues.RANKED_FLEX_SR.winrate * 100 : summoner.leagues.RANKED_SOLO_5x5.winrate * 100))} />
        <div className="icon-line">
          <div className="icon-button op-gg" onClick={(e) => {
            e.stopPropagation();
            window.open(`https://www.op.gg/summoners/euw/${summoner.summonerName}-EUW`, '_blank')}
          }><img src={`/icons/op.jpeg`} /></div>
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
