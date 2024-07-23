import React, { useContext, useEffect, useState } from "react";
import "./BoosterPop.css"
import closeIcon from "../../assets/Task/closeIcon.svg"
import coin from "../../assets/Task/coinTask.svg"
import { UserInfo } from "../../ContextApi/UserData"
import { upgradeFreeBoosterApi, getBooster, getUserData, updateCoinsInDatabase, updateTapCoinsInDatabase, updateMultitapBooster, updateFireLimitInDatabase, updateFlashspeedInDatabase } from "../../services/apis"
import dot from "../../assets/Booster/dot.svg"
import { useNavigate } from "react-router-dom"

const BoosterPop = ({ boost, onClose, setBoost, level, setlevel }) => {
    const [remainingTime, setRemainingTime] = useState(null);
    const [rechargeRemainingTime, setRechargeRemainingTime] = useState(null);
    const { userInfo, setUserInfo } = useContext(UserInfo)
    const navigate = useNavigate()
    const [showEffect, setShowEffect] = useState(false); 

    useEffect(() => {
        const intervalId = setInterval(() => {
          const remainingTime = localStorage.getItem("remainingTurboTime");
          if (remainingTime) {
            setRemainingTime(remainingTime);
          } else {
            setRemainingTime(null);
          }

          const rechargeRemainingTime = localStorage.getItem("remainingRechargeTime");
          if (rechargeRemainingTime) {
            setRechargeRemainingTime(rechargeRemainingTime);
          } else {
            setRechargeRemainingTime(null);
          }
        }, 1000); // обновляем каждую секунду
      
        return () => clearInterval(intervalId);
      }, []);

    const canActivateTurbo = () => {
        const lastActivationTime = localStorage.getItem("lastTurboActivation");
        if (!lastActivationTime) {
          return true; // Никогда не активировалось, можно активировать
        }
        const currentTime = Date.now();
        const sixHoursInMilliseconds = 6 * 60 * 60 * 1000;
        return (currentTime - parseInt(lastActivationTime, 10)) >= sixHoursInMilliseconds;
    };

    const activateTurbo = () => {
        setUserInfo({ ...userInfo, isTurbo: true });
        localStorage.setItem("isTurbo", true);
        const currentTime = Date.now();
        localStorage.setItem("lastTurboActivation", currentTime);
    
        setTimeout(() => {
          localStorage.removeItem("isTurbo");
          setUserInfo(prevUserInfo => ({ ...prevUserInfo, isTurbo: false }));
        }, 10000);
    };

    const updateRemainingTime = () => {
        const lastActivationTime = localStorage.getItem("lastTurboActivation");
        if (lastActivationTime) {
          const currentTime = Date.now();
          const sixHoursInMilliseconds = 6 * 60 * 60 * 1000;
          const timePassed = currentTime - parseInt(lastActivationTime, 10);
          const remainingTime = sixHoursInMilliseconds - timePassed;
          if (remainingTime <= 0) {
            localStorage.removeItem("remainingTurboTime");
          } else {
            localStorage.setItem("remainingTurboTime", remainingTime);
          }
        }

        const lastRechargeActivationTime = localStorage.getItem("lastRechargeActivation");
        if (lastRechargeActivationTime) {
          const currentTime = Date.now();
          const sixHoursInMilliseconds = 6 * 60 * 60 * 1000;
          const timePassed = currentTime - parseInt(lastRechargeActivationTime, 10);
          const remainingTime = sixHoursInMilliseconds - timePassed;
          if (remainingTime <= 0) {
            localStorage.removeItem("remainingRechargeTime");
          } else {
            localStorage.setItem("remainingRechargeTime", remainingTime);
          }
        }
    };
  
    useEffect(() => {
        const intervalId = setInterval(updateRemainingTime, 1000); // обновляем каждую секунду
        return () => clearInterval(intervalId);
    }, []);

    const canActivateRecharge = () => {
        const lastActivationTime = localStorage.getItem("lastRechargeActivation");
        if (!lastActivationTime) {
          return true;
        }
        const currentTime = Date.now();
        const sixHoursInMilliseconds = 6 * 60 * 60 * 1000;
        return (currentTime - parseInt(lastActivationTime, 10)) >= sixHoursInMilliseconds;
    };

    const activateRecharge = () => {
        let total_taps = userInfo.total_taps;
        setUserInfo({ ...userInfo, used_taps: total_taps });
        localStorage.setItem("isRecharge", true);
        const currentTime = Date.now();
        localStorage.setItem("lastRechargeActivation", currentTime);
    };

    let turboTimeoutId = null;
    if (!boost) return null;

    const handlePurchase = async () => {
        const userResp = await getUserData(userInfo.user_id);
        const boosterResp = await getBooster(userInfo.user_id);

        const total_coins = userResp.total_coins;
        const tap_coins = userResp.tap_coins;
        const total_taps = userResp.total_taps;
        const used_taps = userResp.used_taps;

        const multiTap = boosterResp.multiTap;
        const fireLimit = boosterResp.fireLimit;

        const multiTapPrice = (1 ** multiTap) * 200;
        const fireLimitPrice = (1 ** fireLimit) * 200;

        const charges = boost.charges;

        if (charges === 0) {
            if (boost.value === "Recharge") {
                if (canActivateRecharge()) {
                    activateRecharge();
                    setBoost("");
                    navigate("/");
                } else {
                    alert("Recharge можно активировать только раз в 6 часов");
                }
            } else if (boost.value === "Turbo") {
                if (canActivateTurbo()) {
                    activateTurbo();
                    setBoost("");
                    navigate("/");
                } else {
                    alert("Turbo можно активировать только раз в 6 часов");
                }
            }
        } else if (charges > 0) {
            if (boost.value === "multiTap") {
                if (total_coins >= boost.charges) {
                    const newTotalCoins = total_coins - boost.charges;
                    const newMultiTap = multiTap + 1;
                    const newTapCoins = tap_coins + 1;
                    setUserInfo({
                        ...userInfo,
                        total_coins: newTotalCoins,
                        tap_coins: newTapCoins,
                    });
                    await updateCoinsInDatabase(userInfo.user_id, newTotalCoins);
                    await updateTapCoinsInDatabase(userInfo.user_id, newTapCoins);
                    await updateMultitapBooster(userInfo.user_id, newMultiTap);
                    setShowEffect(true);
                    setBoost("")
                    navigate("/")
                    setTimeout(() => {
                        setShowEffect(false);
                        onClose();
                    }, 2000);
                } else {
                    alert("Недостаточно монет для покупки следующего уровня MultiTap.");
                }
            } else if (boost.value === "fireLimit") {
                if (total_coins >= boost.charges) {
                    const newTotalCoins = userInfo.total_coins - boost.charges;
                    const newFireLimit = fireLimit + 1;
                    const newTotalTaps = total_taps + 100;
                    const newUsedTaps = used_taps + 100;
                    setUserInfo({
                        ...userInfo,
                        fireLimit: newFireLimit,
                        total_coins: newTotalCoins,
                        total_taps: newTotalTaps,
                        used_taps: newUsedTaps,
                    });
                    await updateCoinsInDatabase(userInfo.user_id, newTotalCoins);
                    await updateFireLimitInDatabase(userInfo.user_id, newFireLimit, newTotalTaps, newUsedTaps);
                    setShowEffect(true);
                    setTimeout(() => {
                        setShowEffect(false);
                        onClose();
                    }, 2000);
                    setBoost("")
                    navigate("/")
                } else {
                    alert("Недостаточно монет для покупки следующего уровня fireLimit.");
                }
            } else if (boost.value === "Flashspeed") {
                if (total_coins >= boost.charges) {
                    const newTotalCoins = userInfo.total_coins - boost.charges;
                    const newFlashspeed = userInfo.flash_speed + 1;
                    setUserInfo({
                        ...userInfo,
                        flash_speed: newFlashspeed,
                        total_coins: newTotalCoins,
                    });
                    await updateCoinsInDatabase(userInfo.user_id, newTotalCoins);
                    await updateFlashspeedInDatabase(userInfo.user_id, newFlashspeed);
                    setShowEffect(true);
                    setTimeout(() => {
                        setShowEffect(false);
                        onClose();
                    }, 2000);
                    setBoost("")
                    navigate("/")
                } else {
                    alert("Недостаточно монет для покупки следующего уровня fireLimit.");
                }
            }
        }
    };

    const formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours}h ${minutes}m ${seconds}s`;
    };

    return (
        <div className={`boosterPopMainDiv ${showEffect ? 'effect' : ''}`}>


            <div className="crossBtnDiv" onClick={onClose} >
                <img src={closeIcon} width={30} />
            </div>

            <div className="boostPopImg">
                <img src={boost.icon} />
            </div>


            <div className="boostHeads">
                <p className="boostMainHead">{boost.name}</p>
                <p className="boostSubHead">
                    {boost.description}
                </p>
                <p className="boostPower">{boost.power}</p>
            </div>

            <div className="boostPopCharge">
                <div className="BoostPopImg">
                    <img src={coin} width={20} />
                </div>
                <div className="BoostPopCharge mx-1">{boost.charges === 0 ? "Free" : boost.charges}</div>
                <div className="BoostPopCharge mx-1 "> <img src={dot} alt="dot" width={10} />
                    <span className="mx-1">{boost.charges !== 0 ? (parseInt(boost.level) + 1) + " lvl" : " Free"}</span>
                </div>
            </div>


            <div className="boostPurchaseBtn">
            <button className="btn" onClick={handlePurchase} 
  disabled={(boost.value === "Turbo" && remainingTime !== null) || (boost.value === "Recharge" && rechargeRemainingTime !== null)}>
  {boost.value === "Turbo" && remainingTime !== null 
    ? `Доступно через ${formatTime(remainingTime)}`
    : boost.value === "Recharge" && rechargeRemainingTime !== null
    ? `Доступно через ${formatTime(rechargeRemainingTime)}`
    : "Активировать"}
</button>
            </div>


        </div>
    )
}

export default BoosterPop