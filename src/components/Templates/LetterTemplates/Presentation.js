import React from 'react'
import { Tab } from "semantic-ui-react"
const panes = [
    { menuItem: 'Tab 1', render: () => <Tab.Pane>Templates</Tab.Pane> },
    { menuItem: 'Tab 2', render: () => <Tab.Pane>Create Template</Tab.Pane> },
  ]

function Presentation() {
    return (
        <div>
            <Tab
                menu={{ fluid: true, vertical: true }}
                menuPosition='left'
                panes={panes}
            />
        </div>
    )
}

export default Presentation
