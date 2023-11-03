import {useState,useImperativeHandle,forwardRef,useContext} from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';

import Srreport from './srreport/srreport';
import Arreport from './arreport/arreport';

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

function Updatedetails({reportdisplay},ref){
    const handleClose = () => setOpen(false);
    const [open, setOpen] = useState(false);
    const [srno,ssrno] = useState("")
    const [reporttype,sreporttype] = useState(0);
    const openmodal = (value,rtype) =>{        
        setOpen(true);
        sreporttype(rtype);
        ssrno(value);
    }

    useImperativeHandle (ref, ()=>({ openmodal }));

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
                    <>SERVICE REPORT</>
                    :
                    reporttype ===2 &&
                    <>ACTIVITY REPORT</>
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
                <>
                
                <div className="d-flex justify-content-center">
                    <h4><b>SR NO : SR-{srno}</b></h4>
                </div>
                <Srreport srno={srno} reporttype={reporttype} handleClose={handleClose} reportdisplay={reportdisplay} />
                </>
                :
                reporttype ===2 &&
                <>
                <div className="d-flex justify-content-center">
                    <h4><b>AR NO : AR-{srno}</b></h4>
                </div>
                <Arreport srno={srno} reporttype={reporttype} handleClose={handleClose} reportdisplay={reportdisplay} />
                </>
            }
            </DialogContent>
        </BootstrapDialog>
    )
}

export default forwardRef(Updatedetails);