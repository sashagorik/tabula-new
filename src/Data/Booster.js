import React, { useContext, useEffect, useState } from "react";
import FreeRecharge from "../assets/Booster/freeRecharge.svg";
import Turbo from "../assets/Booster/turbo.svg";
import MultiTap from "../assets/Booster/multiTap.svg";
import FireLimit from "../assets/Booster/fireLimit.svg";
import FlashSpeed from "../assets/Booster/flashSpeed.svg";
import HireAnt from "../assets/Booster/hireAnt.svg";
//import { useContext, useEffect, useState } from "react";
import { getBooster, getFreeBoosterApi, getUserData, updateCoinsInDatabase, updateTapCoinsInDatabase } from "../services/apis";
import { UserInfo } from "../ContextApi/UserData";



// export const freeBooster = [
//     {
//         id: 1,
//         name: "Free Recharge",
//         icon: FreeRecharge,
//         available: true,
//         limit: 3,
//         value: "Recharge",
//         charges: 0,
//         description: "Increase the amount of energy",
//         power: "+100 energy points for level 1"
//     },
//     {
//         id: 2,
//         name: "Turbo",
//         icon: Turbo,
//         available: true,
//         limit: 3,
//         value: "Turbo",
//         charges: 0,
//         description: "Increase the amount of energy",
//         power: "+100 energy points for level 1"
//     }
// ]

const BoosterData = () => {

  const { userInfo, setUserInfo } = useContext(UserInfo);

    const [level, setLevel] = useState({

        multiLevel: 0,
        fireLimit: 0,
        flashSpeed: 0,
        Hireant: false

    })


    const [freeLevel, setFreeLevel] = useState({
        Recharge: "",
        Turbo: "",
    })

    const getPaidBoosterData = async () => {
        const resp = await getBooster(userInfo.user_id)
        setLevel({ ...level, 
          multiLevel: resp.multiTap, 
          fireLimit: resp.fireLimit, 
          flashSpeed: resp.flashSpeed,
          Hireant: resp.Hireant })
    }

    const getFreeBoosterData = async () => {
        const resp = await getFreeBoosterApi(userInfo.user_id)
        setFreeLevel({...freeLevel,Recharge:resp.recharge,Turbo:resp.turbo})
    }



    useEffect(() => {
        getPaidBoosterData()
        getFreeBoosterData()
    }, [userInfo])

//////////////////////////////////////////Покупка Multitap

const handleBuyMultiTap = async () => {
  try {
    const userResp = await getUserData(userInfo.user_id);
    const boosterResp = await getBooster(userInfo.user_id);
    const total_coins = userResp.total_coins;
    const tap_coins = userResp.tap_coins;
    const multiTap= boosterResp.multiTap;

    const multiTapPrice = (2 ** multiTap) * 200;

    if (total_coins >= multiTapPrice) {
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
      await updateBooster(userInfo.user_id, { multiTap: newMultiTap });

      // Update state
      setLevel((prev) => ({ ...prev, multiLevel: newMultiTap }));
    } else {
      alert("Недостаточно монет для покупки следующего уровня MultiTap.");
    }
  } catch (error) {
    console.error("Ошибка при покупке MultiTap бустера", error);
  }
};






//////////////////////////////////////////////














    const freeBoosterData = [

        {
            id: 1,
            name: "Free Recharge",
            icon: FreeRecharge,
            available: true,
            limit: freeLevel.Recharge,
            value: "Recharge",
            charges: 0,
            description: "Increase the amount of energy",
            power: "+100 energy points for level 1"
        },
        {
            id: 2,
            name: "Turbo",
            icon: Turbo,
            available: true,
            limit: freeLevel.Turbo,
            value: "Turbo",
            charges: 0,
            description: "Increase the amount of energy",
            power: "+100 energy points for level 1"
        }
    ]





    const upgradeBoostData = [
        {
            id: 3,
            name: "Multi Tap",
            icon: MultiTap,
            charges: (1 ** level.multiLevel) * 200,
            level: ` ${level.multiLevel} Level`,
            value: "multiTap",
            description: "Increase the amount of energy",
            power: "+1 coin for every tap",
            
        },
        {
            id: 4,
            name: "Fire Limit",
            icon: FireLimit,
            charges: (1 ** level.fireLimit) * 200,
            level: ` ${level.fireLimit} Level`,
            value: "fireLimit",
            description: "Increase the amount of energy",
            power: "+100 energy points for level 1"
        },
        {
            id: 5,
            name: "Flash Speed",
            icon: FlashSpeed,
            charges: (2 ** level.flashSpeed) * 200,
            level: ` ${level.flashSpeed} Level`,
            value: "Flashspeed",
            description: "Increase the amount of energy",
            power: "+100 energy points for level 1"
        },
        {
            id: 6,
            name: "Hire Ant",
            icon: HireAnt,
            charges: 200000,
            level: ` ${level.Hireant ? "Activate" : "DeActive"} Level`,
            value: "Hireant",
            description: "Increase the amount of energy",
            power: "+100 energy points for level 1"
        }
    ];
    return { upgradeBoostData, freeBoosterData }
}

export default BoosterData