import React, { useEffect } from "react";
import { coin3 } from "../assets";
import formatProfitPerHour from "../utils/formatProfitPerHour";

const CardModal = ({ isOpen, onClose, cardDetails, isBoost, setIsModalOpen }) => {
  useEffect(() => {
    if (isOpen) {
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
    <>
      {isOpen && (
        <div
          className={`modal-backdrop ${isOpen ? "opacity-50" : "opacity-0"}`}
          onClick={setIsModalOpen}
        ></div>
      )}

      <div
        onClick={(e) => e.stopPropagation()}
        className={`modal-content ${isOpen ? "translate-y-0" : "translate-y-full"}`}
      >
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
                <img src={dollarCoin} alt="Dollar Coin" className="coin-icon" />
                {formatProfitPerHour(cardDetails.profitPerHour)}
              </span>
            </div>
          )}

          <div className="modal-price">
            <img src={dollarCoin} alt="Dollar Coin" className="coin-large-icon" />
            <p className="price-value">{cardDetails.price.toLocaleString()}</p>
          </div>
          <button onClick={onClose} className="modal-button">
            Go ahead
          </button>
        </div>
      </div>
    </>
  );
};

export default CardModal;