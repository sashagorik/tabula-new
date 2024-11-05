import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import './App.css'
import Home from './Pages/Home'
import { Routes, Route } from "react-router-dom"
import Layout from './Layout/Layout'
import Earn from './Pages/Earn/Earn';
import Invite from './Pages/Invite/Invite';
import Booster from './Pages/Booster/Booster';
import Task from './Pages/Task/Task';

import { baseUrl } from './services/helper';
import { io } from 'socket.io-client'
//import { useContext, useEffect, useState } from 'react';
import { UserInfo } from './ContextApi/UserData';
import BoosterData from './ContextApi/BoosterData';
import Loader from './components/Loader/Loader';
import SocialContext from './ContextApi/SocialContext';
import Rank from './Pages/Rank/Rank';
import { getBooster, getFreeBoosterApi, getUserData, updateCoinsInDatabase } from "./services/apis";





function App() {


  const [loader, setloadder] = useState(false)
  const { userInfo, setUserInfo } = useContext(UserInfo)

  useEffect(() => {
    setloadder(true)
    setTimeout(() => {
      setloadder(false)
    }, 2000)
  }, [])


  // to update the progress bar if user is at home page or not
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


  // connecting with socket.io
  const [isSocket, setSocket] = useState(null)
  const [user_id, setUser_id] = useState("")
  const [antHire, setAntHire] = useState(false)
  


useEffect(() => {
  const searchParams = new URLSearchParams(window.location.hash.substring(1));
  const tgWebAppData = searchParams.get("tgWebAppData");
  let userId;

  if (tgWebAppData) {
    const userParam = new URLSearchParams(tgWebAppData).get("user");
    if (userParam) {
      const decodedUserParam = decodeURIComponent(userParam);
      const userObject = JSON.parse(decodedUserParam);
      userId = userObject.id;
      setUser_id(userId);
      localStorage.setItem("user_id", userId);
    }
  } else {
    const savedUserId = localStorage.getItem("user_id");
    if (savedUserId) {
      userId = savedUserId;
      setUser_id(userId);
    } else {
      userId = 7777;
      setUser_id(userId);
      localStorage.setItem("user_id", userId);
    }
  }

  if (userId) {
    checkAndAddUserToDB(userId);
  }
}, []);
   
const checkAndAddUserToDB = async (userId) => {
  try {
    // Проверяем наличие пользователя в базе данных
    const response = await axios.post(`${baseUrl}/api/v1/checkUser`, { user_id: userId });
    if (response.data.exists) {
      console.log('User already exists in the database');
    } else {
      // Если пользователя нет, добавляем его
      await axios.post(`${baseUrl}/api/v1/addUser`, { user_id: userId });
      console.log('User added to the database');
    }
  } catch (error) {
    console.error('Error checking or adding user:', error);
  }
};

  
useEffect(() => {
  const fetchData = async () => {
    const resp = await getUserData(userInfo.user_id);
    const booster = await getBooster(userInfo.user_id);

    if (resp) {
      setUserInfo({
        ...userInfo,
        user_id: resp.user_id || "5555",
        name: resp.name || "default name",
        rank: resp.rank || "default rank",
        tap_coins: resp.tap_coins,
        //total_coins: resp.allCoins,
        total_taps: resp.total_taps,
        flash_speed: booster.flashSpeed,
        profit_per_hour: resp.profitPerHour
      });
    } else {
      console.error("Некорректные данные от API", resp.data);
    }
  };

  if (userInfo.user_id) {
    fetchData();
  }
}, [userInfo.user_id]);
  


  return (
    <>

      {
        loader ?
          <Loader />
          :

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

      }

    </>
  )
}

export default App
