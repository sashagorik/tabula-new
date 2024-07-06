import "./DailyTask.css";
import closeIcon from "../../assets/Task/closeIcon.svg";
import coin from "../../assets/tonCoins.svg";
import greyCoin from "../../assets/greyCoin.png";
import { useEffect, useState } from "react";
import { getDailyRewardDetails, updateDailyRewardDetails } from "../../services/apis";

const DailyTask = ({ onClose }) => {
    const [daysCollected, setDaysCollected] = useState(0);
    const [todayCollected, setTodayCollected] = useState(false);
    const [coins, setCoins] = useState(0);

    // Получение данных о ежедневных вознаграждениях
    const getDailyRewardData = async () => {
        const resp = await getDailyRewardDetails(localStorage.getItem("user_id"));
        setDaysCollected(resp.data.claimDays - 1);
        setTodayCollected(resp.data.isClaimed);
        setCoins(resp.data.rewardCoin);
    };

    // Обновление данных о ежедневных вознаграждениях
    const updateDailyReward = async () => {
        const resp = await updateDailyRewardDetails(localStorage.getItem("user_id"), coins, true);
        if (resp.status === 200) {
            getDailyRewardData();
        }
    };

    useEffect(() => {
        getDailyRewardData();
    }, [todayCollected, daysCollected]);

    const getDailyReward = () => {
        let arr = [];
        if (daysCollected >= 8) {
            setDaysCollected(daysCollected % 8);
        }
        for (let i = 1; i <= 8; i++) {
            arr.push(i);
        }
        return arr;
    };

    useEffect(() => {
        getDailyReward();
    }, []);

    return (
        <div className="dailyTaskMainDiv">
            <div className="dailyTaskcrossBtnDiv" onClick={onClose}>
                <img src={closeIcon} width={30} />
            </div>
            <div className="dailyTaskHead">
                Earn coins by logging into the game every day, ensuring you don't miss a single day.
            </div>
            <div className="collectList">
                {getDailyReward().map((dt, index) => (
                    <div
                        key={index}
                        className={`dailyListData mt-3 ${
                            daysCollected == index ? "activeDaily" : daysCollected < index ? "deactiveDaily" : "deactiveDaily"
                        }`}
                    >
                        <div className="dailylistimg">
                            <img src={daysCollected == index ? coin : greyCoin} />
                        </div>
                        <div className="dailyData">
                            <p>Day {index + 1}</p>
                            <p>{2 ** index * 100}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="dailyTaskBtn my-1">
                <button
                    className="btn popupBtn"
                    disabled={todayCollected ? true : false}
                    onClick={() => {
                        if (!todayCollected) updateDailyReward();
                    }}
                >
                    Collect
                </button>
            </div>
        </div>
    );
};

export default DailyTask;
