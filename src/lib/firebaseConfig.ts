import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export interface Season {
    id: string;
    name: string;
    jsonUrl: string;
    urlName: string;
    status: boolean;
    metaDescription: string;
    description: string;
    columns: string[];
    flags: string[];
    scoreDescription: string;
}

export async function getSeasons(): Promise<Season[]> {
    const db = getFirestore(); 
    const seasonsCollection = collection(db, "seasons"); 
    const snapshot = await getDocs(seasonsCollection);  

    const seasons: Season[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        jsonUrl: doc.data().jsonUrl,
        urlName: doc.data().urlName,
        status: doc.data().status,
        metaDescription: doc.data().metaDescription,
        description: doc.data().description,
        columns: doc.data().columns,
        flags: doc.data().flags,
        scoreDescription: doc.data().scoreDescription,
    }));

    return seasons;
}

export { app, db };
