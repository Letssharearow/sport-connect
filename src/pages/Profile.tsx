import React, {useEffect, useState} from 'react';
import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    InputChangeEventDetail,
    SelectChangeEventDetail,
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

const Profile = () => {
    const userState = useSelector((state: IRootState) => state.datasetSlice.user)
    const [user, setLocalUser] = useState<User | undefined>(userState);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        setLocalUser(userState)
    }, [userState])

    const handleNameChange = (event: IonInputCustomEvent<InputChangeEventDetail>) => {
        dispatch(setUser(user && typeof event.target.value === "string" ? {
                ...user,
                name: event.target.value
            } : {}
        ));
    };

    const handleAgeChange = (event: IonInputCustomEvent<InputChangeEventDetail>) => {
        dispatch(setUser(user && typeof event.target.value === "string" ? {
                ...user,
                age: +event.target.value
            } : {}
        ));
    };
    const handleGenderChange = (event: IonSelectCustomEvent<SelectChangeEventDetail<any>>) => {
        dispatch(setUser(user && event.target.value && typeof event.target.value === "string" ? {
                ...user,
                gender: event.target.value as Gender
            } : {}
        ));
    };

    const handleSubmit = () => {
        if (user) {
            if (user.uid) {
                dispatch(writeUser(user)).then(e => {
                    if (isDispatchFulfilled(e)) {
                        dispatch(setUser(
                            user
                        ))
                    }
                })
            } else {
                dispatch(setUser(
                    user
                ))
            }
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
                <IonButton expand="block" onClick={handleSubmit}>Speichern</IonButton>
            </IonContent>
        </>
    );
};

export default Profile;
