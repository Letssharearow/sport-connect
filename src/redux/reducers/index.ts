import {State, UserData} from "../../data/models";
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
        }
    }
})

export const {setSomething} = datasetSlice.actions

export default datasetSlice.reducer


