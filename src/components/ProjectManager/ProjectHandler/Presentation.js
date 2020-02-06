import React from 'react'
import {Container,Grid,Segment,Icon,Button,Tab,Header,Accordion,Divider,List} from 'semantic-ui-react'
import TaskManager from './TaskManager'
import Settings from './Settings'
import AddMember from './AddMember'
function Presentation(props) {
    const {usersAccess,setAccess,userList,project,placeUsers,handleClick1,activeIndex1,projectId}=props
    const panes = [
        { menuItem: 'Dashboard', render: () => <Tab.Pane className="bg-green" attached={false}><TaskManager userList={userList} projectId={projectId}/></Tab.Pane> },
        { menuItem: 'Tasks', render: () => <Tab.Pane className="bg-green"  attached={false}></Tab.Pane> },
        { menuItem: 'Settings', render: () => <Tab.Pane  className="bg-green" attached={false}><Settings projectId setAccess={setAccess} usersAccess={usersAccess}/></Tab.Pane> },
      ]

    return (
        <div>   
             <Segment className="bg-light">
                <Header size="large">{project.title}</Header>
                <Divider/>
             <Grid stackable='tablet' className="taskStack">
                <Grid.Column width={12}>
                <Tab menu={{ fluid: true, vertical: true,pointing:true }} panes={panes} />
                </Grid.Column>
                <Grid.Column width={4}>
                    <Accordion styled className="ver-mt-5 ver-mb-5">
                        <Accordion.Title
                        active={activeIndex1 === 0}
                        index={0}
                        onClick={handleClick1}
                        >
                        <Icon name='dropdown' />
                        Members
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex1 === 0}>
                            <Divider/>
                            <List>
                                { placeUsers }
                            </List>
                            {/* <AddMember currUsers={currUsers} projectId={projectId}/> */}
                        </Accordion.Content>
                    </Accordion>
                </Grid.Column>
            </Grid>
        </Segment>
        </div>
       
           
    )
}

export default Presentation
