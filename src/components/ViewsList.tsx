import React from 'react';
import { View } from '../pages/Home';
import { useNavigate } from "react-router-dom";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const ViewsList: React.FC<{list: View[], loading: boolean}> = ({ list, loading }) => {
  const navigate = useNavigate();

  return (
    <div className="list"> 
      <div className="headrow turkish"> 
        <div className="col cursor-pointer">Name</div>
      </div>
      {loading && <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} /> }
      {!loading && list.map((view) => {
        return (
          <div key={view.id} className="headrow blue border-5-blue" onClick={() => navigate(`/${view.id}`)}>
            <div className='col flex-start-lineal'>{view.name}</div>
          </div>
        )
      })}
  </div>
  );
}

export default ViewsList;
