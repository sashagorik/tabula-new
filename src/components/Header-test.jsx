import { useContext, useEffect, useState } from "react";
import { UserInfo } from "../ContextApi/UserData";
import manprofile from "../assets/manprofile.png";
import OfficerLogo from "../assets/officeIcon.svg";
import "./Header.css";
import axios from "axios"; // Импорт библиотеки axios или использование fetch

const Header = () => {
    const { userInfo } = useContext(UserInfo);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.post(`http://localhost:3001}update-coins'`, {
                    chatid: userInfo.chatid // Передаем chatid для получения данных пользователя
                });

                if (response.data.success) {
                    setUserData(response.data.user); // Устанавливаем данные пользователя в состояние
                } else {
                    console.error("Failed to fetch user data:", response.data.error);
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };

        fetchUserData();
    }, [userInfo.chatid]); // Зависимость от изменений chatid

    return (
        <div className="headerMainDiv">
            <div className="leftCol">
                <div className="userProfile">
                    <img src={manprofile} alt="profile" width={40} />
                </div>
                <div className="userName mx-2">{userData.first_name}</div>
            </div>
            <div className="rightCol">
                <div className="walletLogo">
                    <img src={OfficerLogo} alt="BianceLogo" width={25} />
                </div>
                <div className="walletName mx-2">{userInfo.rank}</div>
            </div>
        </div>
    );
};

export default Header;

