import React, { useState } from 'react';
import { SimplifiedSummoner } from '../pages/View';
import SummonerContent from './SummonerContent';
import { Progress } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, RiseOutlined, FallOutlined } from '@ant-design/icons';

const SummonerItem: React.FC<{summoner: SimplifiedSummoner, ccRank: number, maxGames: number, ddversion: string}> = ({ summoner, ccRank, maxGames, ddversion }) => {

  const [visible, setVisible] = useState(false);
  const tier = summoner.ranked.tier;
  const rank = summoner.ranked.rank;
  const leaguePoints = summoner.ranked.leaguePoints;
  const gamesPlayed = summoner.ranked.gamesPlayed;
  const winrate = summoner.ranked.winrate;
  const LPdiff = summoner.LPdiff;

  return (
    <li className="list-item">
      <div className="row bg-light-black mt-5 clickable hide-mobile" onClick={() => setVisible(!visible)}>
        <div className='col max-w-20'>{ccRank}</div>
        <div className='col icon-image flex-start-lineal'>
          <img className="summoner-icon"
            src={`https://ddragon.leagueoflegends.com/cdn/${ddversion}/img/profileicon/${summoner.summonerIcon}.png`}
            alt='icon'
          /><span>{summoner.summonerName}</span>
        </div>
        <div className='col icon-image max-w-60'>{summoner.summonerLevel}</div>
        <div className="col col-tier min-w-300">
          <img className="tier-img" src={`/icons/${tier.toLocaleLowerCase()}.webp`} alt={tier} />
          <div className="tier">{tier + ` ${(tier === 'GRANDMASTER' || tier === 'MASTER' || tier === 'CHALLENGER') ? '' : rank} - ` + leaguePoints + ` LP`} </div>
        </div>
        <div className="col col-tier max-w-100">
          <div className="LPdiff">{LPdiff === 0 ? `` : (LPdiff > 0 ? <RiseOutlined /> : <FallOutlined />)}
                                    <span>{LPdiff > 0 ? `+` : ``}{LPdiff !== 0 && LPdiff}</span></div>
        </div>
        <div className="col flex-center-align progress-games"><span>{gamesPlayed}</span>
          <Progress strokeLinecap="butt" percent={(Math.floor(gamesPlayed/maxGames * 100))} strokeColor='#1677ff' showInfo={false} />
        </div>
        <Progress strokeColor={winrate<0.5 ? "#a30006" : "#029e2b"} strokeWidth={12} strokeLinecap="butt" className="col" type="circle" size={60} percent={(Math.floor(winrate * 100))} />
        <div className="icon-line">
          <div className="icon-button op-gg" onClick={(e) => {
            e.stopPropagation();
            window.open(`https://www.op.gg/summoners/euw/${summoner.summonerName}-${summoner.summonerTag}`, '_blank')}
          }><img src={`/icons/op.jpeg`} alt="op.gg"/></div>
          {!visible && <div className="icon-button" onClick={() => setVisible(!visible)}><CaretDownOutlined /></div>}
          {visible && <div className="icon-button" onClick={() => setVisible(!visible)}><CaretUpOutlined /></div>}
        </div>
      </div>
      <div className="row-mobile bg-light-black mt-5 show-mobile" onClick={() => setVisible(!visible)}>
        <div className='col max-w-40'>{ccRank}</div>
        <div className='col'>
          <div className='col-line'>
            <div className='summoner-icon'>
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/${ddversion}/img/profileicon/${summoner.summonerIcon}.png`}
                alt='icon'
              /><span>{summoner.summonerName}</span>
              </div>
            <img className="tier-img" src={`/icons/${tier.toLocaleLowerCase()}.webp`} alt={tier} />
          </div>
          <div className="col-line">
            <div className="tier">{tier + ` ${(tier === 'GRANDMASTER' || tier === 'MASTER' || tier === 'CHALLENGER') ? '' : rank} - ` + leaguePoints + ` LP`} </div>
          </div>
          <Progress strokeColor={winrate<0.5 ? "#a30006" : "#029e2b"} strokeWidth={15} strokeLinecap="butt" className="col" percent={(Math.floor(winrate * 100))} />
        </div>
      </div>
      {visible && 
        <SummonerContent summonerName={summoner.summonerName} item={summoner.ranked} ddversion={ddversion} />
      }
    </li>
  );
}

export default SummonerItem;
