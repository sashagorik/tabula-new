import Facebook from "../../assets/Task/facebook.svg"
import coin from "../../assets/Task/coinTask.svg"
import closeIcon from "../../assets/Task/closeIcon.svg"

const Pop = ({showPop, setShowPop}) => {

    console.log(showPop)
    alert(showPop)

    return (
        <>
            {showPop === "true" && (
                <div className="popupMainDiv">

                    <div className="crossBtnDiv" onClick={setShowPop(false)} >
                        <img src={closeIcon} />
                    </div>

                    <div className="popupIcon">
                        <img src={Facebook} />
                    </div>

                    <div className="popupHeading">
                        <p className="popupTitle">Join Our TG Channel</p>
                        <p className="popupDesc">Increase the amount of energy</p>
                    </div>

                    <div className="popupCoinDiv">
                        <img src={coin} width={30} /> <span className="popupCoin"> 5,000 </span>
                    </div>

                    <div className="popupBtnDiv">
                        <button className="btn popupBtn">Join</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default Pop