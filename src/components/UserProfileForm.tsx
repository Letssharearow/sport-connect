import React, {useState} from 'react';
import {
    IonContent,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonSelect,
    IonSelectOption,
    IonTextarea,
    IonButton
} from '@ionic/react';

interface UserProfile {
    name: string;
    gender: string;
    age: number;
    description: string;
}

function UserProfileForm() {
    const [userProfile, setUserProfile] = useState<UserProfile>({
        name: '',
        gender: '',
        age: 0,
        description: '',
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Do something with the form data, such as send it to a server
        console.log(userProfile);
    };

    const handleChange = (event: React.ChangeEvent<HTMLIonInputElement | HTMLIonSelectElement | HTMLIonTextAreaElement>) => {
        const {name, value} = event.target;
        setUserProfile((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <IonContent>
            <form onSubmit={handleSubmit}>
                <IonList>
                    <IonItem>
                        <IonLabel position="floating">Name</IonLabel>
                        <IonInput
                            type="text"
                            name="name"
                            value={userProfile.name}
                            onIonChange={handleChange}
                            required
                        ></IonInput>
                    </IonItem>

                    <IonItem>
                        <IonLabel position="floating">Gender</IonLabel>
                        <IonSelect
                            name="gender"
                            value={userProfile.gender}
                            onIonChange={handleChange}
                            required
                        >
                            <IonSelectOption value="">Select gender</IonSelectOption>
                            <IonSelectOption value="male">Male</IonSelectOption>
                            <IonSelectOption value="female">Female</IonSelectOption>
                            <IonSelectOption value="non-binary">Non-binary</IonSelectOption>
                        </IonSelect>
                    </IonItem>

                    <IonItem>
                        <IonLabel position="floating">Age</IonLabel>
                        <IonInput
                            type="number"
                            name="age"
                            value={userProfile.age}
                            onIonChange={handleChange}
                            required
                        ></IonInput>
                    </IonItem>

                    <IonItem>
                        <IonLabel position="floating">Profile Description</IonLabel>
                        <IonTextarea
                            name="description"
                            value={userProfile.description}
                            onIonChange={handleChange}
                            required
                        ></IonTextarea>
                    </IonItem>

                    <IonButton type="submit">Submit</IonButton>
                </IonList>
            </form>
        </IonContent>
    );
}

export default UserProfileForm;
