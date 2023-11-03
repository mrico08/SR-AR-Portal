import {useRef,useState,useEffect,useContext} from 'react';
import Search from '../componentforse/search';
import Recordlist from './recordlist';
import SocketContext from '../../../portal/socket';
import LocalHost from '../../../portal/context';


function Report(){
    const socket = useContext(SocketContext);
    const local_host = useContext(LocalHost);
    const credential = JSON.parse(localStorage.getItem('credential1'));
    const jwttoken=credential[0];
    const userinfo = credential[1];
    const email = userinfo.email;

    const refreshRef = useRef(null);
    const refresh = () =>{
        if(refreshRef.current){
            refreshRef.current.proposaldisplay();
        }
    }

    const search = (sr_no,from,to,category) =>{
        reportdisplay(sr_no,from,to,category);
    }

    const [data,sdata] = useState([]);
    const [htitle,shtitle] = useState("");
    const reportdisplay = async (sr_no,from,to,category) =>{
        const status = 1;
        let item = {email,sr_no,from,to,status,category};
        let result = await fetch('http://'+local_host+'/api/auth/creatorg_report',{
            method: 'POST',
            body:JSON.stringify(item),
            headers:{
                "Content-Type":'application/json',
                "Accept":'application/json',
                'Authorization': "Bearer " + jwttoken,
                'X-Requested-With':'XMLHttpRequest',
            }
        });
        
        result= await result.json();
        sdata(result[0]);
        shtitle(result[1]);
    
    }

    useEffect(()=>{
        reportdisplay('','','');
    },[])

    useEffect(()=>{
        socket.on('auto_reflect',()=>{
            reportdisplay('','','');
        });
        
        return(()=>{
            socket.off('auto_reflect',()=>{
                reportdisplay('','','');
            });
        })
    },[socket])


    return(
        <div className="container-fluid py-4">
                <Search search={search} title="For Approval" />
                <Recordlist reportdisplay={reportdisplay} item={data} htitle={htitle}/>
        </div>
    )

}

export default Report;