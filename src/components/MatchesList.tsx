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

  const champsPicked = item.matches.reduce<{[key: string]: number}>((acc, item) => {
    const name = item.championName;
    acc[name] = acc[name] ? acc[name] + 1 : 1;
    return acc;
  }, {});

  const resultArray = Object.entries(champsPicked)
    .map(([name, count]) => ({
      name: name,
      timesAppeared: count
    }))
    .sort((a, b) => b.timesAppeared - a.timesAppeared);

  return (
    <div className="MatchesList"> 
      <div className="matchesResume">
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
          {resultArray.slice(0,3).map((entry) => (
            <li key={entry.name}>
              <img className="small-img" src={`https://ddragon.leagueoflegends.com/cdn/14.11.1/img/champion/${entry.name}.png`}/> {entry.timesAppeared} times
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
