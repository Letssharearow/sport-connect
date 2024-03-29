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

interface Props {
    message: MessageModel;
}

const Message: React.FC<Props> = ({message}) => {

    const uid = useSelector((state: IRootState) => state.datasetSlice.user?.uid);

    const isFromMe = message.uid === uid;
    return (
        <IonItem style={{
            width: '90%',
            margin: '3px',
            marginLeft: isFromMe ? 'auto' : '10px',
            marginRight: isFromMe ? '10px' : 'auto',
            borderRadius: '10px'
        }}
                 color={isFromMe ? "primary" : "secondary"}>

            <IonText style={{padding: 3}}
                     color="light">{message.value}</IonText>
        </IonItem>
    );
};

export default Message;
