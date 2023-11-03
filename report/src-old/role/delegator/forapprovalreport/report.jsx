import {useRef,useState,useEffect,useContext} from 'react';
import Search from '../componentfordelegator/search';
import Recordlist from './recordlist';
import LocalHost from '../../../portal/context';
import SocketContext from '../../../portal/socket';

function Report(){
    const socket = useContext(SocketContext);
    const local_host = useContext(LocalHost);
    const credential = JSON.parse(localStorage.getItem('credential1'));
    const jwttoken=credential[0];

    const childRef = useRef(null);    
 
    // const [sr_no,ssrno] = useState("");
    // const [from,sfrom] = useState("");
    // const [to,sto] = useState("");
    // const [reporttype,sreporttype] = useState(0);

    const search = (sr_no,from,to,reporttype,category) =>{
        reportdisplay(sr_no,from,to,reporttype,category);
        // if(refreshRef.current){
        //     refreshRef.current.datechange(from,to);
        // }
    }

    const [data,sdata] = useState([]);
    const [reporttype1,sreporttype1] = useState(0);
    const [htitle,shtitle] = useState("");
    const reportdisplay = async (sr_no,from,to,reporttype,category) =>{
        let status =1;
        let item = {sr_no,from,to,reporttype,category,status};
        let result = await fetch('http://'+local_host+'/api/auth/g_report',{
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

        sreporttype1(reporttype);
        sdata(result[0]);
        shtitle(result[1]);
    }

    useEffect(()=>{
        reportdisplay('','','',0,0);
    },[])
    
    useEffect(()=>{
        socket.on('auto_reflect',()=>{
            reportdisplay('','','',0,0);
        });
        
        return(()=>{
            socket.off('auto_reflect',()=>{
                reportdisplay('','','',0,0);
            });
        })
    },[socket])

    return(
        <div className="container-fluid py-4">
            <Search search={search}  title="For approval" />
            <Recordlist item={data} reporttype={reporttype1} htitle={htitle} reportdisplay={reportdisplay} />
        </div>
    )
}

export default Report;