import React, {useEffect, useContext, useState, useRef} from "react";
import LocalHost from "../../../portal/context";
import Verify from "./verify";
import { Link } from 'react-router-dom';
import Profile from "./profile";


function UserList(){
    const local_host = useContext(LocalHost);
    const credential = JSON.parse(localStorage.getItem('credential1'));
    const jwttoken=credential[0];

    const modalRef = useRef();
    const profileRef = useRef();
    const [data,setData]=useState([]);
    const [name, setName]=useState("");
    const [status, setStatus]=useState('0');


    //empty output
    const getData = async(value,status1) =>{
        let item = {value, status1};
        let result = await fetch('http://'+local_host+'/api/auth/userlist',{
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
        setData(result)
    }



    const search = (e)=>{
        getData(e.target.value, status);
    }
    
    async function handleAction (action, id){
        if(action === 'Verify' || action === 'Deactivate'){
            if(modalRef.current){
                modalRef.current.openmodal(action, id);
            }
        }
        else if (action === 'Profile Information'){
            if(profileRef.current){
                profileRef.current.openmodal(id);
            }
        }
    }


    const [verifyTitle, setVerify]=useState("For Verification")

    const handleVerifychange = (value) => {
        setStatus(value);

        if (value === '0'){
            setVerify("For Verification")
        } else if (value === '1'){
            setVerify("Verified")
        } else if (value === '2'){
            setVerify("Terminated")
        }
        getData('',value);
    }

    useEffect(()=>{
        getData(name, status);
    },[])

    return (
        <div className="card mt-3 mx-3">
            <div className="card-header pb-0">
                <div className="row">
                    <div className="col-lg-6 col-7">
                        <h6>{verifyTitle}</h6>
                    </div>

                    <div className="col-lg-6 col-5 my-auto text-end">
                        <div className="dropdown float-lg-end pe-4">
                            <a className="cursor-pointer" id="dropdownTable" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa fa-ellipsis-v text-secondary"></i>
                            </a>

                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li onClick={()=>handleVerifychange('0')}><Link className="dropdown-item">For Verification</Link></li>
                                    <li onClick={()=>handleVerifychange('1')}><Link className="dropdown-item">Verified</Link></li>
                                    <li onClick={()=>handleVerifychange('2')}><Link className="dropdown-item">Terminated</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card-body p-3">
            <   div className="row mb-3">
                    <div className="col-md-4 ms-1">
                        <div className="input-group" style={{zIndex:0}}>
                            <span className="input-group-text text-body" ><i className="fas fa-search" aria-hidden="true"></i></span>
                            <input className="form-control" onChange={search} placeholder="Search" type="text"/>
                        </div>
                    </div>
                </div>
                
                <div className="table-responsive">
                    <table className="table align-items-center mb-0">
                        <thead>
                            <tr>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Action</th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Name</th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Email</th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Role</th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Date Created</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                data.map((item,i)=>
                                    <tr key={i}>
                                        <td>
                                            <div className="d-flex px-2 py-1">
                                                <div>
                                                    <div className="dropdown">
                                                        <button className="btn bg-gradient-info dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                            Action
                                                        </button>
                                                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{zIndex:2}}>
                                                                {
                                                                    status === '0' ?
                                                                    <li onClick={()=>handleAction('Verify', item.id)}><Link className="dropdown-item">Activate</Link></li>
                                                                    :
                                                                    status === '1' ?
                                                                    <>
                                                                    <li onClick={()=>handleAction('Deactivate', item.id)}><Link className="dropdown-item">Deactivate</Link></li>
                                                                    <li onClick={()=>handleAction('Profile Information', item.id)}><Link className="dropdown-item">Profile Information</Link></li>
                                                                    </>
                                                                    :
                                                                    status === '2' &&
                                                                    <li onClick={()=>handleAction('Verify', item.id)}><Link className="dropdown-item">Re-activate</Link></li>
                                                                }
                                                            </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    
                                        <td>
                                            <div className="d-flex flex-column justify-content-center">
                                                <h6 className="mb-0 text-xs">{item.name}</h6>
                                            </div>
                                        </td>

                                        <td>
                                            <div className="d-flex flex-column justify-content-center">
                                                <h6 className="mb-0 text-xs">{item.email}</h6>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex flex-column justify-content-center">
                                                <h6 className="mb-0 text-xs">{item.role}</h6>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex flex-column justify-content-center">
                                                <h6 className="mb-0 text-xs">{item.created_at}</h6>
                                            </div>
                                        </td>
                            
                                    </tr>
                                    )

                            }
                        </tbody>
                    </table>
                </div>
            </div> 

            <Verify ref={modalRef} handleVerifychange={handleVerifychange} />
            <Profile ref={profileRef}/>
            
        </div>
    )
}

export default UserList;