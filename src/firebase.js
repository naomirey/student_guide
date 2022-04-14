import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyDFrGi_OHZEt-1alav8EXu_i89wfZjNmMQ",
        authDomain: "student-moving-out-guide.firebaseapp.com",
        databaseURL: "https://student-moving-out-guide-default-rtdb.firebaseio.com",
        projectId: "student-moving-out-guide",
        storageBucket: "student-moving-out-guide.appspot.com",
        messagingSenderId: "575453280127",
        appId: "1:575453280127:web:af815ee3de730515910c4a",
        measurementId: "G-YNPWSM2SZT"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get a list of cities from your database
async function getCities(db) {
  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}


// import { useState, useEffect } from "react"

// export default function useLocalStorage(key, defaultValue) {
//   const [value, setValue] = useState(() => {
//     const jsonValue = localStorage.getItem(key)
//     if (jsonValue != null) return JSON.parse(jsonValue)

//     if (typeof defaultValue === "function") {
//       return defaultValue()
//     } else {
//       return defaultValue
//     }
//   })

//   useEffect(() => {
//     localStorage.setItem(key, JSON.stringify(value))
//   }, [key, value])

//   return [value, setValue]
// }