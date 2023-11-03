import {useEffect,useState,useContext} from 'react';
import LocalHost from '../../portal/context';
import Arsignature from './arsignature/arsignature';

function Arreport({data}){
    const local_host = useContext(LocalHost);
    const [item,sitem] = useState(null);
    const [seinfo,sseinfo] = useState([]);
    const [serviceinformation,sserviceinformation] = useState([]);
    const [productinformation,sproductinformation] = useState([]);
    const [last_update,slast_update] = useState(null);
    const [status,sstatus] = useState(0);

    useEffect(()=>{
        if(data!==""){
            sstatus(data.status);
            sitem(data);
            sseinfo(JSON.parse(data.seinfo));
            sserviceinformation(JSON.parse(data.s_information));
            sproductinformation(JSON.parse(data.p_information));
            slast_update(data.last_update);
        }
    },[data])

    return(
        item &&
        <> 
        <div className="card h-100">
            <div className="card-body">
                <div className="d-flex justify-content-end mb-5">
                    <h6 className="mb-3">
                        BOM Design No. :
                        <span className="text-info">&nbsp;{item.designno}</span>
                    </h6>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <h5 className="mb-3">Client Information</h5>
                        <ul className="list-group">
                            <li className="list-group-item border-0 ps-0 pt-0 text-sm">
                                <strong className="text-dark">Company Name:</strong>
                                &nbsp;{item.c_cname}
                            </li>
                            <li className="list-group-item border-0 ps-0 pt-0 text-sm">
                                <strong className="text-dark">Address:</strong>
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
                                <strong className="text-dark">Requested by:</strong>
                                &nbsp;{item.r_reported}
                            </li>
                            <li className="list-group-item border-0 ps-0 pt-0 text-sm">
                                <strong className="text-dark">Contact Person:</strong>
                                &nbsp;{item.r_cperson}
                            </li>
                            <li className="list-group-item border-0 ps-0 pt-0 text-sm">
                                <strong className="text-dark">Contact #:</strong> 
                                &nbsp;{item.r_contact}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div className="card h-100 mt-3">
            <div className="card-body">
                <h6 className="mb-5">Assigned Engineer</h6>
                {
                    Object.keys(seinfo).map(key => (
                        // menu(data.seinfo[key])
                        <div key={key} className="d-flex px-2 py-1 mt-4">
                            <div>
                                <img src={"http://"+local_host+"/profile_picture/"+seinfo[key][2]} className="avatar avatar-sm me-3 border-radius-lg" alt="img" />
                            </div>
                            <div className="d-flex flex-column justify-content-center">
                                <h6 className="mb-0 text-sm">{seinfo[key][1]}</h6>
                                <p className="text-xs text-secondary mb-0">{seinfo[key][0]}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>

        {
            last_update &&
            <div className="card h-100 mt-3">
                <div className="card-body">
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
                                        serviceinformation.map((si,i)=>
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
                                                    <p className="text-xs font-weight-bold mb-0">{seinfo[si.se][1]}</p>
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
                                    <td className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                        Business Unit
                                    </td>
                                    <td className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                        Products Involved
                                    </td>
                                    <td className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                        Account Manager
                                    </td>
                                    <td className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                        Sales
                                    </td>
                                </thead>
                                <tbody>
                                    {
                                        productinformation.map((pi,i)=>
                                            <tr key={i}>
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
                                <p className="text-xs text-secondary mb-0" style={{whiteSpace: 'pre-line'}}>{item.pending}</p>
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
        }

        {
        (status!==4 && data.last_update) &&
        <Arsignature data={data}/>
        }

        </> 
    )
}

export default Arreport;