import React, { useState, useEffect } from 'react';
import './App.scss';
import SummonerList from './components/SummonerList';
import Error from './Error';
import axios from 'axios';
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { Switch } from 'antd';

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
  summonerTag: string;
  type: string;
}

export interface SimplifiedSummoner {
  ranked: Ranked;
  summonerIcon: number;
  summonerLevel: number;
  summonerName: string;
  summonerTag: string;
  type: string;
}

function App() {
  const [viewName, setViewName] = useState('Unnamed view');
  const [data, setData] = useState();
  const [cachedData, setCachedData] = useState();
  const [loading, setLoading] = useState(true);
  const { viewId } = useParams();
  const [searchParams] = useSearchParams();
  const queueType = searchParams.get("queue_type");
  const themeType = searchParams.get("theme");
  const [type, setType] = useState(queueType ? queueType.toLocaleUpperCase() : `FLEX`);
  const [lastVersionDdragon, setLastVersion] = useState('14.21.1');
  const [darkMode, toggleTheme] = useState(themeType === "dark");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_HOST + `/api/views/${viewId}/data`, {
      headers: {
        'Authorization': `Bearer ` + process.env.REACT_APP_SERVICE_TOKEN
      }
    })
    .then(response => {
      setViewName(response.data.viewName);
      setData(response.data.data.map((summoner: Summoner) => ({
        ranked: type === `FLEX` ? summoner.leagues.RANKED_FLEX_SR : summoner.leagues.RANKED_SOLO_5x5,
        summonerIcon: summoner.summonerIcon,
        summonerLevel: summoner.summonerLevel,
        summonerName: summoner.summonerName,
        summonerTag: summoner.summonerTag,
        type: summoner.type,
      })));
      setLoading(false);
    })
    .catch(error => {
      setLoading(false);
      console.error(error);
    });

    axios.get(process.env.REACT_APP_API_HOST + `/api/views/${viewId}/cached-data`, {
      headers: {
        'Authorization': `Bearer ` + process.env.REACT_APP_SERVICE_TOKEN
      }
    })
    .then(response => {
      setCachedData(response.data.data.map((summoner: Summoner) => ({
        ranked: type === `FLEX` ? summoner.leagues.RANKED_FLEX_SR : summoner.leagues.RANKED_SOLO_5x5,
        summonerIcon: summoner.summonerIcon,
        summonerLevel: summoner.summonerLevel,
        summonerName: summoner.summonerName,
        summonerTag: summoner.summonerTag,
        type: summoner.type,
      })));
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
  }, [viewId, type]);

  const handleTabClick = (newType: string) => {
    setType(newType);
    navigate(`/${viewId}?queue_type=${newType.toLowerCase()}&theme=${darkMode ? 'dark' : 'light'}`);
  }; 
  
  const handleToggleTheme = () => {
    toggleTheme(!darkMode);
    navigate(`/${viewId}?queue_type=${type.toLowerCase()}&theme=${!darkMode ? 'dark' : 'light'}`);
  };

  console.log('----------- DATA -----------');
  console.log(data);
  console.log('----------- END  -----------');
  console.log('----------- CACHED DATA -----------');
  console.log(cachedData);
  console.log('--------- END CACHED DATA ---------');
  
  return (
    <div className={`page ${darkMode ? "dark-theme" : ""}`} >
      <div className={`correcalles`} >
        <Switch className={`switch-dark`} checked={darkMode} onChange={handleToggleTheme} />
        <h1 className="title">{viewName}</h1>
        {loading && <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} /> }
        {!data && !loading && <Error />}
        {!loading && data && <div className="tabs">
          <div className={`tab-item ${type === `FLEX` && `active`}`} onClick={() => handleTabClick(`FLEX`)}>FLEX</div>
          <div className={`tab-item ${type === `SOLO` && `active`}`}  onClick={() => handleTabClick(`SOLO`)}>SOLO</div>
        </div> }
        {!loading && data && cachedData && <SummonerList data={data} cachedData={cachedData} ddversion={lastVersionDdragon} /> }
      </div>
    </div>
  );
}

export default App;
