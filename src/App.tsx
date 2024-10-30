import React, { useState, useEffect } from 'react';
import './App.scss';
import SummonerList from './components/SummonerList';
import axios from 'axios';
import { Tabs } from 'antd';
import {useParams} from "react-router-dom";

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

export interface Summoner {
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
  const { viewId } = useParams()
  useEffect(() => {
    axios.get(process.env.REACT_APP_API_HOST + `/api/views/${viewId}/data`, {
      headers: {
        'Authorization': `Bearer ` + process.env.REACT_APP_SERVICE_TOKEN
      }
    })
    .then(response => {
      setData(response.data);
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  }, [viewId]);

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
              children: <SummonerList data={data} type={type} />
            };
        })}
      />
    </div>
  );
}

export default App;
