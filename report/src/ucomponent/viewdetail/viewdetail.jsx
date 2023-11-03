import {useEffect,useState,useImperativeHandle,forwardRef,useContext,useRef} from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import LocalHost from '../../portal/context';
import Srreport from './srreport';
import Arreport from './arreport';
import Signature from '../signaturereport/signature';
import Status from './status';

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

function Viewdetail({reportdisplay},ref){
    const modalRef= useRef();
    const local_host = useContext(LocalHost);
    const credential = JSON.parse(localStorage.getItem('credential1'));
    const jwttoken=credential[0];
    const email=credential[1].email;
    
    const handleClose = () => setOpen(false);
    const [open, setOpen] = useState(false);

    const [show1,sshow1] = useState(0);
    const openmodal = (value,rtype) =>{
        viewdetails(value,rtype);
        setOpen(true);
    }

    const [data,sdata] = useState("");
    const [srno,ssrno] = useState("");
    const [reporttype,sreporttype] = useState("");
    const [last_update,slast_update] = useState(null);
    const [status,sstatus] = useState(0);
    const [c_details,sc_details] = useState([]);

    const [su,ssu] = useState(false);
    const seupdate = (s_information,assignse) =>{
        let i = 0;
        JSON.parse(s_information).map((item)=>{
            if(item.timein!==null && item.timeout!==null){
                i++;                
            }
        })

        if(i===JSON.parse(assignse).length){
            ssu(true);
        }else{
            ssu(false);
        }
    }

    const viewdetails = async (value,rtype) =>{
        sreporttype(rtype);
        ssrno(value);
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
        slast_update(result.last_update);
        sstatus(result.status);
        sc_details(JSON.parse(result.c_details) || []);
        seupdate(result.s_information,result.assignse);

        const sample=JSON.parse(result.assignse).find(k => k==email);
        if(sample !==undefined){
            sshow1(1);
        }
    }

    
    useImperativeHandle (ref, ()=>({ openmodal }));

    const btn_sign = () =>{
        if(modalRef.current){
            modalRef.current.openmodal(srno,reporttype);
        }        
    }

    const [role,srole] = useState("");
    useEffect(()=>{
        const str = window.location.pathname;
        const split = str.split('/')
        srole(split[1]);
    },[])

    return(
        <>
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"                   
            open={open}
            width="lg"
            fullWidth={true}
            maxWidth="md"
        >
            <DialogTitle>
                {
                    reporttype ===1 ?
                    <>SERVICE REPORT DETAILS</>
                    :
                    reporttype ===2 &&
                    <>ACTIVITY REPORT DETAILS</>
                }
            </DialogTitle>
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
            <>
            {
                reporttype ===1 ?
                <div className="d-flex justify-content-center">
                    <h4><b>SR NO : SR-{srno}</b></h4>
                </div>
                :
                reporttype ===2 &&
                <div className="d-flex justify-content-center">
                    <h4><b>AR NO : AR-{srno}</b></h4>
                </div>
            }
            <Status status={status} reporttype={reporttype} srno={srno}/>
            <div className="card h-100 mb-3">
                <div className="card-body">
                    <div className="d-flex px-2 py-1">
                        {
                            c_details.length>0 &&
                            <>
                            <div>
                                <b className="me-2">Creator :</b>
                                <img src={"http://"+local_host+"/profile_picture/"+c_details[2]} className="avatar avatar-sm  me-3 " />
                            </div>
                            <div className="d-flex flex-column justify-content-center">
                                <h6 className="mb-0 text-sm">{c_details[1]}</h6>
                            </div>
                            </>
                        }                        
                    </div>
                </div>
            </div>

            {
                reporttype ===1 ?
                <Srreport data={data} />
                :
                reporttype ===2 &&
                <Arreport data={data} />
            }



            {
                ((last_update && status===0 && show1===1 && role==="se" && su===true) || (last_update && status===2 && show1===1 && role==="se" && su===true)) &&
                    <div className="d-flex flex-row-reverse">
                        <button onClick={()=>btn_sign()} className="btn bg-gradient-info mt-3">SUBMIT TO APPROVER</button>
                    </div>

                // (last_update && status===1 && show1===1) &&
                //     <div className="d-flex flex-row-reverse">
                //         <button onClick={()=>btn_sign()} className="btn bg-gradient-info mt-3">Update SE's Signature and Authorized Client's signature</button>
                //     </div>
            }
            </>            
            </DialogContent>
        </BootstrapDialog>
        <Signature ref={modalRef} reportdisplay={reportdisplay} handleClose1={handleClose} />
        </>
    )
}

export default forwardRef(Viewdetail);