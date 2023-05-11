import {Message, State, Toast, User, UserData} from "../../data/models";
import {Category, Gender, Page} from "../../data/category";

import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export const initialState: State = {
    user: {},
    users: [{
        age: 20,
        name: "Julian",
        description: "Hi, ich will sport machen",
        categories: [Category.badminton, Category.volleyball, Category.running],
        uid: "0",
        gender: Gender.male,
    }, {
        age: 20,
        name: "Philipp",
        description: "Hi, ich will sport machen",
        categories: [Category.badminton, Category.volleyball, Category.running],
        uid: "1",
        gender: Gender.male,
    }, {
        age: 20,
        name: "Niemand",
        description: "Hi, ich will sport machen",
        categories: [Category.badminton, Category.volleyball, Category.running],
        uid: "2",
        gender: Gender.male,
    }, {
        age: 20,
        name: "Dieser",
        description: "Hi, ich will sport machen",
        categories: [Category.badminton, Category.volleyball, Category.running],
        uid: "3",
        gender: Gender.male,
    }, {
        age: 20,
        name: "Julian",
        description: "Hi, ich will sport machen",
        categories: [Category.badminton, Category.volleyball, Category.running],
        uid: "4",
        gender: Gender.male,
    },],
    chats: [],
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
                ...state.user
                , ...action.payload
            };
        },
        setToast: (state: State, action: PayloadAction<Toast>) => {
            state.toast = {duration: 5000, position: "bottom", isOpen: true, ...action.payload};
        },
        dismissToast: (state: State) => {
            if (state.toast) {
                state.toast.isOpen = false;
            }
        }

    }
})

export const {setSomething, setUser, setToast, dismissToast} = datasetSlice.actions

export default datasetSlice.reducer


