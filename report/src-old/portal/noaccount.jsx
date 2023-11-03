import React from "react";
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Login from '../login/login';
import Signup from '../login/signup';
import Nomatch from './nomatch';
import Forgotpassword from "../login/forgotpassword";

function Noaccount(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgotpassword" element={<Forgotpassword  />} />
                <Route path="*" element={<Nomatch />}/>
            </Routes>
        </BrowserRouter>
    )    
}

export default Noaccount;