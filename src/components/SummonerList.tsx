import React from 'react';
import { Summoner } from '../App';
import SummonerItem from './SummonerItem';

const SummonerList: React.FC<{data: Summoner[], type: string}> = ({ data, type }) => {
  const ranks = ["CHALLENGER", "GRANDMASTER", "MASTER", "DIAMOND", "EMERALD", "PLATINUM", "GOLD", "SILVER", "BRONZE", "IRON", "UNRANKED"];
  const divisions = ["I", "II", "III", "IV", "V"];

  data.sort((a, b) => {
    if (type === `FLEX`){
      const tierDiff = ranks.indexOf(a.leagues.RANKED_FLEX_SR.tier) - ranks.indexOf(b.leagues.RANKED_FLEX_SR.tier);
      if (tierDiff !== 0) return tierDiff;
      const rankDiff = divisions.indexOf(a.leagues.RANKED_FLEX_SR.rank) - divisions.indexOf(b.leagues.RANKED_FLEX_SR.rank);
      if (rankDiff !== 0) return rankDiff;
      return a.leagues.RANKED_FLEX_SR.leaguePoints - b.leagues.RANKED_FLEX_SR.leaguePoints;
    }
    else {
      const tierDiff = ranks.indexOf(a.leagues.RANKED_SOLO_5x5.tier) - ranks.indexOf(b.leagues.RANKED_SOLO_5x5.tier);
      if (tierDiff !== 0) return tierDiff;
      const rankDiff = divisions.indexOf(a.leagues.RANKED_SOLO_5x5.rank) - divisions.indexOf(b.leagues.RANKED_SOLO_5x5.rank);
      if (rankDiff !== 0) return rankDiff;
      return a.leagues.RANKED_SOLO_5x5.leaguePoints - b.leagues.RANKED_SOLO_5x5.leaguePoints;
    }
  });

  return (
    <div className="list"> 
      <div className="headrow turkish"> 
        <div className="col">Summoner</div>
        <div className="col">Rank</div>
        <div className="col">LP</div>
        <div className="col">Games</div>
        <div className="col">Winrate</div>
      </div>
      {data.map((summoner) => {
         return (
          <SummonerItem key={summoner.summonerName} summoner={summoner} type={type} />
         )
      })}
  </div>
  );
}

export default SummonerList;
