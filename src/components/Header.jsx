import profile from "../assets/userProfile.svg"
// import BianceLogo from "../assets/bianceLogo.svg"
import OfficerLogo from "../assets/officeIcon.svg"
import "./Header.css"
const Header = () => {



    return (
        <>

            <div className="headerMainDiv">


                <div className="leftCol">
                    <div className="userProfile">
                        <img src={profile} alt="profile" width={40} />
                    </div>
                    <div className="userName mx-2">{localStorage.getItem("user_name")} v.0.6</div>
                </div>


                <div className="rightCol">
                    <div className="walletLogo">
                        <img src={OfficerLogo} alt="BianceLogo" width={20} />
                    </div>
                    <div className="walletName mx-2">
                        {localStorage.getItem("user_rank")?localStorage.getItem("user_rank"):"Newbies"}
                    </div>
                </div>


            </div>

        </>
    )
}

export default Header