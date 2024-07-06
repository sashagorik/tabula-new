import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useEffect, useState } from "react";
import "./Layout.css"

const Layout = () => {


    const [hasAccess, setHasAccess] = useState(true);


// useEffect(() => {
//        const userAgent = navigator.userAgent;
//        const isMobileDevice = /iPhone|iPod|Android|BlackBerry/.test(userAgent);

        // if (!isMobileDevice) {
            // console.log("isMobile", isMobileDevice);
        //     setHasAccess(false);
        // }


        // this condition checking user is in iframe 
 //       if (!(window.location !== window.parent.location) && !isMobileDevice) {
 //           setHasAccess(false);
  //      }


 //   }, []);

  //  if (!hasAccess) {
  //      return <h1 className="no-Access">No Access</h1>;
  //  }



    return (
        <>
            <div className="main_div">
                {
                    location.href.includes("rank") ? "" : <Header />
                }

                <Outlet />
                <Footer />
            </div>
        </>
    )
}

export default Layout