import React, { useState, useEffect } from 'react';
import SummonerList from '../components/SummonerList';
import axios from 'axios';
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

export interface Match {
  id: string;
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
  LPdiff: number;
}

function View() {
  const [viewName, setViewName] = useState('Unnamed View');
  const [data, setData] = useState();
  const [cachedData, setCachedData] = useState();
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
      setViewName(response.data.viewName);
      setData(response.data.data.map((summoner: Summoner) => ({
        ranked: type === `FLEX` ? summoner.leagues.RANKED_FLEX_SR : summoner.leagues.RANKED_SOLO_5x5,
        summonerIcon: summoner.summonerIcon,
        summonerLevel: summoner.summonerLevel,
        summonerName: summoner.summonerName,
        summonerTag: summoner.summonerTag,
        type: summoner.type,
        LPdiff: 0,
      })).filter((ssummoner: SimplifiedSummoner) => ssummoner.ranked));
      setLoading(false);
    })
    .catch(error => {
      setLoading(false);
      console.error(error);
      navigate("/error");
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
        LPdiff: 0,
      })).filter((ssummoner: SimplifiedSummoner) => ssummoner.ranked));
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
  }, [viewId, type, navigate]);

  const handleTabClick = (newType: string) => {
    setType(newType);
    navigate(`/${viewId}?queue_type=${newType.toLowerCase()}`);
  }; 
  
  console.log(data);

  return (
    <div className={`page`} >
      <h1 className="title">{loading ? `Correcalles.gg` : viewName}</h1>
      <div className="tabs">
        <div className={`tab-item ${type === `FLEX` && `active`}`} onClick={() => handleTabClick(`FLEX`)}>FLEX</div>
        <div className={`tab-item ${type === `SOLO` && `active`}`}  onClick={() => handleTabClick(`SOLO`)}>SOLO</div>
      </div>
      {loading && <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} /> }
      {!loading && data && <SummonerList data={data} cachedData={cachedData ? cachedData : data} ddversion={lastVersionDdragon} /> }
    </div>
  );
}

export default View;
