import React, {useState} from 'react';
import {
    IonContent,
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

    const handleNameChange = (event: CustomEvent<{ value?: any; name?: string }>) => {
        console.log('event', event);
        setUserProfile((prevState) => ({
            ...prevState,
            name: event.detail.value,
        }));
    };

    const handleGenderChange = (event: CustomEvent<{ value?: any; name?: string }>) => {
        console.log('event', event);
        setUserProfile((prevState) => ({
            ...prevState,
            gender: event.detail.value,
        }));
    };


    const handleAgeChange = (event: CustomEvent<{ value?: any; name?: string }>) => {
        console.log('event', event);
        setUserProfile((prevState) => ({
            ...prevState,
            age: event.detail.value,
        }));
    };


    const handleProfileChange = (event: CustomEvent<{ value?: any; name?: string }>) => {
        console.log('event', event);
        setUserProfile((prevState) => ({
            ...prevState,
            description: event.detail.value,
        }));
    };
    return (
        <IonContent>

        </IonContent>
    );
}

export default UserProfileForm;
