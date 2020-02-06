import React from 'react';
import { PDFExport } from '@progress/kendo-react-pdf';
import {Icon} from 'semantic-ui-react'
import Logo from '../../assets/logo.png'
import { savePDF } from '@progress/kendo-react-pdf';
import {Table} from 'reactstrap'
import {Button} from 'semantic-ui-react'



class PageTemplate extends React.Component {
    render() {
        return (
            <div>
                 <header style={{ position: "absolute", top: "10px"}}>
                    <div  className="d-flex justify-content-between" > <span><img src={Logo} alt="logo" height="60" /></span><span >https://flair-d7b59.firebaseapp.com/dashboard
                    
                    </span></div>
                <hr style={{height:"1px",backgroundColor:"black",width:"480px" }}></hr>
                </header>

            
                <footer
              style={{ position: "absolute", bottom: "10px" }}
              
            >
                <hr style={{height:"1px",backgroundColor:"black",width:"480px",marginRight:"70px" }}></hr>
              <span>
                  <b>Contact details</b><br></br>
                  <Icon name="map marker"/>&nbsp;&nbsp;1565 Woodington Circle, Suite #203, Lawrenceville, GA – 30044.<br></br>
                  <Icon name="phone square"/>&nbsp;&nbsp; +1 513 488 4748<br></br>
                  <Icon name="mail square"/>&nbsp;&nbsp;contact@flairtechno.com<br></br>
              </span>
            </footer>

            </div>
        );
    }
}


class PrintID extends React.Component {
    pdfExportComponent;
    image;

    render() {
        const {veridicId,personal,email,mailingaddress,imageURL} = this.props

        return (
            <div>
                <div className="example-config">
                    <Button  color="teal" className="k-button w-100" onClick={() => { this.pdfExportComponent.save(); }}>
                        Print ID
                    </Button>
                </div>

                <PDFExport
                    paperSize="A4"
                    margin="2cm"
                    ref={(component) => this.pdfExportComponent = component}
                    pageTemplate={PageTemplate}
                >
                    <div  id="taskpdfid" style={{marginTop:"46px"}}>
                    
                    <div style={{align:"center"}}>
                    <Table borderless style={{align:"center"}} className="b-none">
{/*  
                    <tr><img
                            ref={(image) => this.image = image}
                            width="750px"
                        /></tr> */}
                        <tr>
                            <td>Employee ID:</td>
                            <td>{veridicId}</td>   
                        </tr>
                        <tr>
                            <td>Name: </td>
                            <td>{personal.firstname+" "+personal.middlename}</td>
                        </tr>
                        <tr>
                            <td>Mail ID:</td>
                            <td>{email}</td>
                        </tr>
                        <tr>
                            <td>Phone: </td>
                            <td>{personal.phonenumber}</td>
                    
                        </tr>
                        <tr>
                            <td>Address: </td>
                            <td>{mailingaddress.line1+" "+mailingaddress.line2+","+mailingaddress.city+","+mailingaddress.state+","+mailingaddress.country+","+mailingaddress.zip}</td>
                        </tr>
                        </Table>
                 </div>
                   
                   </div>
                </PDFExport>
            </div>
        );
    }
}

export default PrintID