import React, {useState} from 'react';
import { Summoner } from '../App';
import SummonerItem from './SummonerItem';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';

const SummonerList: React.FC<{data: Summoner[], type: string}> = ({ data, type }) => {
  const [sortby, setSortby] = useState('tier');
  const [isAsc, setIsAsc] = useState(true);

  const ranks = ["CHALLENGER", "GRANDMASTER", "MASTER", "DIAMOND", "EMERALD", "PLATINUM", "GOLD", "SILVER", "BRONZE", "IRON", "UNRANKED"];
  const divisions = ["I", "II", "III", "IV", "V"];

  const compare = (a: Summoner, b: Summoner) => {
    const mult = isAsc ? 1 : -1;
    if (type === `FLEX`){
      if (sortby === `summoner`) {
        return mult * a.summonerName.localeCompare(b.summonerName);
      }
      else if (sortby === `lvl`) {
        return mult * (b.summonerLevel - a.summonerLevel);
      }
      else if (sortby === `tier`) {
        const tierDiff = ranks.indexOf(a.leagues.RANKED_FLEX_SR.tier) - ranks.indexOf(b.leagues.RANKED_FLEX_SR.tier);
        if (tierDiff !== 0) return mult * tierDiff;
        const rankDiff = divisions.indexOf(a.leagues.RANKED_FLEX_SR.rank) - divisions.indexOf(b.leagues.RANKED_FLEX_SR.rank);
        if (rankDiff !== 0) return mult * rankDiff;
        return mult * (b.leagues.RANKED_FLEX_SR.leaguePoints - a.leagues.RANKED_FLEX_SR.leaguePoints)
      }
      else if (sortby === `games`) {
        return mult * (b.leagues.RANKED_FLEX_SR.gamesPlayed - a.leagues.RANKED_FLEX_SR.gamesPlayed)
      }
      else {
        return mult * (b.leagues.RANKED_FLEX_SR.winrate - a.leagues.RANKED_FLEX_SR.winrate)
      }
    }
    else {
      if (sortby === `summoner`) {
        return mult * a.summonerName.localeCompare(b.summonerName);
      }
      else if (sortby === `lvl`) {
        return mult * (b.summonerLevel - a.summonerLevel);
      }
      else if (sortby === `tier`) {
        const tierDiff = ranks.indexOf(a.leagues.RANKED_SOLO_5x5.tier) - ranks.indexOf(b.leagues.RANKED_SOLO_5x5.tier);
        if (tierDiff !== 0) return mult * tierDiff;
        const rankDiff = divisions.indexOf(a.leagues.RANKED_SOLO_5x5.rank) - divisions.indexOf(b.leagues.RANKED_SOLO_5x5.rank);
        if (rankDiff !== 0) return mult * rankDiff;
        return mult * (b.leagues.RANKED_SOLO_5x5.leaguePoints - a.leagues.RANKED_SOLO_5x5.leaguePoints)
      }
      else if (sortby === `games`) {
        return mult * (b.leagues.RANKED_SOLO_5x5.gamesPlayed - a.leagues.RANKED_SOLO_5x5.gamesPlayed)
      }
      else {
        return mult * (b.leagues.RANKED_SOLO_5x5.winrate - a.leagues.RANKED_SOLO_5x5.winrate)
      }
    }
  }

  const handleSort = (a: string) => {
    if (sortby === a) {
      setIsAsc(!isAsc);  
    } else {
      setSortby(a);
      setIsAsc(true);  
    }
  };

  const filteredData = data.filter((summoner) => (type === `FLEX` && summoner.leagues.RANKED_FLEX_SR)||(type === `SOLO` && summoner.leagues.RANKED_SOLO_5x5)).sort(compare)
  const maxGames = type === `FLEX` ? Math.max(...filteredData.map(summoner => summoner.leagues.RANKED_FLEX_SR.gamesPlayed)) : Math.max(...filteredData.map(summoner => summoner.leagues.RANKED_SOLO_5x5.gamesPlayed));

  return (
    <div className="list"> 
      <div className="headrow turkish"> 
        <div className="col cursor-pointer m-r-20" onClick={() => handleSort("summoner")}>Summoner {sortby === `summoner` && (isAsc ? <CaretDownOutlined /> : <CaretUpOutlined />)}</div>
        <div className="col cursor-pointer max-w-300" onClick={() => handleSort("lvl")}>Lvl {sortby === `lvl` && (isAsc ? <CaretDownOutlined /> : <CaretUpOutlined />)}</div>
        <div className="col cursor-pointer" onClick={() => handleSort("tier")}>Rank {sortby === `tier` && (isAsc ? <CaretDownOutlined /> : <CaretUpOutlined />)}</div>
        <div className="col cursor-pointer" onClick={() => handleSort("games")}>Games {sortby === `games` && (isAsc ? <CaretDownOutlined /> : <CaretUpOutlined />)}</div>
        <div className="col cursor-pointer" onClick={() => handleSort("winrate")}>Winrate {sortby === `winrate` && (isAsc ? <CaretDownOutlined /> : <CaretUpOutlined />)}</div>
      </div>
      {filteredData.map((summoner, index) => {
         return (
          <SummonerItem key={summoner.summonerName} summoner={summoner} type={type} ccRank={index+1} maxGames={maxGames} />
         )
      })}
  </div>
  );
}

export default SummonerList;
