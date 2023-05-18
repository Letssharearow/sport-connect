import {
    IonButton, IonIcon,
    IonItem,
    IonLabel,
} from '@ionic/react';
import './MessageListItem.css';
import {Category} from "../data/category";
import {useState} from "react";
import {addCircle, addOutline} from "ionicons/icons";

interface Props {
    category: Category;
    isSelected: boolean;
    togglSelected: (category: Category) => void;
}

const CategoryComponent: React.FC<Props> = ({category, isSelected, togglSelected}) => {


    return (
        <IonItem onClick={() => {
            togglSelected(category)
        }} color={isSelected ? "primary" : "light"} detail={false}>
            <IonIcon slot="start" icon={addOutline}/>
            <IonLabel>{category}</IonLabel>
            <IonButton slot="end" fill="clear" size="small">
                <IonIcon icon={addOutline}/>
            </IonButton>
        </IonItem>
    );
};

export default CategoryComponent;
