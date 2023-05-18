import {
    IonButton, IonCol, IonGrid, IonIcon,
    IonItem,
    IonLabel, IonRow,
} from '@ionic/react';
import './MessageListItem.css';
import {Category} from "../data/category";
import {useState} from "react";
import {add, addCircle, addOutline} from "ionicons/icons";
import CategoryIcon from "./CategoryIcon";

interface Props {
    category: Category;
    isSelected: boolean;
    togglSelected: (category: Category) => void;
}

const CategoryComponent: React.FC<Props> = ({category, isSelected, togglSelected}) => {


    return (
        <IonItem onClick={() => {
            togglSelected(category)
        }} color={isSelected ? "dark" : "light"} detail={false}>

            <IonGrid>
                <IonRow>
                    <IonCol size="auto">
                        <CategoryIcon isOutline={!isSelected} category={category}/>
                    </IonCol>
                    <IonCol>
                        <IonLabel>{category}</IonLabel>
                    </IonCol>
                </IonRow>
            </IonGrid>
            {
                !isSelected &&
                <IonButton slot="end" fill="clear" size="small">
                    <IonIcon slot="end" size="large" icon={isSelected ? add : addOutline}/>
                </IonButton>
            }
        </IonItem>
    );
};

export default CategoryComponent;
