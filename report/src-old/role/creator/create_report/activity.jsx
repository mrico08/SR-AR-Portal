import {useState,useRef} from 'react';
import Form1 from './activity_component/form1';
import Form2 from './activity_component/form2';
import Form3 from './activity_component/form3';
import Form4 from './activity_component/form4';
import Preview from './activity_component/preview';

function Activity(){
    const childRef = useRef(null);
    const [c_cname,sc_cname] = useState("");
    const [c_saddress,sc_saddress] = useState("");
    const [c_cperson,sc_cperson] = useState("");
    const [c_contact,sc_contact] = useState("");
    const [r_cname,sr_cname] = useState("");
    const [r_cperson,sr_cperson] = useState("");
    const [r_contact,sr_contact] = useState("");
    const [r_requested,sr_requested] = useState("");
    
    const [designno,sdesignno] = useState("");

    // form2
    const [serviceinformation,sserviceinformation] = useState([]);
    const [t_activity,st_activity] = useState("");

    // form3
    const [productinformation,sproductinformation] = useState([]);
    
    // form 4
    const [a_description,sa_description] = useState("");
    const [a_assessment,sa_assessment] = useState("");
    const [n_action,sn_action] = useState("");
    const [remarks,sremarks] = useState("");

    
    const btn_submit = () =>{
        if(childRef.current){
            childRef.current.openmodal1({
                c_cname,
                c_saddress,
                c_cperson,
                c_contact,
                r_cname,
                r_cperson,
                r_contact,
                r_requested,
                serviceinformation,
                t_activity,
                productinformation,
                a_description,
                a_assessment,
                n_action,
                remarks,
            })
        }
    }

    return(
        <>
            <Form1
                sc_cname = {sc_cname}
                sc_saddress = {sc_saddress}
                sc_cperson = {sc_cperson}
                sc_contact = {sc_contact}
                sr_cname = {sr_cname}
                sr_cperson = {sr_cperson}
                sr_contact = {sr_contact}
                sr_requested = {sr_requested}
            />
            <Form2 sserviceinformation={sserviceinformation} st_activity={st_activity}/>
            <Form3 sproductinformation={sproductinformation}/>
            <Form4
                sa_description = {sa_description}
                sa_assessment = {sa_assessment}
                sn_action = {sn_action}
                sremarks = {sremarks}
            />
            <div className="d-flex justify-content-end mt-4">
                <button onClick={btn_submit} type="button" className="btn bg-gradient-info px-5">Submit</button>
            </div>
            <Preview ref={childRef}/>
        </>

    )
}

export default Activity;