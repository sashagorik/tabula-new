import React, { useEffect } from "react";
import coin3 from "../assets/coin3.svg";
import "./CardModal.css";
import formatProfitPerHour from "../utils/formatProfitPerHour";

const CardModal = ({ isOpen, onClose, cardDetails, isBoost }) => {
  useEffect(() => {
    if (isOpen) {
      console.log("Модальное окно открыто"); // Консоль для отладки
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  const imgUrl = typeof cardDetails.image === "string" ? cardDetails.image : "";

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-body">
          {isBoost ? (
            <cardDetails.image className="modal-image" />
          ) : (
            <img className="modal-image" src={imgUrl} alt="Card image" />
          )}
          <h2 className="modal-title">{cardDetails.title}</h2>
          <span className="modal-description">{cardDetails.description}</span>

          {!isBoost && (
            <div className="modal-profit">
              <span className="text-slate-300">Profit per Hour</span>
              <span className="profit-value">
                <img src={coin3} alt="Dollar Coin" className="coin-icon" />
                {formatProfitPerHour(cardDetails.profitPerHour)}
              </span>
            </div>
          )}

          <div className="modal-price">
            <img src={coin3} alt="Dollar Coin" className="coin-large-icon" />
            <p className="price-value">{cardDetails.price.toLocaleString()}</p>
          </div>
          <button onClick={onClose} className="modal-button">
            Buy<p>{cardDetails.price.toLocaleString()}</p>
          </button>
          <button onClick={onClose} className="modal-button">
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardModal;