import { useEffect,useContext } from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Protected from './protected';
import SocketContext from "../portal/socket";
import Nomatch from './nomatch';

import Delegatorhome from '../role/delegator/home';
import DelegatorCreatereport from '../role/delegator/createreport';
import DelegatorForapprovalreport from '../role/delegator/forapprovalreport';
import DelegatorForrevisionreport from '../role/delegator/forrevisionreport';
import DelegatorApprovedreport from '../role/delegator/approvedreport';
import DelegatorCancelledreport from '../role/delegator/cancelledreport';

import Profile from '../role/modules/profile';

function Delegatorportal(){
    const socket = useContext(SocketContext);
    const credential = JSON.parse(localStorage.getItem('credential1'))[1];
    const page_access = credential.user_access;
    const uid = credential.id;

    useEffect(()=>{
        socket.emit("joinuserid",uid);
    },[])

    const menu = (data) =>{
        return(
            Object.keys(data).map(key => (
                data[key].map((item,i)=>
                    <Route key={i} path={"delegator/"+item.page} element={<Protected  Cmp={COMPONENT_MAP[item.name]} />} />
                )
            ))
        )
    }

    const COMPONENT_MAP = {
        'Delegatorhome':Delegatorhome,
        'DelegatorCreatereport':DelegatorCreatereport,
        'DelegatorForapprovalreport': DelegatorForapprovalreport,
        'DelegatorForrevisionreport': DelegatorForrevisionreport,
        'DelegatorApprovedreport':DelegatorApprovedreport,
        'DelegatorCancelledreport': DelegatorCancelledreport,
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

export default Delegatorportal;