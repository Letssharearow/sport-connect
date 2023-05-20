import {
    IonAvatar,
    IonButton, IonCol, IonGrid,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonRouterLink, IonRow,
    IonSelect,
    IonSelectOption,
    IonText
} from "@ionic/react";
import Categories from "./Categories";
import {Gender, Page} from "../data/category";
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
            {
                false && <IonGrid>
                    <IonRow className="ion-align-items-center">
                        <IonCol className="ion-text-center">
                            <IonAvatar onClick={() => void 0}>
                                <img src="/path/to/profile-picture.png" alt="Profile Picture"/>
                            </IonAvatar>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            }
            <IonItem>
                <IonInput labelPlacement="floating" label="Name" readonly={!isThisUser} type="text" value={user?.name}
                          onIonInput={handleNameChange}/>
            </IonItem>
            <IonItem>
                <IonInput labelPlacement="floating" label="Age" readonly={!isThisUser} type="number" value={user?.age}
                          onIonInput={handleAgeChange}/>
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
                isThisUser && <IonText color="dark">Deine Aktivitäten</IonText>
            }
            {/*TODO: Fix styling*/}
            <Categories showAddIcon={false} categories={user?.categories ?? []}/>
            {
                isThisUser &&
                <IonRouterLink routerLink={Page.categories}>
                    <IonButton fill="outline">Anpassen</IonButton>
                </IonRouterLink>
            }
        </div>
    </>;
};

export default UserAttributes;
