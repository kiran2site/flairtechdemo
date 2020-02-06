import React from 'react'
import { Accordion, Icon ,List ,Image,Label,Divider,Rail,Segment,Grid,Checkbox,Button} from 'semantic-ui-react'
import NewTask from './NewTask'
import single from '../../../../assets/flair-img/singleassignee.png'
import double from '../../../../assets/flair-img/doubleassignee.png'
import { Link } from 'react-router-dom'
function Presentation(props) {
   const {taskList,email,userList,dueList,completedList,thisWeekList,nextWeekList,projectId,newTask,activeIndex1,activeIndex2,activeIndex3,activeIndex4,handleClick1,handleClick2,handleClick3,handleClick4}=props
    
   
   return (
        <div>
             <NewTask email={email} userList={userList} projectId={projectId}/>
            <Accordion styled className="ver-mt-5 ver-mb-5">
                    <Accordion.Title
                active={activeIndex1 === 0}
                index={0}
                onClick={handleClick1}
                >
                 <Grid  columns='equal'>
                    <Grid.Column >
                    <Icon name='dropdown' />
                        Unresolved tasks in this week   
                    </Grid.Column>
                </Grid>
                </Accordion.Title>
                   
                <Accordion.Content active={activeIndex1 === 0}>
                <Grid  columns='equal'>
                       <Grid.Column >
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Checkbox label='My Tasks' />
                        </Grid.Column>
                    </Grid>
                <hr/>
                   {thisWeekList.map(task=>{
                       return(
                        <Accordion.Content>
                        <List divided verticalAlign='middle'>
                         <List.Item>
                         {task.type=="Task"?<Label  color='teal'  horizontal>
                         {task.type}
                         </Label>
                         :
                         <Label  color='red'  horizontal>
                         {task.type}
                         </Label>}
                         <Image avatar src={single} />
                         <List.Content>
                       <List.Header as='a'><Link to={"/dashboard/console/projectmanagement/"+projectId+"/"+task.id}>{task.title}</Link></List.Header>
                         <List.Description>
                             <span className="ver-text-small">{task.status == "Open"?"Inprogress":"Completed"}&nbsp;&nbsp;&nbsp;{task.startdate}&nbsp;&nbsp;&nbsp;{task.enddate} </span>
                             
                         </List.Description>
                         </List.Content>
                         </List.Item>
                     </List>
                     </Accordion.Content>
                       )
                   })}
                </Accordion.Content>
            </Accordion>
            <Accordion styled className="ver-mt-5 ver-mb-5">
                    <Accordion.Title
                active={activeIndex2 === 0}
                index={0}
                onClick={handleClick2}
                >
                <Grid  columns='equal'>
                    <Grid.Column >
                    <Icon name='dropdown' />
                        Unresolved tasks in next week   
                    </Grid.Column>
                </Grid>
                </Accordion.Title>
                   
                <Accordion.Content active={activeIndex2 === 0}>
                <Grid  columns='equal'>
                       <Grid.Column >
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Checkbox label='My Tasks' />
                        </Grid.Column>
                    </Grid>
                <hr/>
                   {nextWeekList.map(task=>{
                       return(
                        <Accordion.Content>
                        <List divided verticalAlign='middle'>
                         <List.Item>
                         {task.type=="Task"?<Label  color='teal'  horizontal>
                         {task.type}
                         </Label>
                         :
                         <Label  color='red'  horizontal>
                         {task.type}
                         </Label>}
                         <Image avatar src={single} />
                         <List.Content>
                       <List.Header as='a'><Link to={"/dashboard/console/projectmanagement/"+projectId+"/"+task.id}>{task.title}</Link></List.Header>
                         <List.Description>
                       <span className="ver-text-small">{task.status == "Open"?"Inprogress":"Completed"}&nbsp;&nbsp;&nbsp;{task.startdate}&nbsp;&nbsp;&nbsp;{task.enddate} </span>
                         </List.Description>
                         </List.Content>
                         </List.Item>
                     </List>
                     </Accordion.Content>
                       )
                   })}
                </Accordion.Content>
            </Accordion>
            <Accordion styled className="ver-mt-5 ver-mb-5">
                    <Accordion.Title
                active={activeIndex3 === 0}
                index={0}
                onClick={handleClick3}
                >
                <Grid  columns='equal'>
                    <Grid.Column >
                    <Icon name='dropdown' />
                        Overdue tasks   
                    </Grid.Column>
                </Grid>
                </Accordion.Title>
                   
                <Accordion.Content active={activeIndex3 === 0}>
                <Grid  columns='equal'>
                       <Grid.Column >
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Checkbox label='My Tasks' />
                        </Grid.Column>
                    </Grid>
                <hr/>
                   {dueList.map(task=>{
                       return(
                        <Accordion.Content>
                        <List divided verticalAlign='middle'>
                         <List.Item>
                         {task.type=="Task"?<Label  color='teal'  horizontal>
                         {task.type}
                         </Label>
                         :
                         <Label  color='red'  horizontal>
                         {task.type}
                         </Label>}
                         <Image avatar src={single} />
                         <List.Content>
                       <List.Header as='a'><Link to={"/dashboard/console/projectmanagement/"+projectId+"/"+task.id}>{task.title}</Link></List.Header>
                         <List.Description>
                             <span className="ver-text-small">{task.status == "Open"?"Inprogress":"Completed"}&nbsp;&nbsp;&nbsp;{task.startdate}&nbsp;&nbsp;&nbsp;{task.enddate} </span>
                             
                         </List.Description>
                         </List.Content>
                         </List.Item>
                     </List>
                     </Accordion.Content>
                       )
                   })}
                </Accordion.Content>
            </Accordion>
            <Accordion styled className="ver-mt-5 ver-mb-5">
                    <Accordion.Title
                active={activeIndex4 === 0}
                index={0}
                onClick={handleClick4}
                >
                 <Grid  columns='equal'>
                    <Grid.Column >
                    <Icon name='dropdown' />
                    Completed tasks  
                    </Grid.Column>
                </Grid>
                </Accordion.Title>
                   
                <Accordion.Content active={activeIndex4 === 0}>
                <Grid  columns='equal'>
                       <Grid.Column >
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Checkbox label='My Tasks' />
                        </Grid.Column>
                    </Grid>
                <hr/>
                   {completedList.map(task=>{
                       return(
                        <Accordion.Content>
                        <List divided verticalAlign='middle'>
                         <List.Item>
                         {task.type=="Task"?<Label  color='teal'  horizontal>
                         {task.type}
                         </Label>
                         :
                         <Label  color='red'  horizontal>
                         {task.type}
                         </Label>}
                         <Image avatar src={single} />
                         <List.Content>
                       <List.Header as='a'><Link to={"/dashboard/console/projectmanagement/"+projectId+"/"+task.id}>{task.title}</Link></List.Header>
                         <List.Description>
                             <span className="ver-text-small">{task.status == "Open"?"Inprogress":"Completed"}&nbsp;&nbsp;&nbsp;{task.startdate}&nbsp;&nbsp;&nbsp;{task.enddate}</span>
                             
                         </List.Description>
                         </List.Content>
                         </List.Item>
                     </List>
                     </Accordion.Content>
                       )
                   })}
                </Accordion.Content>
            </Accordion>
        </div>
    )
}

export default Presentation
