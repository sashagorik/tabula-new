import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { commonFunction } from './apiCall';
import { baseUrl } from "../services/helper";

// login api - commonFunction from apiCall.js
export const getUserData = async(data) =>{
  return await commonFunction("POST", `${baseUrl}/api/v1/userDetails`, { user_id: data });
}





////покупка бустеров


export const upgradeBooster = async (user_id, value, charges) => {
  try {
      const response = await axios.post(`${baseUrl}/api/v1/upgradeBooster`, {
          user_id,
          value,
          charges
      });
      return response;
  } catch (error) {
      console.error('Error upgrading booster:', error);
      return { status: 500, message: 'Internal Server Error' };
  }
};


// get paid booster details
export const getBooster = async(data) =>{
  return await commonFunction("POST",`${baseUrl}/api/v1/getBooster`,{ user_id: data })
}


// Получение бесплатных бустеров
export const getFreeBoosterApi = async (user_id) => {
  return await commonFunction("POST", `${baseUrl}/api/v1/getFreeBoosterApi`, { user_id });
};

export const updateCoins = async (userId, totalCoins) => {
  try {
    const response = await axios.post(`${baseUrl}/api/v1/updateCoins`, {
      user_id: userId,
      coins: totalCoins,
    });

    // Возвращаем данные, если нужно обрабатывать ответ на другой стороне
    return response.data;

  } catch (error) {
    console.error('Error updating coins:', error);
    throw error; // Можно добавить дополнительную обработку ошибок здесь
  }
};

export const updateBooster = async (user_id, boosterData) => {
  const response = await fetch(`${baseUrl}/updateBooster`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_id, boosterData }),
  });
  const data = await response.json();
  return data;
};



export const upgradeFreeBoosterApi = async (userId, boosterId) => {
  // Логика для обновления бесплатных бустеров
};

// Временные заглушки
export const checkJoinedSocial = async (userId, boosterId) => {
  // Логика 
};

export const getClaimUserData = async (userId, boosterId) => {
  // Логика 
};

export const updateClaimUserData = async (userId, boosterId) => {
  // Логика 
};

export const getSocailTasks = async (userId, boosterId) => {
  // Логика 
};

export const getDailyRewardDetails = async (userId) => {
  try {
    const response = await axios.get(`${baseUrl}/api/dailyRewardDetails/${userId}`);
    return response;
  } catch (error) {
    console.error("Error fetching daily reward details:", error);
  }
};

export const updateDailyRewardDetails = async (userId, coins, isClaimed) => {
  try {
    const response = await axios.post(`${baseUrl}/api/updateDailyReward/${userId}`, {
      coins,
      isClaimed
    });
    return response;
  } catch (error) {
    console.error("Error updating daily reward details:", error);
  }
};

export const updateSocailApi = async (userId, boosterId) => {
  // Логика 
};

export const getReferralUserData = async (userId, boosterId) => {
  // Логика 
};

export const getReferralLinkData = async (userId, boosterId) => {
  // Логика 
};
