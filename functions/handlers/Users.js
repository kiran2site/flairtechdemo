const cors=require("cors")({origin:true});
const {db} = require('../utils/admin')
const {admin} = require('../utils/admin')
const nodemailer=require("nodemailer")
const { History } = require('./History')

exports.registernewuser=(req,res)=>cors(req,res,()=>{   
    const email = req.body.email
    const newuser={
        uid:req.body.email,
        email:req.body.email,
        password:req.body.password,
    }
    let prevID = ""
    let EmailStageFailed = false
    let UpdateIDfailed = false
    let UserRoleAssignFailed = false
    let companyID = ""
    let profileData = req.body.profileData
    let errData=[]
    let historySnap={
        subject:email,
        ActionBy:req.body.ActionBy,
        createdAt: admin.firestore.Timestamp.fromDate(new Date()),
        type:"userRegister"
    }
    admin.auth().getUserByEmail(email)
    .then(user => {
        console.log(user)
        return res.send({"message":"User already registered","status":false})
    })
    .catch(err => {
        console.log(err)
        StartRegister()
    })

    // helper functions
    function StopAndQuitRegistration(err) {
        console.log(err)
        //  deleting user
        admin.auth().deleteUser(newuser.uid)
        .then(u=>console.log(u))    
        .catch(err=>console.log(err))
        console.log(EmailStageFailed,UpdateIDfailed)
        //  setting user collection to normal
        if(EmailStageFailed)
            db.collection("Users").doc(email)
            .set({
                status:"Inactive",
                useremail:email
            })
            .then(u=>console.log(u))    
            .catch(err=>console.log(err))
        //  setting email verify collection normal
        if(UpdateIDfailed)
            db.collection("sendEmailVerify").doc(email).set({
                status:false,
                Password:pass
            })
            .then(u=>console.log(u))    
            .catch(err=>console.log(err)) 
        if(UserRoleAssignFailed)
            db.collection("IDstatus").doc("id").update({
                companyID:prevID
            })
            .then(u=>console.log(u))    
            .catch(err=>console.log(err))
    }
    function StartRegister() {
        admin.auth().createUser(newuser)
        .then(madeuser => {
            return GetCompanyID()
                   .then(gotID=>{
                            return SetUserCollection()
                                   .then(userset=>{
                                       return IsEmailRegistered()
                                              .then(emailDone => {
                                                return UpdateCompanyID()
                                                    .then(updatedID => {
                                                        return  admin.auth().setCustomUserClaims(email,{
                                                                user:true
                                                            })
                                                            .then(usertrue => {
                                                                   return admin.auth().getUserByEmail(email)
                                                                    .then(user=>{
                                                                    return admin.auth().setCustomUserClaims(user.uid,{
                                                                            user:true
                                                                        })
                                                                        .then(r=>{
                                                                            History(historySnap)
                                                                            return res.send({"message":`${email} is registered successfully`,Registered:true})
                                                                         
                                                                        })
                                                                        .catch(err=>{
                                                                            return res.send({success:false,error:err})
                                                                        })
                                                                    })
                                                                    .catch(err=>{
                                                                        return res.send({success:false,error:err})
                                                                    })
                                                               
                                                            })
                                                            .catch(err => {
                                                                UserRoleAssignFailed = true
                                                                StopAndQuitRegistration(err)
                                                                })
                                                    })
                                                    .catch(err => StopAndQuitRegistration(err))
                                            })
                                            .catch(err => StopAndQuitRegistration(err))
                                    })
                                    .catch(err => StopAndQuitRegistration(err))
                    })
                    .catch(err => StopAndQuitRegistration(err))
        })
        .catch(err => {
            return res.send(err)
        })
    }
    
    function GetCompanyID() {
        return new Promise((resolve,reject) => {
            db.collection("IDstatus").doc("id").get()
            .then(snap=>{
            prevID = snap.data().companyID    
            let id=snap.data().companyID.slice(3);
            let spare=(parseInt(id)+1).toString();
            let length=6-spare.length
            for(let i=1;i<=length;i++){
                spare='0'+spare;
            }
            companyID = "VER"+spare
            return resolve()
            })
            .catch(err=>reject(err))
        })
    }

    function UpdateCompanyID() {
        return new Promise((resolve,reject)=>{
            db.collection("IDstatus").doc("id")
            .update({companyID:companyID})
            .then(updatedId => resolve())
            .catch(err =>{
                EmailStageFailed = true
                UpdateIDfailed = true
                 reject(err)
            })
        })  
    }

    function SetUserCollection(){
        let defaultData={
            status:"Active",
            useremail:email,
            veridicID:companyID
        }
        let data = Object.assign({},defaultData,profileData)
        return new Promise((resolve,reject) => {
            db.collection("Users").doc(email)
            .set(data)
            .then(collectiondone=>{
                return resolve()
            })
            .catch(err => reject(err))
        })
    }

    function IsEmailRegistered() {
        return new Promise((resolve,reject) => {
            db.collection("sendEmailVerify").doc(email)
            .set({status:true})
            .then(statusset => resolve())
            .catch(err => {
                EmailStageFailed = true
                reject(err)
            })
        })
    }
})

