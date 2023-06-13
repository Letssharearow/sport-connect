import "firebase/storage";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database"
// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    setDoc,
    query,
    where,
    onSnapshot,
    QueryFieldFilterConstraint
} from "firebase/firestore";
import {Endpoint} from "../data/category";
import {debug} from "../data/constantValues";
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
        if (debug) console.debug('username password', username, password)
        const res = await signInWithEmailAndPassword(auth, username, password);
        if (debug) console.debug('res', res);
        return res.user.uid;
    } catch (err) {
        if (debug) console.error('err', err);
        throw(err);
    }
}

export async function register(username: string, password: string) {
    console.log('username password', username, password);
    try {
        const res = await createUserWithEmailAndPassword(auth, username, password);
        if (debug) console.debug('res', res);
        return true;
    } catch (err) {
        if (debug) console.error('err', err);
        throw(err);
    }
}

export async function saveDoc(endpoint: Endpoint, data: any) {
    try {
        const docRef = await addDoc(collection(db, endpoint), data);
        if (debug) console.debug("Document written with ID: ", docRef.id);
    } catch (e) {
        if (debug) console.error("Error adding document: ", e);
        throw(e);
    }
}

export async function setSingleDoc(endpoint: Endpoint, id: string, data: any, merge: boolean = false) {
    try {
        const docRef = await setDoc(doc(db, endpoint + "/" + id), data, {merge});
        if (debug) console.debug("Document written with ID: ", docRef);
    } catch (e) {
        if (debug) console.error("Error adding document: ", e);
        throw(e);
    }
}

export async function getDocuments(endpoint: Endpoint, searchQuery?: QueryFieldFilterConstraint) {

    try {
        const ref = collection(db, endpoint);
        if (searchQuery) {
            const documentDataQuery = query(ref, searchQuery);
        }

        return await getDocs(ref).then((querySnapshot) =>
            querySnapshot.docs
                .map((doc) => ({...doc.data(), uid: doc.id}))
        );
    } catch (e) {
        if (debug) console.error("Error adding document: ", e);
        throw(e);
    }
}

export async function getDocument(endpoint: Endpoint, id: string) {
    try {
        return getDoc(doc(db, endpoint + '/' + id)).then((querySnapshot) => querySnapshot.data())
    } catch (e) {
        console.error("Error adding document: ", e);
        throw(e);
    }
}

export async function subscribe(endpoint: Endpoint, id: string, onNext: any = (doc: any) => {
    if (debug) console.log("Current data: ", doc.data());
}) {
    try {
        return onSnapshot(doc(db, endpoint + '/' + id), onNext)
    } catch (e) {
        if (debug) console.error("Error adding document: ", e);
        throw(e);
    }
}