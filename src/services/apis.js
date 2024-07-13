import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { commonFunction } from './apiCall';
import { baseUrl } from "../services/helper";



export const checkUser = async (userId) => {
  console.log('Checking user existence:', userId);
  try {
    const response = await commonFunction("GET", `${baseUrl}/api/v1/checkUser`, { params: { user_id: userId } });
    return response.data.exists;
  } catch (error) {
    console.error('Error checking user existence:', error);
    throw error;
  }
};

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





export const getUserDetails = async (userId) => {
  console.log('Getting user details:', userId);
  try {
    const response = await commonFunction("GET", `${baseUrl}/api/v1/getUserDetails`, { params: { user_id: userId } });
    return response.data;
  } catch (error) {
    console.error('Error getting user details:', error);
    throw error;
  }
};

////////////////////////////////////////////

export const getBooster = async (user_id) => {
  const response = await fetch(`${baseUrl}/boosterDetails?user_id=${user_id}`);
  const data = await response.json();
  return data;
};

export const getFreeBoosterApi = async (user_id) => {
  // Реализуем вызов API для получения данных бесплатных бустеров, если это отдельный эндпоинт
  const response = await fetch(`${baseUrl}/boosterDetails?user_id=${user_id}`);
  const data = await response.json();
  return data;
};

export const updateCoins = async (userId, boosterId) => {
  // Логика для обновления бесплатных бустеров
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

export const upgradeBooster = async (userId, boosterType) => {
  return await axios.post(`${baseUrl}/api/v1/upgradeBooster`, {
    user_id: userId,
    boosterType
  });
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
