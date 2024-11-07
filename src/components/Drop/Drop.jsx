import React, { useState } from "react";
import "./Drop.css";
import MineCard from "../../components/MineCard";
import cards from "../../Data/cardsData"; // импортируем данные карт
import CardModal from "../../components/CardModal"; // Импорт модального окна

const Drop = (props) => {

 // Состояние для управления модальным окном
 const [selectedCard, setSelectedCard] = useState(null);

 // Функция для открытия модального окна
 const handleCardClick = (card) => {
   setSelectedCard(card); // Устанавливаем выбранную карту в состояние
 };

 // Функция для закрытия модального окна
 const closeModal = () => {
   setSelectedCard(null); // Очищаем выбранную карту, закрывая модальное окно
 };


  return (
    <div className="drop-container">
      <div className="grid">
        {cards && cards.map((card, index) => (
          <div key={index} className="flex justify-center">
            <MineCard onClick={handleCardClick} cardDetails={card} />
          </div>
        ))}
{/* Показываем модальное окно, если выбрана карта */}
{selectedCard && (
  <CardModal
    isOpen={Boolean(selectedCard)} // Передаем состояние модального окна
    onClose={closeModal}
    cardDetails={selectedCard}
  />
)}

      </div>
    </div>
  );
};

export default Drop;