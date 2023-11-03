import React, {useEffect, useContext, useState, useRef} from "react";
import { useImperativeHandle, forwardRef } from "react";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import LocalHost from "../../../portal/context";

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

function Activate({handleCategoryChange}, ref)
{
    const modalRef = useRef();
    const local_host = useContext(LocalHost);
    const credential = JSON.parse(localStorage.getItem('credential1'));
    const jwttoken=credential[0];
    
    const handleClose = () => setOpen(false);
    const [open, setOpen] = useState(false);

    const [status4, setStatus4] = useState("");
    const [id4, setId4]= useState("");
    const [type4, setType4]=useState("");

    const openmodal = (value ,id, type) => {
        setOpen(true)
        setStatus4(value);
        setId4(id);
        setType4(type);
    }

    const activateAction = async () => {

        if (status4 === '0'|| status4 === 0){
            const status4 = 1;
            let item = {status4, id4};

            let result = await fetch('http://'+local_host+'/api/auth/action',{
                method: 'POST',
                body:JSON.stringify(item),
                headers:{
                    "Content-Type":'application/json',
                    "Accept":'application/json',
                    'Authorization': "Bearer " + jwttoken,
                    'X-Requested-With':'XMLHttpRequest',
            }
        });

        result = await result.json();
        handleClose();
        handleCategoryChange(type4);

        }
        else if (status4 === '1'  || status4 === 1){
            const status4 = 0;
            let item = {status4, id4};

            let result = await fetch('http://'+local_host+'/api/auth/action',{
                method: 'POST',
                body:JSON.stringify(item),
                headers:{
                    "Content-Type":'application/json',
                    "Accept":'application/json',
                    'Authorization': "Bearer " + jwttoken,
                    'X-Requested-With':'XMLHttpRequest',
            }
        });

        result = await result.json();
        handleClose();
        handleCategoryChange(type4);
        }
    }

    useImperativeHandle (ref, () => ({openmodal}));

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"                   
            open={open}
            width="md"
            fullWidth={true}
            maxWidth="md"
        >
        <DialogTitle>
            <h6>Confirmation</h6>
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
                 <div>
                    <div className="d-flex justify-content-center">
                        <h4 className="d-inline-flex p-2"> Do you want to proceed?</h4>
                    </div>

                    <div className="d-flex justify-content-center">
                        <button onClick={activateAction} className="mx-3 btn bg-gradient-success">Yes</button>
                        <button onClick={handleClose} className="mx-3 btn bg-gradient-danger">No</button>
                    </div>
                </div>
        </DialogContent>

        </BootstrapDialog>
    )
}
export default forwardRef(Activate);