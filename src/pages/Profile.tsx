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
    IonButton, useIonRouter
} from '@ionic/react';
import {Gender, Page} from "../data/enums";
import {useDispatch} from "react-redux";
import {setUser} from "../redux/reducers";

const Profile = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState<number>();
    const [gender, setGender] = useState<Gender>();

    const dispatch = useDispatch();

    const handleNameChange = (event: any) => {
        setName(event.target.value);
    };

    const handleAgeChange = (event: any) => {
        setAge(event.target.value);
    };

    const handleGenderChange = (event: any) => {
        setGender(event.target.value);
    };

    const handleSubmit = () => {
        // Handle form submission here
        dispatch(setUser({
            id: 0,
            age: age ?? 0,
            categories: [],
            gender: gender ?? Gender.divers,
            name: name ?? '',
            description: ''
        }))
    };

    const router = useIonRouter();

    const goToPage = (route: Page) => {
        router.push(route, 'root', 'replace');
    };

    return (
        <>
            <IonContent class="ion-padding">
                <IonList>
                    <IonItem>
                        <IonLabel position="stacked">Name</IonLabel>
                        <IonInput type="text" value={name} onIonChange={handleNameChange}/>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Age</IonLabel>
                        <IonInput type="number" value={age} onIonChange={handleAgeChange}/>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Gender</IonLabel>
                        <IonSelect value={gender} onIonChange={handleGenderChange}>
                            <IonSelectOption value="male">Male</IonSelectOption>
                            <IonSelectOption value="female">Female</IonSelectOption>
                            <IonSelectOption value="other">Other</IonSelectOption>
                        </IonSelect>
                    </IonItem>
                </IonList>
                <IonButton expand="block" onClick={handleSubmit}>Aktualisieren</IonButton>
            </IonContent>
        </>
    );
};

export default Profile;
