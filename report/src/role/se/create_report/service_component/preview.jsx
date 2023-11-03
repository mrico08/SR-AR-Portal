import {useState,useImperativeHandle,forwardRef} from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Formpreview from './formpreview';

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

function Preview({},ref){
    const handleClose = () => setOpen(false);
    const [open, setOpen] = useState(false);
    const [data,sdata] = useState([]);

    const openmodal1 = (item) =>{
        sdata(item);
        setOpen(true);
    }

    useImperativeHandle (ref, ()=>({ openmodal1 }));

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
                Preview
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
                <Formpreview data={data}/>
            </DialogContent>
        </BootstrapDialog>
    )
}

export default forwardRef(Preview);