import {useEffect,useState,Fragment} from 'react';
import {Link} from 'react-router-dom';

export default function Sidebarbody({a}){
    const [sidebar,ssidebar] = useState([]);
    const credential=JSON.parse(localStorage.getItem('credential1'))[1];
    
    const [designation1,sdesignation1] = useState("");
    const [segment,ssegment] = useState("");
    useEffect(()=>{
        if (a===true && localStorage.getItem('credential1'))
        ssidebar(credential.user_access);

        const str = window.location.pathname;
        const split = str.split('/')
        sdesignation1(split[1]);
        ssegment(split[2]);
    },[a])

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
            <Fragment key={i} >
                <h6 className=" ms-2 text-uppercase text-xs font-weight-bolder opacity-6">{a}</h6>
                {
                Object.entries(b).map(([key, value], index) =>
                    <Link key={key} className="nav-link" to={"../"+designation+"/"+value[0].page} style={{cursor:'pointer'}}>
                        {
                            (designation1===designation && segment===value[0].page) ?
                                <div className="side_list">
                                    <div className="icon_card">
                                        <center>
                                            <i style={{color:"#fff",paddingTop:'5px'}} className={"fa fa-"+value[0].Icon}></i>
                                        </center>
                                    </div>
                                    <span className="nav-link-text ms-1 mt-1 side_name"><b>{key}</b></span>
                                </div>
                            :
                                <div className="side_list">
                                    <div className="icon_card2">
                                        <center>
                                            <i style={{color:"##344767",paddingTop:'5px'}} className={"fa fa-"+value[0].Icon}></i>
                                        </center>
                                    </div>
                                    <span className="nav-link-text ms-1 mt-1 side_name"><b>{key}</b></span>
                                </div>
                        }
                        
                    </Link>
                )
                }
            </Fragment>
        )
    }

    return(
        <div className="modal_body">
                {
                    Object.entries(sidebar).map(([key, value], index) =>
                        roleaccess(key,value,index)
                    )
                }
        </div>
    )

}