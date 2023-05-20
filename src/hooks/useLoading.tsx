import {useDispatch, useSelector} from "react-redux";
import {fetchChatsFromUser, fetchUsers} from "../redux/asyncActions";
import {AppDispatch} from "../index";
import {useEffect, useMemo, useRef} from "react";
import {Chat, IRootState} from "../data/models";
import {subscribe} from "../utils/firebaseConfig";
import {Endpoint} from "../data/category";
import {setChats} from "../redux/reducers";

export const useLoading = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);


    const user = useSelector((state: IRootState) => state.datasetSlice.user)
    const unsub = useRef<any | null>(null);

    useEffect(() => {
        console.log('useEffect', useEffect);
        if (user?.uid && unsub.current === null) {
            unsub.current = subscribe(Endpoint.chats, user.uid, (chats: Chat[]) => {
                console.debug('subscribe', chats);
                dispatch(setChats(chats))
            });
        }
    }, [user, dispatch]);

    const state = useSelector((state: IRootState) => state.datasetSlice)
    useEffect(() => {
        console.debug('state', state);
    }, [state]);
}