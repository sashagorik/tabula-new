import React, { useContext, useEffect, useState } from 'react';
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
import axios from 'axios';

function App() {
  const [loader, setLoader] = useState(false);
  const { userInfo, setUserInfo } = useContext(UserInfo);

  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (userInfo.used_taps < userInfo.total_taps) {
        setUserInfo((prevTapsInfo) => ({
          ...prevTapsInfo,
          used_taps: Math.min(
            prevTapsInfo.used_taps + userInfo.flash_speed,
            prevTapsInfo.total_taps
          ),
        }));
      }
    }, 2000);

    return () => clearInterval(intervalId);
  }, [userInfo]);

  const [user_id, setUser_id] = useState("");

  useEffect(() => {
    const getUserId = () => {
      const searchParams = new URLSearchParams(window.location.hash.substring(1));
      const tgWebAppData = searchParams.get("tgWebAppData");
      let userId = null;

      if (tgWebAppData) {
        const userParam = new URLSearchParams(tgWebAppData).get("user");
        if (userParam) {
          // Декодируем параметр пользователя
          const decodedUserParam = decodeURIComponent(userParam);
          // Парсим JSON, чтобы извлечь ID пользователя
          const userObject = JSON.parse(decodedUserParam);
          userId = userObject.id;
        }
      }

      if (!userId) {
        // Генерируем временный ID пользователя, если он не найден
        const getRandomUserId = () => {
          return Math.floor(Math.random() * 9999) + 1;
        };
        userId = `${getRandomUserId()}`;
        localStorage.setItem("user_id", userId);
      }

      if (userId) {
        setUser_id(userId);
        localStorage.setItem("user_id", userId);
      }

      return userId;
    };

    const fetchData = async (userId) => {
      try {
        // Проверяем наличие пользователя в базе данных
        let response = await axios.get(`${baseUrl}/api/v1/checkUser`, { params: { user_id: userId } });

        // Если пользователя нет, добавляем его
        if (!response.data.exists) {
          await axios.post(`${baseUrl}/api/v1/createUser`, { user_id: userId });
        }

        // Получаем данные пользователя
        response = await axios.get(`${baseUrl}/api/v1/getUserDetails`, { params: { user_id: userId } });
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const userId = getUserId();
    if (userId) {
      fetchData(userId);
    }
  }, [setUserInfo]);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <SocialContext>
          <BoosterData>
            <Routes>
              <Route path='' element={<Layout />} >
                <Route path="/" element={<Home />} />
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
