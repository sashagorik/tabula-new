import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { commonFunction } from './apiCall';
import { baseUrl } from "../services/helper";



export const getUserData = async (userId) => {
  console.log('Getting user details:', userId);
  try {
    const response = await axios.get(`${baseUrl}/api/v1/getUserDetails?user_id=${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting user details:', error);
    throw error;
  }
};
  


export const updateBooster = async (user_id, boosterData) => {
  try {
    const response = await axios.post(`${baseUrl}/api/v1/updateBooster`, {
      user_id,
      boosterData,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating booster:', error);
    throw error;
  }
};







///////////////////////////////////////////

//export const checkUser = async (userId) => {
 // console.log('Checking user existence:', userId);
 // try {
//    const response = await commonFunction("GET", `${baseUrl}/api/v1/checkUser`, { params: { user_id: userId } });
//   return response.data.exists;
 // } catch (error) {
//   console.error('Error checking user existence:', error);
//    throw error;
//  }
//};

export const createUser = async (userId) => {
  console.log('Creating user:', userId);
  try {
    const response = await commonFunction("POST", `${baseUrl}/api/v1/createUser`, { user_id: userId });
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};


// Функция для обновления монет в базе данных


export const updateCoinsInDatabase = async (user_id, total_coins) => {
  try {
    const response = await axios.post(`${baseUrl}/api/v1/updateCoins`, {
      user_id,
      total_coins
    });
    return response.data;
  } catch (error) {
    throw new Error('Ошибка при обновлении монет в базе данных');
  }
};



export const updateTapCoinsInDatabase = async (user_id, tap_coins) => {
  try {
    const response = await axios.post(`${baseUrl}/api/v1/updateTapCoins`, {
      user_id,
      tap_coins
    });
    return response.data;
  } catch (error) {
    throw new Error('Ошибка при обновлении монет в базе данных');
  }
};




export const getBooster = async (user_id) => {
  try {
    const response = await axios.get(`${baseUrl}/api/v1/boosterDetails`, {
      params: { user_id }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching booster details:', error);
    throw error;
  }
};



export const upgradeBooster = async (userId, boosterType) => {
  return await axios.post(`${baseUrl}/api/v1/upgradeBooster`, {
    user_id: userId,
    boosterType
  });
};


























// Функция для обновления накликанных монет пользователя
//export const updateTotalCoins = async (userId, totalCoins) => {
 // try {
  //  const response = await axios.post(`${baseUrl}/api/v1/updateTotalCoins`, { user_id: userId, totalCoins });
 //   return response.data; // Возвращает обновленные данные пользователя
 // } catch (error) {
  //  console.error('Error updating total coins:', error);
  //  throw error;
//  }
//};










////////////////////////////////////////////



export const getFreeBoosterApi = async (user_id) => {
  try {
    const response = await axios.get(`${baseUrl}/api/v1/getFreeBoosterApi`, {
      params: { user_id }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching free booster details:', error);
    throw error;
  }
};

export const updateCoins = async (userId, boosterId) => {
  // Логика для обновления бесплатных бустеров
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
