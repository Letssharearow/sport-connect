import {
    IonCard,
    IonItem,
    IonText,
} from '@ionic/react';
import './MessageListItem.css';
import {Category} from "../data/category";
import {useState} from "react";
import {Message as MessageModel} from "../data/models";

interface MessageProps {
    message: MessageModel;
}

const Message: React.FC<MessageProps> = ({message}) => {

    return (
        <IonItem color={message.isFromMe ? "primary" : "secondary"}>

            <IonText style={{padding: 3}}
                     color="light">{message.value}</IonText>
        </IonItem>
    );
};

export default Message;
