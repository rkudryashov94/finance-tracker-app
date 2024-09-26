// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAgqYFOhlxtXtZ8gv8Rgk-oR3mlNK4c0y0",
	authDomain: "finance-tracker-app-f03bb.firebaseapp.com",
	projectId: "finance-tracker-app-f03bb",
	storageBucket: "finance-tracker-app-f03bb.appspot.com",
	messagingSenderId: "783478302901",
	appId: "1:783478302901:web:d11327dd5ac480be47b6fc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default (app, db);