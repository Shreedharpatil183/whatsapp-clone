import firebase from 'firebase'
const firebaseConfig = {
  apiKey: "AIzaSyDRm9fPJOhfigNpM2d-VwbYI94mBBHF0a4",
  authDomain: "whatsapp-clone-183.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-183.firebaseio.com",
  projectId: "whatsapp-clone-183",
  storageBucket: "whatsapp-clone-183.appspot.com",
  messagingSenderId: "697849580957",
  appId: "1:697849580957:web:b55d0ebf3b97096e80b374",
  measurementId: "G-013D4NSR7E"
  };


const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider()


export { auth, provider, storage }
export default db