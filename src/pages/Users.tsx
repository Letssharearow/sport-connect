import {IRootState} from "../data/models";
import {useDispatch, useSelector} from "react-redux";
import {UsersPreview} from "../components/UsersPreview";
import {AppDispatch} from "../index";
import {fetchUsers} from "../redux/asyncActions";

const Users: React.FC = () => {

    const usersState = useSelector((state: IRootState) => state.datasetSlice.users);
    const userState = useSelector((state: IRootState) => state.datasetSlice.user);

    const filteredUsers = usersState.filter(u => {
        return u.categories?.find(cat => userState?.categories?.includes(cat)) && u.uid !== userState?.uid
    });

    const dispatch = useDispatch<AppDispatch>();

    const refresh = (e: CustomEvent) => {
        dispatch(fetchUsers()).then(() => e.detail.complete());
    };

    return (
        <UsersPreview heading="Coole Leute" users={filteredUsers} refresh={refresh}/>
    );
};

export default Users;
