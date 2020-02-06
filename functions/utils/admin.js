const admin=require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert(require('../admin.json')),
    databaseURL: "https://flair-d7b59.firebaseio.com"
});


const db=admin.firestore();

module.exports =  { db, admin }