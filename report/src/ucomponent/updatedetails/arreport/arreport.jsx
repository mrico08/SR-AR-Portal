import {useEffect,useState,useContext} from 'react';
import Form1 from './form1';
import Form2 from './form2';
import Form3 from './form3';
import LocalHost from '../../../portal/context';
import swal from 'sweetalert';

function Arreport({srno,handleClose,reportdisplay,reporttype}){
    const local_host = useContext(LocalHost);
    const credential = JSON.parse(localStorage.getItem('credential1'));
    const jwttoken=credential[0];
    
    // form1
    const [serviceinformation,sserviceinformation] = useState([]);
    const [t_activity,st_activity] = useState("");

    // form2
    const [productinformation,sproductinformation] = useState([]);
    
    // form 3
    const [a_description,sa_description] = useState("");
    const [a_assessment,sa_assessment] = useState("");
    const [n_action,sn_action] = useState("");
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
            t_activity,
            productinformation,
            a_description,
            a_assessment,
            n_action,
            remarks,
        };

        let result = await fetch('http://'+local_host+'/api/auth/update_arreport',{
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
        }else if(result.notification === 2){
            swal('FAILED',result.message,'error');
        }

        handleClose();
        reportdisplay('','','');
    }

    return(
        <>
        <Form1 sserviceinformation={sserviceinformation} st_activity={st_activity} data={data}/>
        <Form2 sproductinformation={sproductinformation} data={data}/>
        <Form3
            sa_description = {sa_description}
            sa_assessment = {sa_assessment}
            sn_action = {sn_action}
            sremarks = {sremarks}
            data={data}
        />      
        <div className="d-flex justify-content-end mt-4">
            <button onClick={btn_submit} type="button" className="btn bg-gradient-info px-5">Submit</button>
        </div>  
        </>
    )
}

export default Arreport;
