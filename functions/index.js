const functions = require('firebase-functions');
const nodemailer=require("nodemailer")
const jsonBodyParser=require("body-parser").json()
const express=require('express')
const { History,snapHistory } = require("./handlers/History")
const app=express();
const {admin} = require('./utils/admin')
const cors = (require('cors'))({origin:true})
// Authentication related
app.use(cors)
const { login,validateInviteToken,inviteThroughToken } = require('./handlers/Auth')
// Project related
const { getProjectsData,createNewProject,singleProjectData } = require('./handlers/Project')
// Task related
const { createNewTask,getTasks,getTask,updateTask } = require('./handlers/Task')
// User related
const { inviteUser,registernewuser,getUserMails,getActiveUserMails,getUsers,getUserUID,getUser,getUsersTabularData,demoteToUser,enableUser,disableUser,promoteToManager,addAdminRole,inviteAgain,customizedEmail,getUserImages,RegisterToUser } = require('./handlers/Users')
// History
const { getHistory } = require("./handlers/History")
// Comment
const { newComment,getComments } = require("./handlers/Comments")

// 
app.post("/validateinvitetoken",validateInviteToken)
app.post("/invitethroughtoken",inviteThroughToken)
// Project Related api
app.post("/project", createNewProject);
app.get("/projects",getProjectsData)
app.get("/projects/:projectId",singleProjectData)

// Task related api
app.post("/task",createNewTask)
app.post("/updatetask",updateTask)
app.get("/projects/:projectId/tasks",getTasks)
app.get("/projects/:projectId/tasks/:taskId",getTask)
// Users related api
app.get("/users",getUserMails)
app.get("/activeusers",getActiveUserMails)
app.get("/usersdata",getUsers)
app.get("/userstable",getUsersTabularData)
app.get("/userimages",getUserImages)
app.post("/user",getUser)
app.post("/useruid",getUserUID)
app.post("/addAdmin",addAdminRole)
app.post('/demoteuser',demoteToUser)
app.post('/promoteuser',promoteToManager)
app.post('/enableuser',enableUser)
app.post('/disableuser',disableUser)
app.post("/inviteuser",inviteUser)
app.post("/inviteagain",inviteAgain)
app.post("/customizedemail",customizedEmail)
app.post("/registeruser",RegisterToUser)
app.post("/registernewuser",registernewuser)
// History
app.get("/history",getHistory)
app.post("/snaphistory",snapHistory)

// comment
app.post("/newcomment",newComment)
app.get("/projects/:projectId/tasks/:taskId/comments",getComments)




exports.api=functions.https.onRequest(app)





