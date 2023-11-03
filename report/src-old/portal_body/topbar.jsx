import {useEffect,useContext,useState,useRef} from 'react';
import {Link} from 'react-router-dom';
import LocalHost from '../portal/context';
import Resside from './responsive_sidebar';

function Topbar(){
    const sideRef = useRef(null);
    const local_host = useContext(LocalHost);
    const credential = JSON.parse(localStorage.getItem('credential1'));
    
    const [name,sname] = useState("");
    const [profile,sprofile] = useState("");
    useEffect(()=>{
        if(credential){
            sname(credential[1].name);
            sprofile(credential[1].profile)
        }
    },[])

    const btn_logout = () =>{
        localStorage.clear();
        window.location.href="../login";        
    }

    const btn_sidebar = () =>{
        if(sideRef.current){
            sideRef.current.opensidebar();
        }
    }

    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-gradient-dark z-index-3 py-3">
            <div className="container">
                <Link className="navbar-brand text-white" data-placement="bottom" target="_blank"></Link>
                <div className="profile_header" id="navigation">
                    <ul className="navbar-nav navbar-nav-hover ms-auto">
                        <div style={{display:"none"}} className="nav-item d-flex align-items-center dropdown">
                            <div>
                                {
                                    profile &&
                                    <img src={"http://"+local_host+"/profile_picture/"+profile} className="avatar avatar-sm  me-3 " />
                                }
                            </div>
                            <Link className="d-flex flex-column justify-content-center" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                <h6 className="mb-0 text-sm text-white">{name}</h6>
                            </Link>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink">
                                <li>
                                    <Link className="d-flex py-1 dropdown-item" to="../page/profile">
                                        <div className="my-auto">
                                            <img  src="../images/user.png" className="avatar avatar-sm  me-3 " />
                                        </div>
                                        <div className="d-flex flex-column justify-content-center">
                                            <h6 className="text-sm font-weight-normal mb-1">
                                                <span className="font-weight-bold">Profile</span>
                                            </h6>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link className="d-flex py-1 dropdown-item" onClick={btn_logout}>
                                        <div className="my-auto">
                                            <img src="../images/logout2.png" className="avatar avatar-sm  me-3 " />
                                        </div>
                                        <div className="d-flex flex-column justify-content-center">
                                            <h6 className="text-sm font-weight-normal mb-1">
                                                <span className="font-weight-bold">Logout</span>
                                            </h6>
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </ul>
                </div>
                <div onClick={btn_sidebar} className="nav-item d-xl-none ps-3 d-flex align-items-center">
                    <Link className="nav-link text-body p-0" id="iconNavbarSidenav">
                        <div className="sidenav-toggler-inner">
                            <i className="sidenav-toggler-line"></i>
                            <i className="sidenav-toggler-line"></i>
                            <i className="sidenav-toggler-line"></i>
                        </div>
                    </Link>
                </div>
            </div>
        </nav>
        <Resside ref={sideRef}/>
        </>
    )
}

export default Topbar;