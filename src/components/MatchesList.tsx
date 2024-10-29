import React from 'react';
import { Ranked } from '../App'; 
import MatchItem from './MatchItem';
import { Progress } from 'antd';

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

  const sortedChampsPicked = Object.entries(champsPicked)
    .map(([name, data]) => ({
      name: name,
      count: data.count,
      wins: data.wins,
      kills: data.kills,
      assists: data.assists,
      deaths: data.deaths,
    }))
    .sort((a, b) => b.count - a.count);

  const roleOrder = ["TOP", "JUNGLE", "MIDDLE", "BOTTOM", "SUPPORT"];

  const rolesPicked = item.matches.reduce<{[key: string]: { count: number, wins: number } }>((acc, match) => {
    const role = match.individualPosition;
    if (!acc[role]) {
      acc[role] = { count: 0, wins: 0 };
    }
    if (match.win) acc[role].wins += 1;
    acc[role].count += 1;
    return acc;
  }, {});
  
  const sortedRolesPicked = roleOrder.map((role) => ({
    role: role,
    count: rolesPicked[role]?.count || 0,
    wins: rolesPicked[role]?.wins || 0
  }));
  console.log(sortedRolesPicked);

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
          {sortedChampsPicked.slice(0,5).map((champ) => (
            <li key={champ.name}>
              <img alt="champion-image" className="small-img" src={`https://ddragon.leagueoflegends.com/cdn/14.11.1/img/champion/${champ.name}.png`}/>
              <div>{champ.wins/champ.count*100}% ({champ.wins}V {champ.count-champ.wins}L) <span className={((champ.kills+champ.assists)/champ.deaths)<3 ? `font-red` : `font-green`}>{((champ.kills+champ.assists)/champ.deaths).toFixed(2)}</span></div>
            </li>
          ))}
        </div>
        <div> 
          {sortedRolesPicked.map((role) => (
            <li className="role-item" key={role.role}>
              <img alt="role-image" className="small-img" src={`/icons/${role.role.toLowerCase()}.svg`}/>
              <Progress size={[300, 15]} strokeColor={`#ff5c5ce0`} percent={(role.count)/num_matches*100} success={{ percent: role.wins/num_matches*100, strokeColor: '#00d927' }} />
            </li>
          ))}
        </div>
      </div>
      {item.matches.map((match) => {
        return ( 
          <MatchItem key={match.gameDuration} match={match} />
        )
      })}
    </div>
  );
}

export default MatchesList;
