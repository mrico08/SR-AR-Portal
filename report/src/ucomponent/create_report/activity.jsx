import {useState,useContext} from 'react';
import LocalHost from '../../portal/context';
import Selist from './selist/selist';
import Companyname from './service/companyname';
import Rcompanyname from './service/rcompanyname';
import SocketContext from '../../portal/socket';
import swal from 'sweetalert';


function Activity({handleClose,reportdisplay}){
    const socket = useContext(SocketContext);
    const local_host = useContext(LocalHost);
    const credential = JSON.parse(localStorage.getItem('credential1'));
    const jwttoken=credential[0];
    const userinfo=credential[1];
    const name = userinfo.name;
    const email = userinfo.email;
    const profile = userinfo.profile;    

    const [dis_btn,sdis_btn] = useState(false);
   
    const [c_cname,sc_cname] = useState("");
    const [c_saddress,sc_saddress] = useState("");
    const [c_cperson,sc_cperson] = useState("");
    const [c_contact,sc_contact] = useState("");
    const [r_cname,sr_cname] = useState("");
    const [r_cperson,sr_cperson] = useState("");
    const [r_contact,sr_contact] = useState("");
    const [r_requested,sr_requested] = useState("");
    const [designno,sdesignno] = useState("");
    const [datefrom,sdatefrom] = useState("");
    const [dateto,sdateto] = useState("");

    // engineer
    const [se,sse] = useState([]);
    const btn_submit = async(e) =>{
        e.preventDefault();
        sdis_btn(true)
        let date1 = new Date(datefrom);
        let date2 = new Date(dateto);
        let Difference_In_Time = date2.getTime() - date1.getTime();
        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

        if((Difference_In_Days<0) || (Difference_In_Days===NaN)){
            swal("End date must be after start date.");
            return sdis_btn(false);
        }else if(Difference_In_Days>20){
            swal("Activity must be atleast 20 days");
            return sdis_btn(false);
        }

        let item = {c_cname,c_saddress,c_cperson,c_contact,r_cname,r_requested,r_cperson,r_contact,designno,se,datefrom,dateto,name,email,profile};

        let result = await fetch('http://'+local_host+'/api/auth/c_arreport',{
            method: 'POST',
            body:JSON.stringify(item),
            headers:{
                "Content-Type":'application/json',
                "Accept":'application/json',
                'Authorization': "Bearer " + jwttoken,
                'X-Requested-With':'XMLHttpRequest',
            }
        });
        
        result= await result.json();

        if(result.notification===1){
            swal('SUCCESS',result.message,'success');
            handleClose();
            const uid=([...result.selist,'delegator'])
            socket.emit('refresh_action',{'uid':uid});
        }else{
            swal('FAILED',result.message,'error');
        }
        reportdisplay('','','');
        sdis_btn(false);
    }

    return(
        <form onSubmit={btn_submit}>
        <div className="card h-100 mt-3">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-6">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Date</label>
                                <div className="d-flex justify-content-start">
                                    <input onChange = {(e)=>sdatefrom(e.target.value)} type="date" className="form-control" required/>
                                    <p className="mx-3">to</p>
                                    <input onChange = {(e)=>sdateto(e.target.value)} type="date" className="form-control" required/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>BOM Design Ref #</label>
                            <input onChange = {(e)=>sdesignno(e.target.value)} type="text" className="form-control" placeholder="Enter BOM Design Ref #" required/>
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
                        <Companyname sc_cname={sc_cname} />
                        <div className="form-group">
                            <label>Site Address</label>
                            <input onChange = {(e)=>sc_saddress(e.target.value)} type="text" className="form-control" placeholder="Enter Site Address" required/>
                        </div>
                        <div className="form-group">
                            <label>Contact Person</label>
                            <input onChange = {(e)=>sc_cperson(e.target.value)} type="text" className="form-control" placeholder="Enter Contact Person" required/>
                        </div>
                        <div className="form-group">
                            <label>Contact No.</label>
                            <input onChange = {(e)=>sc_contact(e.target.value)} type="text" className="form-control" placeholder="Enter Contact #" required/>
                        </div>
                    </div>
                    
                    <div className="col-md-6">
                        <h5>RESELLER INFORMATION</h5>
                        <Rcompanyname sr_cname={sr_cname} />
                        <div className="form-group">
                            <label>Address</label>
                            <input onChange = {(e)=>sr_requested(e.target.value)} type="text" className="form-control" placeholder="Enter Address" required/>
                        </div>
                        <div className="form-group">
                            <label>Contact Person</label>
                            <input onChange = {(e)=>sr_cperson(e.target.value)} type="text" className="form-control" placeholder="Enter Site Contact Person" required/>
                        </div>
                        <div className="form-group">
                            <label>Contact No.</label>
                            <input onChange = {(e)=>sr_contact(e.target.value)} type="text" className="form-control" placeholder="Enter Contact No." required/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Selist sse={sse} />

        <div className="d-flex justify-content-end mt-4">
            <button disabled={dis_btn} type="submit" className="btn bg-gradient-info px-5">Submit</button>
        </div>
        </form>
    )
}

export default Activity;