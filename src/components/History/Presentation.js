import React from 'react'
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";

function Presentation(props) {
    const { columns , tabularData } = props
    return (
        <div>
             <ReactTable
            columns={columns}
            data={tabularData}
            filterable
            defaultPageSize={15}
            loadingText={"Loading ..."}
            noDataText={"No data to display"}
            showPaginationTop={false}
        />
        </div>
    )
}

export default Presentation
