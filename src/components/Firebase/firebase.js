import  firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"
import "firebase/storage"
import "firebase/firebase-functions"
const app = firebase.initializeApp({
    apiKey: "AIzaSyAGWVJ972hm3p7qHrQfaSUIl5JNMf03Ksg",
    authDomain: "flair-d7b59.firebaseapp.com",
    databaseURL: "https://flair-d7b59.firebaseio.com",
    projectId: "flair-d7b59",
    storageBucket: "flair-d7b59.appspot.com",
    messagingSenderId: "7718367591",
    appId: "1:7718367591:web:5228a678b82994077effc2",
    measurementId: "G-8X8EX6VZKN"
  
});
const storage=firebase.storage();
const functions=firebase.functions();
export  {functions,storage,app as default}