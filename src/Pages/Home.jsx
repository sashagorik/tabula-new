import React, { useContext, useEffect, useState } from "react";
import minebuttongreen from "../assets/minebuttongreen.svg";
import minebuttongrey from "../assets/minebuttongrey.svg";
import { getUserData, getBooster } from "../services/apis";
import ProgressBar from "react-bootstrap/ProgressBar";
import progressIcon from "../assets/progressIcon.svg";
import CoinInfo from "../components/CoinInfo/CoinInfo";
import { UserInfo } from "../ContextApi/UserData";
import MinersList from "../components/Myminers/MinerList";

const Home = () => {
  const { userInfo, setUserInfo } = useContext(UserInfo);
  const [mineStatus, setMineStatus] = useState("offline");
  const [countdown, setCountdown] = useState(null);
  const [buttonImage, setButtonImage] = useState(minebuttongreen);

  

  const toggleMining = async () => {
    if (mineStatus === "offline") {
      setMineStatus("online");
      setButtonImage(minebuttongreen);
      setCountdown(100); // Устанавливаем 10-секундный обратный отсчёт
      
      
      

    } else {
      //setMineStatus("offline");
      //setButtonImage(minebuttongreen);
      //setCountdown(null);
    }
  };

  useEffect(() => {
    if (countdown === null || countdown <= 0) {
      setMineStatus("offline");
      setButtonImage(minebuttongrey);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  

  return (
    <>
      <div className="coinDiv">
        <CoinInfo />
        
        <div className="totalCoins">${userInfo.total_coins}</div>

        <div className="charAnim">
          <img
            src={buttonImage}
            className="coinTest"
            alt="Mining Button"
          />


        </div>

        <div className="mineStatus" style={{ color: mineStatus === "online" ? "green" : "red" }}>
          Mine status: {mineStatus}
        </div>

        <button onClick={toggleMining} className="startMiningButton" style={{ marginTop: '-50px' }}>
          {mineStatus === "offline" ? "Start Mining" : countdown ? `Stop (${countdown}s)` : "Stop Mining"}
        </button>

        
      </div>
    </>
  );
};

export default Home;
