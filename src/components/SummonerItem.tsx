import React, { useState } from 'react';
import { SimplifiedSummoner } from '../App';
import MatchesList from './MatchesList';
import { Progress } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, RiseOutlined, FallOutlined } from '@ant-design/icons';

const SummonerItem: React.FC<{summoner: SimplifiedSummoner, ccRank: number, maxGames: number, ddversion: string, LPdiff: number}> = ({ summoner, ccRank, maxGames, ddversion, LPdiff }) => {

  const [visible, setVisible] = useState(false);
  const tier = summoner.ranked.tier;
  const rank = summoner.ranked.rank;
  const leaguePoints = summoner.ranked.leaguePoints;
  const gamesPlayed = summoner.ranked.gamesPlayed;
  const winrate = summoner.ranked.winrate;

  return (
    <div className="row border-5-blue">
      <div className="headrow blue" onClick={() => setVisible(!visible)}>
        <div className='col small-col'>{ccRank}</div>
        <div className='col icon-image flex-start-lineal'>
          <img className="summoner-icon"
            src={`https://ddragon.leagueoflegends.com/cdn/${ddversion}/img/profileicon/${summoner.summonerIcon}.png`}
            alt='icon'
          /><span>{summoner.summonerName}</span>
        </div>
        <div className='col icon-image max-w-100'>{summoner.summonerLevel}</div>
        <div className="col col-tier min-w-300">
          <img className="tier-img" src={`/icons/${tier.toLocaleLowerCase()}.webp`} alt={tier} />
          <div className="tier">{tier + ` ` + rank + ` - ` + leaguePoints + ` LP`} </div>
          <div className="LPdiff m-l-20">{LPdiff === 0 ? `` : (LPdiff > 0 ? <RiseOutlined /> : <FallOutlined />)}
                                    <span>{LPdiff === 0 ? `±` : (LPdiff > 0 ? `+` : `-`)}{LPdiff}</span></div>
        </div>
        <div className="col flex-center-align progress-games"><span>{gamesPlayed}</span>
          <Progress strokeLinecap="butt" percent={(Math.floor(gamesPlayed/maxGames * 100))} strokeColor='#1677ff' showInfo={false} />
        </div>
        <Progress strokeColor={winrate<0.5 ? "#b30000" : "#00b120"} strokeWidth={15} strokeLinecap="butt" className="col" type="circle" size={60} percent={(Math.floor(winrate * 100))} />
        <div className="icon-line">
          <div className="icon-button op-gg" onClick={(e) => {
            e.stopPropagation();
            window.open(`https://www.op.gg/summoners/euw/${summoner.summonerName}-${summoner.summonerTag}`, '_blank')}
          }><img src={`/icons/op.jpeg`} alt="op.gg"/></div>
          {!visible && <div className="icon-button" onClick={() => setVisible(!visible)}><CaretDownOutlined /></div>}
          {visible && <div className="icon-button" onClick={() => setVisible(!visible)}><CaretUpOutlined /></div>}
        </div>
      </div>
      {visible && <div className="summonerContent">
        <MatchesList item={summoner.ranked} />
      </div>}
    </div>
  );
}

export default SummonerItem;
