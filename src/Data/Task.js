// src/components/Task/data.js
import dailyReward from "../assets/Task/dailyReward.svg"
import telegramIcon from "../assets/Task/telegram.svg"
import facebookIcon from "../assets/Task/facebook.svg"
import xIcon from "../assets/Task/x.svg"
import ytIcon from "../assets/Task/yt.svg"
import inviteFrnd from "../assets/Task/inviteFrnd.svg"
import CoinTask from "../assets/Task/coinTask.svg"

const dailyTask = [
  {
    id: 1,
    name: "Daily Rewards",
    icon: dailyReward,
    reward: "+5,645,000",
    coinTask: CoinTask,
  },
];

const taskList = [
  {
    id: 2,
    name: "Join our Telegram Channel",
    icon: telegramIcon,
    reward: "+5,000",
    coinTask: CoinTask,
  },
  {
    id: 3,
    name: "Join our Facebook Page",
    icon: facebookIcon,
    reward: "+5,000",
    coinTask: CoinTask,
  },
  {
    id: 4,
    name: "Join our X Account",
    icon: xIcon,
    reward: "+5,000",
    coinTask: CoinTask,
  },
  {
    id: 5,
    name: "Join our Youtube",
    icon: ytIcon,
    reward: "+5,000",
    coinTask: CoinTask,
  },
  {
    id: 6,
    name: "Invite 5 Friends",
    icon: inviteFrnd,
    reward: "+50,000",
    coinTask: CoinTask,
  },
];

export { dailyTask, taskList };
