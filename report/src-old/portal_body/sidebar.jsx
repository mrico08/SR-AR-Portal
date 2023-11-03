import { useState,useEffect,forwardRef, useImperativeHandle, Fragment } from 'react';
import {Link} from 'react-router-dom';

function Sidebar({sort_no}){
    const [sidebar,ssidebar] = useState([]);
    
    const [designation1,sdesignation1] = useState("");
    const [segment,ssegment] = useState("");
    useEffect(()=>{
        if(localStorage.getItem('credential1')){
            const credential=JSON.parse(localStorage.getItem('credential1'))[1];
            ssidebar(credential.user_access);

            const str = window.location.pathname;
            const split = str.split('/')
            sdesignation1(split[1]);
            ssegment(split[2]);
        }
    },[])


    const roleaccess = (a,b,i) =>{
        let keynum = 1;
        let designation;
        if(a==="Creator"){
            designation = "creator";
        }else if(a==="Delegator"){
            designation = "delegator";
        }else if(a==="System Engineer"){
            designation = "se";
        }else if(a==="Admin"){
            designation = "admin";
        }

        
        return(
            <Fragment key={i}>
            <li className="nav-item mt-3">
                <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">{a}</h6>
            </li>
            {
                Object.entries(b).map(([key, value], index) =>
                    (designation1===designation && segment===value[0].page) ?
                        <li className="nav-item item" key={keynum++}>
                            <Link className="nav-link active" to={"../"+designation+"/"+value[0].page} style={{cursor:'pointer'}}>
                                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i className={"fa fa-"+value[0].Icon+" fa-lg"} style={{fontSize:'14px'}}></i>
                                </div>
                                <span className="nav-link-text ms-1"><b>{key}</b></span>
                            </Link>
                        </li>
                    :
                        <li className="nav-item item" key={keynum++}>
                            <Link className="nav-link" to={"../"+designation+"/"+value[0].page} style={{cursor:'pointer'}}>
                                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i className={"fa fa-"+value[0].Icon+" fa-lg"} style={{color:'#111',fontSize:'14px'}}></i>
                                </div>
                                <span className="nav-link-text ms-1"><b>{key}</b></span>
                            </Link>
                        </li>

                )
            }
            </Fragment>
        )
    }

    return(
        <aside style={{zIndex:'0'}} className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 " id="sidenav-main">
            <div className="sidenav-header">
                <i className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
                <Link className="navbar-brand m-0" 
                    // to={"../"+pages+"/home"}
                    to=""
                >
                    <img src="../images/meclogoblue.png" className="navbar-brand-img h-100" alt="main_logo" />
                    <span className="ms-1 font-weight-bold">SR /AR Portal</span>
                </Link>
            </div>            
            <hr className="horizontal dark mt-0" />
            <div className="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
                <ul className="navbar-nav">
                    {
                        Object.entries(sidebar).map(([key, value], index) =>

                            roleaccess(key,value,index)
                        )
                    }
                </ul>
            </div>
        </aside>

    )
}

export default Sidebar;