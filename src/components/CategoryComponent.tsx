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
    showAddIcon?: boolean;
    togglSelected: (category: Category) => void;
}

const CategoryComponent: React.FC<Props> = ({category, isSelected, togglSelected, showAddIcon = true}) => {


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
                !isSelected && showAddIcon &&
                <IonButton slot="end" fill="clear" size="small">
                    <IonIcon slot="end" size="large" icon={isSelected ? add : addOutline}/>
                </IonButton>
            }
        </IonItem>
    );
};

export default CategoryComponent;
