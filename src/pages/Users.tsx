import CategoryComponent from '../components/CategoryComponent';
import {useState} from 'react';
import {Enums, getCategories} from '../data/enums';
import {
    IonButton, IonCardSubtitle, IonCol,
    IonContent,
    IonHeader,
    IonList,
    IonPage,
    IonRefresher,
    IonRefresherContent, IonRow,
    IonTitle,
    IonToolbar,
    useIonViewWillEnter
} from '@ionic/react';
import {getUser} from "../data/users";
import {User} from "../data/models";

const Users: React.FC = () => {

    const [user, setUser] = useState<User[]>([]);

    useIonViewWillEnter(() => {
        const user = getUser();
        setUser(user);
    });

    return (
        <div>JAHA</div>
    );
};

export default Users;
