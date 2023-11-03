import {useState,useImperativeHandle,forwardRef,useContext,useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import LocalHost from '../../portal/context';
import SocketContext from '../../portal/socket';
import {Link} from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas'
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

function Approve({reportdisplay},ref){
    const socket = useContext(SocketContext);
    const local_host = useContext(LocalHost);
    const credential = JSON.parse(localStorage.getItem('credential1'));
    const jwttoken=credential[0];
    const ui=credential[1];
    const email = ui.email;
    const [name,sname] = useState(ui.name);
    const name1 = ui.name;
    const profile = ui.profile;

    const handleClose = () => setOpen(false);
    const [open, setOpen] = useState(false);


    const [reporttype,sreporttype] = useState(0);
    const [srno,ssrno] = useState("");
    
    const [choose,schoose] = useState("");
    const btnsign = (e) =>{
        schoose(e.target.value);
    }
    
    
    const openmodal = (value,rtype) =>{
        sreporttype(rtype)
        ssrno(value);
        setOpen(true);
        schoose("");
    }

    const [sign,setsign] = useState("");
    const btn_clear = () =>{
        sign.clear();        
    }

    const [preview,setPreview] = useState("");
    const [url,setUrl] = useState(null);
    const upload = (e) =>{
        if(e.target.files.length===0){
            setPreview("");
            return setUrl(null);
        }

        const img_ext = e.target.files[0].name.split('.').pop();
        if(img_ext === "webp" || img_ext === "png" || img_ext === "PNG" || img_ext === "jpg"){
            setUrl(e.target.files[0]);
        }else{
            setUrl(null);
            e.target.value = null;
            return swal("Invalid extension name.");
        }
    }

    useEffect(()=>{
        if (url=== null) {
            return setPreview("")
        }
        const objectUrl = URL.createObjectURL(url)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    },[url])

    useImperativeHandle (ref, ()=>({ openmodal }));

    const [dis_btn,sdis_btn] = useState(false);
    const btn_submit = async (e) =>{
        e.preventDefault();
        sdis_btn(true);
        let img_ext ="";
        const formdata=new FormData();
        
        if(choose==="sign"){
            formdata.append('url',sign.getTrimmedCanvas().toDataURL("image/png"));
            
        }else{
            if(url){
                img_ext = url.name.split('.').pop();
                if(img_ext === "webp" || img_ext === "png" || img_ext === "PNG"){
                    formdata.append('url',url);
                }else{
                    return swal("Invalid extension name.");
                }
            }else{
                return swal("Signature required");
            }
        }

        formdata.append('name',name);
        formdata.append('name1',name1);
        formdata.append('email',email);
        formdata.append('profile',profile);
        formdata.append('reporttype',reporttype);
        formdata.append('srno',srno);
        formdata.append('choose',choose);

        let result = await fetch("http://"+local_host+"/api/auth/a_report",{
            method:'POST',
            body:formdata,
            headers:{
                'Authorization': "Bearer " + jwttoken,
                'X-Requested-With':'XMLHttpRequest',
            },
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
        sdis_btn(false);
    }

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
                Approve Report
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
                                <label>NOTED BY : <span>(TPO Manager)</span></label>
                                <input value={name} onChange={(e)=>sname(e.target.value)} type="text"  className="form-control" />
                            </div>
                            <div className="form-group">
                                <select value={choose} onChange={btnsign} className="form-control">
                                    <option value="">-Select Category</option>
                                    <option value="sign">-Sign with sign pad</option>
                                    <option value="upload">-Upload signature</option>
                                </select>
                            </div>
                            {
                                choose === "sign" ?
                                    <>
                                    <div className="signature-wrapper">
                                        <SignatureCanvas 
                                            penColor='black' 
                                            ref={data=>setsign(data)}
                                            canvasProps={{
                                                className: 'signature',
                                            }}
                                        />
                                        <div className="d-flex justify-content-center signaturebottons">
                                            <Link onClick={btn_clear}>Clear</Link>
                                        </div>
                                    </div>
                                    </>
                                :
                                choose === "upload" &&
                                    <div className="form-group">
                                        <label>Attach signature</label>
                                        <input type="file" onChange={upload} className="form-control" />
                                    </div>
                            }
                            {
                                preview &&
                                <img src={preview} style={{width:'100%',height:'200px',border:'1px solid gray',padding:'5px'}}/>
                            }
                        </div>
                    </div>
                    <div className="d-flex flex-row-reverse bd-highlight mt-3">
                        <button disabled={dis_btn} type="submit" className="btn bg-gradient-info mx-3">Submit</button>
                    </div>
                </form>
            </DialogContent>            
        </BootstrapDialog>
    );
}

export default forwardRef(Approve);