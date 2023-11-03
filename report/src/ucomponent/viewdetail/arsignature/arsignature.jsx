import {useEffect,useState,useContext} from 'react';
import LocalHost from '../../../portal/context';

function Arsignature({data}){
    const local_host = useContext(LocalHost);
    const [sesign,ssesign] = useState(null);
    const [conforme,sconforme] = useState(null);
    const [approver,sapprover] = useState(null);


    useEffect(()=>{
        ssesign(JSON.parse(data.se_sign));
        if(data.conforme_name){
            sconforme([data.conforme_name,data.conforme_sign]);
        }

        if(data.approver_name){
            sapprover([data.approver_name,data.approver_sign])            
        }
    },[data])

    return(
        <>
        <div className="card h-100 mt-3">
            <div className="table-responsive">
                <table className="table align-items-center mb-0">
                    <thead>
                        <tr>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Technical Engineer/s</th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Signature</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            (sesign) ?
                                Object.entries(sesign).map(([key,value])=>{
                                    return(
                                        <tr key={key}>
                                            <td width="40%" className="align-middle text-center text-sm">
                                                {value[0]}
                                            </td>
                                            <td className="align-middle text-center text-sm">
                                                <div className="d-flex justify-content-center">
                                                    <img style={{maxWidth:'30%',maxHeight:'100px'}} src={"http://"+local_host+"/signature/"+value[1]} className="img-fluid" alt="img" />
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            :
                            <tr>
                                <td width="25%"></td>
                                <td  width="50%">
                                    <center><b>No result</b></center>
                                </td>
                                <td width="25%"></td>
                            </tr>
                        }                        
                    </tbody>
                </table>
            </div>
        </div>
            
        <div className="card h-100 mt-3">
            <div className="table-responsive">
                <table className="table align-items-center mb-0">
                    <thead>
                        <tr>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Authorized Client Representative</th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Signature</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            (conforme) ?
                                <tr>
                                    <td width="40%" className="align-middle text-center text-sm">
                                        {conforme[0]}
                                    </td>
                                    <td className="align-middle text-center text-sm">
                                        <div className="d-flex justify-content-center">
                                            <img style={{maxWidth:'30%',maxHeight:'100px'}} src={"http://"+local_host+"/signature/"+conforme[1]} className="img-fluid" alt="img" />
                                        </div>
                                    </td>
                                </tr>
                            :
                            <tr>
                                <td width="25%"></td>
                                <td  width="50%">
                                    <center><b>No result</b></center>
                                </td>
                                <td width="25%"></td>
                            </tr>
                        }                        
                    </tbody>
                </table>
            </div>
        </div>

        {
            data.status===3 &&
            <div className="card h-100 mt-3">
                <div className="table-responsive">
                    <table className="table align-items-center mb-0">
                        <thead>
                            <tr>
                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Approver (Manager)</th>
                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Signature</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (approver) ?
                                    <tr>
                                        <td width="40%" className="align-middle text-center text-sm">
                                            {approver[0]}
                                        </td>
                                        <td className="align-middle text-center text-sm">
                                            <div className="d-flex justify-content-center">
                                                <img style={{maxWidth:'30%',maxHeight:'100px'}} src={"http://"+local_host+"/signature/"+approver[1]} className="img-fluid" alt="img" />
                                            </div>
                                        </td>
                                    </tr>
                                :
                                <tr>
                                    <td width="25%"></td>
                                    <td  width="50%">
                                        <center><b>No result</b></center>
                                    </td>
                                    <td width="25%"></td>
                                </tr>
                            }                        
                        </tbody>
                    </table>
                </div>
            </div>
        }    
        </>
    )
}

export default Arsignature;