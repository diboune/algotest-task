// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import admin from 'firebase-admin';
import { applicationDefault, initializeApp as initializeAdminApp } from "firebase-admin/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

require('dotenv').config();

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
};

const serviceAccount = JSON.parse(
    process.env.SERVICE_ACCOUNT_KEY as string
);

if (!admin.apps.length) {
    initializeAdminApp({
        credential: admin.credential.cert(serviceAccount),
    })
}


const db = admin.firestore()

let Firebase;

if (!Firebase?.apps?.length) {
    Firebase = initializeApp(firebaseConfig)
}

export { db }