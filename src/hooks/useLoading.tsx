import {useDispatch} from "react-redux";
import {fetchUsers} from "../redux/asyncActions";
import {AppDispatch} from "../index";

export const useLoading = () => {
    const dispatch = useDispatch<AppDispatch>();
    dispatch(fetchUsers());
}