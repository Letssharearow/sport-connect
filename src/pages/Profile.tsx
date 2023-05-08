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
    IonButton, useIonRouter, InputChangeEventDetail, SelectChangeEventDetail
} from '@ionic/react';
import {Gender, Page} from "../data/category";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../redux/reducers";
import Categories from "../components/Categories";
import {IRootState, State, User} from "../data/models";
import {
    AccordionGroupChangeEventDetail
} from "@ionic/core/dist/types/components/accordion-group/accordion-group-interface";
import {IonInputCustomEvent, IonSelectCustomEvent} from "@ionic/core/dist/types/components";

const Profile = () => {
    const userState = useSelector((state: IRootState) => state.datasetSlice.user)
    const [user, setLocalUser] = useState<User | undefined>(userState);

    const dispatch = useDispatch();


    const handleNameChange = (event: IonInputCustomEvent<InputChangeEventDetail>) => {
        console.log('event', event);
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
            dispatch(setUser(
                user
            ))
        }
    };

    console.log('user', user);
    return (
        <>
            <IonContent class="ion-padding">
                <IonList>
                    <IonItem>
                        <IonLabel position="stacked">Name</IonLabel>
                        <IonInput type="text" value={user?.name} onIonChange={handleNameChange}/>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Age</IonLabel>
                        <IonInput type="number" value={user?.age} onIonChange={handleAgeChange}/>
                    </IonItem>
                    <IonItem>
                        <IonSelect label="Gender" value={user?.gender}
                                   onIonChange={handleGenderChange}>
                            <IonSelectOption value="male">Male</IonSelectOption>
                            <IonSelectOption value="female">Female</IonSelectOption>
                            <IonSelectOption value="other">Other</IonSelectOption>
                        </IonSelect>
                    </IonItem>
                </IonList>
                <Categories categories={user?.categories ?? []}/>
                <IonButton expand="block" onClick={handleSubmit}>Aktualisieren</IonButton>
            </IonContent>
        </>
    );
};

export default Profile;
