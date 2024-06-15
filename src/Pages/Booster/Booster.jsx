import "./Booster.css"
import RightArrow from "../../assets/Booster/rightArrow.svg"
import FreeRecharge  from "../../assets/Booster/freeRecharge.svg"
import Turbo  from "../../assets/Booster/turbo.svg"
import MultiTap from "../../assets/Booster/multiTap.svg"
import FireLimit from "../../assets/Booster/fireLimit.svg"
import FlashSpeed from "../../assets/Booster/flashSpeed.svg"
import HireAnt from "../../assets/Booster/hireAnt.svg"

const Booster = () => {
  return (
    <div className="boosterMainDiv">

      {/* balance Info */}
      <div className="balanceInfo my-3">
        <p>Your Balance</p>
        <p className="boosterCoin">${localStorage.getItem("user_coins")}</p>
      </div>

      {/* Free Boster */}
      <div className="FreeBoosterMainDiv">
        <p className="mx-3">Free Boosters</p>

        {/* booster 1 */}
        <div className="booster my-1">
          <div className="boosterLeft">
            <div className="boosterIcon">
              <img src={FreeRecharge} width={25} />
            </div>
            <div className="boosterHeading mx-3">
              <p className="boosterName">Free Recharge</p>
              <p className="boosterAvail">Available</p>
            </div>
          </div>
          <div className="boosterRightColArrow">
            <img src={RightArrow}  />
          </div>
        </div>
        {/* booster 2 */}
        <div className="booster my-1">
          <div className="boosterLeft">
            <div className="boosterIcon">
              <img src={Turbo} width={25} />
            </div>
            <div className="boosterHeading mx-3">
              <p className="boosterName">Turbo</p>
              <p className="boosterAvail">Available</p>
            </div>
          </div>
          <div className="boosterRightColArrow">
            <img src={RightArrow}  />
          </div>
        </div>

      </div>





      {/* upgrade Boster */}
      <div className="FreeBoosterMainDiv my-3">
        <p className="mx-3">Upgrade Boosters</p>

        {/* booster 1 */}
        <div className="booster my-1">
          <div className="boosterLeft">
            <div className="boosterIcon">
              <img src={MultiTap} width={20} />
            </div>
            <div className="boosterHeading mx-3">
              <p className="boosterName">Multi Tap</p>
              <p className="boosterAvail">Available</p>
            </div>
          </div>
          <div className="boosterRightColArrow">
            <img src={RightArrow}  />
          </div>
        </div>
        {/* booster 2 */}
        <div className="booster my-1">
          <div className="boosterLeft">
            <div className="boosterIcon">
              <img src={FireLimit} width={20} />
            </div>
            <div className="boosterHeading mx-3">
              <p className="boosterName">Fire Limit</p>
              <p className="boosterAvail">Available</p>
            </div>
          </div>
          <div className="boosterRightColArrow">
            <img src={RightArrow}  />
          </div>
        </div>
        {/* booster 1 */}
        <div className="booster my-1">
          <div className="boosterLeft">
            <div className="boosterIcon">
              <img src={FlashSpeed} width={20} />
            </div>
            <div className="boosterHeading mx-3">
              <p className="boosterName">Flash Speed</p>
              <p className="boosterAvail">Available</p>
            </div>
          </div>
          <div className="boosterRightColArrow">
            <img src={RightArrow}  />
          </div>
        </div>
        {/* booster 1 */}
        <div className="booster my-1">
          <div className="boosterLeft">
            <div className="boosterIcon">
              <img src={HireAnt} width={20} />
            </div>
            <div className="boosterHeading mx-3">
              <p className="boosterName">Hire Ant</p>
              <p className="boosterAvail">Available</p>
            </div>
          </div>
          <div className="boosterRightColArrow">
            <img src={RightArrow}  />
          </div>
        </div>

      </div>


    </div>
  )
}

export default Booster