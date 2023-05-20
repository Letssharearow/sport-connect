import {useDispatch, useSelector} from "react-redux";
import {fetchUsers} from "../redux/asyncActions";
import {AppDispatch} from "../index";
import {useEffect, useRef} from "react";
import {Chat, IRootState} from "../data/models";
import {subscribe} from "../utils/firebaseConfig";
import {Endpoint} from "../data/category";
import {setChats} from "../redux/reducers";
import {debug} from "../data/constantValues";

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
                if (debug) console.debug('subscribe', chats);
                dispatch(setChats(chats))
            });
        }
    }, [user, dispatch]);

    const state = useSelector((state: IRootState) => state.datasetSlice)
    useEffect(() => {
        if (debug) console.debug('state', state);
    }, [state]);
}