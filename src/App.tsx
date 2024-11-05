import React, { useState, useEffect } from 'react';
import './App.scss';
import SummonerList from './components/SummonerList';
import Error from './Error';
import axios from 'axios';
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

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
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const { viewId } = useParams();
  const [searchParams] = useSearchParams();
  const queueType = searchParams.get("queue_type");
  const [type, setType] = useState(queueType ? queueType.toLocaleUpperCase() : `FLEX`);
  const [lastVersionDdragon, setLastVersion] = useState('14.21.1');
  const navigate = useNavigate();
  
  useEffect(() => {
    axios.get(process.env.REACT_APP_API_HOST + `/api/views/${viewId}/data`, {
      headers: {
        'Authorization': `Bearer ` + process.env.REACT_APP_SERVICE_TOKEN
      }
    })
    .then(response => {
      setData(response.data);
      setLoading(false);
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });

    axios.get("https://ddragon.leagueoflegends.com/api/versions.json")
      .then(response => {
          const lastVersionDdragon = response.data[0];
          setLastVersion(lastVersionDdragon);
      })
      .catch(error => {
          console.error("Error fetching ddragon version data:", error);
      });

  }, [viewId]);

  const handleTabClick = (newType: string) => {
    setType(newType);
    navigate(`/${viewId}?queue_type=${newType.toLowerCase()}`);
  };
  
  return (
      <div className="correcalles">
        <h1 className="title">Correcalles.gg</h1>
        {!data && <Error />}
        {data && loading && <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} /> }
        {!loading && <div className="tabs">
          <div className={`tab-item ${type === `FLEX` && `active`}`} onClick={() => handleTabClick(`FLEX`)}>FLEX</div>
          <div className={`tab-item ${type === `SOLO` && `active`}`}  onClick={() => handleTabClick(`SOLO`)}>SOLO</div>
        </div> }
        {!loading && data && <SummonerList data={data} type={type} ddversion={lastVersionDdragon} /> }
      </div>
  );
}

export default App;
