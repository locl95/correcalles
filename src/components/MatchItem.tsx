import React, { useState } from 'react';
import { Match } from '../App';
import { Progress } from 'antd';

const MatchItem: React.FC<{match: Match}> = ({ match }) => {

  const [visible, setVisible] = useState(false);

  const kda = match.deaths !== 0 ? (match.kills+match.assists)/match.deaths : -1;

  return (
    <div className="matchItem">
      <div className={`matchHead ${match.win ? "green" : "red"}`} onClick={() => setVisible(!visible)}>
        <div color="blue">{match.championId}</div>
        <div color="blue">{match.individualPosition}</div>
        <div color={(kda === -1 || kda > 5) ? "green" : kda > 2 ? "orange" : "red"}>{match.kills+'/'+match.deaths+'/'+match.assists}</div>
        <div color={(kda === -1 || kda > 5) ? "green" : kda > 2 ? "orange" : "red"}>{match.kills+'/'+match.deaths+'/'+match.assists}</div>
        {kda === -1 ? <div color="green">Perfect KDA</div> : <div color="green">{Math.round(kda * 100) / 100}</div>}
      </div>
      {visible && <div className="matchContent">
        <div className="pings">
          <div className="missing">
            {match.enemyMissingPings} ???
          </div>
          <div className="assist">
            {match.assistMePings} help
          </div>
        </div>
        <div className="wards">{match.wardsPlaced}/{match.visionWardsBoughtInGame}</div>
        <Progress strokeColor="grey" percent={Math.floor((match.totalTimeSpentDead/match.gameDuration)*100)} />
      </div>}
    </div>
  );
}

export default MatchItem;
