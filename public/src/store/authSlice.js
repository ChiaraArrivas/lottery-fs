import { createSlice } from '@reduxjs/toolkit'

export const authSlice = () => {
    const auth = JSON.parse(localStorage.getItem("auth"));

    return createSlice({
        name: 'auth',
        initialState: {
            token: auth?.token || null,
            user: auth?.user || null,
        },
        reducers: {        
            login: (state, action) => {
                console.log(action.payload);
                state.token = action.payload.token
                state.user = action.payload.user
                localStorage.setItem("auth",JSON.stringify({ 
                    token: action.payload.token,
                    user: action.payload.user,
                }))
            },
    
            logout: (state) => {
                state.token = null
                state.user = null
                localStorage.removeItem("auth")
            }
        },
    })
}

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice().actions

export default authSlice().reducer