exports.getUserUID=(req,res)=>cors(req,res,()=>{
    admin.auth().getUserByEmail(req.body.email)
    .then(user=>{
        return res.json(user.uid)
    })
    .catch(err=>{
        return err;
    })
})

exports.getUserMails=(req,res)=>cors(req,res,()=>{
    db.collection("Users")
    .get()
    .then(data=>{
        let userMails=[]
        data.forEach(user=>{
            userMails.push(user.id)
        })
        return res.json(userMails)
    })
    .then(suc=>console.log(success))
    .catch(err=>res.send(err))
})

exports.getActiveUserMails=(req,res)=>cors(req,res,()=>{
    db.collection("Users")
    .get()
    .then(data=>{
        let userMails=[]
        data.forEach(user=>{
            if(user.data().status==="Active"){
                userMails.push(user.id)
            }
        })
        return res.json(userMails)
    })
    .catch(err=>res.send(err))
})

exports.getUsers=(req,res)=>cors(req,res,()=>{
    db.collection("Users")
    .get()
    .then(data=>{
        let users=[]
        data.forEach(user=>{
            users.push(user.data())
        })
        return res.json(users)
    })
    .catch(err=>{
        return res.json(err);
    })
})


exports.getUser=(req,res)=>cors(req,res,()=>{
    let email=req.body.email
    db.collection("Users")
    .doc(email)
    .get()
    .then(data=>{
        return res.json(data.data())
    })
    .catch(err=>{
        return res.json(err)
    })
})  

exports.getUsersTabularData=(req,res)=>cors(req,res,()=>{
    db.collection("Users")
    .get()
    .then(snap=>{
        let users=snap.docs.map(doc=>doc.data())
        let userData=users.map(user=>{
            if(user.status==="Admin")
                return false
            if(user.status==="Inactive"){
                    return {
                        name:" ",
                        mail:user.useremail,
                        phone:" ",
                        branch:" ",
                        employeeId:" ",
                        project:" ",
                        reportingmanager:" ",
                        employeestatus:" ",
                        usertype:" ",
                        jobtitle:" ",
                        employeetype:" ",
                        department:" ",
                        userstatus:user.status,
                    }
                }   
            return {
                    name:user.personal.firstname+" "+user.personal.middlename,
                    mail:user.useremail,
                    phone:user.personal.phonenumber,
                    branch:user.personal.branch,
                    employeeId:user.veridicID,
                    project:user.project,
                    reportingmanager:user.personal.reportingmanager,
                    employeestatus:user.employeestatus,
                    usertype:user.Role,
                    jobtitle:user.personal.jobtitle,
                    employeetype:user.workauth.work_type,
                    department:user.personal.department,
                    userstatus:user.status,
                    image:user.imageURL,
                } 
        })
        return res.send(userData)
    })
    .catch(err=>{
        return res.send(err)
    })
})


//first time register make employee to user role
exports.RegisterToUser=(req,res)=>cors(req,res,()=>{
    admin.auth().getUserByEmail(req.body.email)
    .then(user=>{
       return admin.auth().setCustomUserClaims(user.uid,{
            user:true
        })
        .then(r=>{
            return res.send({success:true})
        })
        .catch(err=>{
            return res.send({success:false,error:err})
        })
    })
    .catch(err=>{
        return res.send({success:false,error:err})
    })
})

// demote to user
exports.demoteToUser=(req,res)=>cors(req,res,()=>{
    let historySnap={
        subject:req.body.email,
        ActionBy:req.body.ActionBy,
        createdAt: admin.firestore.Timestamp.fromDate(new Date()),
        type:"demoteuser"
    }
    admin.auth().getUserByEmail(req.body.email)
    .then(user=>{
       return admin.auth().setCustomUserClaims(user.uid,{
            user:true
        })
        .then(r=>{
            console.log(r)
            History(historySnap)
            return res.send({success:true})
        })
        .catch(err=>{
            return res.send({success:false,error:err})
        })
    })
    .catch(err=>{
        return res.send({success:false,error:err})
    })
})

// activate user
exports.enableUser=(req,res)=>cors(req,res,()=>{
    let historySnap={
        subject:req.body.email,
        ActionBy:req.body.ActionBy,
        createdAt: admin.firestore.Timestamp.fromDate(new Date()),
        type:"enableuser"
    }
    admin.auth().getUserByEmail(req.body.email)
    .then(user=>{
        return  admin.auth().updateUser(user.uid,{
            disabled:false
        })
        .then(r=>{
            console.log(r)
            History(historySnap)
            return res.send({success:true})
        })
        .catch(err=>{
            return res.send({success:false,error:err})
        })
    })
    .catch(err=>{
        return res.send({success:false,error:err})
    })
})

