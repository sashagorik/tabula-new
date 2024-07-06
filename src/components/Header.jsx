import profile from "../assets/userProfile.svg"
import BianceLogo from "../assets/bianceLogo.svg"
import OfficerLogo from "../assets/officeIcon.svg"
import "./Header.css"
import { useContext } from "react"
import { UserInfo } from "../ContextApi/UserData"
import avatar from "../assets/manprofile.png"
//import { UserContext } from '../context/UserContext'; 


const Header = () => {

    const {userInfo} = useContext(UserInfo) 


    return (
        <>

            <div className="headerMainDiv">


                <div className="leftCol">
                    <div className="userProfile">
                        <img src={avatar} alt="profile" width={40} />
                       
                    </div>
                    <div className="userName mx-2">{userInfo.user_id}</div>
                </div>


                <div className="rightCol">
                    <div className="walletLogo">
                        <img src={BianceLogo} alt="BianceLogo" width={20} />
                        
                    </div>
                    <div className="walletName mx-2">
                        {userInfo.rank}
                    </div>
                </div>


            </div>

        </>
    )
}

export default Header