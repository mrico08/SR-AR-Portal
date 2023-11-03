import { forwardRef, useImperativeHandle, useEffect,useState,useContext } from "react";
import LocalHost from "../portal/context";
import {Link} from 'react-router-dom';
import Sidebarbody from "./sidebarbody";


function Resside({},ref){
    const [a,seta]=useState(false);
    const local_host = useContext(LocalHost);
    const credential = JSON.parse(localStorage.getItem('credential1'));
    const profile=credential[1].profile;
    const name=credential[1].name;

    const opensidebar = () =>{
        if(a===false){
            document.getElementById("sidemodal2").style.display = "block";
            seta(true);
        }else{
            document.getElementById("sidemodal2").style.display = "none";
            seta(false);
        }
    }

    useImperativeHandle (ref, ()=>({opensidebar}));

    useEffect(() => {
        document.getElementById("sidemodal2").style.display = "none";
    }, []) 

    const closemodal = () =>{
        document.getElementById("sidemodal2").style.display = "none";
        seta(false);
    }

    const btn_logout = () =>{
        localStorage.clear();
        window.location.href="../login";
    }




    return(
        <div id="sidemodal2" className="card sidebarmodal" style={{paddingLeft:'20px',paddingTop:'10px',marginLeft:'10px'}}>
            <div className="sidebar121" >
                    <div className="p-2 w-100 bd-highlight sidebar_header1">
                        <Link to={"../sales/home"} style={{marginRight:'100px'}}> 
                            <img src="../../meclogoblue.png" className="sb_logo" alt="main_logo" />
                            <span  className="ms-1 font-weight-bold">MEC Networks</span>
                        </Link>                        
                    </div>
                    <div>
                        <Link style={{cursor:'pointer',marginTop:'30px'}} className="nav-link text-body font-weight-bold px-0 sidebar_header2" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                            <span className="d-sm-inline"><img src={"http://"+local_host+"/profile_picture/"+profile} className="avatar avatar-sm  me-3 " />{name}</span>
                            &nbsp;&nbsp;<i className="fa fa-angle-down"></i>                        
                        </Link>
                        <div className="collapse" id="collapseExample" style={{marginLeft:'50px'}}>
                            <div className="mb-2">   
                                <Link className="dropdown-item border-radius-md" to="../page/profile">
                                    <div className="d-flex py-1">
                                        <div className="my-auto">
                                            <i className="fa fa-user me-sm-1" style={{marginRight:"5px"}}></i>
                                        </div>
                                        <div className="d-flex flex-column justify-content-center">
                                            <h6 className="text-sm font-weight-normal mb-1" style={{cursor:"pointer",marginTop:"5px"}}>
                                                <span className="font-weight-bold">Profile</span>
                                            </h6>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="mb-2" onClick={btn_logout}>   
                                <a className="dropdown-item border-radius-md">
                                    <div className="d-flex py-1">
                                        <div className="my-auto">
                                            <i className="fa fa-arrow-left" style={{marginRight:"5px"}} />
                                        </div>
                                        <div className="d-flex flex-column justify-content-center">
                                            <h6 className="text-sm font-weight-normal mb-1" style={{cursor:"pointer",marginTop:"5px"}}>
                                                <span className="font-weight-bold">Logout</span>
                                            </h6>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div>
                        <i onClick={closemodal} className="fa fa-times icon_x" aria-hidden="true"></i>
                    </div>

                <hr className="horizontal dark mt-0 mt-4"></hr>
                <div style={{overflow:'auto',height:'630px'}} className="fluids">
                    <Sidebarbody a={a}/>
                </div>

            </div>
        </div>
    )
}

export default forwardRef(Resside)