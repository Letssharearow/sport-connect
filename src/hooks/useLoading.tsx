import {useDispatch} from "react-redux";
import {fetchUsers} from "../redux/asyncActions";
import {AppDispatch} from "../index";
import {useEffect} from "react";

export const useLoading = () => {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchUsers());
    }, []);
}