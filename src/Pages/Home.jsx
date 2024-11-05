import React, { useContext, useEffect, useState } from "react";
import minebuttongreen from "../assets/minebuttongreen.svg";
import minebuttongrey from "../assets/minebuttongrey.svg";
import { getUserData, getBooster } from "../services/apis";
import ProgressBar from "react-bootstrap/ProgressBar";
import progressIcon from "../assets/progressIcon.svg";
import CoinInfo from "../components/CoinInfo/CoinInfo";
import { UserInfo } from "../ContextApi/UserData";

const Home = () => {
  const { userInfo, setUserInfo } = useContext(UserInfo);
  const [mineStatus, setMineStatus] = useState("offline");
  const [countdown, setCountdown] = useState(null);
  const [buttonImage, setButtonImage] = useState(minebuttongreen);

  const toggleMining = () => {
    if (mineStatus === "offline") {
      setMineStatus("online");
      setButtonImage(minebuttongreen);
      setCountdown(100); // Устанавливаем 10-секундный обратный отсчёт
    } else {
      setMineStatus("offline");
      setButtonImage(minebuttongreen);
      setCountdown(null);
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

  useEffect(() => {
    const fetchData = async () => {
      const resp = await getUserData(userInfo.user_id);
      const booster = await getBooster(userInfo.user_id);

      if (resp) {
        setUserInfo({
          ...userInfo,
          name: resp.name || "default name",
          rank: resp.rank || "default rank",
          tap_coins: resp.tap_coins,
          total_coins: resp.allCoins,
          total_taps: resp.total_taps,
          flash_speed: booster.flashSpeed,
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
