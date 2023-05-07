import {State, User, UserData} from "../../data/models";
import {Gender, Page} from "../../data/category";

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
        setUser: (state: State, action: PayloadAction<Partial<User>>) => {
            state.user = {
                ...{
                    id: 0,
                    age: 0,
                    categories: [],
                    gender: Gender.divers,
                    name: '',
                    description: ''
                }, ...action.payload
            };
        }
    }
})

export const {setSomething, setUser} = datasetSlice.actions

export default datasetSlice.reducer


