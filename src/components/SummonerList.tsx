import React, {useState} from 'react';
import { SimplifiedSummoner } from '../pages/View';
import SummonerItem from './SummonerItem';
import { CaretDownOutlined, CaretUpOutlined, RiseOutlined } from '@ant-design/icons';

const SummonerList: React.FC<{data: SimplifiedSummoner[], cachedData: SimplifiedSummoner[], ddversion: string}> = ({ data, cachedData, ddversion }) => {
  const [sortby, setSortby] = useState('tier');
  const [isAsc, setIsAsc] = useState(true);

  const tiers = ["CHALLENGER", "GRANDMASTER", "MASTER", "DIAMOND", "EMERALD", "PLATINUM", "GOLD", "SILVER", "BRONZE", "IRON", "UNRANKED"];
  const ranks = ["I", "II", "III", "IV"];
  const maxPoints = 100;

  const compare = (a: SimplifiedSummoner, b: SimplifiedSummoner) => {
    const mult = isAsc ? 1 : -1;
    if (sortby === `summoner`) {
      return mult * a.summonerName.localeCompare(b.summonerName);
    }
    else if (sortby === `lvl`) {
      return mult * (b.summonerLevel - a.summonerLevel);
    }
    else if (sortby === `tier`) {
      const tierDiff = tiers.indexOf(a.ranked.tier) - tiers.indexOf(b.ranked.tier);
      if (tierDiff !== 0) return mult * tierDiff;
      const rankDiff = ranks.indexOf(a.ranked.rank) - ranks.indexOf(b.ranked.rank);
      if (rankDiff !== 0) return mult * rankDiff;
      return mult * (b.ranked.leaguePoints - a.ranked.leaguePoints)
    }
    else if (sortby === `LPdiff`) {
      return mult * (b.LPdiff - a.LPdiff)
    }
    else if (sortby === `games`) {
      return mult * (b.ranked.gamesPlayed - a.ranked.gamesPlayed)
    }
    else {
      return mult * (b.ranked.winrate - a.ranked.winrate)
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
  
  const dataWithLPdiff = data.map((item) => {
    const cachedSummoner = cachedData.find((csummoner) => csummoner.summonerName === item.summonerName && csummoner.summonerTag === item.summonerTag);
    const totalLP = (ssumoner: SimplifiedSummoner) => {
      const tierIndex = tiers.indexOf(ssumoner.ranked.tier);
      const rankIndex = ranks.indexOf(ssumoner.ranked.rank);
      return (tiers.length - tierIndex -1) * (ranks.length * maxPoints) + (ranks.length - rankIndex -1) * maxPoints + ssumoner.ranked.leaguePoints;
    };
    const LPdiff = () => {
      if (!cachedSummoner) return 0;
      return totalLP(item) - totalLP(cachedSummoner);
    };
    return {
      ...item,
      LPdiff: LPdiff()
    };
  });
  const sortedData = dataWithLPdiff.sort(compare);
  const maxGames = Math.max(...sortedData.map(summoner => summoner.ranked.gamesPlayed));

  return (
    <div className="list"> 
      <div className="headrow turkish"> 
        <div className="col cursor-pointer m-r-20" onClick={() => handleSort("summoner")}>Summoner {sortby === `summoner` && (isAsc ? <CaretDownOutlined /> : <CaretUpOutlined />)}</div>
        <div className="col cursor-pointer max-w-60" onClick={() => handleSort("lvl")}>Lvl {sortby === `lvl` && (isAsc ? <CaretDownOutlined /> : <CaretUpOutlined />)}</div>
        <div className="col cursor-pointer min-w-300" onClick={() => handleSort("tier")}>Rank {sortby === `tier` && (isAsc ? <CaretDownOutlined /> : <CaretUpOutlined />)}</div>
        <div className="col cursor-pointer max-w-100" onClick={() => handleSort("LPdiff")}><RiseOutlined className="small-rise-up"/> {sortby === `LPdiff` && (isAsc ? <CaretDownOutlined /> : <CaretUpOutlined />)}</div>
        <div className="col cursor-pointer" onClick={() => handleSort("games")}>Games {sortby === `games` && (isAsc ? <CaretDownOutlined /> : <CaretUpOutlined />)}</div>
        <div className="col cursor-pointer" onClick={() => handleSort("winrate")}>Winrate {sortby === `winrate` && (isAsc ? <CaretDownOutlined /> : <CaretUpOutlined />)}</div>
      </div>
      {sortedData.map((summoner, index) => {
        return (
          <SummonerItem key={summoner.summonerName+`#`+summoner.summonerTag} summoner={summoner} ccRank={index+1} maxGames={maxGames} ddversion={ddversion}  />
        )
      })}
  </div>
  );
}

export default SummonerList;
