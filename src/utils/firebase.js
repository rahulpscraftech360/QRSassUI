// import firebase from "firebase/app";
// import "firebase/storage";
// // Your Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDrnk8mDy-38rn8auLKfyOaXJy1ggWDXps",
//   authDomain: "qr-code-7944d.firebaseapp.com",
//   projectId: "qr-code-7944d",
//   storageBucket: "qr-code-7944d.appspot.com",
//   messagingSenderId: "431823955552",
//   appId: "1:431823955552:web:cd6aabc70ade7deb6f8505",
//   measurementId: "G-WJ5Q4J2488",
// };

// // apiKey: "AIzaSyDrnk8mDy-38rn8auLKfyOaXJy1ggWDXps",
// // authDomain: "qr-code-7944d.firebaseapp.com",
// // projectId: "qr-code-7944d",
// // storageBucket: "qr-code-7944d.appspot.com",
// // messagingSenderId: "431823955552",
// // appId: "1:431823955552:web:cd6aabc70ade7deb6f8505",
// // measurementId: "G-WJ5Q4J2488"
// // Initialize Firebase
// const app = firebase.apps.length
//   ? firebase.app()
//   : firebase.initializeApp(firebaseConfig);
// const storage = app.storage();

// export { storage, firebase };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrnk8mDy-38rn8auLKfyOaXJy1ggWDXps",
  authDomain: "qr-code-7944d.firebaseapp.com",
  projectId: "qr-code-7944d",
  storageBucket: "qr-code-7944d.appspot.com",
  messagingSenderId: "431823955552",
  appId: "1:431823955552:web:cd6aabc70ade7deb6f8505",
  measurementId: "G-WJ5Q4J2488",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the Firebase storage service
const storage = getStorage(app);

export { storage };
