import {useState,useEffect,useContext,useRef} from 'react';
import Companyname from './service/companyname';
import Rcompanyname from './service/rcompanyname';
import Selist from './selist/selist';
import LocalHost from '../../portal/context';
import SocketContext from '../../portal/socket';

import swal from 'sweetalert';
import Alertnotif from '../alert/alert';

function Arreport({reportdisplay,data,handleClose}){
    const socket = useContext(SocketContext);
    const local_host = useContext(LocalHost);
    const credential = JSON.parse(localStorage.getItem('credential1'));
    const jwttoken=credential[0];
    const [dis_btn,sdis_btn] = useState(false);
    const childRef = useRef(null);

    const [arno,sarno] = useState("");
    const [c_cname,sc_cname] = useState("");
    const [c_saddress,sc_saddress] = useState("");
    const [c_cperson,sc_cperson] = useState("");
    const [c_contact,sc_contact] = useState("");
    const [r_cname,sr_cname] = useState("");
    const [r_cperson,sr_cperson] = useState("");
    const [r_contact,sr_contact] = useState("");
    const [r_requested,sr_requested] = useState("");
    const [designno,sdesignno] = useState("");

    const [se,sse] = useState([]);
    const btn_submit = async (e) =>{
        e.preventDefault();
        let item = {arno,c_cname,c_saddress,c_cperson,c_contact,r_cname,r_requested,r_cperson,r_contact,designno,se};
        let result = await fetch('http://'+local_host+'/api/auth/u_arreport',{
            method: 'POST',
            body:JSON.stringify(item),
            headers:{
                "Content-Type":'application/json',
                "Accept":'application/json',
                'Authorization': "Bearer " + jwttoken,
                'X-Requested-With':'XMLHttpRequest',
            }
        });

        result = await result.json();
        if(result.notification===1){
            swal('SUCCESS',result.message,'success');
            handleClose();
            if(result.selist.length>0){
                const uid=([...result.selist,'delegator'])
                socket.emit('refresh_action',{'uid':uid});
            }
        }else if(result.notification===2){
            swal('Failed',result.message,'error');
            handleClose();
        }else if(result.notification===3){
            childRef.current.openalert(result[0]);
            const element = document.getElementById('section-1');
            if(element){
                element.scrollIntoView({behavior:'smooth'})
            }

        }else if(result.notification===4){
            swal('Failed',result.message,'error');
        }
        reportdisplay('','','');
        sdis_btn(false);
    }

    const seloop = (se1,seinfo) =>{
        const se2 =[];

        se1.map((item)=>
            se2.push({engineer:seinfo[item]})
        )

        sse(se2)
    }


    useEffect(()=>{
        if(Object.keys(data).length>0){
            sarno(data.sr_no);
            sdesignno(data.designno || "");
            sc_cname(data.c_cname || "");
            sc_saddress(data.c_saddress || "")
            sc_cperson(data.c_cperson || "")
            sc_contact(data.c_contact || "")
            sr_cname(data.r_cname || "")
            sr_cperson(data.r_cperson || "")
            sr_contact(data.r_contact || "")
            sr_requested(data.r_reported || "")
            seloop(JSON.parse(data.assignse),JSON.parse(data.seinfo));
        } 
    },[data])

    return(
        <>
        <div id="section-1" className="row">
            <div className="col-md-5">
                <Alertnotif ref={childRef} />
            </div>
         </div>
        <form onSubmit={btn_submit}>
        <div className="card h-100 mt-3">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Activity Report #</label>
                            <input value={"AR-"+arno}  type="text" className="form-control" disabled={true} />
                        </div>
                        <div className="form-group">
                            <label>BOM Design Ref #</label>
                            <input value={designno} onChange = {(e)=>sdesignno(e.target.value)} type="text" className="form-control" placeholder="Enter BOM Design Ref #" required/>
                        </div>
                    </div>                    
                </div>
            </div>
        </div>

        <div className="card h-100 mt-3">
            <div className="card-body p-5">
                <div className="row">
                    <div className="col-md-6">
                        <h5>CLIENT INFORMATION</h5>
                        <Companyname sc_cname={sc_cname} c_cname={c_cname} />
                        <div className="form-group">
                            <label>Site Address</label>
                            <input value={c_saddress} onChange = {(e)=>sc_saddress(e.target.value)} type="text" className="form-control" placeholder="Enter Site Address" required/>
                        </div>
                        <div className="form-group">
                            <label>Contact Person</label>
                            <input value={c_cperson} onChange = {(e)=>sc_cperson(e.target.value)} type="text" className="form-control" placeholder="Enter Contact Person" required/>
                        </div>
                        <div className="form-group">
                            <label>Contact No.</label>
                            <input value={c_contact} onChange = {(e)=>sc_contact(e.target.value)} type="number" className="form-control" placeholder="Enter Contact #" required/>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <h5>RESELLER INFORMATION</h5>
                        <Rcompanyname sr_cname={sr_cname} r_cname={r_cname} />
                        <div className="form-group">
                            <label>Contact Person</label>
                            <input value={r_cperson} onChange = {(e)=>sr_cperson(e.target.value)} type="text" className="form-control" placeholder="Enter Site Contact Person" required/>
                        </div>
                        <div className="form-group">
                            <label>Contact No.</label>
                            <input value={r_contact} onChange = {(e)=>sr_contact(e.target.value)} type="number" className="form-control" placeholder="Enter Contact No." required/>
                        </div>
                        <div className="form-group">
                            <label>Requested by</label>
                            <input value={r_requested} onChange = {(e)=>sr_requested(e.target.value)} type="text" className="form-control" placeholder="Enter Requested by" required/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Selist sse={sse} se={se} />
        <div className="d-flex justify-content-end mt-4">
            <button disabled={dis_btn} type="submit" className="btn bg-gradient-info px-5">Submit</button>
        </div>
        </form>
        </>
    )
}

export default Arreport;