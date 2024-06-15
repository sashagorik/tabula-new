import TonCoins from "../../assets/tonCoins.svg"
import "./CoinInfo.css"
const CoinInfo = () => {
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
                            <img src={TonCoins} width={20} />
                        </div>
                        <div className="tonAmount">$1000</div>

                </div>
            </div>


            {/* gold Coins Info */}
            <div className="goldCoins">
                <div className="goldHeading">
                    Gold Coins
                </div>
                <div className="noOfGoldCoins">

                        <div className="goldImg">
                            <img src={TonCoins} width={20} />
                        </div>
                        <div className="goldAmount">$1000</div>

                </div>
            </div>




        </div>

    </>
  )
}

export default CoinInfo