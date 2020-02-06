
const cors= (require("cors"))({origin:true});
const {db,admin} = require('../utils/admin')
exports.getHistory=(req,res)=>cors(req,res,()=>{
    db.collection("History")
    .get()
    .then(data=>{
        let history=[]
        data.forEach(item=>{
            history.push(item.data())
        })
        return res.send(history)
    })
    .catch(err=>{
        return res.send(err)
    })
})

// to use in other files
exports.History=(result)=>{
  db.collection("History")
  .add(result)
  .then(res=>{
    console.log(res)
   return  true
  })
  .catch(err=>{
    console.log(err)
    return false
  })
}

// to use as an api

exports.snapHistory=(req,res)=>cors(req,res,()=>{
  let historySnap={
    subject:req.body.subject,
    ActionBy:req.body.ActionBy,
    createdAt: admin.firestore.Timestamp.fromDate(new Date()),
    type:req.body.type
}
  db.collection("History")
  .add(historySnap)
  .then(res=>{
   return  console.log("History Updated",res)
  })
  .catch(err=>{
    console.log("Failed to update in History",err)
  })
})