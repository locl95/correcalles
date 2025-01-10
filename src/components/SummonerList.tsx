import React, {useState} from 'react';
import { SimplifiedSummoner } from '../pages/View';
import SummonerItem from './SummonerItem';
import { CaretDownOutlined, CaretUpOutlined, RiseOutlined } from '@ant-design/icons';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const SummonerList: React.FC<{loading: boolean, data: SimplifiedSummoner[], cachedData: SimplifiedSummoner[], ddversion: string, position: string}> = ({ loading, data, cachedData, ddversion, position }) => {
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
  console.log(data);

  const dataWithPosition = position === 'all' ? data : data.filter(item => item.ranked.mainRole === position);

  const dataWithLPdiff = dataWithPosition.map((item) => {
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
    <ul className="list"> 
      <div className="row hide-mobile"> 
        <div className="col cursor-pointer mr-20" onClick={() => handleSort("summoner")}>SUMMONER {sortby === `summoner` && (isAsc ? <CaretDownOutlined /> : <CaretUpOutlined />)}</div>
        <div className="col cursor-pointer max-w-60" onClick={() => handleSort("lvl")}>LVL {sortby === `lvl` && (isAsc ? <CaretDownOutlined /> : <CaretUpOutlined />)}</div>
        <div className="col cursor-pointer min-w-300" onClick={() => handleSort("tier")}>RANK {sortby === `tier` && (isAsc ? <CaretDownOutlined /> : <CaretUpOutlined />)}</div>
        <div className="col cursor-pointer max-w-100" onClick={() => handleSort("LPdiff")}><RiseOutlined className="small-rise-up"/> {sortby === `LPdiff` && (isAsc ? <CaretDownOutlined /> : <CaretUpOutlined />)}</div>
        <div className="col cursor-pointer" onClick={() => handleSort("games")}>GAMES {sortby === `games` && (isAsc ? <CaretDownOutlined /> : <CaretUpOutlined />)}</div>
        <div className="col cursor-pointer" onClick={() => handleSort("winrate")}>WINRATE {sortby === `winrate` && (isAsc ? <CaretDownOutlined /> : <CaretUpOutlined />)}</div>
      </div>
      {loading && <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} /> }
      {!loading && sortedData.map((summoner, index) => {
        return (
          <SummonerItem key={summoner.summonerName+`#`+summoner.summonerTag} summoner={summoner} ccRank={index+1} maxGames={maxGames} ddversion={ddversion}  />
        )
      })}
  </ul>
  );
}

export default SummonerList;
