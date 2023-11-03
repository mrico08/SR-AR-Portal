import React,{useState,useContext} from 'react';
import LocalHost from '../../portal/context';
import swal from 'sweetalert';

function Usernameform({setc_form,seth_username}){
    const local_host = useContext(LocalHost);
    const regex = /[`'" ]/;
    const [username,setusername1]=useState();
    const [btn_dis,setbtn_dis]=useState(false);
    
    function containsSpecialChars(str) {
        const specialChars = /[`'" ]/;
        return specialChars.test(str);
    }

    const setusername = (e) =>{
        if(containsSpecialChars(e.target.value)){
            //eslint-disable-next-line
            swal("'\, \"\  and space is not allowed.");
            setusername1(e.target.value.replace(regex, ''));
        }else{
            setusername1(e.target.value);
        }
    }

    const btn_submit = async () =>{
        setbtn_dis(true);
        if(username===""){
            swal("Username required.");
            return setbtn_dis(false);
        }

        let otptype="forgot";
        let email= username;
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
            return setbtn_dis(false); 
        }

        setc_form(true);
        seth_username(username)
    }
    return (
        <>        
        <div  className="card h-800">
            <div className="card-header pb-0 p-3">
                <div className="col-md-8 d-flex align-items-center">
                    <h5 className="mb-0">Forgot your password ?</h5>
                </div>
            </div>
            <div className="card-body p-3">
                <p className="mb-0">Enter your email below and we will send a message via email to reset your password.</p>
                <div className="form-group" style={{marginTop:'20px'}}>
                    <label for="exampleFormControlInput1">Email</label>
                    <input value={username} onChange={setusername} type="email" className="form-control" id="exampleFormControlInput1" placeholder="Enter Email" />
                </div>
                <div className="text-center">
                    <button disabled={btn_dis} onClick={btn_submit} type="submit"  className="btn bg-gradient-info w-100 mt-4 mb-0">Submit</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default Usernameform;