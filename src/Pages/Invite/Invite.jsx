import React from 'react';
import "./Invite.css";
import Reloader from "../../assets/reloader.svg";
import HrInvite from "../../assets/hrInvite.svg";
// import Avatar1 from "../../assets/userAvatar1.svg"
import CoinInvite from "../../assets/coinInvite.svg";
import inviteImg from "../../assets/inviteCoins.svg";
import { getReferralLinkData, getReferralUserData } from "../../services/apis";
import { useEffect, useState } from "react";
import avatar from "../../assets/avatar.png";
import inviteFrndBtn from "../../assets/invitefrndBtn.svg";

const Invite = () => {
  const [referalLink, setReferalLink] = useState("");
  const [refferalLength, setReferralLength] = useState(0);
  const [refferData, setReferraData] = useState([]);
  const [rotate, setRotate] = useState(false);
  const [shareLink, setShareLink] = useState("");

  // Получение реферальной ссылки
  const fetchReferralLink = async () => {
    try {
      const resp = await getReferralLinkData(localStorage.getItem("user_id"));
      console.log(resp);
      setReferalLink(resp.data.refralCode);
    } catch (err) {
      console.log(err);
    }
  };

  // Получение информации о рефералах
  const fetchRefferalUserData = async () => {
    try {
      const resp = await getReferralUserData(localStorage.getItem("user_id"));
      if (Array.isArray(resp.data.refralData)) {
        setReferraData(resp.data.refralData);
        setReferralLength(resp.data.refralData.length);
      } else {
        console.error("refferData is not an array:", resp.data.refralData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Функция перезагрузки данных
  const handleReload = () => {
    setRotate(true);
    fetchReferralLink();
    fetchRefferalUserData();
    setTimeout(() => {
      setRotate(false);
    }, 3000);
  };

  // Обработка приглашения
  const handleInvite = () => {
    let text = `invite!`;
    let url = referalLink;
    var encodedUrl = encodeURIComponent(url);
    var encodedText = encodeURIComponent(text);
    var shareUrl = 'https://t.me/share/url?url=' + encodedUrl + '&text=' + encodedText;
    setShareLink(shareUrl);
  };

  useEffect(() => {
    fetchReferralLink();
    fetchRefferalUserData();
  }, []);

  useEffect(() => {
    handleInvite();
  }, [referalLink]);

  return (
    <div className="inviteMainDiv">
      <div className="inviteImg">
        {/* <img src={inviteImg} alt="invite" />*/}
      </div>

      {/* Заголовок приглашения друзей */}
      <div className="inviteHeading">
        <p className="inviteHead">Invite Friends</p>
        <p className="inviteDesc">
          You and your buddy will receive bonuses bonusses! Get ready for some awesome rewards coming your way!
        </p>
      </div>

      {/* Кнопка приглашения друзей */}
      <div className="inviteButtonMainDiv">
        <div className="inviteButton telegram-container">
          <a href={shareLink} target="_blank" rel="noopener noreferrer">
            <button className="btn invitebtn p-2">
              <img src={inviteFrndBtn} className="mx-2" alt="invite friend" />
            </button>
          </a>
        </div>
      </div>

      {/* Список друзей */}
      <div className="inviteListMainDiv">
        <div className="inviteListheader">
          <div className="noOfFriends">
            List of your friends ({refferalLength})
          </div>
          <div className="Reloader">
            <img src={Reloader} alt="reloader" width={20} height={20} onClick={handleReload} className={rotate ? 'rotate' : ''} />
          </div>
        </div>

        {/* Разделитель */}
        <div className="hrInvite">
          <img src={HrInvite} alt="hrInvite" />
        </div>

        {/* Список пользователей */}
        <div className="mainUserList">
          {refferData.map((ref, index) => (
            <div className="userListInvite my-2" key={index}>
              <div className="leftInvitecol">
                <div className="userInviteAvatar">
                  <img src={avatar} alt="avatar" width={30} />
                </div>
                <div className="userInviteInfo px-2">
                  <div className="userInviteName">{ref.name}</div>
                  <div className="userInviteRank">
                    <span className="inviteRank">{ref.currentLevel}</span>
                  </div>
                </div>
              </div>

              <div className="rightInviteCol px-2">
                <div className="inviteColInfo">
                  <div className="coinInviteAvatar px-2">
                    <img src={CoinInvite} alt="coin" width={35} />
                  </div>
                  <div className="coinIniviteNo">
                    +{ref.totalCoin / 1000}k
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Invite;
