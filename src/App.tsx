import React, { useState, useEffect } from 'react';
import './App.scss';
import InvocatorList from './components/InvocatorList';
import axios from 'axios';
import { Tabs } from 'antd';

export interface Match {
  assistMePings: number;
  assists: number;
  championId: number;
  deaths: number;
  enemyMissingPings: number;
  gameDuration: number;
  individualPosition: string;
  kills: number;
  lane: string;
  role: string;
  totalTimeSpentDead: number;
  visionWardsBoughtInGame: number;
  wardsPlaced: number;
  win: boolean;
  championName: string;
}

export interface Ranked {
  gamesPlayed: number;
  leaguePoints: number;
  mainRole: string;
  matches: Match[];
  rank: string;
  tier: string;
  winrate: number;
}

export interface Invocator {
  leagues: {
    RANKED_FLEX_SR: Ranked,
    RANKED_SOLO_5x5: Ranked
  };
  summonerIcon: number;
  summonerLevel: number;
  summonerName: string;
  type: string;
}

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/views/9317eb75-684a-4b9a-a7e7-014bb822a500/data', {
    //axios.get('http://localhost:8080/api/views/f7871213-03ef-48f1-bf27-372c7516411a/cached-data', {
      headers: {
        'Authorization': `Bearer c94ebcda-d9ba-4e29-a755-b2dd55d48774`
      }
    })
    .then(response => {
      setData(response.data);
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  }, []);

  const onChange = (key: string) => {
    console.log(key);
  };
  
  return (
    <div className="correcalles">
      <h1 className="title">Correcalles.gg</h1>
      <Tabs
        tabPosition="top"
        onChange={onChange}
        type="card"
        items={new Array(2).fill(null).map((_, i) => {
            const id = String(i + 1);
            const type = id === `1` ? `FLEX` :`SOLO`;
            return {
              label: type,
              key: id,
              children: <InvocatorList data={data} type={type} />
            };
        })}
      />
    </div>
  );
}

export default App;
