import {
    IonItem,
    IonLabel,
} from '@ionic/react';
import './MessageListItem.css';
import {Enums} from "../data/enums";
import {useState} from "react";

interface MessageListItemProps {
    message: string;
}

const CategoryComponent: React.FC<MessageListItemProps> = ({message}) => {

    const [isSelected, setIsSelected] = useState<boolean>();

    return (
        <IonItem onClick={() => setIsSelected((isSelected) => !isSelected)} detail={false}>
            <IonLabel className="ion-text-wrap ion-padding"
                      style={{backgroundColor: isSelected ? "#437738" : "#777"}}>
                <h2>{message}</h2>
            </IonLabel>
        </IonItem>
    );
};

export default CategoryComponent;
