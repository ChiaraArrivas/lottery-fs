import { createSlice } from '@reduxjs/toolkit'

export const drawSlice = createSlice({
        name: 'draw',
        initialState: {
            info: null,
        },
        reducers: {        
            setDrawData: (state, action) => {
                state.info = action.payload
            },
        },
    })

// Action creators are generated for each case reducer function
export const { setDrawData } = drawSlice.actions

export default drawSlice.reducer