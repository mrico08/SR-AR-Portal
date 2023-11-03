import {useState,useContext} from 'react';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';
import Footer from '../portal_body/footer';
import LocalHost from "../portal/context";

function Login(){
    const local_host = useContext(LocalHost);
    const [username,susername] = useState("");
    const [password,spassword] = useState("");
    const [btn_dis,sbtn_dis] = useState(false);

    const btn_submit = (e) =>{
        e.preventDefault();
        sbtn_dis(true);
        if(username===""){
            sbtn_dis(false);
            return swal("Email required.");
        }else if(password===""){
            sbtn_dis(false);
            return swal("Password required.");
        }

        login_confirmation(username,password);
    }

    function containsSpecialChars(str) {
        const specialChars = /[`'" ]/;
        return specialChars.test(str);
    }

    const regex = /[`'" ]/;
    const susername1 = (e) =>{
        if(containsSpecialChars(e.target.value)){
            //eslint-disable-next-line
            swal("'\ and \"\ is not allowed.");
            susername(e.target.value.replace(regex, ''));
        }else{
            susername(e.target.value);
        }
    }

    const spassword1 = (e) =>{
        if(containsSpecialChars(e.target.value)){
            //eslint-disable-next-line
            swal("'\ and \"\ is not allowed.");
            spassword(e.target.value.replace(regex, ''));
        }else{
            spassword(e.target.value);
        }
    }

    const login_confirmation = async (username,password) =>{
        let item={username,password};
        let result= await fetch("http://"+local_host+"/api/auth/login",{
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
            swal("Success!", "Welcome to Portal", "success");
            localStorage.setItem("credential1",JSON.stringify([result.access_token,result.user]));
            window.location.href="";
        }else if(result.notification===2){
            swal('Failed',result.message,'error');
        }
        sbtn_dis(false);
    }

    return(
        <>
        <main className="main-content  mt-0">
            <section>
                <div className="page-header min-vh-75">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                                <div className="card card-plain mt-8">
                                    <div className="card-header pb-0 text-left bg-transparent">
                                        <h3 className="font-weight-bolder text-info text-gradient">SIGN-IN</h3>
                                        <p className="mb-0">Enter your email and password to sign in</p>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={btn_submit}>
                                            <label>Email</label>
                                            <div className="mb-3">
                                                <input type="text" value={username} onChange={susername1} className="form-control" placeholder='Enter your Email' required/>
                                            </div>
                                            <label>Password</label>
                                            <div className="mb-3">
                                                <input type="password" value={password} onChange={spassword1} className="form-control" placeholder="Enter your Password" required/>
                                            </div>
                                            <div className="text-center">
                                                <button disabled={btn_dis} type="submit" className="btn bg-gradient-info w-100 mt-4 mb-0">Sign in</button>
                                            </div>
                                            <div className="d-flex flex-row-reverse bd-highlight">
                                                <Link to="../forgotpassword">
                                                    <span className="text-info text-gradient font-weight-bold " style={{fontSize: '13px', cursor: 'pointer', marginTop: '5px'}}>&nbsp;Forgot your Password ?</span>
                                                </Link>
                                            </div>

                                        </form>
                                    </div>
                                    <div className="card-footer text-center pt-0 px-lg-2 px-1">
                                        <p className="mb-4 text-sm mx-auto">
                                            Don't have an account?
                                            <Link to="../signup" className="text-info text-gradient font-weight-bold">Sign up</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="oblique position-absolute top-0 h-100 d-md-block d-none me-n8">
                                    <div className="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6 login_background"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        <Footer />
        </>
    )
}

export default Login;