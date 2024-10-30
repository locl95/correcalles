import React, { useState } from 'react';
import { Match } from '../App';
import { Progress } from 'antd';
import { QuestionCircleOutlined, WarningOutlined, BulbOutlined } from '@ant-design/icons';

const MatchItem: React.FC<{match: Match}> = ({ match }) => {

  const [visible, setVisible] = useState(false);

  const kda = match.deaths !== 0 ? (match.kills+match.assists)/match.deaths : 9999;

  return (
    <div className="row">
      <div className={`headrow ${match.win ? "green" : "red"}`} onClick={() => setVisible(!visible)}>
        <div className='col icon-image'>
          <img className='small-img'
            src={`https://ddragon.leagueoflegends.com/cdn/14.11.1/img/champion/${match.championName}.png`}
            alt={match.championName}
          />
        </div>
        <div className="col icon-image">
          <img className='small-img'
            src={`/icons/${match.individualPosition.toLocaleLowerCase()}.svg`}
            alt={match.individualPosition}
          />
          
        </div>
        <div className="col font-grey">{match.kills+'/'+match.deaths+'/'+match.assists}</div>
        <div className={`col ${kda<2 ? `font-red` : (kda<5 ? `font-orange` : `font-green`)}`}>{kda === 9999 ? `Perfect KDA` : kda.toFixed(2)}</div>
      </div>
      {visible && <div className="resume grey">
        <div className="col"><QuestionCircleOutlined /> {match.enemyMissingPings}</div>
        <div className="col"><WarningOutlined /> {match.assistMePings}</div>
        <div className="col"><BulbOutlined /> {match.wardsPlaced}/{match.visionWardsBoughtInGame}</div>
        <div className="col"><span>RIP TIME</span><Progress size={[50, 15]} className="col" type="circle" strokeColor="grey" percent={Math.floor((match.totalTimeSpentDead/match.gameDuration)*100)} /></div>
      </div>}
    </div>
  );
}

export default MatchItem;
