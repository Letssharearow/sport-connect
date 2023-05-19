import React, {useEffect, useState} from 'react';
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
    IonButton,
    useIonRouter,
    InputChangeEventDetail,
    SelectChangeEventDetail,
    IonText,
    IonRow,
    IonCol,
    IonGrid,
    IonAvatar
} from '@ionic/react';
import {Gender, Page} from "../data/category";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../redux/reducers";
import Categories from "../components/Categories";
import {IRootState, State, User} from "../data/models";

import {IonInputCustomEvent, IonSelectCustomEvent} from "@ionic/core/dist/types/components";
import UserAttributes from "../components/UserAttributes";
import {writeUser} from "../redux/asyncActions";
import {AppDispatch} from "../index";
import {isDispatchFulfilled} from "../utils/functions";
import {athletes} from "../data/data";

const Profile = () => {
    const userState = useSelector((state: IRootState) => state.datasetSlice.user)
    const [user, setLocalUser] = useState<User | undefined>(userState);

    const dispatch = useDispatch<AppDispatch>();


    useEffect(() => {
        if (userState && !userState.name && user && !user.name) {
            setLocalUser((user) => {
                return {
                    ...user,
                    name: athletes[Math.floor(Math.random() * athletes.length)]
                };
            })
            handleSubmit();
        }
    }, [])
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
                    <IonTitle class="ion-text-center">Dein Profil</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent class="ion-padding">
                <div style={{height: '80%', overflow: 'scroll'}}>
                    <UserAttributes
                        handleAgeChange={handleAgeChange}
                        user={user}
                        handleGenderChange={handleGenderChange}
                        handleNameChange={handleNameChange}
                        isThisUser
                    /></div>
                <IonButton expand="block" onClick={handleSubmit}>Aktualisieren</IonButton>
            </IonContent>
        </>
    );
};

export default Profile;
