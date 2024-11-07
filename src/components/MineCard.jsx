import React from "react";
import greyCoin from "../assets/coin3.svg"
import formatProfitPerHour from "../utils/formatProfitPerHour";
import formatCardPrice from "../utils/formatCardPrice";
import TonCoins from "../assets/coin3.svg"
import "./MineCard.css"; // Импорт файла стилей
import cards from "../Data/cardsData"; // импортируем данные карт

const MineCard = (props) => {
  const { title, description, image, profitPerHour, level, price } = props.cardDeatails;

  return (
    <div
      className="hamster-card"
      onClick={() => props.onClick(props.cardDeatails)}
    >
      <div className="hamster-card-container">
        <img
          className="hamster-card-image"
          src={image}
          alt="Card Image"
        />
        <div className="hamster-card-content">
          <p className="hamster-card-title">{title}</p>
          <p className="hamster-card-description">{description}</p>
          <p className="hamster-card-profit">
            Profit per hour
            <span className="hamster-card-profit-value">
              <img
                src={greyCoin}
                alt="Dollar Coin"
                className="hamster-card-coin-icon"
              />
              {formatProfitPerHour(profitPerHour)}
            </span>
          </p>
        </div>
        <hr className="hamster-card-divider" />
        <div className="hamster-card-footer">
          <p className="hamster-card-level">lvl {level}</p>
          <p className="hamster-card-price">
            <img
              src={greyCoin}
              alt="Dollar Coin"
              className="hamster-card-coin-icon"
            />
            <span>{formatCardPrice(price)}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MineCard;