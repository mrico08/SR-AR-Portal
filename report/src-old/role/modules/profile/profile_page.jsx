import React, {useEffect, useContext, useState, useRef} from "react";
import LocalHost from "../../../portal/context";
import ChangePassword from "./change_password";
import Changeprofile from "./changeprofile/changeprofile";

function Profile_Page() {
    const modalRef = useRef();
    const proRef = useRef();
    const local_host = useContext(LocalHost);
    const [credential,scredential] = useState(JSON.parse(localStorage.getItem('credential1')));
    const [jwttoken,sjwttoken] = useState("");
    const [user_info,suser_info] = useState("");
    const [proimage,sproimage] = useState("");
    const [designation,sdesignation] = useState([]);
    useEffect(()=>{
        if(credential.length>0){
            sjwttoken(credential[0]);
            suser_info(credential[1]);
            sproimage(credential[1].profile);
        }
    },[credential])

    const handleModal = (id) => {
        if (modalRef.current){
            modalRef.current.openmodal(id);
        }
    }

    const changeprofile = () =>{
        if (proRef.current){
            proRef.current.openmodal(user_info.id);
        }
    }

    return (
    <div className="container py-5">

        <div className="page-header min-height-100 border-radius-xl mt-1 mb-5">
            <img src="../images/mecbg.jpeg" alt="profile_image" className="w-100 border-radius-lg shadow-sm"/>
            <span></span>
        </div>

        <div className="row">
            <div className="col-lg-4">
                <div className="card mb-4 blur shadow-blur mx-4 mt-n9 overflow-hidden">
                    <div className="card-body text-center">
                        {
                            (proimage) &&
                            <img onClick={changeprofile} src={"http://"+local_host+"/profile_picture/"+proimage} alt="profile_image" className="rounded-circle img-fluid" style={{width: 150}}/>
                        }

                        <h5 className="my-2">{user_info.name}</h5>
                        <p className="text-muted mb-3">{
                            user_info &&
                            user_info.role.map((item)=>
                                <>{item}&nbsp;/</>
                            )
                        }</p>
                        <span className="d-flex justify-content-center">
                            <button type="button" className="btn bg-gradient-info mb-2"onClick={()=>handleModal(user_info.id)} >Change Password</button>
                        </span>
                    </div>
                </div>
            </div>

            <div className="col-lg-8">
                <div className="card mb-4 blur shadow-blur mx-4 mt-n2 overflow-hidden">
                    <div className="card-body">
                        <div class="table-responsive">
                            <table class="table align-items-center mb-0">                               
                                <tbody>
                                    <tr>
                                        <td width="30%">
                                            <span class="text-secondary text-md font-weight-bold">Fullname  :</span>
                                        </td>
                                        <td>
                                            <p class="text-md font-weight-bold mb-0">{user_info.name}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="30%">
                                            <span class="text-secondary text-md font-weight-bold">Email  :</span>
                                        </td>
                                        <td>
                                            <p class="text-md font-weight-bold mb-0">{user_info.email}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="30%">
                                            <span class="text-secondary text-md font-weight-bold">Designation  :</span>
                                        </td>
                                        <td>
                                            <p class="text-md font-weight-bold mb-0">{
                                                user_info &&
                                                user_info.role.map((item)=>
                                                    <>{item}&nbsp;/</>
                                                )
                                            }</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="30%">
                                            <span class="text-secondary text-md font-weight-bold">Date Created  :</span>
                                        </td>
                                        <td>
                                            <p class="text-md font-weight-bold mb-0">{user_info.created_at}</p>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>


                    </div>
                </div>
            </div>
        </div>

        <Changeprofile ref={proRef} scredential={scredential} />
        <ChangePassword ref={modalRef} />
    </div>
    )
}
export default Profile_Page;