import { useEffect, useState } from "react";
import coin from "../assets/coinn3.png";
import { Tilt } from "react-tilt";
import { getUserData } from "../services/apis";
import ProgressBar from "react-bootstrap/ProgressBar";
import porgressIcon from "../assets/progressIcon.svg";
import CoinInfo from "../components/CoinInfo/CoinInfo";
import OrangeImg from "../assets/orange.png"
const Home = ({ socket }) => {
  const [userId, setUserId] = useState("");
  const [userdata, setUserData] = useState([]);
  const [totalCoins, setTotalCoins] = useState(0);
  const [tapsInfo, setTapsInfo] = useState({
    total_taps: 50,
    used_taps: 50,
  });

  useEffect(() => {
    // fetching the User Id from URL given by Telegram App
    const searchParams = new URLSearchParams(window.location.hash.substring(1));
    const tgWebAppData = searchParams.get("tgWebAppData");

    // console.log("searchParams", searchParams)

    // localStorage.setItem("tgWebAppUrl", "/#tgWebAppData="+tgWebAppData)

    if (tgWebAppData) {
      // Extract the 'user' parameter from tgWebAppData
      const userParam = new URLSearchParams(tgWebAppData).get("user");

      if (userParam) {
        // Decode the user parameter
        const decodedUserParam = decodeURIComponent(userParam);

        // Parse the JSON to extract the user ID
        const userObject = JSON.parse(decodedUserParam);
        const userId = userObject.id;

        // Set the user ID in the state
        setUserId(userId);
      }
    }

    // sending request if user_id is set and getting the user data
    if (userId) {
      getData();
    }
  }, [userId]);

  // to fetch user data
  const getData = async () => {
    // const config = { "access_token": "oiemrhgjmxofiknsgaSFvnrdceastvatg" }
    const resp = await getUserData(userId);
    console.log(resp);
    localStorage.setItem("user_name", resp.data.name);
    localStorage.setItem("user_rank", resp.data.currentLevel);
    localStorage.setItem("user_coins", resp.data.totalCoin);
    // alert( resp.data.name)
    setTotalCoins(resp.data.totalCoin);
    setUserData(resp.data.name);
  };

  // setting clicks
  const [clicks, setClicks] = useState([]);
  const [coinStyle, setCoinStyle] = useState({});

  const handleInteraction = (x, y, width, height) => {
    const centerX = width / 2;
    const centerY = height / 2;

    const tiltX = ((centerY - y) / centerY) * 20;
    const tiltY = ((x - centerX) / centerX) * 20;

    setCoinStyle({
      transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1)`,
      transition: "transform 0.1s ease-in-out",
    });

    // Reset the coin style after a delay
    setTimeout(() => {
      setCoinStyle({
        transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
        transition: "transform 0.1s ease-in-out",
      });
    }, 100);
  };

  // getting tap again
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (tapsInfo.used_taps < tapsInfo.total_taps) {
        setTapsInfo((prevTapsInfo) => ({
          ...prevTapsInfo,
          used_taps: Math.min(
            prevTapsInfo.used_taps + 1,
            prevTapsInfo.total_taps
          ),
        }));
      }
    }, 2000); // 1000ms = 1 second

    return () => clearInterval(intervalId);
  }, [tapsInfo]);

  const handleTap = () => {
    if (tapsInfo.used_taps > 0) {
      setTapsInfo((prevTapsInfo) => ({
        ...prevTapsInfo,
        used_taps: prevTapsInfo.used_taps - 1,
      }));
    }
  };

  // handling when clicking
  const handleClick = async (e) => {
    // updating coins in db using Socket.io
    socket.emit("message", userId);

    // adding coins+
    // let coin = parseInt(totalCoins) + 1;
    // setTotalCoins(coin);
    // localStorage.setItem("user_coins", totalCoins + 1);
    const newTotalCoins = totalCoins + 1;
    setTotalCoins(newTotalCoins);
    localStorage.setItem("user_coins", newTotalCoins);

    // adding taps
    handleTap();

    // getting +2 position whener use clicked to make +2 position
    const coinRect = e.target.getBoundingClientRect();
    handleInteraction(
      e.clientX - coinRect.left,
      e.clientY - coinRect.top,
      coinRect.width,
      coinRect.height
    );
  };

  // facing issue while tapping with 2 fingure that is solution
  const handleTouchStart = (e) => {
    // vibration for android and ios both
    const navigatorVibrate =
      navigator.vibrate ||
      navigator.webkitVibrate ||
      navigator.mozVibrate ||
      navigator.msVibrate;
    if (navigatorVibrate) {
      navigatorVibrate.call(navigator, [50]);
    } else {
      window.Telegram?.WebApp?.HapticFeedback.impactOccurred("medium");
    }

    // on touch showing +2
    const coinRect = e.target.getBoundingClientRect();
    Array.from(e.touches).forEach((touch) => {
      const touchX = touch.clientX - coinRect.left;
      const touchY = touch.clientY - coinRect.top;
      handleInteraction(touchX, touchY, coinRect.width, coinRect.height);
      setClicks((prevClicks) => [
        ...prevClicks,
        { left: touch.clientX, top: touch.clientY },
      ]);
    });
  };

  // for tilt animations
  const defaultOptions = {
    reverse: true,
    speed: 10,
    axis: null,
    reset: true,
    easing: "cubic-bezier(.03,.98,.52,.99)",
    scale: 1,
  };

  //   useEffect(() => {
  //     let coin = localStorage.getItem("user_coins");
  //     coin = parseInt(coin);
  //     console.log(typeof parseInt(coin));
  //     setTotalCoins(localStorage.getItem("user_coins"));
  //   }, [window.location.href]);
  useEffect(() => {
    const storedCoins = localStorage.getItem("user_coins");
    const parsedCoins = parseInt(storedCoins, 10);
    if (!isNaN(parsedCoins)) {
      setTotalCoins(parsedCoins);
    }
  }, []);

  // console.log("User id ", userId)
  // console.log("User data ", userdata)

  // console.log(tapsInfo)

  return (
    <>
      <div className="coinDiv">
        {/* ton and gol coin info */}
        <CoinInfo />

        {/* total no of coins */}
        <div className="totalCoins">${totalCoins}</div>

        {/* coin with animation */}

          {/* backgorund Orange Img */}
          <div className="orangeImg">
           
         </div>

          <Tilt options={defaultOptions}>
            <img
              src={coin}
              className="coinTest"
              onClick={tapsInfo.used_taps > 0 ? handleClick : ""}
              onTouchStart={tapsInfo.used_taps > 0 ? handleTouchStart : ""}
              style={coinStyle}
              tabIndex="0"
              role="button"
              aria-pressed="false"
            />
          </Tilt>

        {/* printing +2 multiple time according to tap */}
        {clicks.map((click, index) => (
          <div
            key={index}
            className="rs"
            style={{
              left: `${click.left}px`,
              top: `${click.top - 120}px`,
              animation: `fadeOut 2s forwards`,
            }}
          >
            +1
          </div>
        ))}

        {/* progress Bar */}
        <div className="progressBar">
          <div className="progressText">
            <div className="Progressicon mx-2">
              <img src={porgressIcon} width={15} />
            </div>
            <div className="text-white">
              <span className="points"> {tapsInfo.used_taps} </span> /{" "}
              {tapsInfo.total_taps}
            </div>
          </div>
          <ProgressBar now={(tapsInfo.used_taps / tapsInfo.total_taps) * 100} />
        </div>
      </div>
    </>
  );
};

export default Home;