// inactivate user
exports.disableUser=(req,res)=>cors(req,res,()=>{
    let historySnap={
        subject:req.body.email,
        ActionBy:req.body.ActionBy,
        createdAt: admin.firestore.Timestamp.fromDate(new Date()),
        type:"disableuser"
    }
    admin.auth().getUserByEmail(req.body.email)
    .then(user=>{
        return  admin.auth().updateUser(user.uid,{
            disabled:true
        })
        .then(r=>{
            console.log(r)
            History(historySnap)
            return res.send({success:true})
        })
        .catch(err=>{
            return res.send({success:false,error:err})
        })
    })
    .catch(err=>{
        return res.send({success:false,error:err})
    })
})


// promote to manager
exports.promoteToManager=(req,res)=>cors(req,res,()=>{
    let historySnap={
        subject:req.body.email,
        ActionBy:req.body.ActionBy,
        createdAt: admin.firestore.Timestamp.fromDate(new Date()),
        type:"promoteuser"
    }
    admin.auth().getUserByEmail(req.body.email)
    .then(user=>{
        return  admin.auth().setCustomUserClaims(user.uid,{
            manager:true
        })
        .then(r=>{
            console.log(r)
            History(historySnap)
            return res.send({success:true})
        })
        .catch(err=>{
            return res.send({success:false,error:err})
        })
    })
    .catch(err=>{
        return res.send({success:false,error:err})
    })
})

// admin role
exports.addAdminRole=(req,res)=>cors(req,res,()=>{
    admin.auth().getUserByEmail(req.body.email)
    .then(user=>{
        return  admin.auth().setCustomUserClaims(user.uid,{
            admin:true
        })
        .then(r=>{
            console.log(r)
            return res.send({success:true})
        })
        .catch(err=>{
            return res.send({success:false,error:err})
        })
    })
    .catch(err=>{
        return res.send({success:false,error:err})
    })
})


// invite users 



// invite users 

exports.inviteUser=(req,res)=>cors(req,res,()=>{
    console.log(req.body.maillist)
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'veridicservices@gmail.com',
          pass: 'Veridic@123'
        } ,
        tls: {
          rejectUnauthorized: false
      },
      });

       // getting dest email 
       var maillist=req.body.maillist
       console.log(req.body.ActionBy)
        function handleSingleMail (){
        return new Promise((resolve,reject)=>{    
           maillist.forEach(mail=>{
            let pass=Math.floor((Math.random()*1000000));
            let historySnap={
                subject:mail,
                ActionBy:req.body.ActionBy,
                createdAt: admin.firestore.Timestamp.fromDate(new Date()),
                type:"inviteUser"
            }
                const mailOptions = {
                    from: 'veridicservices@gmail.com', // Something like: Jane Doe <janedoe@gmail.com>
                    to: mail,
                    subject: 'Invitation to register your profile in veridic solutions',
                    html: `
                            <p>https://flairtech-f6aa2.firebaseapp.com/dashboard/console/postform/${mail}</p>
                            <br/>
                            <p>Password:${pass}</p>`
                };
        
                // returning result
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error)
                        reject(error)
                    } else {
                        db.collection("sendEmailVerify").doc(mail).set({
                            status:false,
                            Password:pass
                        })
                        .then(one=>{
                            console.log(one)
                            return db.collection("Users").doc(mail).set({
                                status:"Inactive",
                                useremail:mail
                            })
                            .then(two=>{
                                console.log(two)
                                return History(historySnap)
                            })
                            .catch(err=>console.log(err))
                        })
                        .catch(err=>console.log(err))
                            console.log("email sent")
                        if(maillist.indexOf(mail)===maillist.length-1){
                            resolve()
                        }
                    }
                });
            })
           
       })}
       
       handleSingleMail()
       .then(()=>{
           return res.send('Email sent')
       })
       .catch((err)=>{
            return res.send(err)
       })
       
})

