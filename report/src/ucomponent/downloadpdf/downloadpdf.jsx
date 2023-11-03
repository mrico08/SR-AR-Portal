import {useState,useImperativeHandle,forwardRef,useContext,} from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import LocalHost from '../../portal/context';

import PdfTemplatesr from './pdftemplatesr';
import PdfTemplatear from './pdftemplatear';

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

function Downloadpdf({reportdisplay},ref){
    const local_host = useContext(LocalHost);
    const credential = JSON.parse(localStorage.getItem('credential1'));
    const jwttoken=credential[0];

    const handleClose = () => setOpen(false);
    const [open, setOpen] = useState(false);

    const [data,sdata] = useState([]);
    const [srno,ssrno] = useState("");
    const [reporttype,sreporttype] = useState("");
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
    }

    const openmodal1 = (value,rtype) =>{
        viewdetails(value,rtype);
        setOpen(true);
    }

    useImperativeHandle (ref, ()=>({ openmodal1 }));

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
                    <>Download SR</>
                    :
                    reporttype ===2 &&
                    <>Download AR</>
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
                    <PdfTemplatesr data={data} />
                    </>
                :
                reporttype ===2 &&
                    <>
                    <div className="d-flex justify-content-center">
                        <h4><b>AR NO : AR-{srno}</b></h4>
                    </div>
                    <PdfTemplatear data={data} />
                    </>
            }

            </DialogContent>
        </BootstrapDialog>
        </>
    )
}

export default forwardRef(Downloadpdf);