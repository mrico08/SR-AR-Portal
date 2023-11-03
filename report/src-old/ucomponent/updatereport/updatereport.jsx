import {useState,useImperativeHandle,forwardRef,useContext,useRef} from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import LocalHost from '../../portal/context';
import Srreport from './srreport';
import Arreport from './arreport';

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

function Updatereport({reportdisplay},ref){
    const local_host = useContext(LocalHost);
    const credential = JSON.parse(localStorage.getItem('credential1'));
    const jwttoken=credential[0];

    const handleClose = () => setOpen(false);
    const [open, setOpen] = useState(false);

    const [srno,ssrno] = useState("");
    const [reporttype,sreporttype] = useState("");
    const [data,sdata] = useState([]);
    const openmodal = async (value,rtype) =>{
        sreporttype(rtype);
        ssrno(value);
        setOpen(true);

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
                Edit Details            
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
                    reporttype===1 ?
                        <Srreport reportdisplay={reportdisplay} data={data} handleClose={handleClose}/>
                    : reporttype &&
                        <Arreport reportdisplay={reportdisplay} data={data} handleClose={handleClose} />
                }

            </DialogContent>
        </BootstrapDialog>
    )
}

export default forwardRef(Updatereport);