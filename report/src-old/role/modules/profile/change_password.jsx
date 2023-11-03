import React, {useEffect, useContext, useState, useRef} from "react";
import { useImperativeHandle, forwardRef } from "react";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import './pass_show.css';
import LocalHost from "../../../portal/context";
import swal from 'sweetalert';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },    
    '& .MuiPaper-root':{
        borderRadius:'10px',
        backgroundColor:'#eeeff0', 
    }
}));

function ChangePassword({}, ref){
    const local_host = useContext(LocalHost);
    const credential = JSON.parse(localStorage.getItem('credential1'));
    const jwttoken=credential[0];
    const user_info = credential[1];
    const email = user_info.email;
    
    const [dis_submit,sdis_submit] = useState(false);
    // const [designation,sdesignation] = useState("");
    // const [se_unit,sse_unit] = useState("");
    const [otp,sotp] = useState("");

    const [v_notification, sv_notification]=useState("");
    const [vtitle,svtitle]= useState("Send Verification Code");
    const [dis_email,sdis_email] = useState(false);
    const [id, setId] = useState("");


    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const openmodal = (id) => {
        setOpen(true);
        setId(id);
    }

    useImperativeHandle (ref, () => ({openmodal}));

    const [passwordType, setPasswordType] = useState("password");
    const [passwordInput1, setPasswordInput1] = useState("");
    const [passwordInput2, setPasswordInput2] = useState("");
    const [passwordInput3, setPasswordInput3] = useState("");



    const btn_send =  async () =>{
        sdis_submit(true);
        svtitle(<div className="spinner-border text-info" role="status">
                    <center>
                        <span className="sr-only">Loading...</span>
                    </center>
                </div>)

        const otptype='change_pass';
        let item = {email,otptype};
        // console.log(item)
        let result= await fetch("http://"+local_host+"/api/auth/v_code",{
            method:'POST',
            body:JSON.stringify(item),
            headers:{
                "Content-Type":'application/json',
                "Accept":'application/json',
                'Authorization': "Bearer " + jwttoken,
                "withCredentials":"true",
            }
        })

        result = await result.json();
        if(result.notification===1){
            sv_notification(<p className='text-success p-0 m-0'>{result.message}</p>);
            svtitle("Resend Verification Code");
            sdis_email(true);
            swal('SUCCESS',result.message,'success');
        }else if(result.notification===2){
            sv_notification(<p className='text-danger p-0 m-0'>{result.message}</p>);
            svtitle("Send Verification Code");
            swal('FAILED',result.message,'error');
        }
        sdis_submit(false);
    }


    const passwordChange = async (e) => {
        e.preventDefault();

        if(otp===""){
            return swal('Verification Code required.');
        }

        let item = {otp, email, passwordInput1, passwordInput2, id};
        console.log(item)

        let result = await fetch('http://'+local_host+'/api/auth/change_password',{
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
            sv_notification(<p className='text-success p-0 m-0'>{result.message}</p>);

            swal('SUCCESS',result.message,'success');
        }else if(result.notification===2){
            sv_notification(<p className='text-danger p-0 m-0'>{result.message}</p>);

            swal('FAILED',result.message,'error');
        }
        handleClose();
        // console.log(result.message);


    }

    
    const handlePasswordChange1 = (e)=> {
        setPasswordInput1(e.target.value);
    }

    function containsChars(str){
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

    const regex = /[`'" ]/;
    const [strong_password, setStrongPass] = useState("");
    
    const handlePasswordChange2 = (e)=> {
        if(containsChars(e.target.value)){
            swal("'\, \"\  and space is not allowed.");
            setPasswordInput2(e.target.value.replace(regex, ''));
        }else{
            setPasswordInput2(e.target.value);
        }

        if(containsSpecialCharspassword(e.target.value)===true && containsSpecialnumbers(e.target.value)===true && e.target.value.length>5){
            setStrongPass(
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
            setStrongPass(
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
            setStrongPass(<></>);
        }else{
            setStrongPass(
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

    const handlePasswordChange3 = (e)=> {
        setPasswordInput3(e.target.value);
    }

    const togglePassword = () => {
      if(passwordType==="password")
      {
       setPasswordType("text")
       return;
      }
      setPasswordType("password")


      
    }

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"                   
            open={open}
            width="md"
            fullWidth={true}
            maxWidth="md"
        >
        <DialogTitle>  
            <b>Change Password</b>
        </DialogTitle>

        <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
                }}
            >
                <i className="fa fa-times"></i>
        </IconButton>

        <DialogContent>
        <form onSubmit={passwordChange}>
        <div className="card mx-3 mb-3">
            <div className="card-body">
            
                <div className="row">
                    <div className="col-sm-2">
                        <>
                        </>
                    </div>

                    <div className="col-sm-8">
                    
                    
                    <input type='text' defaultValue={email} className="form-control mb-3 mt-3" readOnly/>
                    
                    <div className="mb-3">
                                <div className="input-group input-group-outline mb-3">
                                    <input onChange={(e)=>sotp(e.target.value)} type="number" className="form-control" placeholder='Enter Verification Code' />
                                </div>
                            </div>
                            
                            <label style={{cursor:'pointer'}} disabled={dis_submit} onClick={btn_send} className="text-info text-gradient font-weight-bold d-flex flex-row-reverse bd-highlight">{vtitle}</label>
                            
                        <h6>Type Old Password:</h6>
                        <div className="input-group my-2 mx-2" style={{position: 'relative'}}>
                            <input type='password' onChange={handlePasswordChange1} value={passwordInput1} className="form-control" placeholder="Old Password" style={{position: 'relative'}} required />
                            
                        </div>

                        <h6>Type New Password:</h6>
                        <div className="input-group my-2 mx-2" style={{position: 'relative'}}>
                            <input type={passwordType} onChange={handlePasswordChange2} value={passwordInput2} name="password" className="form-control" placeholder="New Password" style={{position: 'relative'}} required />
                            <div className="input-group-btn">
                                <button type="button" className="btn bg-gradient-warning px-2 py-2" onClick={togglePassword} style={{position:'absolute', right:2, top:3}}>
                                    { 
                                        passwordType==="password"? 
                                        <span><i className="fas fa-eye fa-lg"></i></span>
                                        :
                                        <span><i className="fas fa-eye-slash fa-lg"></i></span> 
                                    }
                                </button>
                            </div>
                        </div>

                        <h6>Re-type New Password:</h6>
                        <div className="input-group my-2 mx-2" style={{position: 'relative'}}>
                            <input type={passwordType} onChange={handlePasswordChange3} value={passwordInput3} name="password" className="form-control" placeholder="New Password" style={{position: 'relative'}} required />
                            <div className="input-group-btn">
                                <button type="button" className="btn bg-gradient-warning px-2 py-2" onClick={togglePassword} style={{position:'absolute', right:2, top:3}}>
                                    { 
                                        passwordType==="password"? 
                                        <span><i className="fas fa-eye fa-lg"></i></span>
                                        :
                                        <span><i className="fas fa-eye-slash fa-lg"></i></span> 
                                    }
                                </button>
                            </div>
                        </div>
                        {strong_password}
                        {v_notification}
                    </div>
                </div>
            
            </div>
        </div>

        <div className="col-sm-2">
                        <>
                        </>
                    </div>

            <div className="d-flex flex-row-reverse">
                        <button type='submit' className="btn bg-gradient-info mt-1 mb-0 me-3">Submit</button>
            </div>
        </form>
        </DialogContent>

        </BootstrapDialog> 
    )
}
export default forwardRef(ChangePassword);