import React, { useContext, useEffect, useState } from 'react';
import FreeRecharge from "../assets/Booster/freeRecharge.svg";
import Turbo from "../assets/Booster/turbo.svg";
import MultiTap from "../assets/Booster/multiTap.svg";
import FireLimit from "../assets/Booster/fireLimit.svg";
import FlashSpeed from "../assets/Booster/flashSpeed.svg";
import HireAnt from "../assets/Booster/hireAnt.svg";
import { getBooster, getFreeBoosterApi } from "../services/apis";
import { UserInfo } from "../ContextApi/UserData";

const BoosterData = () => {
  const { userInfo } = useContext(UserInfo);

  const [level, setLevel] = useState({
    multiLevel: 1,
    fireLimit: 1,
    flashSpeed: 1,
    Hireant: false
  });

  const [freeLevel, setFreeLevel] = useState({
    Recharge: 3,
    Turbo: 3,
  });

  const getPaidBoosterData = async () => {
    try {
      const resp = await getBooster(userInfo.user_id);
      setLevel({
        multiLevel: resp.data.multiTap,
        fireLimit: resp.data.fireLimit,
        flashSpeed: resp.data.flashSpeed,
        Hireant: resp.data.hireAnt
      });
    } catch (error) {
      console.error('Error fetching paid booster data:', error);
    }
  };

  const getFreeBoosterData = async () => {
    try {
      const resp = await getFreeBoosterApi(userInfo.user_id);
      setFreeLevel({
        Recharge: resp.data.recharge,
        Turbo: resp.data.turbo
      });
    } catch (error) {
      console.error('Error fetching free booster data:', error);
    }
  };

  useEffect(() => {
    getPaidBoosterData();
    getFreeBoosterData();
  }, [userInfo]);

  const freeBoosterData = [
    {
      id: 1,
      name: "Free Recharge",
      icon: FreeRecharge,
      available: freeLevel.Recharge > 0,
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
      available: freeLevel.Turbo > 0,
      limit: freeLevel.Turbo,
      value: "Turbo",
      charges: 0,
      description: "Increase the amount of energy",
      power: "+100 energy points for level 1"
    }
  ];

  const upgradeBoostData = [
    {
      id: 3,
      name: "Multi Tap",
      icon: MultiTap,
      charges: (2 ** level.multiLevel) * 200,
      level: `${level.multiLevel} Level`,
      value: "multiTap",
      description: "Increase the amount of energy",
      power: "+100 energy points for level 1"
    },
    {
      id: 4,
      name: "Fire Limit",
      icon: FireLimit,
      charges: (2 ** level.fireLimit) * 200,
      level: `${level.fireLimit} Level`,
      value: "fireLimit",
      description: "Increase the amount of energy",
      power: "+100 energy points for level 1"
    },
    {
      id: 5,
      name: "Flash Speed",
      icon: FlashSpeed,
      charges: (2 ** level.flashSpeed) * 200,
      level: `${level.flashSpeed} Level`,
      value: "flashSpeed",
      description: "Increase the amount of energy",
      power: "+100 energy points for level 1"
    },
    {
      id: 6,
      name: "Hire Ant",
      icon: HireAnt,
      charges: 200000,
      level: `${level.Hireant ? "Activate" : "DeActivate"} Level`,
      value: "HireAnt",
      description: "Increase the amount of energy",
      power: "+100 energy points for level 1"
    }
  ];

  return { upgradeBoostData, freeBoosterData };
};

export default BoosterData;
