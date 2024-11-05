import React from 'react';

const MinersList = ({ miners }) => {
  return (
    <div className="minersList">
      <h2>Список Майнеров</h2>
      <ul>
        {miners.map((miner, index) => (
          <li key={index}>
            <span>{miner.name}</span> - <span>{miner.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MinersList;