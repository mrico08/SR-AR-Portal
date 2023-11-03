import {useState,useRef} from 'react';

import Form1 from './service_component/form1';
import Form2 from './service_component/form2';
import Form3 from './service_component/form3';
import Form4 from './service_component/form4';
import Preview from './service_component/preview';

function Service1(){
    const childRef = useRef(null);
    const [c_cname,sc_cname] = useState("");
    const [c_saddress,sc_saddress] = useState("");
    const [c_cperson,sc_cperson] = useState("");
    const [c_contact,sc_contact] = useState("");
    const [r_cname,sr_cname] = useState("");
    const [r_reported,sr_reported] = useState("");
    const [r_cperson,sr_cperson] = useState("");
    const [r_contact,sr_contact] = useState("");

    const [project,sproject] = useState("");
    const [caseno,scaseno] = useState("");

    // form 2
    const [serviceinformation,sserviceinformation] = useState([]);
    const [t_service,st_service] = useState("");

    // form 3
    const [productinformation,sproductinformation] = useState([]);

    // form 4
    const [purpose,spurpose] = useState("");
    const [a_taken,sa_taken] = useState("");
    const [findings,sfindings] = useState("");
    const [n_action,sn_action] = useState("");
    const [recommendation,srecommendation] = useState("");
    const [remarks,sremarks] = useState("");
    
    const btn_submit = () =>{
        if(childRef.current){
            childRef.current.openmodal1({
                project,
                caseno,
                c_cname,
                c_saddress,
                c_cperson,
                c_contact,
                r_cname,
                r_reported,
                r_cperson,
                r_contact,
                serviceinformation,
                t_service,
                productinformation,
                purpose,
                a_taken,
                findings,
                n_action,
                recommendation,
                remarks
            });
        }
    }

    return(
        <>
        <form >
            <Form1 
                sc_cname = {sc_cname}
                sc_saddress = {sc_saddress}
                sc_cperson = {sc_cperson}
                sc_contact = {sc_contact}
                sr_cname = {sr_cname}
                sr_reported = {sr_reported}
                sr_cperson = {sr_cperson}
                sr_contact = {sr_contact}
                sproject = {sproject}
                scaseno = {scaseno}
            />
            <Form2 sserviceinformation={sserviceinformation} st_service={st_service}/>
            <Form3 sproductinformation={sproductinformation}/>
            <Form4 
                spurpose={spurpose}
                sa_taken={sa_taken}
                sfindings = {sfindings}
                sn_action = {sn_action}
                srecommendation = {srecommendation}
                sremarks = {sremarks}
            />
            <div className="d-flex justify-content-end mt-4">
                <button onClick={btn_submit} type="button" className="btn bg-gradient-info px-5">Submit</button>
            </div>
        </form>
        
        <Preview ref={childRef}/>
        </>
    )
}

export default Service1;