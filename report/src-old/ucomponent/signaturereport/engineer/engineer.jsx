import {useState,useEffect,useContext} from 'react';
import SignatureCanvas from 'react-signature-canvas'
import {Link} from 'react-router-dom';
import  swal from 'sweetalert';
import LocalHost from '../../../portal/context';
import Engineerinput,{Engineerprops,Engineersign} from './engineerinput';

function Engineer({rtype,sr_no,data,viewdetails,sseconfirmation}){
    const local_host = useContext(LocalHost);
    const credential = JSON.parse(localStorage.getItem('credential1'));
    const jwttoken=credential[0];
    const email=credential[1].email;
    
    const [sesign,ssesign] = useState(null);
    const [seinfo,sseinfo] = useState(null);
    useEffect(()=>{
        if(data){
            ssesign(JSON.parse(data.se_sign));
            sseinfo(JSON.parse(data.seinfo));
            if(!data.se_sign){
                sseconfirmation(true);
            }else{
                let confirmation = false;
                JSON.parse(data.assignse).forEach((item)=>{
                    if(JSON.parse(data.se_sign)[item]===undefined){
                        confirmation=true;
                    }
                })

                sseconfirmation(confirmation);
            }
        }
    },[data])


    const Selistsign = ({selist}) =>{
        if(sesign!==null){
            if(sesign[selist]!==undefined){
                return(
                    <Engineersign sename={sesign[selist][0]} sesign={sesign[selist][1]}/>
                )
            }else{
                return(
                    (selist===email) ?
                        <Engineerinput sename={seinfo[selist][1]} rtype={rtype} sr_no={sr_no} viewdetails={viewdetails} />
                    :
                        <Engineerprops />
                )
            }
        }else{            
            return(
                (selist===email && seinfo) ?
                    <Engineerinput sename={seinfo[selist][1]} rtype={rtype} sr_no={sr_no} viewdetails={viewdetails} />
                :
                (selist!==email && seinfo) &&
                    <Engineerprops sename={seinfo[selist][1]} />
            )
        }
    }

    return(
        data &&
            JSON.parse(data.assignse).map((item,i)=>
                <div key={i} className="card h-100 mt-4">
                    <div className="card-body">
                        <div className="fluid">
                            <div className="row">
                                <Selistsign selist={item}/>
                            </div>
                        </div>                    
                    </div>               
                </div>
            )
    )
        
}

export default Engineer;