import { createContext, useState } from "react"

export const socialInfo = createContext(null)

const SocialContext = ({children}) => {



    const [socialData, setSocialData] = useState({
        telegramChannel:false,
        telegramAnnouncement:false,
        twitter:false,
        instagram:false,
        tiktok:false,
        youtube:false,
        retweet:false,
        comment:false
    })





  return (
    <socialInfo.Provider value={{socialData, setSocialData}} >
        {children}
    </socialInfo.Provider>
  )
}

export default SocialContext