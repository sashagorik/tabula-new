import { createContext, useState } from "react"

export const BoosterInfo = createContext(null)

const BoosterData = ({ children }) => {


    const [freeBoost,setFreeBoost] = useState({
        recharge:3,
        turbo:3
    })

    const [multiTap,setMultiTap] = useState({
        level:1,
        charges:200
    })
    const [fireLimit,setfireLimit] = useState({
        level:1,
        charges:200
    })
    const [flashSpeed,setflashSpeed] = useState({
        level:1,
        charges:200
    })
    const [hireAnt,sethireAnt] = useState({
        level:1,
        charges:200
    })

    // console.log(multiTap)


    return (
        <BoosterInfo.Provider value={{freeBoost,setFreeBoost,multiTap,setMultiTap,fireLimit,setfireLimit,flashSpeed,setflashSpeed,hireAnt,sethireAnt}} >
            {children}
        </BoosterInfo.Provider>
    )
}

export default BoosterData