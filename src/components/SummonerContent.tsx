import React from 'react';
import {Ranked} from '../pages/View';
import MatchItem from './MatchItem';
import {Progress} from 'antd';
import {QuestionOutlined} from '@ant-design/icons';

const SummonerContent: React.FC<{ summonerName:string, item: Ranked, ddversion: string }> = ({summonerName, item, ddversion}) => {

  const num_matches = item.matches.length;
  const num_wins = item.matches.filter(match => match.win).length;
  const num_loses = num_matches - num_wins;
  const kills = item.matches.reduce((sum, match) => sum + match.kills, 0);
  const deaths = item.matches.reduce((sum, match) => sum + match.deaths, 0);
  const assists = item.matches.reduce((sum, match) => sum + match.assists, 0);
  const max_tiltedpings = Math.max(...item.matches.map(match => match.enemyMissingPings));
  const tiltedpings = item.matches.reduce((sum, match) => sum + match.enemyMissingPings, 0);
  const winrate = (Math.floor(num_wins / num_matches * 100))

  const kda = deaths !== 0 ? (kills + assists) / deaths : 9999;

  const champsPicked = item.matches.reduce<{
    [key: string]: { count: number, wins: number, kills: number, assists: number, deaths: number }
  }>((acc, match) => {
    const name = match.championName;
    if (!acc[name]) {
      acc[name] = {count: 0, wins: 0, kills: match.kills, assists: match.assists, deaths: match.deaths}
    } else {
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

  const roleOrder = ["TOP", "JUNGLE", "MIDDLE", "BOTTOM", "UTILITY"];

  const rolesPicked = item.matches.reduce<{ [key: string]: { count: number, wins: number } }>((acc, match) => {
    const role = match.individualPosition;
    if (!acc[role]) {
        acc[role] = {count: 0, wins: 0};
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

  return (
    <div className="summoner-content">
      <div className="resume bg-light-black">
        <div className="col">
          <div>{num_matches}G {num_wins}V {num_loses}L</div>
          <Progress strokeColor={winrate<50 ? "#a30006" : "#029e2b"} strokeLinecap="butt" size={100} type="circle"
                    percent={winrate}/>
        </div>
        {false && <div className="col bigger-font">
          <div className='font-grey'>{(kills / num_matches).toFixed(2)}/{(deaths / num_matches).toFixed(2)}/{(assists / num_matches).toFixed(2)}</div>
          <div className={`${kda < 2 ? `font-red` : (kda < 5 ? `font-orange` : `font-green`)}`}>{kda === 9999 ? `Perfect` : kda.toFixed(2) + `:1`}</div>
          <div className={`${tiltedpings / num_matches < 4 ? `font-green` : (tiltedpings / num_matches < 10 ? `font-orange` : `font-red`)}`}>{(tiltedpings / num_matches).toFixed(2)}
              <QuestionOutlined className='font-orange'/></div>
          <div className={`${max_tiltedpings < 4 ? `font-green` : (max_tiltedpings < 10 ? `font-orange` : `font-red`)}`}>màx. {max_tiltedpings}
              <QuestionOutlined className='font-orange'/></div>
        </div>}
        <div className="col">
          {sortedChampsPicked.slice(0, 5).map((champ) => {
            const kda = champ.deaths === 0 ? 9999 : (champ.kills + champ.assists) / champ.deaths;
            return (
              <li className="champion-line flex-center-align" key={champ.name}>
                <img alt="champion-image" className="small-img mr-10"
                      src={`https://ddragon.leagueoflegends.com/cdn/${ddversion}/img/champion/${champ.name}.png`}/>
                <div>{(champ.wins / champ.count * 100).toFixed(2)}%
                    ({champ.wins}V {champ.count - champ.wins}L) <span
                        className={`${kda < 2 ? `font-red` : (kda < 5 ? `font-orange` : `font-green`)}`}>{kda === 9999 ? `Perfect` : kda.toFixed(2) + `:1`}</span>
                </div>
              </li>
            )
          })}
        </div>
        <div className="last-col col">
          {sortedRolesPicked.map((role) => (
            <li className="role-item" key={role.role}>
              <img alt="role-image" className="small-img" src={`/icons/${role.role.toLowerCase()}.svg`}/>
              <Progress strokeLinecap="butt" size={[240, 15]} strokeColor={`#b30000`}
                        percent={(role.count) / num_matches * 100}
                        success={{percent: role.wins / num_matches * 100, strokeColor: '#00b120'}}
                        showInfo={false}/>
            </li>
          ))}
        </div>
      </div>
      <div className="matches-list">
        {item.matches.map((match) => {
          return (
              <MatchItem summonerName={summonerName} key={match.id} match={match} ddversion={ddversion} />
          )
        })}
      </div>
    </div>
  );
}

export default SummonerContent;
