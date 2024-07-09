import React from 'react';
import "./BoosterPop.css";
import closeIcon from "../../assets/Task/closeIcon.svg";
import coin from "../../assets/Task/coinTask.svg";
import { useContext, useEffect } from "react";
import { UserInfo } from "../../ContextApi/UserData";
import { upgradeBooster, upgradeFreeBoosterApi } from "../../services/apis";
import dot from "../../assets/Booster/dot.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../services/helper";



const BoosterPop = ({ boost, onClose, setBoost }) => {
    const { userInfo, setUserInfo } = useContext(UserInfo);
    const navigate = useNavigate();
    let turboTimeoutId = null;
    if (!boost) return null;

    const handlePurchase = async () => {
        if (!userInfo || typeof userInfo.total_coins === 'undefined' || typeof boost.charges === 'undefined') {
            alert("User info or boost charges are not available.");
            return;
        }

        const totalCoins = userInfo.total_coins;
        const charges = boost.charges;

        if (charges === 0) {
            const resp = await upgradeFreeBoosterApi(userInfo.user_id, boost.value);
            if (resp.status === 200) {
                if (boost.value === "Recharge") {
                    let total_taps = userInfo.total_taps;
                    setUserInfo({ ...userInfo, used_taps: total_taps });
                    console.log(userInfo);
                    navigate("/");
                } else if (boost.value === "Turbo") {
                    let no_taps = userInfo.no_of_taps;

                    localStorage.setItem("turbo_use", true);
                    setUserInfo({ ...userInfo, isTurbo: true, no_of_taps: no_taps * 5 });

                    if (turboTimeoutId) {
                        clearTimeout(turboTimeoutId);
                    }

                    turboTimeoutId = setTimeout(() => {
                        localStorage.removeItem("turbo_use");
                        setUserInfo({ ...userInfo, isTurbo: false });
                    }, 20000);

                    setBoost("");
                    navigate("/");
                }
            }
        } else if (totalCoins >= charges) {
            const resp = await upgradeBooster(userInfo.user_id, boost.value, charges);
            if (resp.status === 200) {
              let tapCoin = userInfo.tap_coins + 1;
              let updateCoins = totalCoins - charges;
      
              // Если бустер FireLimit, увеличиваем общее количество очков
              if (boost.value === "fireLimit") {
                let updatedTotalTaps = userInfo.total_taps + 100; // Увеличиваем общее количество очков на 100
                try {
                    const response = await axios.post(`${baseUrl}/api/v1/updateTotalTaps`, {
                        user_id: userInfo.user_id,
                        total_taps: updatedTotalTaps,
                    });
                    console.log('Total taps updated:', response.data);
                    setUserInfo({
                        ...userInfo,
                        tap_coins: tapCoin,
                        total_coins: updateCoins,
                        total_taps: updatedTotalTaps,
                    });
                } catch (error) {
                    console.error('Error updating total taps:', error);
                }
            } else {
                setUserInfo({
                    ...userInfo,
                    tap_coins: tapCoin,
                    total_coins: updateCoins,
                });
            }
            setBoost("");
            navigate("/");
        }
    } else {
        alert("Not sufficient amount!!!");
    }
};
    // Определяем charges и level перед использованием в JSX
    const charges = boost.charges;
    const level = boost.level ? parseInt(boost.level.replace(/\D/g, '')) : 0;

    return (
        <div className={`boosterPopMainDiv`}>
            <div className="crossBtnDiv" onClick={onClose}>
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
                <div className="BoostPopCharge mx-1">{charges === 0 ? "Free" : charges}</div>
                <div className="BoostPopCharge mx-1 "> 
                    <img src={dot} alt="dot" width={10} />
                    <span className="mx-1">{charges !== 0 ? `${level + 1} lvl` : "Free"}</span>
                </div>
            </div>

            <div className="boostPurchaseBtn">
                <button className="btn" onClick={handlePurchase}>
                    Buy
                </button>
            </div>
        </div>
    );
};

export default BoosterPop;
