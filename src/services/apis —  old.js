//import { commonFunction } from "./apiCall";
import { baseUrl } from "./helper";


// login api
export const getUserData = async (data) => {
    return await commonFunction("GET", `${baseUrl}/api/v1/userDetails?chatid=${data}`, null);
};



// login api
export const upgradeBooster = async(id, boostName, charges) =>{
    return await commonFunction("POST",`${baseUrl}/api/v1/upgradeLevel?chatid=${id}&booster=${boostName}&coin=${charges}`,"")
}


// get paid booster details
export const getBooster = async(id) =>{
    return await commonFunction("POST",`${baseUrl}/api/v1/getBooster?chatid=${id}`,"")
}

// get free booster details
export const getFreeBoosterApi = async(id) =>{
    return await commonFunction("POST",`${baseUrl}/api/v1/getFreeBooster?chatid=${id}`,"")
}


 //get free booster details
export const upgradeFreeBoosterApi = async(id, booster) =>{
    return await commonFunction("POST",`${baseUrl}/api/v1/useBooster?chatid=${id}&booster=${booster}`,"")
}


// get social task details
//export const getSocailTasks = async(id) =>{
//    return await commonFunction("POST",`${baseUrl}/api/v1/getsocialtask?chatid=${id}`,"")
//}


// get update social tasks
//export const updateSocailApi = async(id, task) =>{
//    return await commonFunction("POST",`${baseUrl}/api/v1/updateSocial?chatid=${id}&task=${task}`,"")
//}


// get social task details
//export const getReferralLinkData = async(data) =>{
//    return await commonFunction("POST",`${baseUrl}/api/v1/userDetails?chatid=${data}`,"")
//}

// get social task details
//export const getReferralUserData = async(data) =>{
 //   return await commonFunction("POST",`${baseUrl}/api/v1/getRefral?chatid=${data}`,"")
//}

// get social task details
//export const getClaimUserData = async(data) =>{
 //   return await commonFunction("POST",`${baseUrl}/api/v1/getclaimDetails?chatid=${data}`,"")
//}

// update claim task details
//export const updateClaimUserData = async(id, task) =>{
//    return await commonFunction("POST",`${baseUrl}/api/v1/useClaimDetails?chatid=${id}&claimname=${task}`,"")
//}

// update claim task details
//export const updateCoins = async(id, coin) =>{
 //   return await commonFunction("POST",`${baseUrl}/api/v1/claimCoin?chatid=${id}&coin=${coin}`,"")
//}

/// update claim task details
//export const checkJoinedSocial = async(id) =>{
//    return await commonFunction("POST",`${baseUrl}/api/v1/getclaimsocial?chatid=${id}`,"")
//}

/// update claim task details
//export const getDailyRewardDetails = async(id) =>{
//    return await commonFunction("POST",`${baseUrl}/api/v1/getdailyReward?chatid=${id}`,"")
//}



/// update claim task details
//export const udpateDailyRewardDetails = async(id,coin,status) =>{
//    return await commonFunction("POST",`${baseUrl}/api/v1/usedailyReward?chatid=${id}&coin=${coin}&status=${status}`,"")
//}