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
    IonButton
} from '@ionic/react';

const SignUp = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');

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
    };

    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Registration</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
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
                <IonButton expand="block" onClick={handleSubmit}>Submit</IonButton>
            </IonContent>
        </>
    );
};

export default SignUp;
