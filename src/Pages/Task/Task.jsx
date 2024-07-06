import { dailyTask, taskList } from "../../Data/Task"
import "./Task.css"
import taskTick from "../../assets/Task/taskDone.svg";
import Pop from "../../components/Popup/Pop";
import { useContext, useState } from "react";
import { UserInfo } from "../../ContextApi/UserData";
import Colony from "../../components/Colony/Colony";
import RefTask from "../../components/RefTask/RefTask";
import Airdrop from "../../components/Airdrop/Airdrop";


const Task = () => {

  const { userInfo } = useContext(UserInfo)

  // const [task, setTask] = useState(null);

  // const handleTaskPopup = (data) => {
  //   setTask(data)
  // }

  // const handleClosePopup = () => {
  //   setTask(null)
  // }


  const [option, setOption] = useState(0)


  const handleOption = (opt) => {
    setOption(opt)
  }


  // console.log("userInfo Colony", userInfo)

  return (
    <>
      <div className={`TaskMainDiv`}>

        <div className="taskBalance">
          <p className="yourbalance">Your Balance</p>
          <p className="taskCoin">${userInfo.total_coins}</p>
        </div>


        {/* option */}
        <div className="taskOptionDiv">
          <div className={`taskoptionDivMenu ${option === 0 ? 'activeTaskOption' : "inActiveTaskOption"} `} onClick={() => { handleOption(0) }} >
            <p>Colony</p>
          </div>
          <div className={`taskoptionDivMenu ${option === 1 ? 'activeTaskOption' : "inActiveTaskOption"} `} onClick={() => { handleOption(1) }} >
            <p>Ref Tasks</p>
          </div>
          <div className={`taskoptionDivMenu ${option === 2 ? 'activeTaskOption' : "inActiveTaskOption"} `} onClick={() => { handleOption(2) }} >
            <p>Airdrop</p>
          </div>
        </div>


        <div className="taskOptionsDiv m-3 ">
         { 
            option === 0 ? <Colony /> : option === 1 ? <RefTask /> : <Airdrop />
          }
        </div>
        

      </div>
      {/* <Pop task={task} onClose={handleClosePopup} /> */}
    </>
  )
}

export default Task