import React from 'react';
import "./Drop.css";
import MineCard from "../../components/MineCard";
import cards from "../../Data/cardsData"; // импортируем данные карт

const Drop = (props) => {
  return (
    <div className="drop-container">
      <div className="grid">
        {cards && cards.map((card, index) => (
          <div key={index} className="flex justify-center">
            <MineCard onClick={props.onClick} cardDeatails={card} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Drop;