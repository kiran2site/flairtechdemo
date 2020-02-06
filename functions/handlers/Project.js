const cors= (require("cors"))({origin:true});
const {db, admin} = require('../utils/admin')
const { History } = require("./History")
// get entire project data
exports.getProjectsData=(req,res)=>cors(req,res,()=>{
    db.collection("Projects")
    .onSnapshot(data=>{
        let projects=[];
        data.forEach(project=>{
            projects.push({ 
                id:project.id,
                clientname:project.data().title,
                startdate:project.data().startdate,
                enddate:project.data().enddate,
                status:project.data().status
            })
        })
        return res.json(projects)
    })
})

// create new project
exports.createNewProject= (req,res) =>cors(req,res,()=> {
      const newProject= {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
        Users:req.body.Users,
        createdBy:req.body.createdBy,
        createdAt: admin.firestore.Timestamp.fromDate(new Date())
      }
      db.collection("Projects")
        .add(newProject)
        .then(doc => {
          const historySnap={
            subject:{
              title:newProject.title,
              pid:doc.id,
            },
            ActionBy:newProject.createdBy,
            createdAt:newProject.createdAt,
            type:"createProject"
          }
          History(historySnap);
          return res.send({message:`Project ${doc.id} created successfully`})
        })
        .catch(err => {
          res.status(500).json({error:`Something went wrong, ${err}`})
        });
    
  })

  // get single project data

  exports.singleProjectData=(req,res)=>cors(req,res,()=>{
    const projectId=req.params.projectId
    db.collection("Projects")
    .doc(projectId)
    .onSnapshot(doc=>{
        return res.json(doc.data())
    })
})


// exports.controlAccess=(req,res)=>cors(req,res,()=>{
//   let individual=req.body
//   let projectId="dufdhfdsbff6dd676"
//   admin.auth().getUserByEmail(individual.user)
//   .then(user=>{
//     console.log(user.customClaims)
//     let oldClaims=user.customClaims;
//     let newClaims={
//       create:individual.create,
//       update:individual.update,
//       read:individual.read,
//       delete:individual.delete,
//     }
//     let claims={}
//     claims[projectId]=newClaims
//     // return admin.auth().setCustomUserClaims(user.uid,{
//        console.log({...oldClaims,...claims})
//     // })
//     // .then(p=>{
     
//     //   return res.send({"message":"Updated user access for project"})
//     // })
//     // .catch(err=>res.send(err))
//   })
//   .catch(err=>{
//     return res.send(err)
//   })
  
// })