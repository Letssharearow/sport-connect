import {Position, State, Toast, User, UserData} from "../../data/models";

import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {fetchChatsFromUser, fetchUser, fetchUsers, loginAction} from '../asyncActions'
import {updateArray} from "../../utils/functions";
import {Color} from "@ionic/core";

export const initialState: State = {
    user: {},
    users: [],
    userData: undefined,
}
const getDefaultToast = (message: string, color?: Color) => ({
    duration: 5000,
    position: "bottom" as Position,
    isOpen: true,
    message,
    color,
});

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
            state.toast = getDefaultToast(action.payload.message, action.payload.color);
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
        }).addCase(fetchChatsFromUser.fulfilled, (state, {payload}) => {
            console.debug('fetchChatsFromUser', payload);
            if (payload && state.user) {
                state.user.chats = payload.chats;
            }
        })
            .addCase(loginAction.fulfilled, (state, {payload}) => {
                console.debug('loginAction', payload);
                if (payload && state.user) {
                    let find = state.users.find(u => u.uid === payload);
                    state.user = find ?? {uid: payload};
                    state.toast = getDefaultToast('logged in', "success");
                }
            })
            .addCase(loginAction.rejected, (state, {error}) => {
                console.debug('loginAction', error);
                state.toast = getDefaultToast(error.message ?? 'Error', "danger");
            })
    })

})

export const {setSomething, setUser, setToast, dismissToast} = datasetSlice.actions

export default datasetSlice.reducer


