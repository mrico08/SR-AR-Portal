import {useState,useImperativeHandle,forwardRef} from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Activity from './activity';
import Service1 from './service';

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

function Reportmodal({refresh},ref){
    const handleClose = () => setOpen(false);
    const [open, setOpen] = useState(false);

    const [category,scategory] = useState("");
    const scategory1 = (e) =>{
        scategory(e.target.value);
    }

    const openmodal = () =>{
        setOpen(true);
        scategory("");
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
                Create Report
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
                <div className="card h-100">
                    <div className="card-body p-5">
                        <label className="form-label">Category</label>
                        <div className="input-group input-group-outline">
                            <select onChange={scategory1} className="form-control">
                                <option value="">-Select Category</option>
                                <option value="Service Report">Service Report</option>
                                <option value="Activity Report">Activity Report</option>
                            </select>
                        </div>
                    </div>
                </div>
                {
                    category === "Service Report" ?
                        <Service1 />
                    :
                    category === "Activity Report" &&
                        <Activity />
                }
            </DialogContent>
        </BootstrapDialog>
    )
}

export default forwardRef(Reportmodal);