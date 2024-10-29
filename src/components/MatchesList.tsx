import React from 'react';
import { Ranked } from '../App'; 
import MatchItem from './MatchItem';
import { Flex, Progress, Tag } from 'antd';

const MatchesList: React.FC<{item: Ranked}> = ({ item }) => {

  const num_matches = item.matches.length;
  var num_wins = 0;
  var num_loses = 0;
  var kills = 0;
  var deaths = 0;
  var assists = 0;
  
  for (var i=0; i<num_matches; ++i){
    if (item.matches[i].win) ++num_wins; else ++num_loses;
    kills += item.matches[i].kills;
    deaths += item.matches[i].deaths;
    assists += item.matches[i].assists;
  }

  const champsPicked = item.matches.reduce<{[key: string]: { count: number, wins: number, kills: number, assists: number, deaths: number}}>((acc, match) => {
    const name = match.championName;
    if (!acc[name]) {
      acc[name] = { count: 0, wins: 0, kills: match.kills, assists: match.assists, deaths: match.deaths }
    }
    else {
      acc[name].kills += match.kills;
      acc[name].assists += match.assists;
      acc[name].deaths += match.deaths;
    }
    if (match.win) acc[name].wins += 1;
    acc[name].count += 1;
    return acc;
  }, {});

  const SortedChampsPicked = Object.entries(champsPicked)
    .map(([name, data]) => ({
      name: name,
      count: data.count,
      wins: data.wins,
      kills: data.kills,
      assists: data.assists,
      deaths: data.deaths,
    }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="MatchesList"> 
      <div className="matchesResume">
        <div>Last {num_matches} games </div>
        <div>
          <div>{num_matches}G {num_wins}V {num_loses}L</div>
          <Progress type="circle" percent={(Math.floor(num_wins/num_matches*100))} />
        </div>
        <div>
          <div>{kills/num_matches}/{deaths/num_matches}/{assists/num_matches}</div>
          <div>{((kills+assists)/deaths).toFixed(2)}:1</div>
          <div></div>
        </div>
        <div>
          {SortedChampsPicked.slice(0,3).map((champ) => (
            <li key={champ.name}>
              <img className="small-img" src={`https://ddragon.leagueoflegends.com/cdn/14.11.1/img/champion/${champ.name}.png`}/>
              <div>{champ.wins/champ.count*100}% ({champ.wins}V {champ.count-champ.wins}L) <span className={((champ.kills+champ.assists)/champ.deaths)<3 ? `font-red` : `font-green`}>{((champ.kills+champ.assists)/champ.deaths).toFixed(2)}</span></div>
            </li>
          ))}
        </div>
        <div>
          
        </div>
      </div>
      {item.matches.map((match) => {
        return ( 
          <MatchItem match={match} />
        )
      })}
    </div>
  );
}

export default MatchesList;
