import {useEffect} from 'react';
import './App.css';
import LocalHost, { local_host } from "./portal/context";
import Noaccount from './portal/noaccount';
import Adminportal from './portal/admin';
import Seportal from './portal/se';
import Delegatorportal from './portal/delegator';

import Pagecomponents from './portal/pagecomponent';



function App() {
    const credential = JSON.parse(localStorage.getItem('credential1'));
    return (
        <LocalHost.Provider value={local_host}>
            {
                credential!==null ?
                <>
                {
                    <Pagecomponents />
                }
                </>
                :
                    <Noaccount />
            }
        </LocalHost.Provider>
    );
}

export default App;
