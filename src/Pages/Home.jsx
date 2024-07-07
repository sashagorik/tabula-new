import React, { useContext, useEffect, useState } from 'react';
import { UserInfo } from '../ContextApi/UserData';
import { baseUrl } from '../services/helper';
import axios from 'axios';
import './Home.css';

const Home = ({ socket }) => {
  const { userInfo, setUserInfo } = useContext(UserInfo);
  const [coins, setCoins] = useState(userInfo.total_coins || 0);
  const [taps, setTaps] = useState(userInfo.total_taps || 0);
  
  // Fetch user data from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/user/${userInfo.user_id}`);
        const data = response.data;
        setUserInfo(data);
        setCoins(data.total_coins);
        setTaps(data.total_taps);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [userInfo.user_id, setUserInfo]);

  // Function to update coin count
  const handleCollectCoin = async () => {
    try {
      const response = await axios.post(`${baseUrl}/api/user/collect`, { user_id: userInfo.user_id });
      const { total_coins } = response.data;
      setCoins(total_coins);
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        total_coins,
      }));
    } catch (error) {
      console.error('Error collecting coins:', error);
    }
  };

  return (
    <div className="home">
      <h1>Welcome, {userInfo.name}</h1>
      <div className="stats">
        <p>Total Coins: {coins}</p>
        <p>Total Taps: {taps}</p>
      </div>
      <button onClick={handleCollectCoin}>Collect Coin</button>
    </div>
  );
};

export default Home;
