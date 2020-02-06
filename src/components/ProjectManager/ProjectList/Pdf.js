import React from 'react';
import ReactDOM from 'react-dom';
import { savePDF } from '@progress/kendo-react-pdf';
import $ from 'jquery'
// import products from './products.json';

class Pdf extends React.Component {

    constructor(props) {
        super(props);
       
        this.state = { products:[],
        repeatHeaders: true
         };
    
        }

        
    generateRows() {
        return this.props.pdfdata.map(product => {
            return (
                <tr>
                     <td>{product.clientname}</td>
                    <td>{product.supervisor}</td>
                    <td>{product.startdate}</td>
                    <td>{product.enddate}</td>
                    <td>{product.status}</td>
                </tr>
            );
        });
    }

    exportPDF = () => {
        savePDF(ReactDOM.findDOMNode(this.table), {
            repeatHeaders: this.state.repeatHeaders,
            paperSize: 'A4',
            margin: '2cm'
        });
    //    async function makeIt(){
    //     let promise = new Promise((res, rej) => {
    //         setTimeout(() =>{
    //             res(true)
    //            }, 100)
    //     });
    //     let result = await promise;
    //     if(result==true){

    //         $("#table_to_pdf").delay(2000).slideUp()
    //     }
       
    //     }
    //     makeIt()
       
    }
    render() {
        
        const products=this.props.pdfdata
        return (
            <div>
                 <button id="export_to_pdf_btn" className="k-button d-none"  onClick={this.exportPDF}>Export PDF</button>
                 
                <table id="table_to_pdf"  className="table "  style={{marginTop:"140px"}}  ref={(table) => { this.table = table; }}>
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
                        {this.generateRows()}
                    </tbody>
                </table>
            </div>
        );
    }

}

export default Pdf;