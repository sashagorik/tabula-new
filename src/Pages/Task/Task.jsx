import { dailyTask, taskList } from "../../Data/Task"
import "./Task.css"
import taskTick from "../../assets/Task/taskDone.svg";
import Pop from "../../components/Popup/Pop";
import { useState } from "react";


const Task = () => {

  const [showPop, setShowPop] = useState(null);

  const handleTaskPopup = () => {
    return <Pop showPop={showPop} setShowPop={setShowPop} />
  }



  return (
    <div className="TaskMainDiv">

      <div className="taskBalance">
        <p className="yourbalance">Your Balance</p>
        <p className="taskCoin">${localStorage.getItem("user_coins")}</p>
      </div>

      {/* Daily Task */}
      <div className="FreeTaskMainDiv">
        <p className="mx-3">Daily Task</p>

        {dailyTask.map(task => (
          <div key={task.id} className="Task my-1">
            <div className="TaskLeft">
              <div className="TaskIcon">
                <img src={task.icon} width={25} />
              </div>
              <div className="TaskHeading mx-3">
                <p className="TaskName">{task.name}</p>
                <p className="TaskAvail"><img src={task.coinTask} width={15} /> {task.reward}</p>
              </div>
            </div>
            <div className="TaskRightColArrow">
              <img src={taskTick} />
            </div>
          </div>
        ))}
      </div>





      {/* Task List */}
      <div className="FreeTaskMainDiv my-3">
        <p className="mx-3">Task List</p>
        {taskList.map(task => (
          <div key={task.id} className="Task my-1" onClick={handleTaskPopup} >
            <div className="TaskLeft">
              <div className="TaskIcon">
                <img src={task.icon} width={20} />
              </div>
              <div className="TaskHeading mx-3">
                <p className="TaskName">{task.name}</p>
                <p className="TaskAvail"><img src={task.coinTask} width={15} /> {task.reward}</p>
              </div>
            </div>
            <div className="TaskRightColArrow">
              <img src={taskTick} />
            </div>
          </div>
        ))}
      </div>


    </div>
  )
}

export default Task