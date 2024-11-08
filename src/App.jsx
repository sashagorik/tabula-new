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
const checkAndAddUserToDB = async (userData) => {
  try {
    const response = await axios.post(`${baseUrl}/api/v1/checkUser`, { user_id: userData.userId });

    if (response.data.exists) {
      console.log(`User with ID ${userData.userId} already exists in the database.`);
    } else {
      // Отправляем все данные пользователя при добавлении
      await axios.post(`${baseUrl}/api/v1/addUser`, {
        user_id: userData.userId,
        firstName: userData.firstName,
        lastName: userData.lastName,
        username: userData.username,
        isPremium: userData.isPremium,
        totalCoins: 0,  // Значение по умолчанию
        profitPerHour: 0.00  // Значение по умолчанию
        
        

      });
      
    }
  } catch (error) {
    console.error(`Error checking or adding user with ID ${userData.userId}:`, error);
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
    const userData = extractUserData();
    setUser_id(userData.userId);
    localStorage.setItem("user_id", userData.userId);
    localStorage.setItem("first_name", userData.firstName);
    localStorage.setItem("last_name", userData.lastName);
    localStorage.setItem("is_premium", userData.isPremium);
    localStorage.setItem("username", userData.username);
  
    if (userData.userId) {
      checkAndAddUserToDB(userData);
    }
  }, []);

  // Получение данных с API
  const fetchData = async () => {
    try {
      // Получаем данные пользователя
      const userResponse = await getUserData(localStorage.user_id);
      if (userResponse) {
        setUserInfo(prevState => ({
          ...prevState,
          user_id: userResponse.user_id || "5555",
          firstName: userResponse.first_name || "default rank",
          lastName: userResponse.last_name,
          username: userResponse.name || "default name",
          isPremium: userResponse.isPremium,
          registrationDate: userResponse.registrationDate,
          lastLoginDate: userResponse.lastLoginDate,
          totalCoins: userResponse.totalCoins,
          profitPerHour: userResponse.profitPerHour,
        }));
  
        // Сохраняем данные в localStorage
        localStorage.setItem("user_id", userResponse.user_id);
        localStorage.setItem("first_name", userResponse.first_name);
        localStorage.setItem("last_name", userResponse.last_name);
        localStorage.setItem("username", userResponse.name);
        localStorage.setItem("is_premium", userResponse.isPremium);
        localStorage.setItem("totalCoins", userResponse.totalCoins);
        localStorage.setItem("profitPerHour", userResponse.profitPerHour);
      } else {
        console.error("Некорректные данные от API", userResponse);
      }
  
      // Получаем данные бустера
     // const boosterResponse = await getBooster(userInfo.user_id);
     //if (boosterResponse) {
       // console.log("Booster data:", boosterResponse);
        // Логика работы с boosterResponse, если необходимо
     //} else {
      //  console.error("Некорректные данные от API для бустера", boosterResponse);
    //  }
  
    } catch (error) {
      console.error("Error fetching data:", error.response || error);
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
