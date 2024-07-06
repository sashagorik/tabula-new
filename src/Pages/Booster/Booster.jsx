import "./Booster.css"
import RightArrow from "../../assets/Booster/rightArrow.svg"
import { useContext, useState } from "react"
import { UserInfo } from "../../ContextApi/UserData"
//import { freeBooster } from "../../Data/Booster"
import BoosterPop from "../../components/BoosterPopup/BoosterPop"
import BoosterData from "../../Data/Booster"


const Booster = () => {


  const {freeBoosterData, upgradeBoostData} = BoosterData()
  

  const { userInfo } = useContext(UserInfo)

  const [boost, setBoost] = useState(null);

  const handleTaskPopup = (data) => {
    setBoost(data)
  }

  const handleClosePopup = () => {
    setBoost(null)
  }

  return (
    <>
      <div className={`boosterMainDiv  ${boost ? 'blur' : ''} `}>

        {/* balance Info */}
        <div className="balanceInfo my-3">
          <p>Your Balance</p>
          <p className="boosterCoin">${userInfo.total_coins}</p>
        </div>

        {/* Free Boosters */}
        <div className="FreeBoosterMainDiv">
          <p className="mx-3">Free Boosters</p>
          {freeBoosterData.map((booster) => (
            <div key={booster.id} className="booster my-3" onClick={() => handleTaskPopup(booster)}>
              <div className="boosterLeft"  >
                <div className="boosterIcon">
                  <img src={booster.icon} width={25} alt={booster.name} />
                </div>
                <div className="boosterHeading mx-3">
                  <p className="boosterName">{booster.name}</p>
                  <p className="boosterAvail">{booster.available ? "Available" : "Not Available"} </p>
                </div>
              </div>
              <div className="boosterRightColArrow">
                <img src={RightArrow} alt="Right Arrow" />
              </div>
            </div>
          ))}
        </div>





        {/* Upgrade Boosters */}
        <div className="UpgradeBoosterMainDiv">
          <p className="mx-3">Upgrade Boosters</p>
          {upgradeBoostData
            .map((booster) => (
              <div key={booster.id} className="booster my-3" onClick={() => handleTaskPopup(booster)}>
                <div className="boosterLeft">
                  <div className="boosterIcon">
                    <img src={booster.icon} width={25} alt={booster.name} />
                  </div>
                  <div className="boosterHeading mx-3">
                    <p className="boosterName">{booster.name}</p>
                    <p className="boosterAvail">{booster.charges} | {booster.level} </p>
                  </div>
                </div>
                <div className="boosterRightColArrow">
                  <img src={RightArrow} alt="Right Arrow" />
                </div>
              </div>
            ))}
        </div>


      </div>
      <BoosterPop boost={boost} setBoost={setBoost} onClose={handleClosePopup} />
    </>
  )
}

export default Booster