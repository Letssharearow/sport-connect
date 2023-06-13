import {ChatApp, ChatFirebase, Message, ToastPosition, State, Toast, User} from "../../data/models";

import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {fetchChatsFromUser, fetchUser, fetchUsers, loginAction, writeUser} from '../asyncActions'
import {updateArray} from "../../utils/functions";
import {Color} from "@ionic/core";
import {athletes} from "../../data/data";
import {debug} from "../../data/constantValues";

export const initialState: State = {
    user: {name: athletes[Math.floor(Math.random() * athletes.length)]},
    users: [],
    userData: undefined,
    isProfileSetup: false,
}
const getDefaultToast = (message: string, color?: Color) => ({
    duration: 5000,
    position: "bottom" as ToastPosition,
    isOpen: true,
    message,
    color,
});

export const datasetSlice = createSlice({
    name: 'datasets',
    initialState: initialState,
    reducers: {
        setUser: (state: State, action: PayloadAction<Partial<User>>) => {
            state.user = {
                ...state.user
                , ...action.payload
            };
        },
        setChats: (state: State, action: PayloadAction<ChatFirebase>) => {
            if (state.user && action.payload) {
                state.user.chats = (action.payload);
            }
        },
        setIsProfileSetup: (state: State, action: PayloadAction<boolean>) => {
            state.isProfileSetup = action.payload;
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
            if (debug) console.debug('fetchUsers', payload);
            if (payload) {
                state.users = (payload as User[]);
            }
        }).addCase(fetchUser.fulfilled, (state, {payload}) => {
            if (debug) console.debug('fetchUser', payload);
            if (payload) {
                let newUsers = updateArray(state.users, payload, 'uid');
                if (newUsers) {
                    state.users = newUsers;
                }
            }
        }).addCase(writeUser.rejected, (state, action) => {
            if (debug) console.debug('fetchUser', action);
            state.toast = getDefaultToast(action.error.message ?? 'Failed to write data into the cloud', "danger");
        }).addCase(writeUser.fulfilled, (state, action) => {
            if (debug) console.debug('fetchUser', action);
            // state.toast = getDefaultToast('Profil gespeichert', "success");
        }).addCase(fetchChatsFromUser.fulfilled, (state, action) => {
            if (debug) console.debug('fetchChatsFromUser', action);
            if (action.payload && state.user) {
                state.user.chats = (action.payload);
            }
        }).addCase(fetchChatsFromUser.rejected, (state, {error}) => {
            if (debug) console.debug('fetchChatsFromUserError', error);
            state.toast = getDefaultToast(error.message ?? 'Error', "danger");
        })
            .addCase(loginAction.fulfilled, (state, {payload}) => {
                if (debug) console.debug('loginAction', payload);
                if (payload && state.user) {
                    let find = state.users.find(u => u.uid === payload);
                    state.user = find ?? {uid: payload};
                    // state.toast = getDefaultToast('logged in', "success");
                }
            })
            .addCase(loginAction.rejected, (state, {error}) => {
                if (debug) console.debug('loginAction', error);
                state.toast = getDefaultToast(error.message ?? 'Error', "danger");
            })
    })

})

export const {setUser, setToast, dismissToast, setChats, setIsProfileSetup} = datasetSlice.actions

export default datasetSlice.reducer


