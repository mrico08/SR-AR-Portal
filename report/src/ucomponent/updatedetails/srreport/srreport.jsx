import {useEffect,useState,useContext} from 'react';
import swal from 'sweetalert';
import LocalHost from '../../../portal/context';
import Form1 from './form1';
import Form2 from './form2';
import Form3 from './form3';


function Srreport({srno,handleClose,reportdisplay,reporttype}){
    const local_host = useContext(LocalHost);
    const credential = JSON.parse(localStorage.getItem('credential1'));
    const jwttoken=credential[0];    

    // form 1
    const [serviceinformation,sserviceinformation] = useState([]);
    const [t_service,st_service] = useState("");

    // form 2
    const [productinformation,sproductinformation] = useState([]);

    // form 3
    const [purpose,spurpose] = useState("");
    const [a_taken,sa_taken] = useState("");
    const [findings,sfindings] = useState("");
    const [n_action,sn_action] = useState("");
    const [recommendation,srecommendation] = useState("");
    const [remarks,sremarks] = useState("");

    const [data,sdata] = useState([]);
    const viewdetails = async () =>{
        const value = srno;
        const rtype = reporttype;
        let item = {value,rtype};
        let result = await fetch('http://'+local_host+'/api/auth/v_details',{
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
        sdata(result);
    }

    useEffect(()=>{
        viewdetails();
    },[])

    const btn_submit = async () =>{
        let item = {
            srno,
            serviceinformation,
            t_service,
            productinformation,
            purpose,
            a_taken,
            findings,
            n_action,
            recommendation,
            remarks
        };


        let result = await fetch('http://'+local_host+'/api/auth/update_srreport',{
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
        if(result.notification === 1){
            swal('SUCCESS',result.message,'success');
        }else if(result.notification === 1){
            swal('FAILED',result.message,'error');
        }
        handleClose();
        reportdisplay('','','');
    }

    return(
    <>
        <Form1 sserviceinformation={sserviceinformation} st_service={st_service} data={data}/>
        <Form2 sproductinformation={sproductinformation} data={data}/>
        <Form3
            spurpose={spurpose}
            sa_taken={sa_taken}
            sfindings = {sfindings}
            sn_action = {sn_action}
            srecommendation = {srecommendation}
            sremarks = {sremarks}
            data = {data}
        />
        <div className="d-flex justify-content-end mt-4">
            <button onClick={btn_submit} type="button" className="btn bg-gradient-info px-5">Update</button>
        </div>
    </>
    )
}

export default Srreport;