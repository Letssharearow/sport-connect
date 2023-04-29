import {
    IonItem,
    IonLabel,
} from '@ionic/react';
import './MessageListItem.css';
import {Categories} from "../data/messages";

interface MessageListItemProps {
    message: Categories;
}

const CategoryComponent: React.FC<MessageListItemProps> = ({message}) => {
    return (
        <IonItem detail={false}>
            <div slot="start" className="dot dot-unread"></div>
            <IonLabel className="ion-text-wrap">
                <h2>{message}</h2>
                <p>

                </p>
            </IonLabel>
        </IonItem>
    );
};

export default CategoryComponent;
