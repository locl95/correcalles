import React, { useState, useEffect, useMemo } from 'react';
import SummonerList from '../components/SummonerList';
import Dropdown from '../small-components/Dropdown';
import axios from 'axios';
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import ErrorPage from './ErrorPage';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { useOutletContext } from 'react-router-dom';

export interface MatchUp {
  assists: number;
  championId: number;
  championName: string;
  deaths: number;
  kills: number;
  teamPosition: string;
}

export interface Match {
  id: string;
  assistMePings: number;
  assists: number;
  championId: number;
  deaths: number;
  enemyMissingPings: number;
  gameDuration: number;
  gameFinishedCorrectly: boolean;
  individualPosition: string;
  teamPosition: string;
  kills: number;
  lane: string;
  role: string;
  totalTimeSpentDead: number;
  visionWardsBoughtInGame: number;
  wardsPlaced: number;
  win: boolean;
  championName: string;
  matchUp: MatchUp;
}

export interface Ranked {
  gamesPlayed: number;
  leaguePoints: number;
  individualPosition: string;
  teamPosition: string;
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
  const [data, setData] = useState<Summoner[]>([]);
  const [cachedData, setCachedData] = useState<Summoner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({
    code: '',
    status: '',
    message: '',
  });
  const { viewId } = useParams();
  const [searchParams] = useSearchParams();
  const queueType = searchParams.get("queue_type");
  const [type, setType] = useState(queueType ? queueType.toLocaleUpperCase() : `SOLO`);
  const [position, setPosition] = useState('all');
  const [lastVersionDdragon, setLastVersion] = useState('14.21.1');
  const { darkMode } = useOutletContext<{ darkMode: boolean }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async ()  => {
      try {
        const [viewResponse, cachedResponse, ddragonResponse] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_HOST}/api/views/${viewId}/data`, {
            headers: { Authorization: `Bearer ${process.env.REACT_APP_SERVICE_TOKEN}` }
          }),
          axios.get(`${process.env.REACT_APP_API_HOST}/api/views/${viewId}/cached-data`, {
            headers: { Authorization: `Bearer ${process.env.REACT_APP_SERVICE_TOKEN}` }
          }),
          axios.get('https://ddragon.leagueoflegends.com/api/versions.json')
        ]);

        setViewName(viewResponse.data.viewName);
        setData(viewResponse.data.data);
        setCachedData(cachedResponse.data.data);
        setLastVersion(ddragonResponse.data[0]);
      } catch (error) {
        console.error('Error fetching data:', error);

        if (axios.isAxiosError(error)) {
          setError({
            code: error.code || 'Unknown Code',
            status: error.status?.toString() || 'Unknown Status',
            message: error.message,
          });
        } else if (error instanceof Error) {
          setError({
            code: 'Unknown Code',
            status: 'Unknown Status',
            message: error.message,
          });
        } else {
          setError({
            code: 'Unknown Code',
            status: 'Unknown Status',
            message: 'An unexpected error occurred.',
          });
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [viewId, navigate]);

  const simplifiedData = useMemo(() => data.map((summoner: Summoner) => ({
    ranked: type === 'FLEX' ? summoner.leagues.RANKED_FLEX_SR : summoner.leagues.RANKED_SOLO_5x5,
    summonerIcon: summoner.summonerIcon,
    summonerLevel: summoner.summonerLevel,
    summonerName: summoner.summonerName,
    summonerTag: summoner.summonerTag,
    type: summoner.type,
    LPdiff: 0,
  })).filter((ssummoner: SimplifiedSummoner) => ssummoner.ranked), [data, type]);

  const simplifiedCachedData = useMemo(() => cachedData.map((summoner: Summoner) => ({
    ranked: type === 'FLEX' ? summoner.leagues.RANKED_FLEX_SR : summoner.leagues.RANKED_SOLO_5x5,
    summonerIcon: summoner.summonerIcon,
    summonerLevel: summoner.summonerLevel,
    summonerName: summoner.summonerName,
    summonerTag: summoner.summonerTag,
    type: summoner.type,
    LPdiff: 0,
  })).filter((ssummoner: SimplifiedSummoner) => ssummoner.ranked), [cachedData, type]);

  const handleTabClick = (newType: string) => {
    setType(newType);
    navigate(`/${viewId}?queue_type=${newType.toLowerCase()}`);
  }; 

  const positions = [
    { key: 'all', icon: 'ALL' },
    { key: 'TOP', icon: 'TOP' },
    { key: 'JUNGLE', icon: 'JUNGLE' },
    { key: 'MIDDLE', icon: 'MID' },
    { key: 'BOTTOM', icon: 'ADC' },
    { key: 'UTILITY', icon: 'SUPPORT' },
  ];
  console.log(data);
  return (
    <div className={`content`} >
      {error.code !== '' ? <ErrorPage error={error} /> : (loading ? <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} /> : 
        <>
          <h1 className="title">{viewName}</h1>
          <Dropdown defaultType={type} setType={handleTabClick} />
          <div className={"positions-icons"}>
            {positions.map(({ key, icon }) => (
              <div key={icon} className={`icon ${position === key ? 'active' : ''}`} onClick={() => setPosition(key)}>
                <img src={`/icons/${icon}-${position === key ? (darkMode ? 'light' : 'dark') : (darkMode ? 'dark' : 'light')}.png`} alt={icon} />
              </div>
            ))}
          </div>
          {<SummonerList data={simplifiedData} cachedData={simplifiedCachedData ? simplifiedCachedData : simplifiedData} ddversion={lastVersionDdragon} position={position} /> }
        </>
      )}
    </div>
  );
}

export default View;