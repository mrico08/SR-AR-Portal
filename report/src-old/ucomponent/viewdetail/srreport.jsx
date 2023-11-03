import {useEffect,useState,useContext} from 'react';
import LocalHost from '../../portal/context';
import Srsignature from './srsignature/srsignature';

function Srreport({data}){
    const local_host = useContext(LocalHost);
    const [item,sitem] = useState(null);
    const [seinfo,sseinfo] = useState([]);
    const [sinformation,ssinformation] = useState([]);
    const [productinformation,sproductinformation] = useState([]);
    const [last_update,slast_update] = useState(null);
    const [status,sstatus] = useState(0);
    

    useEffect(()=>{
        if(data!==""){
            sstatus(data.status);
            sitem(data);
            sseinfo(JSON.parse(data.seinfo));
            ssinformation(JSON.parse(data.s_information));
            sproductinformation(JSON.parse(data.p_information));
            slast_update(data.last_update);
        }
    },[data])

    return(
        item &&
        <>
        <div className="card h-100">
            <div className="card-body">
                <div className="d-flex justify-content-end">
                    <h6 className="mb-3">
                        Project / SA No. :
                        <span className="text-info">&nbsp;{item.project}</span>
                    </h6>                    
                </div>
                <div className="d-flex justify-content-end mb-5">
                    <h6 className="mb-3">
                        Case No. :
                        <span className="text-info">&nbsp;{item.caseno}</span>
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
                                <strong className="text-dark">Reported by:</strong> 
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
                                        <td className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Date
                                        </td>
                                        <td className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Time In
                                        </td>
                                        <td className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Time Out
                                        </td>
                                        <td className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Break
                                        </td>
                                        <td className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Engineer
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        sinformation.map((si,i)=>
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
                                &nbsp;<span className="text-info">{item.t_service}</span>
                            </li>
                        </ul>
                    </div>
                
                    <hr className="horizontal gray-light my-4 my-5"></hr>
                    
                    <div className="fluid">                    
                        <h5 className="mb-3">Product Information</h5>
                        <div className="table-responsive p-0">
                            <table className="table align-items-center mb-0">
                                <thead>
                                    <tr>
                                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Brand
                                        </th>
                                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Part #
                                        </th>
                                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Serial #
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        productinformation.map((pi,i)=>
                                            <tr key= {i}>
                                                <td className="align-middle text-center text-sm">
                                                    <p className="text-xs font-weight-bold mb-0">{pi.brand}</p>
                                                </td>
                                                <td className="align-middle text-center text-sm">
                                                    <p className="text-xs font-weight-bold mb-0">{pi.partno}</p>
                                                </td>
                                                <td className="align-middle text-center text-sm">
                                                    <p className="text-xs font-weight-bold mb-0">{pi.serial}</p>
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
                                <h6 className="mb-0 text-sm">Purpose / Reported Concerns</h6>
                                <p className="text-xs text-secondary mb-0" style={{whiteSpace: 'pre-line'}}>{item.purpose}</p>
                            </div>
                        </div>

                        <div className="d-flex px-2 py-3">
                            <div className="d-flex flex-column justify-content-center">
                                <h6 className="mb-0 text-sm">Action Taken</h6>
                                <p className="text-xs text-secondary mb-0" style={{whiteSpace: 'pre-line'}}>{item.action_taken}</p>
                            </div>
                        </div>

                        <div className="d-flex px-2 py-3">
                            <div className="d-flex flex-column justify-content-center">
                                <h6 className="mb-0 text-sm">Finding/s</h6>
                                <p className="text-xs text-secondary mb-0" style={{whiteSpace: 'pre-line'}}>{item.finding}</p>
                            </div>
                        </div>

                        <div className="d-flex px-2 py-3">
                            <div className="d-flex flex-column justify-content-center">
                                <h6 className="mb-0 text-sm">Next Action Item / Pending</h6>
                                <p className="text-xs text-secondary mb-0" style={{whiteSpace: 'pre-line'}}>{item.pending}</p>
                            </div>
                        </div>

                        <div className="d-flex px-2 py-3">
                            <div className="d-flex flex-column justify-content-center">
                                <h6 className="mb-0 text-sm">Recommendation/s</h6>
                                <p className="text-xs text-secondary mb-0" style={{whiteSpace: 'pre-line'}}>{item.recommendation}</p>
                            </div>
                        </div>

                        <div className="d-flex px-2 py-3">
                            <div className="d-flex flex-column justify-content-center">
                                <h6 className="mb-0 text-sm">Remarks</h6>
                                <p className="text-xs text-secondary mb-0" style={{whiteSpace: 'pre-line'}}>{item.remarks}</p>
                            </div>
                        </div>                    
                    </div>
                </div>
            </div>            
        }

        {
        (status!==4 && data.last_update) &&
        <Srsignature data={data}/>
        }



        
        </>
    )
}

export default Srreport;