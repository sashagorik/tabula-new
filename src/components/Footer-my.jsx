import "./Footer.css"
// import BgIcon from "../assets/iconBg.svg"
// import BackIcon from "../assets/backImg.svg"

import { NavLink } from "react-router-dom";
import Invite from "../assets/footerInvite.svg"
import Task from "../assets/task.svg"
import Tap from "../assets/tap.svg"
import Booster from "../assets/booster.svg"
import Earn from "../assets/Earn.svg"
// import { useEffect, useState } from "react";



const Footer = () => {


  // const [tgWebUrl,setTgWebUrl] = useState()

  // useEffect(()=>{
  //     setTgWebUrl(localStorage.getItem("tgWebAppUrl"))
  // },[])



  return (
    <>

      <div className="footerMainDiv">

        {/* <div className="bottomNavBar">
          <NavLink to="/referral" activeClassName="active">
            <div className="bottomNavItem">
              <img src={Reffer} />
              <p className="bottomNavP">
                REFERRAL
              </p>
            </div>
          </NavLink>

          <NavLink to="/task" activeClassName="active">
            <div className="bottomNavItem">
              <img src={Task} />
              <p className="bottomNavP">
                TASK
              </p>
            </div>
          </NavLink>

          <NavLink to="/" activeClassName="active">
            <div className="bottomNavItem">
              <img src={Tap} />
              <p className="bottomNavP">
                TAP
              </p>
            </div>
          </NavLink>

          <NavLink to="/boost" activeClassName="active">
            <div className="bottomNavItem">
              <img src={Boost} />
              <p className="bottomNavP">
                BOOST
              </p>
            </div>
          </NavLink>

          <NavLink to="/stats" activeClassName="active">
            <div className="bottomNavItem">
              <img src={Stats} />
              <p className="bottomNavP">
                STATS
              </p>
            </div>
          </NavLink>

        </div> */}







        <div className="footerDiv">

          <NavLink to="/invite" activeclassname="active">
            <button className="footerButton">

              <div className="footerButtonImg">
                <img src={Invite}  />
              </div>

              <div className="footerButtonHeading">
                Invite
              </div>


            </button>
          </NavLink>




          <NavLink to="/task" activeclassname="active">
            <button className="footerButton">

              <div className="footerButtonImg">
                <img src={Task}  />
              </div>

              <div className="footerButtonHeading">
                Task
              </div>


            </button>
          </NavLink>



          <NavLink to="/" activeclassname="active">

            <button className="footerButton">

              <div className="footerButtonImg">
                <img src={Tap}  />
              </div>

              <div className="footerButtonHeading">
                Tap
              </div>


            </button>
          </NavLink>




          <NavLink to="/boost" activeclassname="active">
            <button className="footerButton">

              <div className="footerButtonImg">
                <img src={Booster}  />
              </div>

              <div className="footerButtonHeading">
                Booster
              </div>


            </button>
          </NavLink>



          <NavLink to="/earn" activeclassname="active">
            <button className="footerButton">

              <div className="footerButtonImg">
                <img src={Earn} />
              </div>

              <div className="footerButtonHeading">
                Earn
              </div>


            </button>
          </NavLink>


        </div>








      </div>

    </>
  )
}

export default Footer