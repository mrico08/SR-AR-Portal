import React, {useContext, useState,useImperativeHandle, forwardRef,createRef} from "react";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import LocalHost from "../../../../portal/context";
import swal from 'sweetalert';

import ProfilePicture from "@dsalvagni/react-profile-picture";
import "@dsalvagni/react-profile-picture/dist/ProfilePicture.css";


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

function Changeprofile({scredential},ref){
    const profilePictureRef =  createRef();
    const navigate = useNavigate();
    const local_host = useContext(LocalHost);
    const credential = JSON.parse(localStorage.getItem('credential1'));
    const jwttoken = credential[0];
    const user_info = credential[1];
    const email = user_info.email;

    function dateandtime(){
        const d = new Date();
        let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
        let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
        let a = new Intl.DateTimeFormat('en', { hour: '2-digit',hour12: false }).format(d);
        let b = new Intl.DateTimeFormat('en', { minute: '2-digit',hour12: false }).format(d);
        let c = new Intl.DateTimeFormat('en', { second: '2-digit',hour12: false }).format(d);
        return(ye+''+mo+''+da+''+a+b+''+c);
    }

    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
     charactersLength));
       }
       return result;
    }

    function srcToFile(src, fileName, mimeType){
        return (fetch(src)
            .then(function(res){
                return ( res.arrayBuffer());
            }).then(function(buf){
                return ( new File([buf], fileName, {type:mimeType}));

            })
        );
    }

    async function signup_insert(img){
        const formdata=new FormData();        
        formdata.append('upload_image',img);
        formdata.append('email',email);

        let result = await fetch('http://'+local_host+'/api/auth/change_profile',{
            method:'POST',
            body:formdata,
            headers:{
                'Authorization': "Bearer " + jwttoken,
                'X-Requested-With':'XMLHttpRequest',
            }
        });

        result = await result.json();
        if(result.notification==1){
            swal('SUCCESS','Profile picture has been updated successfully.','success');
            handleClose();
        }
        const array_info = user_info;
        array_info.profile =result.profile;
        localStorage.setItem('credential1',JSON.stringify([jwttoken,array_info]))
        scredential([jwttoken,array_info]);
        navigate("");
    }

    const btn_submit = async () =>{
        const PP = profilePictureRef.current;
        const imageAsDataURL = PP.getImageAsDataUrl();

        var mid=makeid(10);
        var dt=dateandtime();
        var file_n=mid+''+dt+'.png';

        if(PP.state.status==="EMPTY"){
            swal("Upload image required !");
        }else{
            if(PP.state.file.name.split('.').pop()==="JPEG" || PP.state.file.name.split('.').pop()==="PNG" || PP.state.file.name.split('.').pop()==="jpeg" || PP.state.file.name.split('.').pop()==="jpg" || PP.state.file.name.split('.').pop()==="png"){
                srcToFile(imageAsDataURL, file_n, "image/png").then(img => {
                    signup_insert(img);
                });
            }else{
                swal("File must be jpeg/png");
            }
        }
    }

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const openmodal = (id) =>{
        setOpen(true);
    }

    useImperativeHandle (ref,()=>({openmodal}));


    return(
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"                   
            open={open}
            width="sm"
            fullWidth={true}
            maxWidth="sm"
        >
            <DialogTitle>  
                <b>Change Profile Picture</b>
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
                <div className="card h-100 mt-3">
                    <div className="card-body p-5">
                        <div className="mb-3">
                            <ProfilePicture
                                ref={profilePictureRef}
                                useHelper={true}
                                debug={true}
                                frameFormat="box"
                            />
                        </div>
                    </div>
                </div>
                <div class="d-flex flex-row-reverse bd-highlight mt-3 me-3">
                    <button onClick={btn_submit} type="button" className="btn bg-gradient-info">Submit</button>
                </div>
            </DialogContent>
        </BootstrapDialog>
    )
}

export default forwardRef(Changeprofile);