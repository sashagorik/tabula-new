import "./Earn.css"
import Treasure from "../../assets/treasure.png"
const Earn = () => {
    return (
        <div className="earnMainDiv">

            <div className="earnTreasureDiv">
                <img src={Treasure} alt="treasure" className="treasureIcon" />
            </div>
            <div className="earnHeadings">
                <h1>Airdrop Tasks</h1>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
            </div>
        </div>


    )
}

export default Earn