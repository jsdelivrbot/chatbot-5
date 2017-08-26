let express = require('express');
let app = express();
let firebase = require('firebase');
firebase.initializeApp({
  apiKey: "AIzaSyBzGpgnK1Uh-sYTTfLbcxOg585OHyLRrfE",
  authDomain: "chatbot-2c589.firebaseapp.com",
  databaseURL: "https://chatbot-2c589.firebaseio.com",
  projectId: "chatbot-2c589",
  storageBucket: "chatbot-2c589.appspot.com",
  messagingSenderId: "209612491552"
});
let db = firebase.database();
let login = require("facebook-chat-api");
let matching = {};
db.ref('/matching').once('value').then((data) => {
  data = data.val();
  data.forEach((e, i, arr) => {
    matching[e.a] = e.b;
    matching[e.b] = e.a;
  });
});
login({
  email: "clbotchat@gmail.com", password: "clbotchat"
}, (err, api) => {
  if(err) console.error(err);
  api.listen((err, message) => {
    if(err) console.error(err);
    if(matching[message.senderID]) api.sendMessage(message.body, matching[message.senderID]);
  });
});