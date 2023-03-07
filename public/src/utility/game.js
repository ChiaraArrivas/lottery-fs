import axios from "axios"
import { API_URL } from "../constants";

export const retrieveActiveDraw = async () => {
  try {
    const response = await axios({
      url: API_URL + '/api/draws/active',
      method: 'GET',
    })
    return response.data;
  } catch (err) {
    throw err;
  }
} 