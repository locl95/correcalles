import React, { useState, useEffect } from 'react';
import ViewsList from '../components/ViewsList';
import axios from 'axios';
import { useSearchParams, useNavigate } from "react-router-dom";
import { Switch } from 'antd';

export interface View {
  characterIds: number[];
  game: string;
  id: string;
  name: string;
  owner: string;
  published: boolean;
}

const Home = () => {
  const [searchParams] = useSearchParams();
  const themeType = searchParams.get("theme");
  const [darkMode, toggleTheme] = useState(themeType === "dark");
  const [viewsList, setViewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_HOST + `/api/views`, {
      headers: {
        'Authorization': `Bearer ` + process.env.REACT_APP_SERVICE_TOKEN
      }
    })
    .then(response => {
      setViewsList(response.data.filter((view: View) => view.published && view.game === 'LOL'));
      setLoading(false);
    })
    .catch(error => {
      console.error(error);
      navigate("/error");
    });
  }, [navigate]);

  const handleToggleTheme = () => {
    toggleTheme(!darkMode);
    navigate(`/home?theme=${!darkMode ? 'dark' : 'light'}`);
  };

  console.log(viewsList);

  return (
    <div className={`page ${darkMode ? "dark-theme" : ""}`} >
      <div className={`correcalles`} >
        <Switch className={`switch-dark`} checked={darkMode} onChange={handleToggleTheme} />
        <h1 className="title">Correcalles.gg</h1>
        <ViewsList list={viewsList} loading={loading} />
      </div>
    </div>
  );
}

export default Home;