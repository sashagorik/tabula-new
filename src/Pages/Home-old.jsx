import { useContext, useEffect, useState, useCallback } from "react";
import io from 'socket.io-client';
import coin from "../assets/coin3.svg";
import { Tilt } from "react-tilt";
import { getBooster, getFreeBoosterApi, getUserData } from "../services/apis";
import ProgressBar from "react-bootstrap/ProgressBar";
import porgressIcon from "../assets/progressIcon.svg";
import CoinInfo from "../components/CoinInfo/CoinInfo";
import OrangeImg from "../assets/orange.svg";
import { UserInfo } from "../ContextApi/UserData";
import newbiewsAnim from "../assets/Char/newbiesAnim.png";
import cadetAnim from "../assets/Char/cadetAnim.png";
import captainAnim from "../assets/Char/captainAnim.png";
import colonelAnim from "../assets/Char/colonelAnim.png";
import generalAnim from "../assets/Char/generalAnim.png";
import lieutenantAnim from "../assets/Char/lieutenantAnim.png";
import majorAnim from "../assets/Char/majorAnim.png";
import officerAnim from "../assets/Char/officerAnim.png";
import queenAnim from "../assets/Char/queenAnim.png";
import brigadierAnim from "../assets/Char/brigadierAnim.png";

const Home = ({ socket }) => {
  const [totalCoins, setTotalCoins] = useState(0);
  const { userInfo, setUserInfo } = useContext(UserInfo);
  const [isAnimating, setIsAnimating] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [clicks, setClicks] = useState([]);
  const [coinStyle, setCoinStyle] = useState({});

  const getUserIdFromUrl = useCallback(() => {
    const searchParams = new URLSearchParams(window.location.hash.substring(1));
    const tgWebAppData = searchParams.get("tgWebAppData");
    if (tgWebAppData) {
      const userParam = new URLSearchParams(tgWebAppData).get("user");
      if (userParam) {
        const decodedUserParam = decodeURIComponent(userParam);
        const userObject = JSON.parse(decodedUserParam);
        return userObject.id;
      }
    }
    return localStorage.getItem("user_id");
  }, []);

  const fetchUserData = useCallback(async (userId) => {
    try {
      const resp = await getUserData(userId);
      const booster = await getBooster(userId);
      const getFreeBoost = await getFreeBoosterApi(userId);

      const updatedUserInfo = {
        ...userInfo,
        name: resp.data.name,
        rank: resp.data.currentLevel,
        no_of_taps: resp.data.totalTap,
        total_coins: resp.data.totalCoin,
        tap_coins: booster.data.multiTap,
        total_taps: booster.data.firelimit * 500,
        flash_speed: booster.data.flashSpeed,
        recharge: 3 - getFreeBoost.data.recharge,
        turbo: 3 - getFreeBoost.data.turbo,
        allCoins: resp.data.coin
      };

      if (getFreeBoost.data.turbo) {
        const totalTap = (3 - getFreeBoost.data.turbo) * 5 * booster.data.multiTap;
        updatedUserInfo.tap_coins = totalTap;
      }

      setUserInfo(updatedUserInfo);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [setUserInfo, userInfo]);

  useEffect(() => {
    const userId = getUserIdFromUrl();
    if (userId) {
      localStorage.setItem("user_id", userId);
      setUserInfo((prev) => ({ ...prev, user_id: userId }));
      fetchUserData(userId);
    }
  }, [getUserIdFromUrl, fetchUserData, setUserInfo]);

  useEffect(() => {
    if (userInfo.user_id && userInfo.isTurbo) {
      const fetchTurboData = async () => {
        try {
          const booster = await getBooster(userInfo.user_id);
          const getFreeBoost = await getFreeBoosterApi(userInfo.user_id);

          if (getFreeBoost.data && (3 - getFreeBoost.data.turbo) !== 0) {
            const totalTap = (3 - getFreeBoost.data.turbo) * 5 * booster.data.multiTap;
            setUserInfo((prevUserInfo) => ({ ...prevUserInfo, tap_coins: totalTap }));
          }
        } catch (error) {
          console.error("Error fetching turbo data:", error);
        }
      };
      fetchTurboData();
    }
  }, [userInfo.user_id, userInfo.isTurbo, setUserInfo]);

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

  const handleInteraction = (x, y, width, height) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const tiltX = ((centerY - y) / centerY) * 20;
    const tiltY = ((x - centerX) / centerX) * 20;

    setCoinStyle({
      transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1)`,
      transition: "transform 0.1s ease-in-out",
    });

    setTimeout(() => {
      setCoinStyle({
        transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
        transition: "transform 0.1s ease-in-out",
      });
    }, 200);
  };

  const handleTap = () => {
    if (userInfo.used_taps > 0) {
      setUserInfo((prevTapsInfo) => ({
        ...prevTapsInfo,
        used_taps: prevTapsInfo.used_taps - 1,
      }));
    }
  };
  //const socket = io('http://localhost:3001');
  const handleClick = (e) => {
    if (userInfo.used_taps > 0) {
      socket.emit("message", `${userInfo.user_id}, ${userInfo.tap_coins}`);
      const newTotalCoins = userInfo.total_coins + userInfo.tap_coins;
      setUserInfo((prev) => ({ ...prev, total_coins: newTotalCoins }));
      handleTap();

      const coinRect = e.target.getBoundingClientRect();
      handleInteraction(
        e.clientX - coinRect.left,
        e.clientY - coinRect.top,
        coinRect.width,
        coinRect.height
      );

      updateUserCoinsOnServer(userInfo.user_id, newTotalCoins);
    }
  };

  const handleTouchStart = (e) => {
    if (navigator.vibrate) {
      navigator.vibrate([50]);
    } else {
      window.Telegram?.WebApp?.HapticFeedback.impactOccurred("medium");
    }

    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    }

    socket.emit("message", `${userInfo.user_id}, ${userInfo.tap_coins}`);

    setClickCount((prev) => {
      const newClickCount = prev + e.touches.length;
      return newClickCount;
    });

    if (clickCount >= 5) {
      setShowAnimKeyword(true);
    } else {
      setShowAnimKeyword(false);
    }

    const coinRect = e.target.getBoundingClientRect();
    handleInteraction(
      e.touches[0].clientX - coinRect.left,
      e.touches[0].clientY - coinRect.top,
      coinRect.width,
      coinRect.height
    );

    if (userInfo.used_taps > 0) {
      const newTotalCoins = userInfo.total_coins + userInfo.tap_coins;
      setUserInfo((prev) => ({ ...prev, total_coins: newTotalCoins }));
      handleTap();

      updateUserCoinsOnServer(userInfo.user_id, newTotalCoins);
    }
  };

  const updateUserCoinsOnServer = async (userId, newTotalCoins) => {
    try {
      const response = await fetch('http://localhost:3001/update-coins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, coins: newTotalCoins })
      });

      if (!response.ok) {
        throw new Error('Failed to update coins on the server.');
      }
    } catch (error) {
      console.error("Error updating coins on server:", error);
    }
  };

  return (
    <div className="container-fluid justify-content-center d-flex flex-column align-items-center">
      <div className="align-items-center justify-content-center d-flex row home-header-section">
        <div className="col-12">
          <div className="col-12  d-flex justify-content-center align-items-center mt-5  flex-column">
            <div className="col-12 text-center">
              <h3 className="home-header-title">
                Welcome to the Booster Coin Game
              </h3>
              <p className="home-header-title-subtext">
                Tap on the coin to earn points and increase your score!
              </p>
            </div>
            <div className="col-12 col-md-6 col-lg-4 home-coin-container">
              <img
                src={coin}
                alt="coin"
                className="home-coin"
                onClick={handleClick}
                onTouchStart={handleTouchStart}
                style={coinStyle}
              />
            </div>
          </div>
          <div className="progress-container mt-3 col-12">
            <img src={porgressIcon} alt="progressIcon" className="progressIcon" />
            <ProgressBar
              className="tap-progressbar"
              now={(userInfo.used_taps / userInfo.total_taps) * 100}
            />
          </div>
          <div className="d-flex justify-content-between progressInfo col-12">
            <p>Taps Left</p>
            <p>Coins Earned</p>
          </div>
        </div>
      </div>
      <CoinInfo coinImg={OrangeImg} title="Total Coins" value={totalCoins} />
      <div className="animation-container">
        {isAnimating && (
          <img
            src={clickCount < 5 ? newbiewsAnim : queenAnim}
            alt="animation"
            className="animation-img"
          />
        )}
      </div>
    </div>
  );
};

export default Home;
