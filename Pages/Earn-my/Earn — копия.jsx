import { useState } from "react"
import "./Earn.css"
import { useContext } from "react"
import { UserInfo } from "../../ContextApi/UserData"
import Gold from "../../components/Gold/Gold"
import Ton from "../../components/Ton/Ton"


const Earn = () => {


    const [isTon, setIsTon] = useState(true)
    const { userInfo } = useContext(UserInfo)

    const handleOption = () => {
        setIsTon(!isTon)
    }

    return (
        <div className="earnMainDiv">



            {/* balance Info */}
            <div className="balanceInfo my-3">
                <p>Your Balance</p>
                <p className="boosterCoin">${userInfo.total_coins}</p>
            </div>



            {/* option */}
            <div className="earnOptionDiv">
                <div className={`earnoptionDivMenu ${isTon ? 'activeEarnOption' : "inActiveEarnOption"} `} onClick={handleOption} >
                    <p>Ton Coin</p>
                </div>
                <div className={`earnoptionDivMenu ${!isTon ? 'activeEarnOption' : "inActiveEarnOption"} `} onClick={handleOption} >
                    <p>Gold Coin</p>
                </div>
            </div>



            <div className="m-3">

                {isTon ? <Ton/> : <Gold />  }

            </div>




            {/* <div className="earnTreasureDiv">
                <img src={Treasure} alt="treasure" className="treasureIcon" />
            </div>
            <div className="earnHeadings">
                <h1>Airdrop Tasks</h1>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
            </div> */}


        </div>


    )
}

export default Earn