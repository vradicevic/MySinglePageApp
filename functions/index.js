const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
/* exports.addAdminRole = functions.https.onCall((data, context) => {
    //provjera administratorstva
    if (context.auth.token.admin !== true) {
        return { error: 'Samo admini mogu doati nove admine!' }
    }
    // dodavanje custom claimova
    return admin.auth().getUserByEmail(data.email).then(user => {
        const clubClaim=user.customClaims['club'];
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true,
            club: clubClaim
        });
    }).then(() => {
        return {
            message: `Success! ${data.email} has been made an admin ${clubClaim}.`
        }
    }).catch(err => { return err; });
});

exports.addClubAccess = functions.https.onCall((data,context)=>{
    return admin.auth().getUserByEmail(data.email)
    .then(user=>{
        
        return admin.auth().setCustomUserClaims(user.uid,{
            club: "nksava",
            admin: false
        });
    })
        .then(()=>{
            return { message: ` sada ima pristup klubu `}
        }).catch(err=> {return err;});
}); */

exports.addCustomClaims = functions.https.onCall((data, context) => {
    //provjera administratorstva
    if (context.auth.token.admin !== true) {
        if (context.auth.token.admin !== true){
            return admin.auth().getUserByEmail(data.email).then(user => {
            const clubClaim = data.club;
            return admin.auth().setCustomUserClaims(user.uid, {
                admin: false,
                club: clubClaim
                });
            }).then(() => {
                return {
                    message: `Success! ${data.email} has been made an admin ${clubClaim}.`
                }
            }).catch(err => { return err; });
        } return { error: 'Samo admini mogu doati nove admine!' }
    }
    // dodavanje custom claimova
    return admin.auth().getUserByEmail(data.email).then(user => {
        const clubClaim = user.customClaims['club'];
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true,
            club: clubClaim
        });
    }).then(() => {
        return {
            message: `Success! ${data.email} has been made an admin ${clubClaim}.`
        }
    }).catch(err => { return err; });
});



