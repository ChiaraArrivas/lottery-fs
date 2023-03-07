import axios from 'axios';
import { API_URL } from '../constants'
 
export const authUser = async (email, password) => {
    try {
        const response = await axios({
            url: API_URL + '/auth/token',
            method: 'POST',
            data: {
                email,
                password,
            },
        })
        
        return response.data
    } catch (err) {
        throw err;
    }
};

