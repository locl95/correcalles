import React, { useState } from 'react';
import { Match } from '../pages/View';

const MatchItem: React.FC<{match: Match, ddversion: string}> = ({ match, ddversion }) => {

  const [visible, setVisible] = useState(false);

  const kda = match.deaths !== 0 ? (match.kills+match.assists)/match.deaths : 9999;

  return (
    <div className={`match-item ${match.win ? "green" : "red"}`} onClick={() => setVisible(!visible)}>
      <div className='col icon-image'>
        <img className='small-img'
          src={`https://ddragon.leagueoflegends.com/cdn/${ddversion}/img/champion/${match.championName}.png`}
          alt={match.championName}
        />
      </div>
      <div className="col icon-image">
        <img className='small-img'
          src={`/icons/${match.individualPosition.toLocaleLowerCase()}.svg`}
          alt={match.individualPosition}
        />
        
      </div>
      <div className="col font-white">{match.kills+'/'+match.deaths+'/'+match.assists}</div>
      <div className={`col ${kda<2 ? `font-red` : (kda<5 ? `font-orange` : `font-green`)}`}>{kda === 9999 ? `Perf` : kda.toFixed(2) + `:1`}</div>
    </div>
  );
}

export default MatchItem;
