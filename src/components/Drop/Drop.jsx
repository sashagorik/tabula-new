import React from 'react';
import "./Drop.css";
import MineCard from "../../components/MineCard";
import cards from "../../Data/cardsData"; // импортируем данные карт

const Drop = (props) => {
  return (
    <div className="grid grid-cols-3 gap-4 w-[95%] mx-auto">
      {cards && cards.map((card, index) => (
        <div key={index}>
          <MineCard onClick={props.onClick} cardDeatails={card} />
        </div>
      ))}
    </div>
  );
};

export default Drop;