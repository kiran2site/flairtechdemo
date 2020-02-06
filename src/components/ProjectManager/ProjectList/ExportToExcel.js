import { Component } from 'react'
import React, { useState } from 'react'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


class ExportToExcel extends Component{
    render(){

        const excelData= this.props.posts.map(post =>
            {
                return(
                     <div>  
                    <tr key={post.id}>
                    <td>{post.clientname}</td>
                        <td>{post.supervisor}</td>
                        <td>{post.startdate}</td>
                    <td>{post.enddate}</td>
                    <td>{post.status}</td>
                </tr></div>
                )
            })
        return(
                 
            <div  style={{marginright:'25px'}} style={{display:"none"}}>
                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    classname="excel"
                    table="table-to-xls"
                    filename="filteredData"
                    sheet="tablexls"
                    buttonText="Excel"/>
                           <table hidden="true" id="table-to-xls" >
                               <thead>
                                   <tr>
                                       <th>Clientname</th>
                                       <th>Supervisor</th>
                                       <th>Startdate</th>
                                       <th>End date</th>
                                       <th>Status</th>
                                   </tr>
                               </thead>
                               <tbody>
                            
                                 {excelData}
                               </tbody>
                               </table>                 
                             
                 </div>
        )
    }
}
export default ExportToExcel;