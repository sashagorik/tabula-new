import React from 'react'
import { useContext, useEffect } from "react";
import TonCoins from "../../assets/tonCoins.svg";
import "./CoinInfo.css";
import { UserInfo } from "../../ContextApi/UserData";
import greyCoin from "../../assets/greyCoin.png";
import axios from "axios";
import { baseUrl } from "../../services/helper";

const CoinInfo = () => {
    const { userInfo, setUserInfo } = useContext(UserInfo);

    const fetchUserData = async () => {
        try {
            const response = await axios.post(`${baseUrl}/api/v1/getUserDetails`, {
                user_id: userInfo.user_id
            });
            if (response.data.success) {
                setUserInfo((prevUserInfo) => ({
                    ...prevUserInfo,
                    total_coins: response.data.data.total_coins,
                    ton_coins: response.data.data.ton_coins,
                    // Добавьте другие свойства по необходимости
                }));
            }
        } catch (error) {
            console.error('Ошибка при получении данных пользователя:', error);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            fetchUserData();
        }, 10000); // Обновляем данные каждые 10 секунд

        return () => clearInterval(interval); // Очищаем интервал при размонтировании компонента
    }, [userInfo.user_id, setUserInfo]);

    return (
        <div className="coinInfoMainDiv">
            <div className="tonCoins">
                <div className="tonHeading">
                    Ton Coins
                </div>
                <div className="noOfCoins">
                    <div className="tonImg">
                        <img src={greyCoin} width={20} alt="Grey Coin" />
                    </div>
                    <div className="tonAmount">${userInfo.ton_coins}</div>
                </div>
            </div>
            <div className="goldCoins">
                <div className="goldHeading">
                    Gold Coins
                </div>
                <div className="noOfGoldCoins">
                    <div className="goldImg">
                        <img src={TonCoins} width={20} alt="Ton Coins" />
                    </div>
                    <div className="goldAmount">${userInfo.total_coins}</div>
                </div>
            </div>
        </div>
    );
};

export default CoinInfo;
