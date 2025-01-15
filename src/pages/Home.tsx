import React, { useState, useEffect } from 'react';
import ViewsList from '../components/ViewsList';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import ErrorPage from './ErrorPage';

export interface ViewResponse {
  records: View[];
}

export interface View {
  characterIds: number[];
  game: string;
  id: string;
  name: string;
  owner: string;
  published: boolean;
}

const Home = () => {
  const [viewsList, setViewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_HOST + `/api/views?game=lol&featured=true`, {
      headers: {
        'Authorization': `Bearer ` + process.env.REACT_APP_SERVICE_TOKEN
      }
    })
    .then(response => {
      setViewsList(response.data.records.filter((view: View) => view.published));
      setLoading(false);
    })
    .catch(error => {
      console.error(error);
      setError(true);
    });
  }, [navigate]);

  return (
    <div className={`content`} >
      {error ? <ErrorPage /> : <>
        <h1 className="title">All views</h1>
        <ViewsList list={viewsList} loading={loading} />
      </>}
    </div>
  );
}

export default Home;