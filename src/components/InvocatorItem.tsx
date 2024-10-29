import React, { useState } from 'react';
import { Invocator } from '../App';
import MatchesList from './MatchesList';
import { Flex, Progress, Tag } from 'antd';

const InvocatorItem: React.FC<{invocator: Invocator, type: string}> = ({ invocator, type }) => {

  const [visible, setVisible] = useState(false);

  return (
    <div className="invocatorItem">
      <div className="invocatorHead" onClick={() => setVisible(!visible)}>
        <div className='icon-image'>
          <img 
            src={`https://ddragon.leagueoflegends.com/cdn/14.11.1/img/profileicon/${invocator.summonerIcon}.png`}
            alt='icon'
          />
        </div>
        <div>{invocator.summonerName}</div>
        <div>{type === `FLEX` ? invocator.leagues.RANKED_FLEX_SR.tier + ` ` + invocator.leagues.RANKED_FLEX_SR.rank : 
                                  invocator.leagues.RANKED_SOLO_5x5.tier + ` ` + invocator.leagues.RANKED_SOLO_5x5.rank}</div>
        <div>{type === `FLEX` ? invocator.leagues.RANKED_FLEX_SR.leaguePoints : invocator.leagues.RANKED_SOLO_5x5.leaguePoints}LP</div>
        <div>{type === `FLEX` ? invocator.leagues.RANKED_FLEX_SR.gamesPlayed : invocator.leagues.RANKED_SOLO_5x5.gamesPlayed} games</div>
        <Progress type="circle" size={60} percent={(Math.floor(type === `FLEX` ? invocator.leagues.RANKED_FLEX_SR.winrate * 100 : invocator.leagues.RANKED_SOLO_5x5.winrate * 100))} />
      </div>
      {visible && <div className="invocatorContent">
        {type == `FLEX` ? <MatchesList item={invocator.leagues.RANKED_FLEX_SR} /> :
                                      <MatchesList item={invocator.leagues.RANKED_SOLO_5x5} />}
      </div>}
    </div>
  );
}

export default InvocatorItem;
