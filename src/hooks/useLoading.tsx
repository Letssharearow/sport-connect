import {useDispatch, useSelector} from "react-redux";
import {fetchChatsFromUser, fetchUsers} from "../redux/asyncActions";
import {AppDispatch} from "../index";
import {useEffect} from "react";
import {IRootState} from "../data/models";

export const useLoading = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);


    const uid = useSelector((state: IRootState) => state.datasetSlice.user?.uid)
    useEffect(() => {
        if (uid) {
            dispatch(fetchChatsFromUser(uid));
        }
    }, [uid, dispatch]);

    const state = useSelector((state: IRootState) => state.datasetSlice)
    useEffect(() => {
        console.debug('state', state);
    }, [state]);
}