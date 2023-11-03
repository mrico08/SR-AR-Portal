import React, {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import Usernameform from './forgetpassword_component/username_form'
import Changepassword from './forgetpassword_component/changepassword';


function Forgotpassword(){
    const [c_form,setc_form]=useState(false);
    const [h_username,seth_username]=useState("");

    return(
        <main className="main-content  mt-0">
            <div className="page-header min-vh-100">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                        <center>
                            <img style={{marginBottom:'20px',maxWidth:'80%'}} src="mec.png" className="navbar-brand-img responsive" alt="main_logo" />
                        </center>
                            {
                                c_form===false ?
                                    <Usernameform seth_username={seth_username} setc_form={setc_form} />
                                :
                                    <Changepassword email={h_username} />
                            }

                            <center style={{marginTop:'20px'}}>
                                <Link to="../login">
                                  <span style={{cursor:"pointer",marginTop:"5px"}} className="text-info text-gradient font-weight-bold "><i className="fa fa-arrow-left"></i>&nbsp;Back to Login</span>
                                </Link>
                            </center>
                        </div>
                        <div className="col-md-3"></div>                        
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Forgotpassword;