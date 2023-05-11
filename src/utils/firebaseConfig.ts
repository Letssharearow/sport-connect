import "firebase/storage";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database"
// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getDatabase} from "firebase/database";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {onValue, ref} from "firebase/database";
import {getFirestore} from "firebase/firestore";
import {collection, addDoc, deleteDoc, getDoc, getDocs} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC344nSkNe8ZV6LXRkyTB990jTit7STTow",
    authDomain: "sport-treff.firebaseapp.com",
    projectId: "sport-treff",
    storageBucket: "sport-treff.appspot.com",
    messagingSenderId: "296242269448",
    appId: "1:296242269448:web:2f72d3a09b891d20f9b0bd",
    measurementId: "G-KH6B4L4C78"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
// const db = getDatabase(app);
const db = getFirestore(app);

export async function login(username: string, password: string) {
    try {
        const res = await signInWithEmailAndPassword(auth, username, password);
        console.log('res', res);
        return true;
    } catch (err) {
        console.log('err', err);
        return false;
    }
}

export async function register(username: string, password: string) {
    try {
        const res = await createUserWithEmailAndPassword(auth, username, password);
        console.log('res', res);
        return true;
    } catch (err) {
        console.log('err', err);
        throw(err);
    }
}

export async function saveDoc() {
    try {
        const docRef = await addDoc(collection(db, "todos"), {
            todo: 'todo',
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }

}

export async function getDocuments() {
    try {
        const docRef = await getDocs(collection(db, 'todos')).then((querySnapshot) => {
            const newData = querySnapshot.docs
                .map((doc) => ({...doc.data(), id: doc.id}));
            console.log(newData);
        })
        console.log('docRef', docRef);
    } catch (e) {
        console.error("Error adding document: ", e);
    }

}