exports.inviteUserThroughMail=(mail,ActionBy,token)=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'veridicservices@gmail.com',
          pass: 'Veridic@123'
        } ,
        tls: {
          rejectUnauthorized: false
      },
      });
    function handleSingleMail (){
        return new Promise((resolve,reject)=>{    
            let pass=Math.floor((Math.random()*1000000));
            let historySnap={
                subject:mail,
                ActionBy:ActionBy,
                createdAt: admin.firestore.Timestamp.fromDate(new Date()),
                type:"inviteUser"
            }
                const mailOptions = {
                    from: 'veridicservices@gmail.com', // Something like: Jane Doe <janedoe@gmail.com>
                    to: mail,
                    subject: 'Invitation to register your profile in veridic solutions',
                    html: `
                            <p>https://flairtech-f6aa2.firebaseapp.com/dashboard/console/postform/${token}</p>
                            <br/>
                            <p>Password:${pass}</p>`
                };
        
                // returning result
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error)
                        reject(error)
                    } else {
                        db.collection("sendEmailVerify").doc(mail).set({
                            status:false,
                            Password:pass
                        })
                        .then(one=>{
                            console.log(one)
                            return db.collection("Users").doc(mail).set({
                                status:"Inactive",
                                useremail:mail
                            })
                            .then(two=>{
                                console.log(two)
                                return History(historySnap)
                            })
                            .catch(err=>console.log(err))
                        })
                        .catch(err=>console.log(err))
                            console.log("email sent")
                    }

                    resolve()
                });
       })}
       
       handleSingleMail()
       .then(()=>{
           return res.send({"message":"Invitation sent !"})
       })
       .catch((err)=>{
            return res.send({"message":"Failed to invite user",err})
       })
}

// invite again

exports.inviteAgain=(req,res)=>cors(req,res,()=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'veridicservices@gmail.com',
          pass: 'Veridic@123'
        } ,
        tls: {
          rejectUnauthorized: false
      },
      });

       // getting dest email 
       var maillist=req.body.maillist
       console.log(maillist)
        function handleSingleMail (){
        return new Promise((resolve,reject)=>{    
           maillist.forEach(mail=>{
               console.log(mail)
            let pass=Math.floor((Math.random()*1000000));
            let historySnap={
                subject:mail,
                ActionBy:req.body.ActionBy,
                createdAt: admin.firestore.Timestamp.fromDate(new Date()),
                type:"inviteAgain"
            }
                const mailOptions = {
                    from: 'veridicservices@gmail.com', // Something like: Jane Doe <janedoe@gmail.com>
                    to: mail,
                    subject: 'Invitation to register your profile in veridic solutions',
                    html: `
                            <p>https://flairtech-f6aa2.firebaseapp.com/dashboard/console/postform/${mail}</p>
                            <br/>
                            <p>Password:${pass}</p>`
                };
        
                // returning result
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error)
                        reject(error)
                    } else {
                        db.collection("sendEmailVerify").doc(mail).get()
                        .then(snap=>{
                            if(!snap.data().status){
                                db.collection("sendEmailVerify").doc(mail).update({
                                    Password:pass
                                })
                                .then(one=>{
                                    console.log(one)
                                return History(historySnap)
                                })
                                .catch(err=>res.send(err))
                            }
                            return true
                        })
                        .catch(err=>res.send(err))
                        if(maillist.indexOf(mail)===maillist.length-1){
                            resolve()
                        }
                    }
                });
            })
           
       })}
       
       handleSingleMail()
       .then(()=>{
           return res.send('Email sent')
       })
       .catch((err)=>{
            return res.send(err)
       })
       
})

// customized email 

exports.customizedEmail=(req,res)=>cors(req,res,()=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'veridicservices@gmail.com',
          pass: 'Veridic@123'
        } ,
        tls: {
          rejectUnauthorized: false
      },
      });
      let sub=req.body.subject
      let content=req.body.content
      let from = req.body.from
      let toList = req.body.toList

      function handleSingleMail (){
        return new Promise((resolve,reject)=>{    
           toList.forEach(mail=>{
            let historySnap={
                subject:mail,
                ActionBy:req.body.ActionBy,
                createdAt: admin.firestore.Timestamp.fromDate(new Date()),
                type:"sendEmail"
            }
                const mailOptions = {
                    from: from, // Something like: Jane Doe <janedoe@gmail.com>
                    to: mail,
                    subject: sub,
                    html: `
                            <div>${content}</div>`
                };
        
                // returning result
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error)
                        reject(error)
                    } else {
                        History(historySnap)
                        if(toList.indexOf(mail)===toList.length-1){
                            resolve()
                        }
                    }
                });
            })
           
       })}
       
       handleSingleMail()
       .then(()=>{
           return res.send('Email sent')
       })
       .catch((err)=>{
            return res.send(err)
       })
})


exports.getUserImages=(req,res)=>cors(req,res,()=>{
    admin.firestore().collection("Users")
    .get()
    .then(data=>{
        let userData=data.docs.map(doc=>doc.data())
        let userImages=[]
        userData.forEach(user=>{
            if(user.status!=="Inactive")
            {
                userImages.push({
                    user:user.useremail,
                    url:user.imageURL
                })
            }
        })

        return res.send(userImages)
    })   
    .catch(err=>{
        return res.send(err)
    })
})
