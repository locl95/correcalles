import React, {useState} from 'react';
import { SimplifiedSummoner } from '../App';
import SummonerItem from './SummonerItem';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';

const SummonerList: React.FC<{data: SimplifiedSummoner[], cachedData: SimplifiedSummoner[], ddversion: string}> = ({ data, cachedData, ddversion }) => {
  const [sortby, setSortby] = useState('tier');
  const [isAsc, setIsAsc] = useState(true);

  const tiers = ["CHALLENGER", "GRANDMASTER", "MASTER", "DIAMOND", "EMERALD", "PLATINUM", "GOLD", "SILVER", "BRONZE", "IRON", "UNRANKED"];
  const ranks = ["I", "II", "III", "IV", "V"];

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

  const newData = data.filter((summoner) => summoner.ranked).map((item) => {
    const cachedSummoner = cachedData.find((csummoner) => csummoner.summonerName === item.summonerName && csummoner.summonerTag === item.summonerTag);
    const LPdiff = () => {
      if (!cachedSummoner) return 0;
      const itemTierIndex = tiers.indexOf(item.ranked.tier);
      const cachedTierIndex = tiers.indexOf(cachedSummoner.ranked.tier);
      const itemRankIndex = ranks.indexOf(item.ranked.rank);
      const cachedRankIndex = ranks.indexOf(cachedSummoner.ranked.rank);
  
      const tierDifference = itemTierIndex - cachedTierIndex;
      const rankDifference = itemRankIndex - cachedRankIndex;
  
      console.log("tierDifference:", tierDifference);
      console.log("rankDifference:", rankDifference);
  
      // Case 1: Same Tier, Same Rank
      if (tierDifference === 0 && rankDifference === 0) {
        return item.ranked.leaguePoints - cachedSummoner.ranked.leaguePoints;
      }
  
      // Case 2: Same Tier, Different Rank
      else if (tierDifference === 0) {
        if (rankDifference > 0) {
          // If the item has a higher rank (i.e., lower rank index), return the LP of the higher rank
          return item.ranked.leaguePoints;
        } else {
          // If the cached summoner is in a higher rank, return their LP
          return cachedSummoner.ranked.leaguePoints;
        }
      }
  
      // Case 3: Different Tiers
      else {
        // Handle tier promotion logic. For instance, if item is promoted from Gold I to Platinum V, we reset LP to 0
        if (tierDifference === 1 && rankDifference === 0) {
          // If moving up by a tier (for example, Gold I to Platinum V), LP is reset after promotion
          return cachedSummoner.ranked.leaguePoints + (100 - item.ranked.leaguePoints);
        }
        // If not promoted within the same rank, return 0
        return 0;
      }
    };
    return {
      ...item,
      LPdiff: LPdiff()
    };
  });
  const sortedData = newData.sort(compare);
  const maxGames = Math.max(...sortedData.map(summoner => summoner.ranked.gamesPlayed));

  return (
    <div className="list"> 
      <div className="headrow turkish"> 
        <div className="col cursor-pointer m-r-20" onClick={() => handleSort("summoner")}>Summoner {sortby === `summoner` && (isAsc ? <CaretDownOutlined /> : <CaretUpOutlined />)}</div>
        <div className="col cursor-pointer max-w-100" onClick={() => handleSort("lvl")}>Lvl {sortby === `lvl` && (isAsc ? <CaretDownOutlined /> : <CaretUpOutlined />)}</div>
        <div className="col cursor-pointer min-w-300" onClick={() => handleSort("tier")}>Rank {sortby === `tier` && (isAsc ? <CaretDownOutlined /> : <CaretUpOutlined />)}</div>
        <div className="col cursor-pointer" onClick={() => handleSort("games")}>Games {sortby === `games` && (isAsc ? <CaretDownOutlined /> : <CaretUpOutlined />)}</div>
        <div className="col cursor-pointer" onClick={() => handleSort("winrate")}>Winrate {sortby === `winrate` && (isAsc ? <CaretDownOutlined /> : <CaretUpOutlined />)}</div>
      </div>
      {sortedData.map((summoner, index) => {
        return (
          <SummonerItem key={summoner.summonerName} summoner={summoner} ccRank={index+1} maxGames={maxGames} ddversion={ddversion} LPdiff={summoner.LPdiff}  />
        )
      })}
  </div>
  );
}

export default SummonerList;
