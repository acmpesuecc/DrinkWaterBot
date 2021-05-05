require('dotenv').config();
var admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.applicationDefault()
});
const db = admin.firestore()

// Function to increment the user's score
async function incScore(userid, points) {
    // try {
    //     const userRef = db.collection('users').doc(userid);
    //     await userRef.update({
    //         score: admin.firestore.FieldValue.increment(points)
    //     });
    // }
    // catch {
    //     const data = {
    //         score: 1
    //     };
    //     await db.collection('users').doc(userid).set(data);
    // }
}

// Function to get the user's score
// async function getScore(userid) {
// const userRef = db.collection('users').doc(userid);
// const doc = await userRef.get();
// if (!doc.exists) {
//     return 0;
// } else {
//     var points = await doc.data().score;
//     return points;
// }
// }

module.exports = {
    inc: async function inscore(userid, points) {
        try {
            const userRef = db.collection('users').doc(userid);
            await userRef.update({
                score: admin.firestore.FieldValue.increment(points)
            });
        }
        catch {
            const data = {
                score: 1
            };
            await db.collection('users').doc(userid).set(data);
        }
    },
    get: async function getScore(userid) {
        const userRef = db.collection('users').doc(userid);
        const doc = await userRef.get();
        if (!doc.exists) {
            return 0;
        } else {
            var points = await doc.data().score;
            return points;
        }
    }
};