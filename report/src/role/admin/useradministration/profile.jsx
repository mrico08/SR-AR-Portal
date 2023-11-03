import React, {useEffect, useContext, useState, useRef} from "react";
import { useImperativeHandle, forwardRef } from "react";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import LocalHost from "../../../portal/context";
import Details from "./profile/details";
import Dmaintenance from "./profile/designation._maintenance";

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

function Profile ({}, ref){
    const local_host = useContext(LocalHost);
    const credential = JSON.parse(localStorage.getItem('credential1'));
    const jwttoken=credential[0];

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const [data1, setData1]=useState(null)
    
    const [id2, setId2] =useState("");

    const selectedProfile = async (id) => {
        let result=  await fetch("http://"+local_host+"/api/auth/profile_info/"+id,{
            method: 'GET',            
            headers:{
                'Authorization': "Bearer " + jwttoken,
                'X-Requested-With':'XMLHttpRequest',
            }
        });

        result= await result.json();
        setData1(result)
    }

    const openmodal = (id) => {
        setOpen(true);
        setId2(id);
        selectedProfile(id);
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
            <b>Profile Information</b>
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
                data1 &&
                <>
                <Details data1={data1}/>
                <Dmaintenance data1={data1} setData1={setData1}/>
                </>
            }
        </DialogContent>

        </BootstrapDialog> 
    )
}
export default forwardRef(Profile);