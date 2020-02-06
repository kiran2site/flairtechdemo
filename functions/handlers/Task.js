const cors= (require("cors"))({origin:true});
const {db, admin} = require('../utils/admin')
const { History } = require("./History")
exports.createNewTask=(req,res)=>cors(req,res,()=>{
    const newTask=
    {
        type:req.body.type,
        title:req.body.title,
        startdate:req.body.startdate,
        enddate:req.body.enddate,
        priority:req.body.priority,
        assignee:req.body.assignee,
        status:req.body.status,
        description:req.body.description,
        createdBy:req.body.createdBy,
        isCompleted:req.body.isCompleted,
        createdAt:admin.firestore.Timestamp.fromDate(new Date())
    }
    
    const projectId=req.body.projectId;
    const user=req.body.user;
    const status=req.body.status;
    db.collection("Projects").doc(projectId)
    .collection("Tasks")
    .add(newTask)
    .then(doc=>{
        const historySnap={
            subject:{
                title:newTask.title,
                pid:projectId,
                tid:doc.id
            },
            ActionBy:newTask.createdBy,
            createdAt:newTask.createdAt,
            type:"createTask"
        }
        
        History(historySnap);
        return res.send({message:`Task ${doc.id} created successfully`})
    })
    .catch(err => {
        res.status(500).json({error:`Something went wrong, ${err}`})
      });
})


exports.getTasks=(req,res)=>cors(req,res,()=>{
    const projectId=req.params.projectId   
    db.collection("Projects")
    .doc(projectId)
    .collection("Tasks")
    .get()
    .then(data=>{
        let tasks=[]
        data.forEach(task=>{
            let gotTask=task.data()
            gotTask.id=task.id
            tasks.push(gotTask)
        })
        return res.json(tasks)
    })
    .catch(err=>{
        res.json(err)
    })
})

exports.getTask=(req,res)=>cors(req,res,()=>{
    const projectId=req.params.projectId
    const taskId=req.params.taskId
    console.log(projectId,taskId)
    db.collection("Projects")
    .doc(projectId)
    .collection("Tasks")
    .doc(taskId)
    .get()
    .then(data=>{
        return res.json(data.data())
    })
    .catch(err=>{
        return res.json(err)
    })
})

exports.updateTask=(req,res)=>cors(req,res,()=>{
    const projectId=req.body.projectId
    const taskId=req.body.taskId
    const updatedTask=req.body.taskEdit
    const historySnap={
        subject:{
            title:updatedTask.title,
            pid:projectId,
            tid:taskId
        },
        ActionBy:updatedTask.createdBy,
        createdAt:admin.firestore.Timestamp.fromDate(new Date()),
        type:"updateTask"
    }
    db.collection("Projects")
    .doc(projectId)
    .collection("Tasks")
    .doc(taskId)
    .update(updatedTask)
    .then(doc=>{
        History(historySnap);
        return res.send({"message":`Task ${doc.id} updated successfully`})
    })
    .catch(err=>{
        return res.send(err)
    })
})