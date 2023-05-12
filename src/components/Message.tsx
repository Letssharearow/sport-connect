import {
    IonCard,
    IonItem,
    IonText,
} from '@ionic/react';
import './MessageListItem.css';
import {Category} from "../data/category";
import {useState} from "react";
import {IRootState, Message as MessageModel} from "../data/models";
import {useSelector} from "react-redux";

interface MessageProps {
    message: MessageModel;
}

const Message: React.FC<MessageProps> = ({message}) => {

    const uid = useSelector((state: IRootState) => state.datasetSlice.user?.uid);

    return (
        <IonItem color={message.uid === uid ? "primary" : "secondary"}>

            <IonText style={{padding: 3}}
                     color="light">{message.value}</IonText>
        </IonItem>
    );
};

export default Message;
