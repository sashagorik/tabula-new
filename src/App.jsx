import React, { useContext, useEffect, useState } from 'react';
import './App.css';
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
import Home from './Pages/Home';





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
     if (tgWebAppData) {
       const userParam = new URLSearchParams(tgWebAppData).get("user");
       if (userParam) {
         // Decode the user parameter
         const decodedUserParam = decodeURIComponent(userParam);
         // Parse the JSON to extract the user ID
         const userObject = JSON.parse(decodedUserParam);
         const userId = userObject.id;
         setUser_id(userId)
       }
     } else {
       // when user came from another page so we need to maintaina and save the id
       if (localStorage.getItem("user_id")) {
         setUser_id(localStorage.getItem("user_id"))
       }
     }
    }, []);



  //   setTimeout(() => {
  //     if (user_id) {
  //       // const socket = io.connect(`${baseUrl}`, { transports: ["websocket"] });
  //       const socket = io.connect("ws://192.168.29.43:5006", { transports: ["websocket"] });
  //       console.log(user_id)
  //       // making connection for hire ant
  //       socket.on('connect', () => {
  //         console.log(`Connected with socket ID: ${socket.id}`);
  //         socket.emit('join', { user_id: user_id });
  //       });
  //       setSocket(socket)
  //     }
  //   }, 1000)
  //   // console.log("socket", socket)
  // }, [])





  // to get the user id and setting the user_id




  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.hash.substring(1));
    const tgWebAppData = searchParams.get("tgWebAppData");
    if (tgWebAppData) {
      const userParam = new URLSearchParams(tgWebAppData).get("user");
      if (userParam) {
        // Decode the user parameter
        const decodedUserParam = decodeURIComponent(userParam);
        // Parse the JSON to extract the user ID
        const userObject = JSON.parse(decodedUserParam);
        const userId = userObject.id;
        setUser_id(userId);
        localStorage.setItem("user_id", userId);
      }
    } else {
      // when user came from another page so we need to maintain and save the id
      const savedUserId = localStorage.getItem("user_id");
      if (savedUserId) {
        setUser_id(savedUserId);
      }
    }
  }, []);



  // for ocket.connection and sending id 
  //useEffect(() => {
    //if (user_id) {
      // const socket = io.connect("ws://192.168.29.43:5006", { transports: ["websocket"] });
      //const socket = io.connect(`${baseUrl}`, { transports: ["websocket"] });
      //socket.on('connect', () => {
       // console.log(`Connected with socket ID: ${socket.id}`);
       // socket.emit('join', { user_id });
     // });
     // setSocket(socket);

      // getting details about ant hire
     // socket.on("response", (data) => {
     //   setAntHire(data.antHire)
     // })





      // Clean up on component unmount
   //   return () => {
  //      socket.disconnect();
   //   };
  //  }
 // }, []);



  // const updateHireAntCoin = () => {
  //   console.log("anthire",antHire)
  //   if (antHire) {
  //     isSocket.emit("hireAnt", `${user_id}, ${1}` );

  //     let updated_coins = userInfo.hireAntCoins + 1 
  //     // setUserInfo((prevUserInfo) => ({...prevUserInfo, total_coins: updated_coins }));
  //     setUserInfo((prevUserInfo) => ({...prevUserInfo, hireAntCoins: updated_coins }));
  //     // console.log(userInfo)
  //     setTimeout(() => {
  //       updateHireAntCoin()
  //     }, 3000)
  //     console.log("hitted")
  //   }
  // }

  // useEffect(() => {
  //   updateHireAntCoin()
  // }, [antHire]);





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
