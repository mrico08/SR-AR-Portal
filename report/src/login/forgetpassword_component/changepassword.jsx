import React,{useState,useRef,useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import LocalHost from '../../portal/context';
import swal from 'sweetalert';

function Changepassword({email}){
    const local_host = useContext(LocalHost);
    const navigate=useNavigate();
    const regex = /[`'" ]/;
    const [password,setpassword1]=useState("");
    const [retype,setretype1]=useState("");
    const [otp,setotp1]=useState("");
    const [btn_dis,setbtn_dis]=useState(false);
    const [p_lenght,setp_lenght]=useState("");

    const ref1=useRef(null);
    
    const setotp = (e) =>{
        setotp1(e.target.value.replace(regex, ''));
    }

    const [btntitle,sbtntitle] = useState("Resend Verification Code");
    const btn_code = async () =>{
        sbtntitle(
            <div className="spinner-border text-info" role="status">
                <center>
                    <span className="sr-only">Loading...</span>
                </center>
            </div>
        );
        let otptype="forgot";
        let item={email,otptype}
        let result= await fetch("http://"+local_host+"/api/auth/v_code",{
            method:'POST',
            body:JSON.stringify(item),
            headers:{
                "Content-Type":'application/json',
                "Accept":'application/json',
                "withCredentials":"true",
            }
        })

        result= await result.json();

        if(result.notification===1){
            swal('Sent',result.message,'success');
        }else if(result.notification===2){
            swal('Failed',result.message,'error');
        }
        sbtntitle("Resend Verification Code");
        setbtn_dis(false); 
    }

    function containsSpecialChars(str) {
        const specialChars = /[`'" ]/;
        return specialChars.test(str);
    }
    
    function containsSpecialCharspassword(str) {
        const specialChars = /[`Ññ!@#$%^&*_()+\\[\]{};:\\|,.<>\/?~]/;
        return specialChars.test(str);
    }

    function containsSpecialnumbers(str) {
        const specialChars = /[0-9]/g;
        return specialChars.test(str);
    }

    const setretype = (e) =>{
        if(containsSpecialChars(e.target.value)){
            //eslint-disable-next-line
            swal("'\, \"\  and space is not allowed.");
            setretype1(e.target.value.replace(regex, ''));
        }else{
            setretype1(e.target.value);
        }
    }

    const [showstrong,sshowstrong] = useState("");
    const setpassword = (e) =>{
        if(containsSpecialChars(e.target.value)){
            swal("'\, \"\  and space is not allowed.");
            setpassword1(e.target.value.replace(regex, ''));
        }else{
            setpassword1(e.target.value);
        }

        if(containsSpecialCharspassword(e.target.value)===true && containsSpecialnumbers(e.target.value)===true && e.target.value.length>5){
            sshowstrong(
                <div className="row">
                    <div className="col-md-10">
                        <input className="form-control" type="color" value="#38d473" disabled/>
                    </div>
                    <div className="col-md-2">
                        <label className="mt-0 text-sm">Secure</label>
                    </div>
                </div>
            )
        }else if(containsSpecialCharspassword(e.target.value)===true || containsSpecialnumbers(e.target.value)===true || e.target.value.length>5){
            sshowstrong(
                <div className="row">
                    <div className="col-md-8">
                        <input className="form-control" type="color" value="#fab30c" disabled/>
                    </div>
                    <div className="col-md-4">
                        <label className="mt-0 text-sm">Getting Stronger</label>
                    </div>
                </div>
            )
        }else if(e.target.value===""){
            sshowstrong(<></>);
        }else{
            sshowstrong(
                <div className="row">
                    <div className="col-md-10">
                        <input className="form-control" type="color" value="#e11010" disabled/>
                    </div>
                    <div className="col-md-2">
                        <label className="mt-0">Weak</label>
                    </div>
                </div>
            )
        }
        
    }

    const btn_submit = async () =>{
        setbtn_dis(true);
        if(otp===""){
            swal("Verification Code Required.");
        }else if(password===""){
            swal("Password Required.");
        }else if(retype===""){
            swal(" Retype Password Required.");
        }else if(retype!==password){
            swal('password confirmation does not match');

        }else if(password.length<6){
            swal('password must be 6 characters long including at least one number one character and one number.');

        }else if(containsSpecialnumbers(password)===false){
            swal('password must be 6 characters long including at least one number one character and one number.');

        }else if(containsSpecialCharspassword(password)===false){
            swal('password must be 6 characters long including at least one number one character and one number.');
        }




        let item={otp,password,email};

        let result= await fetch("http://"+local_host+"/api/auth/reset_password",{
            method:'POST',
            body:JSON.stringify(item),
            headers:{
                "Content-Type":'application/json',
                "Accept":'application/json',
                "withCredentials":"true",
            }
        })

        result = await result.json();

        if(result.notification===1){
            swal("Success",result.message,"success");            
        }else if(result.notification===2){
            swal("Failed",result.message,"error");            
        }else if(result.notification===3){
            swal("Warning",result.message,"warning");            
        }

        navigate('../login');
        setbtn_dis(false);
    }

    return (
        <>
         <div  className="card h-800">
            <div className="card-header pb-0 p-3">
                <div className="col-md-8 d-flex align-items-center">
                    <h5 className="mb-0">Forgot your Password</h5>
                </div>
            </div>
            <div className="card-body p-3">
                <p className="mb-0">We have sent the verification code via email please check your email and enter it below to reset your password.</p>
                <div className="form-group" style={{marginTop:'20px'}}>
                    <label for="exampleFormControlInput1">Verification Code</label>
                    <input value={otp} onChange={setotp} type="number" className="form-control" placeholder="Enter Verification  Code" />
                </div>
                <div className="d-flex flex-row-reverse bd-highlight">
                    <span style={{fontSize:'13px',cursor:"pointer",marginTop:"5px"}} onClick={btn_code} className="text-info text-gradient font-weight-bold ">&nbsp;{btntitle}</span>
                </div>
                <div className="form-group" style={{marginTop:'20px'}}>
                    <label for="exampleFormControlInput1">New Password</label>
                    <input ref={ref1} value={password} onChange={setpassword} type="password" className="form-control" placeholder="Enter New password" />
                </div>
                {showstrong}
                <p>{p_lenght}</p>
                <div className="form-group" style={{marginTop:'20px'}}>
                    <label for="exampleFormControlInput1">Retype Password</label>
                    <input value={retype} onChange={setretype} type="password" className="form-control" placeholder="Retype Password" />
                </div>
                <div className="text-center">
                    <button disabled={btn_dis} onClick={btn_submit} type="submit"  className="btn bg-gradient-info w-100 mt-4 mb-0">Submit</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default Changepassword;