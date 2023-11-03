import { useEffect,useState } from "react";
import {Link} from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas'

function Formpreview({data}){
    const [item,sitem] = useState(null);
    const [sign1,setsign1] = useState();
    const [url1,setUrl1] = useState();
    const [sign2,setsign2] = useState();
    const [url2,setUrl2] = useState();

    const btn_clear1 = () =>{
        sign1.clear();        
    }

    const btn_clear2 = () =>{
        sign2.clear();
    }

    useEffect(()=>{
        console.log(data);
        sitem(data);
    },[data])

    return(
        item!==null &&
        <>
        <div className="card h-100">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <h5 className="mb-3">Client Information</h5>
                        <ul className="list-group">
                            <li className="list-group-item border-0 ps-0 pt-0 text-sm">
                                <strong className="text-dark">Company Name:</strong> 
                                &nbsp;{item.c_cname}
                            </li>
                            <li className="list-group-item border-0 ps-0 pt-0 text-sm">
                                <strong className="text-dark">Site Address:</strong> 
                                &nbsp;{item.c_saddress}
                            </li>
                            <li className="list-group-item border-0 ps-0 pt-0 text-sm">
                                <strong className="text-dark">Contact Person:</strong> 
                                &nbsp;{item.c_cperson}
                            </li>
                            <li className="list-group-item border-0 ps-0 pt-0 text-sm">
                                <strong className="text-dark">Contact #:</strong> 
                                &nbsp;{item.c_contact}
                            </li>
                        </ul>
                    </div>

                    <div className="col-md-6">
                        <h5 className="mb-3">Reseller Information</h5>
                        <ul className="list-group">
                            <li className="list-group-item border-0 ps-0 pt-0 text-sm">
                                <strong className="text-dark">Company Name:</strong> 
                                &nbsp;{item.r_cname}
                            </li>
                            <li className="list-group-item border-0 ps-0 pt-0 text-sm">
                                <strong className="text-dark">Contact Person:</strong> 
                                &nbsp;{item.r_cperson}
                            </li>
                            <li className="list-group-item border-0 ps-0 pt-0 text-sm">
                                <strong className="text-dark">Contact #:</strong> 
                                &nbsp;{item.r_contact}
                            </li>

                            <li className="list-group-item border-0 ps-0 pt-0 text-sm">
                                <strong className="text-dark">Requested by:</strong> 
                                &nbsp;{item.r_requested}
                            </li>
                        </ul>
                    </div>
                </div>

                <hr className="horizontal gray-light my-4 my-5"></hr>

                <div className="fluid">                    
                    <h5 className="mb-3">Service Information</h5>
                    <div className="table-responsive p-0">
                        <table className="table align-items-center mb-0">
                            <thead>                                
                                <tr>
                                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                        Date
                                    </th>
                                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                        Time In
                                    </th>
                                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                        Time Out
                                    </th>
                                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                        Break
                                    </th>
                                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                        Engineer
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    item.serviceinformation.map((si,i)=>
                                        <tr key={i}>
                                            <td className="align-middle text-center text-sm">
                                                <p className="text-xs font-weight-bold mb-0">{si.date}</p>
                                            </td>
                                            <td className="align-middle text-center text-sm">
                                                <p className="text-xs font-weight-bold mb-0">{si.timein}</p>                                
                                            </td>
                                            <td className="align-middle text-center text-sm">
                                                <p className="text-xs font-weight-bold mb-0">{si.timeout}</p>                                
                                            </td>
                                            <td className="align-middle text-center text-sm">
                                                <p className="text-xs font-weight-bold mb-0">{si.breakfrom} - {si.breakto}</p>                                
                                            </td>
                                            <td className="align-middle text-center text-sm">
                                                <p className="text-xs font-weight-bold mb-0">{si.se}</p>                                
                                            </td>
                                        </tr>
                                    )
                                }                                
                            </tbody>
                        </table>
                    </div>
                    <ul className="list-group mt-4">
                        <li className="list-group-item border-0 ps-0 pt-0 text-sm">
                            <strong className="text-dark">Type of Service:</strong> 
                            &nbsp;<span className="text-info">{item.t_activity}</span>
                        </li>
                    </ul>
                </div>

                <hr className="horizontal gray-light my-4 my-5"></hr>
                
                <div className="fluid">                    
                    <h5 className="mb-3">Product Information</h5>
                    <div className="table-responsive p-0">
                        <table className="table align-items-center mb-0">
                            <thead>
                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Business Unit
                                </th>
                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Products Involved
                                </th>
                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Account Manager
                                </th>
                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Sales
                                </th>
                            </thead>
                            <tbody>
                                {
                                    item.productinformation.map((pi,i)=>
                                        <tr>
                                            <td className="align-middle text-center text-sm">
                                                <p className="text-xs font-weight-bold mb-0">{pi.bussiness_unit}</p>
                                            </td>
                                            <td className="align-middle text-center text-sm">
                                                <p className="text-xs font-weight-bold mb-0">{pi.product_involved}</p>
                                            </td>
                                            <td className="align-middle text-center text-sm">
                                                <p className="text-xs font-weight-bold mb-0">{pi.account_manager}</p>
                                            </td>
                                            <td className="align-middle text-center text-sm">
                                                <p className="text-xs font-weight-bold mb-0">{pi.sales_unit}</p>
                                            </td>                                            
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                <hr className="horizontal gray-light my-4 my-5"></hr>

                <div className="fluid">
                    <div className="d-flex px-2 pb-3">
                        <div className="d-flex flex-column justify-content-center">
                            <h6 className="mb-0 text-sm">Activity Description</h6>
                            <p className="text-xs text-secondary mb-0" style={{whiteSpace: 'pre-line'}}>{item.a_description}</p>
                        </div>
                    </div>

                    <div className="d-flex px-2 pb-3">
                        <div className="d-flex flex-column justify-content-center">
                            <h6 className="mb-0 text-sm">Activity Assessment</h6>
                            <p className="text-xs text-secondary mb-0" style={{whiteSpace: 'pre-line'}}>{item.a_assessment}</p>
                        </div>
                    </div>

                    <div className="d-flex px-2 pb-3">
                        <div className="d-flex flex-column justify-content-center">
                            <h6 className="mb-0 text-sm">Next Action Item / Pending</h6>
                            <p className="text-xs text-secondary mb-0" style={{whiteSpace: 'pre-line'}}>{item.n_action}</p>
                        </div>
                    </div>

                    <div className="d-flex px-2 pb-3">
                        <div className="d-flex flex-column justify-content-center">
                            <h6 className="mb-0 text-sm">Potential Upsell / Remarks</h6>
                            <p className="text-xs text-secondary mb-0" style={{whiteSpace: 'pre-line'}}>{item.remarks}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>    
        </>

    )




}

export default Formpreview;