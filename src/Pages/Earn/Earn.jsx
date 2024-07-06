import { useState, useContext } from "react";
import "./Earn.css";
import { UserInfo } from "../../ContextApi/UserData";
import Collection from "../../components/Collection/Collection";
import Ton from "../../components/Market/Market";
import Drop from "../../components/Drop/Drop";
import Market from "../../components/Market/Market";

const Earn = () => {
  const [isTon, setIsTon] = useState(1);
  const { userInfo } = useContext(UserInfo);

  const handleOption = (id) => {
    setIsTon(id);
  };

  return (
    <div className="earnMainDiv">
      {/* balance Info */}
      <div className="balanceInfo my-3">
        <p>Your Balance</p>
        <p className="boosterCoin">${userInfo.total_coins}</p>
      </div>

      {/* option */}


      
      <div className="earnOptionDiv">
        <div
          className={`earnoptionDivMenu ${isTon === 1 ? 'activeEarnOption' : 'inActiveEarnOption'}`}
          onClick={() => handleOption(1)}
        >
          <p>Drop</p>
        </div>
        <div
          className={`earnoptionDivMenu ${isTon === 2 ? 'activeEarnOption' : 'inActiveEarnOption'}`}
          onClick={() => handleOption(2)}
        >
          <p>Collection</p>
        </div>
        <div
          className={`earnoptionDivMenu ${isTon === 3 ? 'activeEarnOption' : 'inActiveEarnOption'}`}
          onClick={() => handleOption(3)}
        >
          <p>Market</p>
        </div>
      </div>

      <div className="m-3">
        {isTon === 1 && <Drop />}
        {isTon === 2 && <Collection />}
        {isTon === 3 && <Market />}
      </div>
    </div>
  );
};

export default Earn;
