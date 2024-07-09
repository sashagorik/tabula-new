import React from 'react';
import backLogo from "../../assets/Rank/rankHeadBg.png"
import "./RankHeader.css"
import Reloader from "../../assets/Rank/reload.png"

const RankHeader = () => {

    return (
        <div className="rankHeaderMainDiv">
            <div className="headLeftCol">
                <div className="rankHeaderBack">
                    <img src={backLogo} width={35} />
                </div>
                <p>Leaderboard</p>
            </div>
            <div className="headRightCol">
                <img src={Reloader} width={18} />
            </div>
        </div>
    )

}

export default RankHeader