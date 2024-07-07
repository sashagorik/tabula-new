import React from 'react';
import coin from "../../assets/Task/coinTask.svg"
import closeIcon from "../../assets/Task/closeIcon.svg"
import "./Popup.css"
import DailyTask from "../DailyTask/DailyTask"
import { UserInfo } from "../../ContextApi/UserData"
import { useContext} from "react"
import { updateSocailApi } from "../../services/apis"


const Pop = ({ task, onClose, setTask }) => {

    const {setUserInfo} = useContext(UserInfo)



    if (!task) return null;



    const handleSocial = async(socialTask) =>{



        const resp = await updateSocailApi( parseInt(localStorage.getItem("user_id")), socialTask)
        if(resp.status===200){
            setUserInfo(prevUserInfo => ({ ...prevUserInfo, Test: 1 }))       
            setTask("")     
        }




    }
 






    return (
        <>



            {
                task.name == "Daily Rewards"
                    ?
                    <DailyTask onClose={onClose} /> :
                    <>
                        <div className="popupMainDiv">


                            <div className="crossBtnDiv" onClick={onClose} >
                                <img src={closeIcon} width={30} />
                            </div>

                            <div className="PopImg">
                                <img src={task.icon} />
                            </div>

                            <div className="popupHeading my-3">
                                <p className="popupTitle">{task.popText}</p>
                                <p className="popupDesc">Increase the amount of energy</p>
                            </div>

                            <div className="popupCoinDiv mb-4">
                                <img src={coin} width={35} /> <span className="popupCoin"> 5,000 </span>
                            </div>

                            <div className="popupBtnDiv my-1">
                                <button className="btn popupBtn" onClick={()=>{handleSocial(task.value)}} >JOIN</button>
                            </div>
                        </div>
                    </>
            }







        </>
    )
}

export default Pop