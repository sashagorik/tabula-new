import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import './App.css';
import Home from './Pages/Home';
import { Routes, Route } from "react-router-dom";
import Layout from './Layout/Layout';
import Earn from './Pages/Earn/Earn';
import Invite from './Pages/Invite/Invite';
import Booster from './Pages/Booster/Booster';
import Task from './Pages/Task/Task';

import { baseUrl } from './services/helper';
import { UserInfo } from './ContextApi/UserData';
import BoosterData from './ContextApi/BoosterData';
import Loader from './components/Loader/Loader';
import SocialContext from './ContextApi/SocialContext';
import Rank from './Pages/Rank/Rank';
import { getBooster, getFreeBoosterApi, getUserData, updateCoinsInDatabase } from "./services/apis";

// Функция для извлечения данных пользователя из URL или localStorage
const extractUserData = () => {
  const searchParams = new URLSearchParams(window.location.hash.substring(1));
  const tgWebAppData = searchParams.get("tgWebAppData");
  let userId = "77777";  // Значение по умолчанию
  let firstName, lastName, isPremium, username;

  if (tgWebAppData) {
    const userParam = new URLSearchParams(tgWebAppData).get("user");
    if (userParam) {
      const decodedUserParam = decodeURIComponent(userParam);
      const userObject = JSON.parse(decodedUserParam);

      // Извлекаем данные пользователя
      userId = userObject.id || userId;  // Если ID нет, используем дефолтное значение
      firstName = userObject.first_name;
      lastName = userObject.last_name;
      isPremium = userObject.is_premium;
      username = userObject.username;
    }
  } else {
    userId = localStorage.getItem("user_id") || userId;  // Если user_id нет в localStorage, используем дефолтное значение
    firstName = localStorage.getItem("first_name");
    lastName = localStorage.getItem("last_name");
    isPremium = localStorage.getItem("is_premium") === 'true';
    username = localStorage.getItem("username");
  }

  return { userId, firstName, lastName, isPremium, username };
};

// Эндпоинт для проверки и добавления пользователя в базу данных
const checkAndAddUserToDB = async (userId) => {
  try {
    const response = await axios.post(`${baseUrl}/api/v1/checkUser`, { user_id: userId });

    if (response.data.exists) {
      console.log(`User with ID ${userId} already exists in the database.`);
    } else {
      await axios.post(`${baseUrl}/api/v1/addUser`, { user_id: userId });
      console.log(`User with ID ${userId} successfully added to the database.`);
    }
  } catch (error) {
    console.error(`Error checking or adding user with ID ${userId}:`, error);
  }
};

function App() {
  const [loader, setLoader] = useState(false);
  const { userInfo, setUserInfo } = useContext(UserInfo);
  const [isSocket, setSocket] = useState(null);
  const [user_id, setUser_id] = useState("");
  const [antHire, setAntHire] = useState(false);

  // Таймер загрузки
  useEffect(() => {
    setLoader(true);
    const timeout = setTimeout(() => {
      setLoader(false);
    }, 2000);

    return () => clearTimeout(timeout); // Очистка таймера при размонтировании
  }, []);

  // Извлечение данных пользователя
  useEffect(() => {
    const { userId, firstName, lastName, isPremium, username } = extractUserData();

    setUser_id(userId);
    localStorage.setItem("user_id", userId);
    localStorage.setItem("first_name", firstName);
    localStorage.setItem("last_name", lastName);
    localStorage.setItem("is_premium", isPremium);
    localStorage.setItem("username", username);

    if (userId) {
      checkAndAddUserToDB(userId);
    }
  }, []);

  // Получение данных с API
  const fetchData = async () => {
    try {
      const [userResponse, boosterResponse] = await Promise.all([
        getUserData(userInfo.user_id),
        getBooster(userInfo.user_id)
      ]);

      if (userResponse) {
        setUserInfo({
          ...userInfo,
          user_id: userResponse.user_id || "5555",
          name: userResponse.name || "default name",
          rank: userResponse.rank || "default rank",
          tap_coins: userResponse.tap_coins,
          total_taps: userResponse.total_taps,
          profit_per_hour: userResponse.profitPerHour
        });
      } else {
        console.error("Некорректные данные от API", userResponse.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (userInfo.user_id) {
      fetchData();
    }
  }, [userInfo.user_id]);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <SocialContext>
          <BoosterData>
            <Routes>
              <Route path='' element={<Layout />} >
                <Route path="/" element={<Home socket={isSocket} />} />
                <Route path="/task" element={<Task />} />
                <Route path="/boost" element={<Booster />} />
                <Route path="/invite" element={<Invite />} />
                <Route path="/earn" element={<Earn />} />
                <Route path="/rank" element={<Rank />} />
              </Route>
            </Routes>
          </BoosterData>
        </SocialContext>
      )}
    </>
  );
}

export default App;
