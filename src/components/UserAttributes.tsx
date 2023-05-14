import {IonButton, IonInput, IonItem, IonLabel, IonList, IonSelect, IonSelectOption, IonText} from "@ionic/react";
import Categories from "./Categories";
import {Gender, Page} from "../data/enums";
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
                <IonInput labelPlacement="floating" label="Name" readonly={!isThisUser} type="text" value={user?.name}
                          onIonChange={handleNameChange}/>
            </IonItem>
            <IonItem>
                <IonInput labelPlacement="floating" label="Age" readonly={!isThisUser} type="number" value={user?.age}
                          onIonChange={handleAgeChange}/>
            </IonItem>
            <IonItem>
                <IonSelect disabled={!isThisUser} label="Gender" value={user?.gender}
                           onIonChange={handleGenderChange}>
                    <IonSelectOption value={Gender.male}>Male</IonSelectOption>
                    <IonSelectOption value={Gender.female}>Female</IonSelectOption>
                    <IonSelectOption value={Gender.divers}>Other</IonSelectOption>
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
