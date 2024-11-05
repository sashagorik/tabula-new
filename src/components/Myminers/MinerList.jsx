import React from 'react';
import './MinerList.css';

const MinersList = ({ miners }) => {
  return (
    <div className="minersList">
      <h2>Список Майнеров</h2>
      <ul>
        {miners.map((miner, index) => (
          <li key={index} className={`earnOptionDiv ${miner.status === "Активен" ? "activeEarnOption" : "inActiveEarnOption"}`}>
            <span className="minerName">{miner.name}</span> - <span>{miner.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MinersList;