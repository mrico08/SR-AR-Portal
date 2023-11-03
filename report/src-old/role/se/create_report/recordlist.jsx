import {useEffect, useState,useContext,useRef} from 'react';
import {Link} from 'react-router-dom';
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/material/styles";
import Theme from '../../../portal/datatable_context';
import Viewdetail from '../../../ucomponent/viewdetail/viewdetail';
import Updatedetails from '../../../ucomponent/updatedetails/updatedetails';
import Downloadpdf from '../../../ucomponent/downloadpdf/downloadpdf';
import MbDownloadpdf from '../../../ucomponent/downloadpdf/mbdownload/mbdownload';

import {isMobile,isBrowser} from 'react-device-detect';

function Recordlist({item,reportdisplay,htitle}){
    const childRef = useRef(null);
    const updateRef = useRef(null);
    const mbRef = useRef(null);
    const theme = useContext(Theme);
    const [data,sdata] = useState([]);
    const downloadRef = useRef(null);

    useEffect(()=>{
        sdata(item);
    },[item]);

    const showmodal = (mtype,value,rtype) =>{
        if(mtype===1){
            if(childRef.current){
                childRef.current.openmodal(value,rtype);
            }
        }else if(mtype===2){
            if(updateRef.current){
                updateRef.current.openmodal(value,rtype);
            }
            
        }else if(mtype===3){
            if(isBrowser){
                if(downloadRef.current){
                    downloadRef.current.openmodal1(value,rtype);
                }
            }else if(isMobile){
                if(mbRef.current){
                    mbRef.current.openmodal1(value,rtype);
                }
            }
        }
    }

    const columns = [
        {
            name: "sr_no",label: "SR / AR",
            options: {
                customBodyRender: (value,tableMeta) => {
                    return(
                        <div className="d-flex justify-content-center dropdown">
                            <button type="button" className="btn bg-gradient-info" data-bs-toggle="dropdown" id="navbarDropdownMenuLink2">
                                ACTION
                                {/* <i className="fa fa-caret-down" aria-hidden="true"></i> */}
                            </button>
                            <ul className="dropdown-menu m-5" aria-labelledby="navbarDropdownMenuLink2">
                                <li>
                                    <Link onClick={()=>showmodal(1,value,tableMeta.rowData[17])} className="dropdown-item">View Details</Link>
                                </li>
                                <li>
                                    <Link onClick={()=>showmodal(2,value,tableMeta.rowData[17])} className="dropdown-item">Update / Edit Activity</Link>
                                </li>
                                {
                                    (tableMeta.rowData[18]) &&
                                    <li>
                                        <Link onClick={()=>showmodal(3,value,tableMeta.rowData[17])} className="dropdown-item">Download Report</Link>
                                    </li>
                                }
                            </ul>
                        </div>
                    )
                    

                }
            }
        },
        {
            name: "sr_no",label: "SR / AR",
            options: {
                customBodyRender: (value,tableMeta) => {
                    return(
                        <center>
                        {
                            tableMeta.rowData[17]===1 ?
                                <>SR-{value}</>
                            :
                            tableMeta.rowData[17]===2 &&
                                <>AR-{value}</>
                        }
                        </center>
                    )
                    

                }
            }
        },
        {name: "creator",label: "CREATOR"},
        {name: "site_date",label: "ACTIVITY DATE"},
        {name: "project",label: "PROJECT"},
        {name: "sano",label: "SA #"},
        {name: "caseno",label: "CASE #"},
        {name: "designno",label: "BOM Design #"},
        {name: "c_cname",label: "COMPANY NAME"},
        {name: "c_saddress",label: "COMPANY ADDRESS"},
        {name: "c_cperson",label: "CONTACT PERSON"},
        {name: "c_contact",label: "COMPANY CONTACT #"},
        {name: "r_cname",label: "COMPANY CONTACT #"},
        {name: "r_reported",label: "RESELLER ADDRESS"},
        {name: "r_cperson",label: "RESELLER CONTACT PERSON"},
        {name: "r_contact",label: "RESELLER CONTACT #"},
        {name: "date_created",label: "DATE CREATED"},
        {name: "type",label:"Type",options:{display:false}},
        {name: "last_update",options:{display:false}},
    ]

    return(
        <div className="mt-3">
            <ThemeProvider theme={theme}>
                <MUIDataTable
                    title={htitle}
                    data={data}
                    columns={columns}
                    theme={theme}
                    options={{selectableRows: false,
                        filter:true,
                        download:true,
                        responsive: 'standard',
                        viewColumns:false,
                        selectableRows: "none",
                    }}
                />
            </ThemeProvider>
            <Viewdetail ref={childRef} reportdisplay={reportdisplay}/>
            <Updatedetails ref={updateRef} reportdisplay={reportdisplay}/>
            <Downloadpdf ref={downloadRef} reportdisplay={reportdisplay}/>
            <MbDownloadpdf ref={mbRef} />
        </div>
    )
}

export default Recordlist;