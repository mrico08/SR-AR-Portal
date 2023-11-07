import {useRef,useState,useEffect,useContext} from 'react';
import Search from './search';
import Recordlist from './recordlist';
import Reportmodal from '../../../ucomponent/create_report/reportmodal';
import LocalHost from '../../../portal/context';
import SocketContext from '../../../portal/socket';
 

function Report(){
    const socket = useContext(SocketContext);
    const local_host = useContext(LocalHost);
    const credential = JSON.parse(localStorage.getItem('credential1'));
    const jwttoken=credential[0];
    const userinfo = credential[1];
    const email = userinfo.email;

    const childRef = useRef(null);    
    const open_modal = () =>{
        if(childRef.current){
            childRef.current.openmodal();
        }
    }

    const search = (sr_no,from,to,category) =>{
        reportdisplay(sr_no,from,to,category);
    }

    const [data,sdata] = useState([]);
    const [htitle,shtitle] = useState("");
    const reportdisplay = async (sr_no,from,to,category) =>{
        const status = 0;
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
        socket.on('auto_reflect',()=>{
            reportdisplay('','','');
        });
        
        return(()=>{
            socket.off('auto_reflect',()=>{
                reportdisplay('','','');
            });
        })
    },[socket])

    useEffect(()=>{
        reportdisplay('','','');
    },[])
    
    return(
        <div className="container-fluid py-4">
            <Search open_modal = {open_modal} search={search} title="New" />
            <Recordlist reportdisplay={reportdisplay} item={data} htitle={htitle} />
            <Reportmodal ref={childRef} reportdisplay={reportdisplay} />
        </div>
    )
}

export default Report;