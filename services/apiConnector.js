import axios from "axios";
import { apiConfig } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const axiosInstance = axios.create({});
const baseURL = apiConfig.baseUrl;

export const axiosRequest = async (method, url, bodyData, headers, params) => {
  const accessToken = await AsyncStorage.getItem('accessToken');
  console.log(`${baseURL + url}`);
  
  return axiosInstance({
    method: `${method}`,
    url: `${baseURL + url}`,
    data: bodyData ? bodyData : null,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: params ? params : null,
  });
};

