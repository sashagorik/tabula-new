import "./Invite.css"
import Reloader from "../../assets/reloader.svg"
import HrInvite from "../../assets/hrInvite.svg"
import Avatar1 from "../../assets/userAvatar1.svg"
import Avatar2 from "../../assets/userAvatar2.svg"
import CoinInvite from "../../assets/coinInvite.svg"
import giftIcon from "../../assets/giftIcon.svg"
import copyIcon from "../../assets/copyIcon.svg"
const Invite = () => {
  return (
    <div className="inviteMainDiv">

      {/* heading of ivite friends */}
      <div className="inviteHeading">
        <p className="inviteHead">Invite Friends</p>
        <p className="inviteDesc">
          You and your buddy will receive bonuses bonusses! Get ready for some awesome rewards coming your way!
        </p>
      </div>


      {/* List of our friends */}

      <div className="inviteListMainDiv">
        <div className="inviteListheader">
          <div className="noOfFriends">
            List of your friends (2)
          </div>
          <div className="Reloader">
            <img src={Reloader} alt="reloader" width={20} height={20} />
          </div>
        </div>


        {/* HR divider */}
        <div className="hrInvite">
          <img src={HrInvite} alt="hrInvite" />
        </div>


        {/* User lists */}

        <div className="mainUserList">

          {/* 1st user */}
          <div className="userListInvite">

            <div className="leftInvitecol">
              <div className="userInviteAvatar">
                <img src={Avatar1} alt="avatar" width={40} />
              </div>
              <div className="userInviteInfo px-2">
                <div className="userInviteName">Roshani</div>
                <div className="userInviteRank">
                  <span className="inviteRank">Newbie</span>
                </div>
              </div>
            </div>


            <div className="rightInviteCol px-2">
              <div className="inviteColInfo">
                <div className="coinInviteAvatar px-2">
                  <img src={CoinInvite} alt="coin" width={35} />
                </div>
                <div className="coinIniviteNo">
                  +{localStorage.getItem("user_coins") / 1000}k
                </div>
              </div>
            </div>

          </div>



          {/* user list 2 */}
          <div className="userListInvite mt-3">

            <div className="leftInvitecol">
              <div className="userInviteAvatar">
                <img src={Avatar2} alt="avatar" width={40} />
              </div>
              <div className="userInviteInfo px-2">
                <div className="userInviteName">Rohan</div>
                <div className="userInviteRank">
                <span className="inviteRank">Cadet</span>
                </div>
              </div>
            </div>


            <div className="rightInviteCol px-2">
              <div className="inviteColInfo">
                <div className="coinInviteAvatar px-2">
                  <img src={CoinInvite} alt="coin" width={35} />
                </div>
                <div className="coinIniviteNo">
                  +{localStorage.getItem("user_coins") / 1000}k
                </div>
              </div>
            </div>


          </div>





          {/* invite friends */}
          <div className="inviteButtonMainDiv">
            <div className="inviteButton">
              <button className="btn invitebtn p-2">
                <img src={giftIcon} width={20} className="mx-2" />
                Invite Friends
              </button>
            </div>
            <div className="inviteCopyButton">
              <img src={copyIcon} width={20} className="m-auto" />
            </div>
          </div>



        </div>






      </div>

    </div>
  )
}

export default Invite