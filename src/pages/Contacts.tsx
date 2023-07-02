import {IRootState} from "../data/models";
import {useDispatch, useSelector} from "react-redux";
import {UsersPreview} from "../components/UsersPreview";
import {fetchUsers} from "../redux/asyncActions";
import {AppDispatch} from "../index";

const Contacts: React.FC = () => {

    const usersId = useSelector((state: IRootState) => state.datasetSlice.users);


    const userState = useSelector((state: IRootState) => state.datasetSlice.user);


    const filteredUsers = usersId.filter(u => userState?.chats?.[u.uid ?? '']);
    const dispatch = useDispatch<AppDispatch>();

    const refresh = (e: CustomEvent) => {
        dispatch(fetchUsers()).then(() => e.detail.complete());
    };

    return (
        <UsersPreview showDistance={false} heading="Nachrichten" users={filteredUsers} refresh={refresh}/>
    );
};

export default Contacts;
