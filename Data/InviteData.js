import React from 'react';
import { useContext, useEffect, useState } from "react"
import { getClaimUserData, getReferralUserData } from "../services/apis"
import { UserInfo } from "../ContextApi/UserData"

const InviteData = () => {


    const [totalRef, setTotalRef] = useState(0)
    const [claimData, setClaimData] = useState([])
    const {userInfo} = useContext(UserInfo)

  // getting the info of refferal Link
  const getRefferalUserData = async () => {
    const resp = await getReferralUserData(localStorage.getItem("user_id"))
    const resp1 = await getClaimUserData(localStorage.getItem("user_id"))
    console.log(resp.data)
    setClaimData(resp1.data)
    setTotalRef(resp.data.refralData.length)
  }

      useEffect(()=>{
        getRefferalUserData()
      },[userInfo])
      

    const inviteData = [
        {
            id: 1,
            no_of_invite: 1,
            price: 25000,
            done: totalRef>=1? true : false ,
            claim: claimData.invite1 ? true : false,
            claimName:"invite1",
            totalRef:totalRef
        },
        {
            id: 2,
            no_of_invite: 3,
            price: 50000,
            done: totalRef>=3? true : false,
            claim: claimData.invite2 ? true : false,
            claimName:"invite2",
            totalRef:totalRef
        },
        {
            id: 3,
            no_of_invite: 10,
            price: 100000,
            done: totalRef>=10? true : false,
            claim: claimData.invite3 ? true : false,
            claimName:"invite3",
            totalRef:totalRef
        },
        {
            id: 4,
            no_of_invite: 25,
            price: 200000,
            done: totalRef>=25? true : false,
            claim: claimData.invite4 ? true : false,
            claimName:"invite4",
            totalRef:totalRef
        },
        {
            id: 5,
            no_of_invite: 50,
            price: 400000,
            done: totalRef>=50? true : false,
            claim: claimData.invite5 ? true : false,
            claimName:"invite5",
            totalRef:totalRef
        },
        {
            id: 6,
            no_of_invite: 100,
            price: 800000,
            done: totalRef>=100? true : false,
            claim: claimData.invite6 ? true : false,
            claimName:"invite6",
            totalRef:totalRef
        },
        {
            id: 7,
            no_of_invite: 500,
            price: 1000000,
            done: totalRef>=500? true : false,
            claim: claimData.invite7 ? true : false,
            claimName:"invite7",
            totalRef:totalRef
        },
        {
            id: 8,
            no_of_invite: 1000,
            price: 2000000,
            done: totalRef>=1000? true : false,
            claim: claimData.invite8 ? true : false,
            claimName:"invite8",
            totalRef:totalRef
        },
        {
            id: 9,
            no_of_invite: 10000,
            price: 4000000,
            done: totalRef>=10000? true : false,
            claim: claimData.invite9 ? true : false,
            claimName:"invite9",
            totalRef:totalRef
        },
        {
            id: 10,
            no_of_invite: 100000,
            price: 8000000,
            done: totalRef>=10000? true : false,
            claim: claimData.invite10 ? true : false,
            claimName:"invite10",
            totalRef:totalRef
        },
    ]

    return inviteData
}
export default InviteData