import firebase from "firebase/app";
import "firebase/storage";
var config = {
  apiKey: "AIzaSyBOqk-3vA7jF2JgD9MWZTohkGo2mt4JKLI",
  authDomain: "delypuerta.firebaseapp.com",
  databaseURL: "https://delypuerta.firebaseio.com",
  projectId: "delypuerta",
  storageBucket: "delypuerta.appspot.com",
  messagingSenderId: "252011148220",
  appId: "1:252011148220:web:622a98ee13efe8cc24b1b9",
  measurementId: "G-QJLRBH74V3",
};
var fire = firebase.initializeApp(config);
export default fire;
