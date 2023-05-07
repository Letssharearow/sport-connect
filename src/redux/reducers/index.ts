import {State, User, UserData} from "../../data/models";
import {Page} from "../../data/enums";

import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export const initialState: State = {
    user: undefined,
    userData: undefined,
    currentPage: Page.login,
    lastPage: Page.login,
}

export const datasetSlice = createSlice({
    name: 'datasets',
    initialState: initialState,
    reducers: {
        setSomething: (state: State, action: PayloadAction<UserData>) => {
            state.userData = action.payload;
        },
        setUser: (state: State, action: PayloadAction<User>) => {
            state.user = action.payload;
        }
    }
})

export const {setSomething, setUser} = datasetSlice.actions

export default datasetSlice.reducer


