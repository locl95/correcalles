import React, { useState } from 'react';
import { Match } from '../pages/View';
import PopUp from "../small-components/PopUp";

const MatchItem: React.FC<{summonerName: string, match: Match, ddversion: string}> = ({ summonerName, match, ddversion }) => {

  const [visible, setVisible] = useState(false);

  const kda = match.deaths !== 0 ? (match.kills+match.assists)/match.deaths : 9999;

  const matchUpKda = match.matchUp && match.matchUp.deaths !== 0 ? (match.matchUp.kills+match.matchUp.assists)/match.matchUp.deaths : 9999;

  return (
    <>
      <div className={`match-item ${match.gameFinishedCorrectly && match.gameDuration > 300 ? (match.win ? "green" : "red") : "grey"}`} onClick={() => setVisible(!visible)}>
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
      <PopUp className="popup-match" isVisible={visible} onClose={() => setVisible(false)}>
        <h2 className="popup-title font-white">{match.win ? "Victory" : "Defeat"}</h2>
        <div className="popup-player-container">
          <div className="popup-player">
            <p className="font-white">{summonerName}</p>
            <div className="popup-image">
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/${ddversion}/img/champion/${match.championName}.png`}
                alt={match.championName}
              />
            </div>
            <div className="font-white">
              {match.kills + "/" + match.deaths + "/" + match.assists}
            </div>
            <div className={`${kda < 2 ? "font-red" : kda < 5 ? "font-orange" : "font-green"}`}>
              {kda === 9999 ? "Perf" : kda.toFixed(2) + ":1"}
            </div>
          </div>
          <div className="popup-logo">
            <img src="/icons/VS.webp" alt="VS Logo" />
          </div>
          {match.matchUp && <div className="popup-player">
            <p className="font-white">Opponent</p>
            <div className="popup-image">
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/${ddversion}/img/champion/${match.matchUp.championName}.png`}
                alt={match.matchUp.championName}
              />
            </div>
            <div className="font-white">
              {match.matchUp.kills + "/" + match.matchUp.deaths + "/" + match.matchUp.assists}
            </div>
            <div className={`${matchUpKda < 2 ? "font-red" : matchUpKda < 5 ? "font-orange" : "font-green"}`}>
              {matchUpKda === 9999 ? "Perf" : matchUpKda.toFixed(2) + ":1"}
            </div>
          </div>}
        </div>  
        <p className="font-white">More details coming soon!</p>
      </PopUp>
    </>
  );
}

export default MatchItem;
