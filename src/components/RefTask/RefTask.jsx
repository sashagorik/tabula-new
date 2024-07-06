import "./RefTask.css"
import inviteicon from "../../assets/Task/inviteIcon.svg"
import coin from "../../assets/tonCoins.svg"
import InviteData from "../../Data/InviteData"
import { updateClaimUserData, updateCoins } from "../../services/apis"
import { UserInfo } from "../../ContextApi/UserData"
import { useContext } from "react"
import ProgressBar from "react-bootstrap/ProgressBar";


const RefTask = () => {


    const { setUserInfo, userInfo } = useContext(UserInfo)

    const handleClaim = async (name, coins) => {

        const res = await updateClaimUserData(localStorage.getItem("user_id"), name)
        const res1 = await updateCoins(localStorage.getItem("user_id"), coins)
        if (res.status === 200) {
            setUserInfo({ ...userInfo, Test: 0 })
        }

        if (res1.status == 200) {
            let updatedCoins = userInfo.total_coins + coins
            setUserInfo({ ...userInfo, Test: 0, total_coins: updatedCoins })
        }

    }


    return (
        <>

            <div className="refTaskMainDiv">

                <div className="reftaskHead">
                    Referral Task
                </div>

                {/* 1st invite */}
                <div className="inviteListDiv">



                    {
                        InviteData().map((invite) => (
                            <>
                                <div className="inviteDiv my-2 " key={invite.id}>
                                    <div className="inviteUpperDiv">
                                        <div className="leftColInvite">
                                            <div className="inviteIcon">
                                                <img src={inviteicon} alt="invite" width={40} />
                                            </div>
                                            <div className="inviteDetails mx-1 ">
                                                <div className="inviteNos">Invite {invite.no_of_invite} Friend</div>
                                                <div className="inviteCoins">
                                                    <img src={coin} width={15} alt="coin" className="mx-2" />
                                                    <span className="mx-1">{invite.price}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="rightColInvite" onClick={() => { invite.done && invite.claim === false ? handleClaim(invite.claimName, invite.price) : "" }}>
                                            <button className={`btn ${invite.done && invite.claim === false ? 'clamied' : "noClamied"}  `}> {invite.claim ? "Claimed" : "Claim"}</button>
                                        </div>
                                    </div>
                                    <div className="inviteLowerDiv">
                                        {/* progress Bar */}
                                        <div className="">
                                            <ProgressBar style={{ height: "14px" }} now={invite.totalRef >= invite.no_of_invite ? 100 : (invite.totalRef / invite.no_of_invite) * 100} />

                                        </div>
                                    </div>
                                </div>
                            </>
                        ))
                    }








                </div>


            </div>


        </>
    )
}

export default RefTask