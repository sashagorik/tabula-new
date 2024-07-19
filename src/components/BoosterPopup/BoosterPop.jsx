import React, { useContext, useEffect, useState } from "react";
import "./BoosterPop.css"
import closeIcon from "../../assets/Task/closeIcon.svg"
import coin from "../../assets/Task/coinTask.svg"
//import { useContext } from "react"
import { UserInfo } from "../../ContextApi/UserData"
import { upgradeFreeBoosterApi, getBooster, getFreeBoosterApi, getUserData, updateCoinsInDatabase, updateTapCoinsInDatabase, updateMultitapBooster  } from "../../services/apis"
import dot from "../../assets/Booster/dot.svg"
import { useNavigate } from "react-router-dom"


const BoosterPop = ({ boost, onClose, setBoost }) => {


    const { userInfo, setUserInfo } = useContext(UserInfo)
    const navigate = useNavigate()
    let turboTimeoutId = null;
    if (!boost) return null;

    const handlePurchase = async () => {

         
        const userResp = await getUserData(userInfo.user_id);
        const boosterResp = await getBooster(userInfo.user_id);

        const total_coins = userResp.total_coins;
        const tap_coins = userResp.tap_coins;
        const multiTap= boosterResp.multiTap;

        const multiTapPrice = (2 ** multiTap) * 200;

        //const totalCoins = userInfo.total_coins
        const charges = boost.charges



        // if(boost.value=="Turbo"){
        //     // localStorage.setItem("turbo_time")
        // }


        if (charges === 0) {
            const resp = await upgradeFreeBoosterApi(userInfo.user_id, boost.value)
            if (resp.status === 200) {


                if (boost.value === "Recharge") {
                    let total_taps = userInfo.total_taps
                    setUserInfo({ ...userInfo, used_taps: total_taps })
                    console.log(userInfo)
                    navigate("/")
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
                    navigate("/")
                }


            }
        } else if (total_coins > charges) {

            // console.log(userInfo.user_id,boost.value, boost.charges)

            const resp = await updateBooster(userInfo.user_id, boost.value, boost.charges)
            // console.log(resp)
            if (resp.status === 200) {
                // console.log("Done")
                let tapCoin = userInfo.tap_coins + 1
                let updateCoins = total_coins - charges
                setUserInfo({ ...userInfo, tap_coins: tapCoin })
                setUserInfo({ ...userInfo, total_coins: updateCoins })
                setBoost("")
                navigate("/")
            }

           else if (total_coins >= multiTapPrice) {
                const newTotalCoins = total_coins - multiTapPrice;
                const newMultiTap = multiTap + 1;
                const newTapCoins = tap_coins + 1;
          
                // Update local storage
                setUserInfo({
                  ...userInfo,
                  total_coins: newTotalCoins,
                  tap_coins: newTapCoins,
                });
          
                // Update database
                await updateCoinsInDatabase(userInfo.user_id, newTotalCoins);
                await updateTapCoinsInDatabase(userInfo.user_id, newTotalCoins);
                await updateMultitapBooster(userInfo.user_id, newMultiTap );
          
                // Update state
                setLevel((prev) => ({ ...prev, multiLevel: newMultiTap }));
              } else {
                alert("Недостаточно монет для покупки следующего уровня MultiTap.");
              }
            } 
             else {
            alert("Not sufficient amount!!!")
        }


    }

    return (
        <div className={`boosterPopMainDiv`}>


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
                    <span className="mx-1">{boost.charges !== 0 ? (parseInt(boost.level.split("")[1]) + 1) + " lvl" : " Free"}</span>
                </div>
            </div>


            <div className="boostPurchaseBtn">
                <button className="btn" onClick={handlePurchase} >
                </button>
            </div>


        </div>
    )
}

export default BoosterPop