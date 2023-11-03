import {useState,useImperativeHandle,forwardRef,useContext,useRef} from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import LocalHost from '../../portal/context';
import SocketContext from '../../portal/socket';
import swal from 'sweetalert';

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

function Cancelreport({reportdisplay},ref){
    const socket = useContext(SocketContext);
    const local_host = useContext(LocalHost);
    const credential = JSON.parse(localStorage.getItem('credential1'));
    const jwttoken=credential[0];
    const email=credential[1].email;
    const name = credential[1].name;
    const profile = credential[1].profile;

    const handleClose = () => setOpen(false);
    const [open, setOpen] = useState(false);

    const [srno,ssrno] = useState("");
    const [reporttype,sreporttype] = useState("");
    const openmodal = (value,rtype) =>{
        setOpen(true);
        ssrno(value);
        sreporttype(rtype);
    }

    const [notes,snotes] = useState("");
    const [btn_dis,sbtn_dis] = useState("");
    const btn_submit = async (e) =>{
        e.preventDefault();
        sbtn_dis(true);
        let item = {srno,reporttype,notes,name,email,profile};
        let result = await fetch('http://'+local_host+'/api/auth/c_report',{
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
            const uid=([...result.selist,'delegator']);
            socket.emit('refresh_action',{'uid':uid});
            swal('SUCCESS',result.message,'success');
        }else{
            swal('FAILED',result.message,'error');
        }
        reportdisplay('','','');
        setOpen(false);
        sbtn_dis(false);
    }

    useImperativeHandle(ref,()=>({
        openmodal
    }))

    return(
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
                    <>Cancel Service Report</>
                    :
                    reporttype ===2 &&
                    <>Cancel Activity Report</>
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
                <form onSubmit={btn_submit}>
                    <div className="card h-100 mt-3">
                        <div className="card-body p-5">
                            <div className="form-group">
                                <label>Reason of cancellation:</label>
                                <textarea onChange={(e)=>snotes(e.target.value)} className="form-control" required rows="4" cols="50" />
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-row-reverse bd-highlight mt-3 me-3">
                        <button disabled={btn_dis} type="submit" className="btn bg-gradient-info px-5">Submit</button>
                    </div>
                </form>
            </DialogContent>
        </BootstrapDialog>
    )
}

export default forwardRef(Cancelreport);