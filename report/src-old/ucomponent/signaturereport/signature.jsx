import {useState,useImperativeHandle,forwardRef,useContext,useRef, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import LocalHost from '../../portal/context';
import swal from 'sweetalert';
import Client from './client/client';
import Engineer from './engineer/engineer';
import SocketContext from '../../portal/socket';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },    
    '& .MuiPaper-root':{
        borderRadius:'10px',
        backgroundColor:'#eeeff0', 
    }
}));

function Signature({reportdisplay,handleClose1},ref){
    const socket = useContext(SocketContext);
    const local_host = useContext(LocalHost);
    const credential = JSON.parse(localStorage.getItem('credential1'));
    const jwttoken=credential[0];
    const uinfo=credential[1];
    const email = uinfo.email;
    const name = uinfo.name;
    const profile = uinfo.profile;

    const handleClose = () => setOpen(false);
    const [open, setOpen] = useState(false);
    const [btn_dis,sbtn_dis] = useState(false);

    const [seconfirmation,sseconfirmation] = useState(false);
    const [clientconfirmation,sclientconfirmation] = useState(false);

    useEffect(()=>{
        if(seconfirmation===true || clientconfirmation===true){
            sbtn_dis(true);
        }else if(seconfirmation===false || clientconfirmation===false){
            sbtn_dis(false);
        }
    },[seconfirmation,clientconfirmation])

    
    const [sr_no,ssr_no] = useState("");
    const [rtype,srtype] = useState("");
    const openmodal = (srno,reporttype) =>{
        setOpen(true)
        ssr_no(srno);
        srtype(reporttype);
        viewdetails(srno,reporttype);
    }
    
    const [data,sdata] = useState(null);
    const viewdetails = async (value,rtype) =>{
        let item = {value,rtype};
        let result = await fetch('http://'+local_host+'/api/auth/v_details',{
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
        sdata(result);
    }    

    useImperativeHandle (ref, ()=>({openmodal}));

    const btn_submit = async () =>{
        sbtn_dis(true);
        let item = {sr_no,rtype,email,name,profile};
        let result = await fetch('http://'+local_host+'/api/auth/s_report',{
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

        if(result.notification===1){
            const uid=([...result.selist,'delegator'])
            socket.emit('refresh_action',{'uid':uid});
            swal('SUCCESS',result.message,'success');
        }else{
            swal('Failed',result.message,'error');
        }

        reportdisplay();
        handleClose();
        handleClose1();
        sbtn_dis(false);
    }

    return(
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"                   
            open={open}
            width="sm"
            fullWidth={true}
            maxWidth="sm"
        >
            <DialogTitle>SIGN WITH YOUR SIGNATURE</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
                }}
            >
                <i className="fa fa-times"></i>
            </IconButton>
            <DialogContent>
                <Engineer sr_no={sr_no} rtype={rtype} data={data} viewdetails={viewdetails} sseconfirmation={sseconfirmation} />
                <Client sr_no={sr_no} rtype={rtype} data={data} viewdetails={viewdetails} sclientconfirmation={sclientconfirmation}/>

                <div className="d-flex flex-row-reverse bd-highlight mt-3 mx-2">
                    <button disabled={btn_dis} onClick={btn_submit} className="btn bg-gradient-info">SUBMIT</button>
                </div>
            </DialogContent>
        </BootstrapDialog>
    )
}

export default forwardRef(Signature);