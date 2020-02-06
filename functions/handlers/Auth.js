const cors= (require("cors"))({origin:true});
const {db, admin} = require('../utils/admin')
// const { inviteUserThroughMail } = require("./Users")

exports.login=(req,res)=>{
    let email=req.body.email;
    let pass=req.body.password;
    firebase.auth().signInWithEmailAndPassword(email,pass)
    .then(token=>{
       return res.json(token)
    })
    .catch(err=>{
        return res.json(err)
    })
}


// invite new user
// exports.newUserEmail = functions.https.onRequest((request,response) => cors(request,response,() => {
//     const email = request.body.useremail
//     console.log(email)
//     return admin.auth().createUser({
//         uid : email,
//         email : email,
//         password : "veridic0004"
//     }).then(res => {
//         return admin.auth().createCustomToken(email,{
//             isRegister : true,
//             timestamp : request.body.time
//         })
//     }).then(res => {
//         return response.send({
//             token : res
//         })
//     })
//     .catch(err => {
//         response.send(err)
//     })
    
// }))



exports.inviteThroughToken=(req,res)=>cors(req,res,()=>{
    const inviter = req.body.uid
    const email = req.body.useremail
    // console.log(email,inviter)
    let invitation_token = ""
    return admin.auth().createCustomToken(email,{
            invitation : true,
            timestamp : (new Date()).toUTCString()
    }).then(token => {
        invitation_token = token
        return admin.firestore().collection('customTokens').doc(email).get()
    }).then(doc => {
        let data = {}
        if(doc.exists)
            data = doc.data()
        else{
            data = {
                invitationInformation : {
                    timestamp : (new Date()).toUTCString(),
                    inviterList : [],
                    user : {
                        uid : email
                    }
                },
                latestToken : invitation_token,
                invitationTokens : []
            }
        }
        console.log(data)
        data.invitationInformation.inviterList.push(inviter)
        data.invitationTokens.push({
            authToken : invitation_token,
            timestamp : (new Date()).toUTCString()
        })
        data.latestToken = invitation_token
        return admin.firestore().collection('customTokens').doc(email).set(data)
    }).then(() => {
        // inviteUserThroughMail(email,inviter,invitation_token)
        return res.send({
            token : invitation_token
        })
    })
    .catch(err => {
        console.log(err)
        res.send(err)
    })
})

exports.validateInviteToken = (req,res) => cors(req,res,() => {
    const token_str = req.body.token
    const password = req.body.password

    let info = []
    return admin.firestore().collection('customTokens').where("latestToken","==",token_str).get()
    .then(snapshot => {
        let token = []
        snapshot.forEach(doc => {
            const data = doc.data()
            // console.log(data)
            const tokenList = data.invitationTokens.filter(tokenRecord => tokenRecord.authToken === token_str)
            // console.log(tokenList)
            if(tokenList.length > 0){
                token = tokenList
                info = data
                // console.log(token)
            }
        })
        // console.log(token)
        if(token.length < 1)
            throw new Error("This cannot happen")
        const date = new Date()
        const token_date = new Date(token[0].timestamp)
        const diff_dates = ((date - token_date) /( 1000.0 * 60.0 * 60.0 ))
        // console.log(diff_dates,token)
        if(diff_dates > 24 || diff_dates < 0)
            throw new Error("This cannot happen")
        console.log("done")
        return token[0].authToken
    }).then(() => {
        return admin.auth().createUser({
            uid : info.invitationInformation.user.uid,
            email : info.invitationInformation.user.uid,
            password : password
        })
    }).then((result) => {
        console.log(result)
        return res.send({
            status : true
        })
    }).catch(err => {
        console.log(err)
        res.send(err)
    })
    
});

