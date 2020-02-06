import React from 'react'
import { Header,Card,Icon } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
function Presentation() {
    const adminActionsFreq=[
        {
            text:"Create Template",
            img:"edit",
            linkTo:"/dashboard/console/createtemplate"  ,
            color:"red"
        },
        {
          text:"Invite User",
          img:"add user"  ,
          linkTo:"/dashboard/console/createuser"  ,
          color:"green"
      },
      {
        text:"Employee List",
        img:"users"  ,
        linkTo:"/dashboard/console/employeelist"  ,
        color:"violet"
    },
      {
          text:"Change Password",
          img:"key"  ,
          linkTo:"/dashboard/console/changepassword" ,
          color:"yellow" 
      }
      ,
      {
          text:"Project Management",
          img:"tasks"  ,
          linkTo:"/dashboard/console/projectmanagement"  ,
          color:"blue"
      }
    ]

    const adminActionsRare=[
        {
            text:"Letter Templates",
            img:"file alternate"  ,
            linkTo:"/dashboard/console/templates/lettertemplates"  ,
            color:"blue"
        },
        {
            text:"Email Templates",
            img:"mail"  ,
            linkTo:"/dashboard/console/templates/emailtemplates"  ,
            color:"blue"
        },
        {
            text:"Project Templates",
            img:"map"  ,
            linkTo:"/dashboard/console/templates/projecttemplates"  ,
            color:"blue"
        },
        {
            text:"Dropdown Lists",
            img:"dropdown"  ,
            linkTo:"/dashboard/console/templates/dropdownlist"  ,
            color:"blue"
        },
        {
            text:"Authorized Signatures",
            img:"lock"  ,
            linkTo:"/dashboard/console/templates/authorizedsignatures"  ,
            color:"blue"
        },
        {
            text:"Documents Templates",
            img:"file"  ,
            linkTo:"/dashboard/console/templates/documentstemplates"  ,
            color:"blue"
        }
    ]
    return (
        <div className="ml-3 mr-3 mt-3">
            <Header>Frequently Used:</Header>
            <hr/> 
            <Card.Group itemsPerRow={4} className="ml-4 mt-1">
                    {adminActionsFreq.map(item=>{
                    return <span className="m-1"><Link className="m-1"  to={item.linkTo}><Card className="w-100 p-4" color={item.color} image={<Icon name={item.img} size="huge" />} /></Link><br/><span className="font-10">{item.text}</span></span>
                    })}
            </Card.Group>
           
            <Header>Rarely Used:</Header>
            <hr/> 
            <Card.Group itemsPerRow={4} className="ml-4 mt-1">
                    {adminActionsRare.map(item=>{
                    return <span className="m-1"><Link className="m-1"  to={item.linkTo}><Card className="w-100 p-4" color={item.color} image={<Icon name={item.img} size="huge" />} /></Link><br/><span className="font-10">{item.text}</span></span>
                    })}
            </Card.Group>
        </div>
    )
}

export default Presentation
