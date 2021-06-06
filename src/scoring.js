require('dotenv').config();
var admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.applicationDefault()
});
const db = admin.firestore()

// Function to increment the user's score
async function incScore(userid, points) {
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
}

// Function to get the user's score
async function getScore(userid) {
    const userRef = db.collection('users').doc(userid);
    const doc = await userRef.get();
    if (!doc.exists) {
        return 0;
    } else {
        var points = await doc.data().score;
        return points;
    }
}

// Function to count messages in last hour and send water reminder
async function msgCount(msg) {
    let userid = msg.author.id;
    let timestamp = msg.createdTimestamp;
    const userRef = db.collection('users').doc(userid);
    const doc = await userRef.get();
    if (doc.exists) {
        var firstTimestamp = await doc.data().firstTimestamp;
        if (firstTimestamp === undefined) {
            await userRef.update({
                msgCount: 1,
                firstTimestamp: timestamp
            });
        }
        else {
            if ((timestamp - firstTimestamp) / 1000 > 3600) {
                await userRef.update({
                    msgCount: 1,
                    firstTimestamp: timestamp
                });
            }
            else {
                await userRef.update({
                    msgCount: admin.firestore.FieldValue.increment(1)
                });
                var msgCount = await doc.data().msgCount;
                if (msgCount > 30) {
                    msg.author.send("Calm down champ. You've sent more than 30 messages in the last hour, go drink some water! 🥤")
                    await userRef.update({
                        msgCount: 1,
                        firstTimestamp: timestamp
                    });
                }
            }
        }
    }
}

module.exports = {
    inc: incScore,
    get: getScore,
    msgCount: msgCount
};