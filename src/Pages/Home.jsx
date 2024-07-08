import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import coin from "../assets/coin3.svg";
import { Tilt } from "react-tilt";
import { getBooster, getFreeBoosterApi, getUserData } from "../services/apis";
import ProgressBar from "react-bootstrap/ProgressBar";
import pogressIcon from "../assets/progressIcon.svg";
import CoinInfo from "../components/CoinInfo/CoinInfo";
import OrangeImg from "../assets/orange.svg"
import { UserInfo } from "../ContextApi/UserData";
// import char from "../assets/Char/newbies.svg"
import newbiewsAnim from "../assets/Char/newbiesAnim.png"
import cadetAnim from "../assets/Char/cadetAnim.png"
import captainAnim from "../assets/Char/captainAnim.png"
import colonelAnim from "../assets/Char/colonelAnim.png"
import generalAnim from "../assets/Char/generalAnim.png"
import lieutenantAnim from "../assets/Char/lieutenantAnim.png"
import majorAnim from "../assets/Char/majorAnim.png"
import officerAnim from "../assets/Char/officerAnim.png"
import queenAnim from "../assets/Char/queenAnim.png"
import brigadierAnim from "../assets/Char/brigadierAnim.png"
import { baseUrl } from "../services/helper";



const Home = ({ socket }) => {
  const [totalCoins, setTotalCoins] = useState(0);
  const { userInfo, setUserInfo } = useContext(UserInfo)



  // at time of animation displaying the charcter pain animation 
  const [isAnimating, setIsAnimating] = useState(false);
  // const [showAnimKeyword, setShowAnimKeyword] = useState(false);
  // // console.log(showAnimKeyword)
   const [clickCount, setClickCount] = useState(0);



  useEffect(() => {
    // fetching the User Id from URL given by Telegram App
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
        // Set the user ID in the state
        localStorage.setItem("user_id", userId)
        setUserInfo({ ...userInfo, user_id: userId })
      }
    } else {
      // when user came from another page so we need to maintaina and save the id
      if (localStorage.getItem("user_id")) {
        setUserInfo({ ...userInfo, user_id: localStorage.getItem("user_id") })
      }
    }

    // sending request if user_id is set and getting the user data
    if (userInfo.user_id) {
      getData();
    }
  }, [userInfo.user_id]);


  // console.log(userInfo.user_id)

  // to fetch user data
  const getData = async () => {
    const resp = await getUserData(userInfo.user_id);
    const booster = await getBooster(userInfo.user_id)
    const getFreeBoost = await getFreeBoosterApi(userInfo.user_id)
    // console.log(getFreeBoost.data.turbo)

    // console.log(userInfo)
    setUserInfo({
      ...userInfo,
      name: resp.data.name,
      rank: resp.data.currentLevel,
      no_of_taps: resp.data.totalTap,
      total_coins: resp.data.totalCoin,
      tap_coins: booster.data.multiTap,
      total_taps: (booster.data.firelimit * 500),
      // used_taps: (booster.data.firelimit * 500),
      flash_speed: booster.data.flashSpeed,
      recharge: (3 - getFreeBoost.data.recharge),
      turbo: (3 - getFreeBoost.data.turbo),
      allCoins: resp.data.coin
    })

    // // for turbo functioanlity

     setTimeout(() => {
       console.log(getFreeBoost)
       if (getFreeBoost.data.turbo) {
         // console.log("yess")
         if ((3 - (getFreeBoost.data.turbo)) !== 0) {
           let totalTap = ((3 - getFreeBoost.data.turbo) * 5 * booster.data.multiTap)
           setUserInfo({ ...userInfo, tap_coins: totalTap })
           // console.log(totalTap);
         }
       }
     }, 1000)


  };


  // turbo functioanlities
  const getTurboData = async () => {


    // console.log(userInfo.isTurbo)

    try {
      if (userInfo.isTurbo) {
        const booster = await getBooster(userInfo.user_id);
        const getFreeBoost = await getFreeBoosterApi(userInfo.user_id);

        if (getFreeBoost.data && (3 - getFreeBoost.data.turbo) !== 0) {
          let totalTap = (3 - getFreeBoost.data.turbo) * 5 * booster.data.multiTap;
          setUserInfo(prevUserInfo => ({ ...prevUserInfo, tap_coins: totalTap }));
          // console.log(totalTap);
        }
      }
    } catch (error) {
      console.error("Error fetching booster data:", error);
    }




  };

  // for turbo funtioanlities
  useEffect(() => {
    setTimeout(() => {
      getTurboData();
    }, 500)
  }, [userInfo.user_id, userInfo.isTurbo]);


  // console.log(userInfo)

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
    }, 200);
  };

  // getting tap again
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
     }, 2000); // 1000ms = 1 second

     return () => clearInterval(intervalId);
   }, [userInfo]);

  const handleTap = () => {
    if (userInfo.used_taps > 0) {
      setUserInfo((prevTapsInfo) => ({
        ...prevTapsInfo,
        used_taps: prevTapsInfo.used_taps - 1,
      }));
    }
  };

  // handling when clicking
  const handleClick = async (e) => {
    //updating coins in db using Socket.io
    console.log("IIIIDDDDD",userInfo.user_id)
    socket.emit("message", `${userInfo.user_id}, ${userInfo.tap_coins}`);


     const newTotalCoins = userInfo.total_coins + userInfo.tap_coins;
     setUserInfo({...userInfo,total_coins:newTotalCoins})



    // localStorage.setItem("user_coins", newTotalCoins);

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




    // for char anim
    if (isAnimating !== true) {
      setIsAnimating(true);
    }
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);


    socket.emit("message", `${userInfo.user_id}, ${userInfo.tap_coins}`);


    // // // Increase click count and determine if continuous
    const newClickCount = clickCount + e.touches.length;
    setClickCount(newClickCount);

    // // // Update image based on continuous clicking
     if (newClickCount >= 5) {
       setShowAnimKeyword(true); // Show Anim keyword if clicked 5 times or more
     } else {
       setShowAnimKeyword(false); // Hide Anim keyword otherwise
     }






    // on touch showing +2
    const coinRect = e.target.getBoundingClientRect();
    Array.from(e.touches).forEach((touch) => {
      const touchX = touch.clientX - coinRect.left;
      const touchY = touch.clientY - coinRect.top;
      handleInteraction(touchX, touchY, coinRect.width, coinRect.height);



      const newTotalCoins = userInfo.total_coins + userInfo.tap_coins;
      const newAllcoins = userInfo.allCoins + userInfo.tap_coins
      setUserInfo({ ...userInfo, total_coins: newTotalCoins, allCoins: newAllcoins })



      setClicks((prevClicks) => [
        ...prevClicks,
        { left: touch.clientX, top: touch.clientY },
      ]);

       const newClick = { left: touch.clientX, top: touch.clientY, timestamp: Date.now() };
       setClicks((prevClicks) => [...prevClicks, newClick]);

       setTimeout(() => {
         setClicks((prevClicks) => prevClicks.filter((click) => click.timestamp > Date.now() - 3000));
       }, 3000);

    });

  };


  // removing clicks for smoothness
  useEffect(() => {
    if (clicks.length > 200) {
      setTimeout(() => {
        setClicks((prevClicks) => prevClicks.slice(clicks.length - 1));
      }, 1000)
    }
  }, [clicks])




  // Dynamic source for the image based on animation state
  const getImageSource = () => {

    // alert(userInfo.rank)

    // const parts = userInfo.avatar.split('.');
    // const filename = parts.slice(0, -1).join('.'); // Join all parts except the last one (extension)
    // const extension = parts[parts.length - 1]; // Get the extension

    if (isAnimating) {

      // alert(userInfo.rank)

      if (userInfo.rank === "Newbies") {
        return newbiewsAnim
      }
      else if (userInfo.rank === "Officer") {
        return officerAnim
      }
      else if (userInfo.rank === "Cadet") {
        return cadetAnim
      }
      else if (userInfo.rank === "Lieutenant") {
        return lieutenantAnim
      }
      else if (userInfo.rank === "Captain") {
        return captainAnim
      }
      else if (userInfo.rank === "Major") {
        return majorAnim
      }
      else if (userInfo.rank === "Colonel") {
        return colonelAnim
      }
      else if (userInfo.rank === "Brigadier") {
        return brigadierAnim
      }
      else if (userInfo.rank === "General") {
        return generalAnim
      }
      else if (userInfo.rank === "Queen") {
        return queenAnim
      }



    } else {
      // Return the normal image path
      // alert(userInfo.avatar)
      return userInfo.avatar;
    }
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


  // useEffect(() => {
   //  const storedCoins = localStorage.getItem("user_coins");
   //  const parsedCoins = parseInt(storedCoins, 10);
   //  if (!isNaN(parsedCoins)) {
   //    setTotalCoins(parsedCoins);
   //  }
  // }, []);

  // console.log("User id ", userId)
  // console.log("User data ", userdata)

  // console.log(tapsInfo)


  return (
    <>
      <div className="coinDiv">
        {/* ton and gol coin info */}
        <CoinInfo />

        {/* total no of coins */}
        <div className="totalCoins">${userInfo.total_coins}</div>

        {/* coin with animation */}

        {/* backgorund Orange Img */}
        <div className="orangeImg">
          {/*<img src={OrangeImg} className="orgImg" />*/}
        </div>

        {/* <Tilt options={defaultOptions}> */}
        <div
          className="charAnim"
          onClick={userInfo.used_taps > 0 ? handleClick : ""}
          onTouchStart={userInfo.used_taps > 0 ? handleTouchStart : ""}
          style={coinStyle}
        >

          <img
            // src={userInfo.avatar}
            src={coin}
            className="coinTest"
            // onClick={userInfo.used_taps > 0 ? handleClick : ""}
            // onTouchStart={userInfo.used_taps > 0 ? handleTouchStart : ""}
            // style={coinStyle}
            tabIndex="0"
            role="button"
            aria-pressed="false"
          />
        </div>
        {/* </Tilt> */}

        {/* printing +2 multiple time according to tap */}
        {clicks.map((click, index) => (
          <div
            key={index}
            className="rs"
            style={{
              left: `${click.left}px`,
              top: `${click.top - 120}px`,
              animation: `fadeOut .9s forwards`,
            }}
          >
            +{userInfo.tap_coins}
          </div>
        ))}

        {/* progress Bar */}
        <div className="progressBar">
          <div className="progressText">
            <div className="progressRank">
              {userInfo.rank}
            </div>
            <div className="Progressicon mx-2">
              <img src={porgressIcon} width={15} />
              <div className="text-white">
                <span className="points"> {userInfo.used_taps} </span> /{" "}
                {userInfo.total_taps}
              </div>
            </div>
          </div>
          <ProgressBar now={(userInfo.used_taps / userInfo.total_taps) * 100} />
        </div>
      </div>
    </>
  );
};

export default Home;
