import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { commonFunction } from './apiCall';
import { baseUrl } from "../services/helper";



export const checkUser = async (userId) => {
  console.log('Checking user existence:', userId);
  try {
    const response = await commonFunction("POST", `${baseUrl}/api/v1/checkUser`, { user_id: userId });
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
    const response = await commonFunction("POST", `${baseUrl}/api/v1/getUserDetails`, { user_id: userId });
    return response.data;
  } catch (error) {
    console.error('Error getting user details:', error);
    throw error;
  }
};