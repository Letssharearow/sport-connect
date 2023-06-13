import {
    IonButton, IonCol, IonGrid, IonIcon,
    IonItem,
    IonLabel, IonRow,
} from '@ionic/react';
import './MessageListItem.css';
import {Category} from "../data/category";
import {useState} from "react";
import {add, addCircle, addOutline, removeOutline} from "ionicons/icons";
import CategoryIcon from "./CategoryIcon";

interface Props {
    category: Category;
    isSelected: boolean;
    icon?: undefined | "addOutline" | "removeOutline";
    togglSelected: (category: Category) => void;
}

const CategoryComponent: React.FC<Props> = ({category, isSelected, togglSelected, icon}) => {


    return (
        <IonItem onClick={() => {
            togglSelected(category)
        }} className="ion-margin" color={isSelected ? "dark" : "light"} detail={false}
                 lines="none"
                 style={{border: "1px solid var(--ion-color-dark)", borderRadius: "4px"}}
        >

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
                !isSelected && icon &&
                <IonButton slot="end" fill="clear" size="small">
                    <IonIcon slot="end" size="large" icon={icon === "addOutline" ? addOutline : removeOutline}/>
                </IonButton>
            }
        </IonItem>
    );
};

export default CategoryComponent;
