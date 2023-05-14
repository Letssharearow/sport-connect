import {IRootState} from "../data/models";
import {useSelector} from "react-redux";
import {UsersPreview} from "../components/UsersPreview";

const Contacts: React.FC = () => {

    const usersState = useSelector((state: IRootState) => state.datasetSlice.users);
    const userState = useSelector((state: IRootState) => state.datasetSlice.user);

    const filteredUsers = usersState.filter(u => userState?.chats?.map(chat => chat.userId).includes(u?.uid ?? ''));

    const refresh = (e: CustomEvent) => {
        setTimeout(() => {
            e.detail.complete();
        }, 3000);
    };

    return (
        <UsersPreview heading="Deine Leute" users={filteredUsers} refresh={refresh}/>
    );
};

export default Contacts;
