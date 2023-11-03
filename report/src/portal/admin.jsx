import { useEffect,useContext } from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Protected from './protected';
import SocketContext from "../portal/socket";
import Nomatch from './nomatch';
import Adminhome from '../role/admin/home';

import Useradmin from '../role/admin/useradministration';
import Categoryadmin from '../role/admin/category';
import Adminsearch from '../role/admin/searchreport';
import Profile from '../role/modules/profile';
 
function Adminportal(){
    const socket = useContext(SocketContext);
    const credential = JSON.parse(localStorage.getItem('credential1'))[1];
    const page_access = credential.user_access;
    const uid = credential.id;

    useEffect(()=>{
        socket.emit("joinuserid",uid);
    },[])

    const COMPONENT_MAP = {
        'Adminhome':Adminhome,
        'Useradmin':Useradmin,
        'Categoryadmin':Categoryadmin,
        'Adminsearch':Adminsearch,
    }

    const menu = (data) =>{
        return(
            Object.keys(data).map(key => (
                data[key].map((item,i)=>
                    <Route key={i} path={"admin/"+item.page} element={<Protected  Cmp={COMPONENT_MAP[item.name]} />} />
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

export default Adminportal;