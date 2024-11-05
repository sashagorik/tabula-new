import React from 'react'
import { useContext } from "react"
import TonCoins from "../../assets/coin3.svg"
import "./CoinInfo.css"
import { UserInfo } from "../../ContextApi/UserData"
import greyCoin from "../../assets/coin3.svg"


const CoinInfo = () => {
    const {userInfo} = useContext(UserInfo)
  return (
    <>

        <div className="coinInfoMainDiv">
            
            {/* ton coins info */}
            <div className="tonCoins">
                <div className="tonHeading">
                    Ton Coins
                </div>
                <div className="noOfCoins">

                        <div className="tonImg">
                            <img src={greyCoin} width={20} />
                        </div>
                        <div className="tonAmount">${userInfo.ton_coins}</div>

                </div>
            </div>


            {/* gold Coins Info */}
            <div className="goldCoins">
                <div className="goldHeading">
                    Profit per Hour 
                </div>
                <div className="noOfGoldCoins">

                        <div className="goldImg">
                            <img src={TonCoins} width={20} />
                        </div>
                        <div className="goldAmount">${userInfo.profitPerHour}</div>

                </div>
            </div>




        </div>

    </>
  )
}

export default CoinInfo
