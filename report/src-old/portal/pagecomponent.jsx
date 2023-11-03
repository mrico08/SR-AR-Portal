import { useEffect,useContext } from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Protected from './protected';
import SocketContext from "../portal/socket";
import Nomatch from './nomatch';

// Creator
import Creatorhome from '../role/creator/home';
import Creatorcreatereport from '../role/creator/createreport';
import CreatorForapprovalreport from '../role/creator/forapprovalreport';
import CreatorForrevisionreport from '../role/creator/forrevisionreport';
import Creatorapprovedreport from '../role/creator/approvedreport';
import Creatorcancelledreport from '../role/creator/cancelledreport';

// delegator
import Delegatorhome from '../role/delegator/home';
import DelegatorCreatereport from '../role/delegator/createreport';
import DelegatorForapprovalreport from '../role/delegator/forapprovalreport';
import DelegatorForrevisionreport from '../role/delegator/forrevisionreport';
import DelegatorApprovedreport from '../role/delegator/approvedreport';
import DelegatorCancelledreport from '../role/delegator/cancelledreport';

// System Engineer
import Sehome from '../role/se/home';
import Secreatereport from '../role/se/createreport';
import SeForapprovalreport from '../role/se/forapprovalreport';
import SeForrevisionreport from '../role/se/forrevisionreport';
import Seapprovedreport from '../role/se/approvedreport';
import Secancelledreport from '../role/se/cancelledreport';

// Admin
import Useradmin from '../role/admin/useradministration';
import Categoryadmin from '../role/admin/category';
import Adminsearch from '../role/admin/searchreport';
import AdminApprovedreport from '../role/admin/adminapprovedreport';

import Profile from '../role/modules/profile';

function Pagecomponents(){
    const socket = useContext(SocketContext);
    const credential = JSON.parse(localStorage.getItem('credential1'))[1];
    const page_access = credential.user_access;
    const uid = credential.email;
    const role = credential.role;


    useEffect(()=>{
        const found = role.find((element) => element === "Delegator");
        if(found===undefined){
            socket.emit("joinuserid",uid);
        }else{
            socket.emit("joinuserid",'delegator');
        }
    },[])

    const menu = (data,key1) =>{
        let designation="";
        if(key1==="Creator"){
            designation="creator";
        }else if(key1==="Delegator"){
            designation="delegator";
        }else if(key1==="System Engineer"){
            designation="se";
        }else if(key1==="Admin"){
            designation="admin";
        }

        return(
            Object.keys(data).map(key => (
                data[key].map((item,i)=>
                    <Route key={i} path={designation+"/"+item.page} element={<Protected  Cmp={COMPONENT_MAP[item.name]} />} />
                )
            ))
        )
    }

    const COMPONENT_MAP = {
        // for creator
        'Creatorhome':Creatorhome,
        'Creatorcreatereport':Creatorcreatereport,
        'CreatorForapprovalreport':CreatorForapprovalreport,
        'CreatorForrevisionreport':CreatorForrevisionreport,
        'Creatorapprovedreport':Creatorapprovedreport,
        'Creatorcancelledreport':Creatorcancelledreport,

        //for se
        'Sehome':Sehome,
        'Secreatereport':Secreatereport,
        'SeForapprovalreport': SeForapprovalreport,
        'SeForrevisionreport': SeForrevisionreport,
        'Seapprovedreport' : Seapprovedreport,
        'Secancelledreport' : Secancelledreport,

        // for delegators
        'Delegatorhome':Delegatorhome,
        'DelegatorCreatereport':DelegatorCreatereport,
        'DelegatorForapprovalreport': DelegatorForapprovalreport,
        'DelegatorForrevisionreport': DelegatorForrevisionreport,
        'DelegatorApprovedreport':DelegatorApprovedreport,
        'DelegatorCancelledreport': DelegatorCancelledreport,

        // for admin
        'Useradmin':Useradmin,
        'Categoryadmin':Categoryadmin,
        'Adminsearch':Adminsearch,
        'AdminApprovedreport':AdminApprovedreport
    }

    return(
        <BrowserRouter>
            <Routes>
                {
                    Object.keys(page_access).map(key => (
                        menu(page_access[key],key)
                    ))
                }                
                <Route path="page/profile" element={<Profile />}/>                
                <Route path="*" element={<Nomatch />}/>
            </Routes>
        </BrowserRouter>
    )


}

export default Pagecomponents;