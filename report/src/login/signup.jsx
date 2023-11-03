import {useState,createRef,useContext} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import Footer from "../portal_body/footer";
import LocalHost from "../portal/context";
import ProfilePicture from "@dsalvagni/react-profile-picture";
import "@dsalvagni/react-profile-picture/dist/ProfilePicture.css";
import swal from 'sweetalert';

function Signup(){
    const local_host = useContext(LocalHost);
    const profilePictureRef =  createRef();
    const navigate = useNavigate();
    const [dis_submit,sdis_submit] = useState(false);
    const [fullname,sfullname] = useState("");
    const [email,semail] = useState("");
    const [password,spassword] = useState("");
    const [retypepassword,sretypepassword] = useState("");
    const [designation,sdesignation] = useState("");
    const [se_unit,sse_unit] = useState("");
    const [s_unit,ss_unit] = useState("");
    const [otp,sotp] = useState("");

    function containsSpecialChars(str) {
        const specialChars = /[`'" ]/;
        return specialChars.test(str);
    }

    const regex = /[`'" ]/;
    const fullnameregex = /[`Ññ!@#$%^&*()+\\[\]{};':"\\|,.<>\/?~]/g;

    const fullname1  = (e) =>{
        sfullname(e.target.value.replace(fullnameregex, ''));
    }

    const email1  = (e) =>{
        if(containsSpecialChars(e.target.value)){
            //eslint-disable-next-line
            swal("'\, \"\  and space is not allowed.");
            semail(e.target.value.replace(regex, ''));
        }else{
            semail(e.target.value);
        }
    }


    const [showstrong,sshowstrong] = useState("");
    const password1  = (e) =>{
        if(containsSpecialChars(e.target.value)){
            swal("'\, \"\  and space is not allowed.");
            spassword(e.target.value.replace(regex, ''));
        }else{
            spassword(e.target.value);
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

    const retypepassword1  = (e) =>{
        if(containsSpecialChars(e.target.value)){
            //eslint-disable-next-line
            swal("'\, \"\  and space is not allowed.");
            sretypepassword(e.target.value.replace(regex, ''));
        }else{
            sretypepassword(e.target.value);
        }
    }
    
    function containsSpecialCharspassword(str) {
        const specialChars = /[`Ññ!@#$%^&*_()+\\[\]{};:\\|,.<>\/?~]/;
        return specialChars.test(str);
    }

    function containsSpecialnumbers(str) {
        const specialChars = /[0-9]/g;
        return specialChars.test(str);
    }

    const designation1 = (e) =>{
        sdesignation(e.target.value);
        sse_unit("");
    }

    const [v_notification,sv_notification]=useState("");
    const [vtitle,svtitle]= useState("Send Verification Code");
    const [dis_email,sdis_email] = useState(false);
    const btn_send =  async () =>{
        sdis_submit(true);
        svtitle(<div className="spinner-border text-info" role="status">
                    <center>
                        <span className="sr-only">Loading...</span>
                    </center>
                </div>)
        if(email===""){
            svtitle("Send Verification Code")
            return swal("email required.");
        }

        const otptype='signup';
        let item = {email,otptype};
        let result= await fetch("http://"+local_host+"/api/auth/send_otp",{
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

    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
     charactersLength));
       }
       return result;
    }

    function dateandtime(){
        const d = new Date();
        let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
        let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
        let a = new Intl.DateTimeFormat('en', { hour: '2-digit',hour12: false }).format(d);
        let b = new Intl.DateTimeFormat('en', { minute: '2-digit',hour12: false }).format(d);
        let c = new Intl.DateTimeFormat('en', { second: '2-digit',hour12: false }).format(d);
        return(ye+''+mo+''+da+''+a+b+''+c);
    }

    function srcToFile(src, fileName, mimeType){
        return (fetch(src)
            .then(function(res){
                return ( res.arrayBuffer());
            }).then(function(buf){
                return ( new File([buf], fileName, {type:mimeType}));

            })
        );
    }

    const btn_submit = (e) =>{
        e.preventDefault();
        if(fullname===""){
            return swal('Fullname required.');
        }else if(email===""){
            return swal('Email required.');
        }else if(password===""){
            return swal('Password required.');
        }else if(retypepassword===""){
            return swal('Retype Password required.');
        }else if(designation===""){
            return swal('Designation required.');
        }else if(otp===""){
            return swal('Verification Code required.');
        }else if(designation==="System Engineer" && se_unit===""){
            return swal('Team unit required.');
        }else if(designation==="System Engineer" && se_unit===""){
            return swal('Team unit required.');
        }else if(designation==="Creator" && s_unit===""){
            return swal('Sales team required.');
        }else if(password!==retypepassword){
            return swal('password confirmation does not match');
        }else if(password.length<6){
            return swal('password,password must be 6 characters long including at least one number one character and one number.');
        }else if(containsSpecialnumbers(password)===false){
            return swal('password,password must be 6 characters long including at least one number one character and one number.');
        }else if(containsSpecialCharspassword(password)===false){
            return swal('password,password must be 6 characters long including at least one number one character and one number.');
        }

        const PP = profilePictureRef.current;
        const imageAsDataURL = PP.getImageAsDataUrl();
        var mid=makeid(10);
        var dt=dateandtime();
        var file_n=mid+''+dt+'.png';

        if(PP.state.status==="EMPTY"){
            swal("Upload image required !");
        }else if(PP.state.status==="LOADED"){
            if(PP.state.file.name.split('.').pop()==="jpeg" || PP.state.file.name.split('.').pop()==="jpg" || PP.state.file.name.split('.').pop()==="png" || PP.state.file.name.split('.').pop()==="PNG" || PP.state.file.name.split('.').pop()==="JPG" || PP.state.file.name.split('.').pop()==="JPEG"){
                srcToFile(imageAsDataURL, file_n, "image/png").then(img => {
                    signup(img);
                });
            }else{
                swal("File must be jpeg/png");
            }
        }
    }

    const signup = async(img) =>{
        sdis_submit(true);
        const formdata=new FormData();
        formdata.append('upload_image',img);
        formdata.append('fullname',fullname);
        formdata.append('email',email);        
        formdata.append('password',password);   
        formdata.append('designation',designation); 
        formdata.append('se_unit',se_unit);
        formdata.append('s_unit',s_unit);
        formdata.append('otp',otp);

        let result = await fetch("http://"+local_host+"/api/auth/register",{
            method:'POST',
            body:formdata
        });

        result= await result.json();
        if(result.notification===1){
            swal('SUCCESS',result.message,'success');
            navigate('../login');
        }else if(result.notification===2){
            swal('FAILED',result.message,'error');
        }
        sdis_submit(false);
    }

    return(
        <>
        <main className="main-content  mt-0">
            <section className="min-vh-100 mb-8">
                <div className="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg signup_background">
                    {/* <span className="mask bg-gradient-dark opacity-6"></span> */}
                    <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-5 text-center mx-auto">
                        <h1 className="text-white mb-2 mt-5">Welcome!</h1>
                        <p className="text-lead text-white">Please fill the form below to create an account.</p>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row mt-lg-n10 mt-md-n11 mt-n10">
                    <div className="col-xl-4 col-lg-5 col-md-7 mx-auto">
                        <div className="card z-index-0">
                        <div className="card-header text-center pt-4">
                            <h5>CREATE ACCOUNT</h5>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <input type="text" value={fullname} onChange={fullname1} className="form-control" placeholder="Enter Fullname"/>
                            </div>
                            <div className="mb-3">
                                <input disabled={dis_email} value={email} onChange={email1} type="email" className="form-control" placeholder='Enter Email' />
                            </div>
                            <div className="mb-3">
                                <input value={password} onChange={password1} type="password" className="form-control" placeholder='Enter Password' />
                            </div>
                            {showstrong}
                            <div className="mb-3">
                                <input value={retypepassword} onChange={retypepassword1} type="password" className="form-control" placeholder='Enter Retype Password' />
                            </div>
                            <div className="mb-3">
                                <select value={designation} onChange={designation1} className="form-control">
                                    <option value="">-Select Designation</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Creator">Creator</option>
                                    <option value="Delegator">Delegator</option>
                                    <option value="System Engineer">System Engineer</option>
                                </select>
                            </div>

                            {
                                designation==='System Engineer' ?
                                <div className="mb-3">
                                    <select value={se_unit} onChange={(e)=>sse_unit(e.target.value)} className="form-control">
                                        <option value="">-Select Team</option>
                                        <option value="PRE-SALE">PRE-SALE</option>
                                        <option value="POST-SALE">POST-SALE</option>
                                    </select>
                                </div>
                                :
                                designation==='Creator' &&
                                <div className="mb-3">
                                    <select value={s_unit} onChange={(e)=>ss_unit(e.target.value)} className="form-control">
                                        <option value="">-Select Team</option>
                                        <option value="PRE-SALE">PRE-SALE</option>
                                        <option value="SALE">SALE</option>
                                        <option value="POST-SALE">POST-SALE</option>
                                    </select>
                                </div>                                
                            }
                            
                            <div className="mb-3">
                                <div className="input-group input-group-outline mb-3">
                                    <input onChange={(e)=>sotp(e.target.value)} type="number" className="form-control" placeholder='Enter Verification Code' />
                                </div>
                            </div>
                            {v_notification}
                            <label style={{cursor:'pointer'}} disabled={dis_submit} onClick={btn_send} className="text-info text-gradient font-weight-bold d-flex flex-row-reverse bd-highlight">{vtitle}</label>
                            <div className="mb-3">
                                <label>Upload Profile Picture</label>
                                <ProfilePicture
                                    ref={profilePictureRef}
                                    useHelper={true}
                                    debug={true}
                                    frameFormat="box"
                                />
                            </div>
                            <div className="text-center">
                                <button disabled={dis_submit} onClick={btn_submit} type="button" className="btn bg-gradient-dark w-100 my-4 mb-2">Sign up</button>
                            </div>
                            <p className="text-sm mt-3 mb-0">Already have an account? <Link to="../login" className="text-dark font-weight-bolder">Sign in</Link></p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
        </>
    )
}

export default Signup;