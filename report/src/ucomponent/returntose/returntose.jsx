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

function Returntose({reportdisplay},ref){
    const socket = useContext(SocketContext);
    const local_host = useContext(LocalHost);
    const credential = JSON.parse(localStorage.getItem('credential1'));
    const jwttoken=credential[0];
    const ui=credential[1];
    const email = ui.email;
    const name = ui.name;
    const profile = ui.profile;

    const handleClose = () => setOpen(false);
    const [open, setOpen] = useState(false);


    const [reporttype,sreporttype] = useState(0);
    const [srno,ssrno] = useState("");
    const openmodal = (value,rtype) =>{
        sreporttype(rtype)
        ssrno(value);
        setOpen(true);
    }

    useImperativeHandle (ref, ()=>({ openmodal }));

    const [btn_dis,sbtn_dis] = useState(false);
    const [notes,snotes] = useState("");
    const btn_submit = async(e) =>{
        sbtn_dis(true);
        e.preventDefault();
        let item = {srno,reporttype,notes,name,email,profile};
        let result = await fetch('http://'+local_host+'/api/auth/r_se',{
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
        reportdisplay('','','',0,0);
        setOpen(false);
        sbtn_dis(false);
    }



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
                Return to Engineer
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
                                <label>Reason :</label>
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

export default forwardRef(Returntose);