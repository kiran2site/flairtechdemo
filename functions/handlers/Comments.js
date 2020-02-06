const cors= (require("cors"))({origin:true});
const {db, admin} = require('../utils/admin')
const { History } = require("./History")

// new comment

exports.newComment=(req,res)=>cors(req,res,()=>{
    let data=req.body
    let projectId=data.projectId
    let taskId=data.taskId
    let newCommentData={
        createdBy:data.createdBy,
        text:data.text,
        createdAt:admin.firestore.Timestamp.fromDate(new Date())
    }
    if(newCommentData.createdBy==="" || newCommentData.text==="" || projectId==="" || taskId==="")
        return res.send({message:`Invalid data`})
    const historySnap={
        subject:{
          title:"Added comment",
          pid:projectId,
          tid:taskId,
        },
        ActionBy:data.createdBy,
        createdAt:newCommentData.createdAt,
        type:"newComment"
      }
    db.collection("Projects")
    .doc(projectId)
    .collection("Tasks")
    .doc(taskId)
    .collection("Comments")
    .add(newCommentData)
    .then(doc=>{
      History(historySnap)
        return res.send({message:`Comment ${doc.id} added successfully`})
    })
    .catch(err=>res.send(err))
})

exports.getComments=(req,res)=>cors(req,res,()=>{
  const projectId=req.params.projectId
  const taskId=req.params.taskId
  admin.firestore().collection("Projects")
  .doc(projectId)
  .collection("Tasks")
  .doc(taskId)
  .collection("Comments")
  .get()
  .then(snaps=>{
    let comments=[];
    snaps.forEach(element => {
        comments.push({
          createdBy:element.data().createdBy,
          createdAt:element.data().createdAt,
          text:element.data().text
        })
    });
    console.log(snaps)
    return res.send(comments)
  })
  .catch(err=>{
    return res.send(err)
  })
})