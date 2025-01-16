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
  const [error, setError] = useState({
    code: '',
    status: '',
    message: '',
  });
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
    });
  }, [navigate]);

  return (
    <div className={`content`} >
      {error.code !== ''  ? <ErrorPage error={error} /> : <>
        <h1 className="title">All views</h1>
        <ViewsList list={viewsList} loading={loading} />
      </>}
    </div>
  );
}

export default Home;