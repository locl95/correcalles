import React from 'react';
import { Ranked } from '../App'; 
import MatchItem from './MatchItem';

const MatchesList: React.FC<{item: Ranked}> = ({ item }) => {

  return (
    <div className="MatchesList"> 
      {item.matches.map((match) => {
        return ( 
          <MatchItem match={match} />
        )
      })}
    </div>
  );
}

export default MatchesList;
