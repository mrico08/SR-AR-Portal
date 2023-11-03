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

function Add({handleCategoryChange},ref)
{
    const modalRef = useRef();
    const local_host = useContext(LocalHost);
    const credential = JSON.parse(localStorage.getItem('credential1'));
    const jwttoken=credential[0];

    const handleClose = () => setOpen(false);
    const [open, setOpen] = useState(false);

    const [name3, setName3] = useState("");
    const [type3, setType3] = useState("");
    // const [status_cat, setStatusCat] = useState(0);

    const addCategory = async (e) => {
        e.preventDefault();
        let item = {name3, type3};

        let result = await fetch('http://'+local_host+'/api/auth/addcategory',{
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
        handleCategoryChange(type3);
        
    }

    const setName3_1 = (e) => {
        setName3(e.target.value);
    }

    const setType3_1 = (e) => {
        setType3(e.target.value);
    }

    const openmodal = (type) => {
        setOpen(true);
        setType3(type);
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
            <h6>Add New Category</h6>
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
                {/* insert form */}
                <form onSubmit={addCategory}>
                    <div className="card mt-3 mx-3">
                        <div className="card-body">
                            <label>Name</label>

                            <div className="mb-3">
                                {/* <input type="text" value={username} onChange={susername1} className="form-control" placeholder='Enter your Email' required/> */}
                                <input type="text" onChange={setName3_1} className="form-control" placeholder='Enter Name' required/>
                            </div>
                            
                            <div className="mb-3">
                                {/* <input type="text" onChange={setType3_1} className="form-control" placeholder="Select Category" required/> */}
                                <div className="form-group">
                                    <label>Type</label>
                                    
                                    <select onChange={setType3_1} className="form-control" id="exampleFormControlSelect1" required>
                                        <option value=''>-Select Type-</option>
                                        <option value={'partner'}>Partner</option>
                                        <option value={'enduser'}>End User</option>
                                        <option value={'business_unit'}>Business Unit</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="d-flex flex-row-reverse">
                        <button type='submit' className="btn bg-gradient-info mt-4 mb-0 me-3">Submit</button>
                    </div>
                </form>
                
        </DialogContent>

        </BootstrapDialog>
        )
}


export default forwardRef(Add);