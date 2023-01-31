// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCe1VGUHo2ud6JhSUdHJHnoTDhPlPZ11Uc',
	authDomain: 'cornhole-b8095.firebaseapp.com',
	projectId: 'cornhole-b8095',
	storageBucket: 'cornhole-b8095.appspot.com',
	messagingSenderId: '148816154991',
	appId: '1:148816154991:web:49cc998605b5566645589a',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
