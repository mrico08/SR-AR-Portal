import {useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Theme, { theme1 } from "./datatable_context";
import SocketContext, { socket } from "./socket";

function Protected({Cmp}){
    const [credential,scredential] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        if(!localStorage.getItem('credential1')){
            navigate("../login");
            scredential(JSON.parse(localStorage.getItem('credential1'))[1]);
        }
    },[])
    
    let Cmp1 = Cmp;
    return(
        <div>
            <SocketContext.Provider value={socket}>
                <Theme.Provider value={theme1}>
                    <Cmp1 />
                </Theme.Provider>
            </SocketContext.Provider>
        </div>
    )
}

export default Protected;