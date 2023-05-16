import React, {useState} from 'react';
import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButton, useIonRouter, InputChangeEventDetail, SelectChangeEventDetail, IonText, IonRow, IonCol
} from '@ionic/react';
import {Gender, Page} from "../data/enums";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../redux/reducers";
import Categories from "../components/Categories";
import {IRootState, State, User} from "../data/models";
import {
    AccordionGroupChangeEventDetail
} from "@ionic/core/dist/types/components/accordion-group/accordion-group-interface";
import {IonInputCustomEvent, IonSelectCustomEvent} from "@ionic/core/dist/types/components";
import UserAttributes from "../components/UserAttributes";
import {writeUser} from "../redux/asyncActions";
import {AppDispatch} from "../index";
import {isDispatchFulfilled} from "../utils/functions";

const Profile = () => {
    const userState = useSelector((state: IRootState) => state.datasetSlice.user)
    const [user, setLocalUser] = useState<User | undefined>(userState);

    const dispatch = useDispatch<AppDispatch>();


    const handleNameChange = (event: IonInputCustomEvent<InputChangeEventDetail>) => {
        setLocalUser((user) => {
            return user && event.target.value && typeof event.target.value === "string" ? {
                ...user,
                name: event.target.value
            } : undefined;
        });
    };

    const handleAgeChange = (event: IonInputCustomEvent<InputChangeEventDetail>) => {
        setLocalUser((user) => {
            return user && event.target.value && typeof event.target.value === "string" ? {
                ...user,
                age: +event.target.value
            } : undefined;
        });
    };

    const handleGenderChange = (event: IonSelectCustomEvent<SelectChangeEventDetail<any>>) => {
        setLocalUser((user) => {
            return user && event.target.value && typeof event.target.value === "string" ? {
                ...user,
                gender: event.target.value as Gender
            } : undefined;
        });
    };

    const handleSubmit = () => {
        if (user) {
            dispatch(writeUser(user)).then(e => {
                if (isDispatchFulfilled(e)) {
                    dispatch(setUser(
                        user
                    ))
                }
            })
        }
    };

    return (
        <>
            <IonHeader collapse="fade">
                <IonToolbar>
                    <IonRow>
                        <IonCol>
                            <IonTitle class="ion-text-center">Dein Profil</IonTitle>
                        </IonCol>
                    </IonRow>
                </IonToolbar>
            </IonHeader>
            <IonContent class="ion-padding">
                <div style={{height: '80%', overflow: 'scroll'}}>
                    <UserAttributes handleAgeChange={handleAgeChange} user={user}
                                    handleGenderChange={handleGenderChange}
                                    handleNameChange={handleNameChange} isThisUser/>
                </div>
                <br/>
                <IonButton expand="block" onClick={handleSubmit}>Aktualisieren</IonButton>
            </IonContent>
        </>
    );
};

export default Profile;
