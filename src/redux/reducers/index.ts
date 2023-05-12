import {Message, State, Toast, User, UserData} from "../../data/models";
import {Category, Gender, Page} from "../../data/category";

import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {build} from "ionicons/icons";
import {fetchUser, fetchUsers, loginAction} from '../asyncActions'
import {updateArray} from "../../utils/functions";

export const initialState: State = {
    user: {},
    users: [],
    userData: undefined,
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

    },
    extraReducers: (builder => {
        builder.addCase(fetchUsers.fulfilled, (state, {payload}) => {
            console.debug('fetchUsers', payload);
            if (payload) {
                state.users = (payload as User[]);
            }
        }).addCase(fetchUser.fulfilled, (state, {payload}) => {
            console.debug('fetchUser', payload);
            if (payload) {
                let newUsers = updateArray(state.users, payload, 'uid');
                if (newUsers) {
                    state.users = newUsers;
                }
            }
        })
            .addCase(loginAction.fulfilled, (state, {payload}) => {
                console.debug('loginAction', payload);
                if (payload && state.user) {
                    let find = state.users.find(u => u.uid === payload);
                    state.user = find ?? {uid: payload};
                }
            })
    })

})

export const {setSomething, setUser, setToast, dismissToast} = datasetSlice.actions

export default datasetSlice.reducer


