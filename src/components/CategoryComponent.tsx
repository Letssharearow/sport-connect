import {
    IonItem,
    IonLabel,
} from '@ionic/react';
import './MessageListItem.css';
import {Category} from "../data/category";
import {useState} from "react";

interface MessageListItemProps {
    category: Category;
    isSelected: boolean;
    togglSelected: (category: Category) => void;
}

const CategoryComponent: React.FC<MessageListItemProps> = ({category, isSelected, togglSelected}) => {


    return (
        <IonItem onClick={() => {
            togglSelected(category)
        }} detail={false}>
            <IonLabel className="ion-text-wrap ion-padding"
                      style={{backgroundColor: isSelected ? "#437738" : "#777"}}>
                <h2>{category}</h2>
            </IonLabel>
        </IonItem>
    );
};

export default CategoryComponent;
