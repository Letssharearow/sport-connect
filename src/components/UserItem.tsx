import {
    IonItem,
    IonLabel,
} from '@ionic/react';
import './MessageListItem.css';
import {Category} from "../data/category";
import {useState} from "react";
import {User} from "../data/models";

interface MessageListItemProps {
    user: User;
}

const UserItem: React.FC<MessageListItemProps> = ({user}) => {

    const [isSelected, setIsSelected] = useState<boolean>();


    return (
        <IonItem routerLink={`/users/${user.uid}`} detail={false}>
            <IonLabel className="ion-text-wrap ion-padding"
                      style={{backgroundColor: isSelected ? "#437738" : "#777"}}>
                <h2>{user.name}</h2>
            </IonLabel>
        </IonItem>
    );
};

export default UserItem;
