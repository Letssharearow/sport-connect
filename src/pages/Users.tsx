import {IRootState} from "../data/models";
import {useSelector} from "react-redux";
import {UsersPreview} from "../components/UsersPreview";

const Users: React.FC = () => {

    const usersState = useSelector((state: IRootState) => state.datasetSlice.users);
    const userState = useSelector((state: IRootState) => state.datasetSlice.user);

    const filteredUsers = usersState.filter(u => u.categories?.find(cat => userState?.categories?.includes(cat)));

    const refresh = (e: CustomEvent) => {
        setTimeout(() => {
            e.detail.complete();
        }, 3000);
    };

    return (
        <UsersPreview heading="Coole Leute" users={filteredUsers} refresh={refresh}/>
    );
};

export default Users;
