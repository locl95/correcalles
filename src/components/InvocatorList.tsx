import React from 'react';
import { Invocator } from '../App';
import InvocatorItem from './InvocatorItem';

const InvocatorList: React.FC<{data: Invocator[], type: string}> = ({ data, type }) => {

  return (
    <div className="InvocatorList"> 
      {data.map((invocator) => {
         return (
          <InvocatorItem key={invocator.summonerName} invocator={invocator} type={type} />
         )
      })}
  </div>
  );
}

export default InvocatorList;
