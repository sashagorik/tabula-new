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
// import { io } from 'socket.io-client';
import { UserInfo } from './ContextApi/UserData';
import BoosterData from './ContextApi/BoosterData';
import Loader from './components/Loader/Loader';
import SocialContext from './ContextApi/SocialContext';
import Rank from './Pages/Rank/Rank';

function App() {
  const [loader, setLoader] = useState(false);
  const { userInfo, setUserInfo } = useContext(UserInfo);
  const [user_id, setUser_id] = useState("");

  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);

  // Обновление прогресса каждый раз, когда пользователь на главной странице
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
  }, [userInfo, setUserInfo]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.hash.substring(1));
    const tgWebAppData = searchParams.get("tgWebAppData");
    if (tgWebAppData) {
      const userParam = new URLSearchParams(tgWebAppData).get("user");
      if (userParam) {
        const decodedUserParam = decodeURIComponent(userParam);
        const userObject = JSON.parse(decodedUserParam);
        const userId = userObject.id;
        setUser_id(userId);
        localStorage.setItem("user_id", userId);
      }
    } else {
      const savedUserId = localStorage.getItem("user_id");
      if (savedUserId) {
        setUser_id(savedUserId);
      }
    }
  }, []);

  // Подключение к socket.io и отправка user_id
  // useEffect(() => {
  //   if (user_id) {
  //     const socket = io.connect(`${baseUrl}`, { transports: ["websocket"] });
  //     socket.on('connect', () => {
  //       console.log(`Connected with socket ID: ${socket.id}`);
  //       socket.emit('join', { user_id });
  //     });
  //     setSocket(socket);

  //     socket.on("response", (data) => {
  //       setAntHire(data.antHire);
  //     });

  //     return () => {
  //       socket.disconnect();
  //     };
  //   }
  // }, [user_id]);

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
