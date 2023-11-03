import { useEffect,useContext } from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Protected from './protected';
import SocketContext from "../portal/socket";
import Nomatch from './nomatch';

import Sehome from '../role/se/home';
import Secreatereport from '../role/se/createreport';
import SeForapprovalreport from '../role/se/forapprovalreport';
import SeForrevisionreport from '../role/se/forrevisionreport';
import Seapprovedreport from '../role/se/approvedreport';
import Secancelledreport from '../role/se/cancelledreport';

import Profile from '../role/modules/profile';

function Seportal(){
    const socket = useContext(SocketContext);
    const credential = JSON.parse(localStorage.getItem('credential1'))[1];
    const page_access = credential.user_access;
    const uid = credential.id;

    useEffect(()=>{
        socket.emit("joinuserid",uid);
    },[])

    const COMPONENT_MAP = {
        'Sehome':Sehome,
        'Secreatereport':Secreatereport,
        'SeForapprovalreport': SeForapprovalreport,
        'SeForrevisionreport': SeForrevisionreport,
        'Seapprovedreport' : Seapprovedreport,
        'Secancelledreport' : Secancelledreport
    }

    const menu = (data) =>{
        return(
            Object.keys(data).map(key => (
                data[key].map((item,i)=>
                    <Route key={i} path={"se/"+item.page} element={<Protected  Cmp={COMPONENT_MAP[item.name]} />} />
                )
            ))
        )
    }

    return(
        <BrowserRouter>
            <Routes>
                {
                    Object.keys(page_access).map(key => (
                        menu(page_access[key])
                    ))
                }

                <Route path="page/profile" element={<Profile />}/>
                <Route path="*" element={<Nomatch />}/>
            </Routes>
        </BrowserRouter>
    )

}

export default Seportal

