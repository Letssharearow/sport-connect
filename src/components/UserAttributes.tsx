import {IonButton, IonInput, IonItem, IonLabel, IonList, IonSelect, IonSelectOption, IonText} from "@ionic/react";
import Categories from "./Categories";
import {Page} from "../data/category";
import React from "react";
import {User} from "../data/models";

interface Props {
    isThisUser: boolean;
    user: User | undefined;
    handleNameChange?: (event: any) => void;
    handleAgeChange?: (event: any) => void;
    handleGenderChange?: (event: any) => void;
}


const UserAttributes: React.FC<Props> = ({
                                             isThisUser = false,
                                             user,
                                             handleGenderChange,
                                             handleNameChange,
                                             handleAgeChange
                                         }) => {
    return <>
        <IonList>
            <IonItem>
                <IonLabel position="stacked">Name</IonLabel>
                <IonInput readonly={!isThisUser} type="text" value={user?.name} onIonChange={handleNameChange}/>
            </IonItem>
            <IonItem>
                <IonLabel position="stacked">Age</IonLabel>
                <IonInput readonly={!isThisUser} type="number" value={user?.age} onIonChange={handleAgeChange}/>
            </IonItem>
            <IonItem>
                <IonSelect disabled={!isThisUser} label="Gender" value={user?.gender}
                           onIonChange={handleGenderChange}>
                    <IonSelectOption value="male">Male</IonSelectOption>
                    <IonSelectOption value="female">Female</IonSelectOption>
                    <IonSelectOption value="other">Other</IonSelectOption>
                </IonSelect>
            </IonItem>
        </IonList>
        <div className="ion-text-center">
            {
                isThisUser && <IonText color="dark">Deine Sportarten</IonText>
            }
            {/*TODO: Fix styling*/}
            <Categories categories={user?.categories ?? []}/>
            {
                isThisUser && <IonButton fill="outline" routerLink={Page.categories}>Anpassen</IonButton>
            }
        </div>
    </>;
};

export default UserAttributes;
