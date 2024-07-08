import React, { useEffect, useState } from "react";
import axios from "axios";
import CoinInfo from "../components/CoinInfo/CoinInfo";
import ProgressBar from "react-bootstrap/ProgressBar";
import progressIcon from "../assets/progressIcon.svg";
import coin from "../assets/coin3.svg";

import { baseUrl } from "../services/helper";

const Home = ({ userId }) => {
  const [userInfo, setUserInfo] = useState({
    user_id: '',
    name: '',
    total_coins: 0,
    used_taps: 100,
    total_taps: 100,
  });

  useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        const response = await axios.get(`${baseUrl}/api/v1/userDetails?user_id=${userId}`);
        if (response.data.success) {
          const userData = response.data.data;
          if (!userData) {
            const newUser = { user_id: userId };
            const createResponse = await axios.post(`${baseUrl}/api/v1/userDetails`, newUser);
            if (createResponse.data.success) {
              return createResponse.data.data;
            } else {
              console.error('Failed to create new user:', createResponse.data.error);
              return null;
            }
          } else {
            return userData;
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
      }
    };

    const initializeUser = async () => {
      const storedUserId = localStorage.getItem('user_id');
      const currentUserId = storedUserId || userId;

      const userData = await fetchUserData(currentUserId);
      if (userData) {
        setUserInfo(userData);
        if (!storedUserId) {
          localStorage.setItem('user_id', currentUserId);
        }
      }
    };

    initializeUser();
  }, [userId]);

  const [coinStyle, setCoinStyle] = useState({});
  const [clicks, setClicks] = useState([]);

  const saveUserData = async (userData) => {
    try {
      const response = await axios.post(`${baseUrl}/api/v1/userDetails`, userData);
      console.log('User data saved:', response.data);
      localStorage.setItem('user_id', userData.user_id);
      localStorage.setItem('name', userData.name);
      return response.data.data;
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const handleClick = () => {
    if (userInfo.used_taps > 0) {
      const coinsToAdd = userInfo.no_of_taps || 1; // Используем значение по умолчанию, если no_of_taps не определен
      setClicks((prevClicks) => [
        ...prevClicks,
        {
          left: Math.random() * window.innerWidth,
          top: Math.random() * window.innerHeight,
        },
      ]);

      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        total_coins: prevUserInfo.total_coins + coinsToAdd,
        used_taps: prevUserInfo.used_taps - 1,
      }));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setUserInfo((prevUserInfo) => {
        if (prevUserInfo.used_taps < prevUserInfo.total_taps) {
          const updatedUsedTaps = prevUserInfo.used_taps + 1;
          localStorage.setItem('used_taps', updatedUsedTaps.toString());
          return {
            ...prevUserInfo,
            used_taps: updatedUsedTaps,
          };
        }
        return prevUserInfo;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const saveInterval = setInterval(() => {
      saveUserData(userInfo);
    }, 1000);

    return () => clearInterval(saveInterval);
  }, [userInfo]);

  return (
    <>
      <div className="coinDiv">
        <CoinInfo />
        <div className="totalCoins">{userInfo.total_coins}</div>
        <div className="orangeImg">
          {/* Placeholder for energy icon */}
          {/* <img src={OrangeImg} className="orgImg" /> */}
        </div>
        <div className="charAnim"
          onClick={userInfo.used_taps > 0 ? handleClick : undefined}
          style={coinStyle}>
          <img
            src={coin}
            className="coinTest"
            tabIndex="0"
            role="button"
            aria-pressed="false"
            alt="Coin"
          />
        </div>
        {clicks.map((click, index) => (
          <div
            key={index}
            className="rs"
            style={{
              left: `${click.left}px`,
              top: `${click.top - 120}px`,
              animation: `fadeOut 0.9s forwards`,
            }}
          >
            +{userInfo.no_of_taps || 1} {/* Используем значение по умолчанию, если no_of_taps не определен */}
          </div>
        ))}
        <div className="progressBar">
          <div className="progressText">
            <div className="progressRank">
              {userInfo.rank} {/* Placeholder for user rank */}
            </div>
            <div className="Progressicon mx-2">
              <img src={progressIcon} width={15} alt="Progress Icon" />
              <div className="text-white">
                <span className="points">{userInfo.used_taps}</span> /{" "}
                {userInfo.total_taps}
              </div>
            </div>
          </div>
          <ProgressBar
            now={(userInfo.used_taps / userInfo.total_taps) * 100}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
