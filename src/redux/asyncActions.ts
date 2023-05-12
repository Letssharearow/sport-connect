import {createAsyncThunk} from "@reduxjs/toolkit";
import {getDocument, getDocuments, login, saveDoc, setSingleDoc} from "../utils/firebaseConfig";
import {IRootState, Message, User} from "../data/models";
import {updateArray} from "../utils/functions";

export const fetchUsers = createAsyncThunk('users', async (args, {getState}) => {
    console.debug('fetchUser',);
    let documents = await getDocuments();
    console.debug('documents', documents);
    return documents;
});

export const fetchUser = createAsyncThunk('user', async (uid: string, {getState}) => {
    console.debug('fetchUser',);
    let document = await getDocument(uid);
    console.debug('documents', document);
    return document as User;
});

export const sendMessage = createAsyncThunk('user/message', async ({
                                                                       messages,
                                                                       from,
                                                                       to
                                                                   }: { messages: Message[], from: User, to: User }, {getState}) => {

    console.log('user/message');
    if (from && to && from.uid && from.chats && to.chats && to.uid && messages && messages.length > 0) {
        try {
            await setSingleDoc(from.uid, {
                ...from,
                chats: updateArray(from.chats, {userId: to.uid, messages}, 'userId')
            } as User)
            await setSingleDoc(to.uid, {
                ...to,
                chats: updateArray(to.chats, {userId: from.uid, messages}, 'userId')
            } as User)
        } catch (e) {
            throw(e);
        }
    } else {
        throw({message: 'failed'})
    }
});

export const loginAction = createAsyncThunk('user/login', async ({
                                                                     password, email
                                                                 }: { email: string, password: string }, {getState}) => {

    console.log('user/login');
    try {
        return await login(email, password);
    } catch (e) {
        throw(e);
    }

});