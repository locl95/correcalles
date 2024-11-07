import React from 'react';
import { View } from '../pages/Home';

const ViewsList: React.FC<{list: View[], loading: boolean}> = ({ list, loading }) => {

  return (
    <div className="list"> 
      <div className="headrow turkish"> 
        <div className="col cursor-pointer">Name</div>
        <div className="col cursor-pointer">Game</div>
      </div>
      {list.map((view) => {
        return (
          <div key={view.id} className="headrow blue border-5-blue" onClick={() => window.open(`https://correcalles.netlify.app/${view.id}`)}>
            <div className='col flex-start-lineal'>{view.name}</div>
            <div className="col">{view.game}</div>
          </div>
        )
      })}
  </div>
  );
}

export default ViewsList;
