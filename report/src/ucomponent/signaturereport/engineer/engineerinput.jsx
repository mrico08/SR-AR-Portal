import {useEffect,useContext,useState} from 'react';
import {Link} from 'react-router-dom';
import LocalHost from "../../../portal/context"
import SignatureCanvas from 'react-signature-canvas'
import swal from 'sweetalert';


export const Engineerprops = ({sename}) =>{
    return(
        <>
        <div className="form-group">
            <label>SERVICE PROVIDED BY : <span>(Technical Engineer)</span></label>
            <input value={sename} type="text" className="form-control" disabled/>
        </div>
        <div className="form-group">
            <select className="form-control" disabled>
                <option value="">-Select Category</option>3                                        
                <option value="sign">-Sign with sign pad</option>
                <option value="upload">-Upload signature</option>
            </select>
        </div>
        <div className="d-grid">
            <button className="btn bg-gradient-secondary" disabled>Update</button>
        </div>
        </>
    )
}

export const Engineersign = ({sename,sesign}) =>{
    const local_host = useContext(LocalHost);
    return(
        <div className="card-body pt-0 p-3 text-center">
            <img className="mt-3"  src={"http://"+local_host+"/signature/"+sesign} style={{width:'50%',padding:'5px'}}/>
            <h6 className="text-center mb-0">{sename}</h6>
            <hr className="horizontal dark my-3" />
            <label>Technical Engineer</label>
        </div>
    )
}


const Engineerinput =  ({rtype,sr_no,viewdetails,sename}) =>{
    const local_host = useContext(LocalHost);
    const credential = JSON.parse(localStorage.getItem('credential1'));
    const jwttoken=credential[0];
    const email = credential[1].email;

    const [btn_dis,sbtn_dis] = useState(false);
    const [se,sse] = useState("");
    const [choose,schoose] = useState("");

    const [signshow,ssignshow] = useState("");
    const [preview, setPreview] = useState(null);
    const [sign,setsign] = useState("");
    const btnsign = (e) =>{
        schoose(e.target.value);
        ssignshow(e.target.value);
        setPreview("");
        setsign("");
    }

    const btn_clear = () =>{
        sign.clear();        
    }

    useEffect(()=>{
        sse(sename);
    },[sename])

    const [url,setUrl] = useState(null);
    const upload = (e) =>{
        if(e.target.files.length===0){
            setPreview("");
            return setUrl(null);
        }

        const img_ext = e.target.files[0].name.split('.').pop();
        if(img_ext === "webp" || img_ext === "png" || img_ext === "PNG"){
            setUrl(e.target.files[0]);
        }else{
            setUrl(e.target.files[0]);
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

    const btn_submit = async() =>{
        sbtn_dis(true)
        let img_ext ="";
        const formdata=new FormData();
        
        if(se===""){
            sbtn_dis(false);
            return swal("Technical Engineer's name required.");
        }else if(choose===""){
            sbtn_dis(false);
            return swal("Technical Engineer's name required.");
        }

        if(choose==="sign"){
            formdata.append('url',sign.getTrimmedCanvas().toDataURL("image/png"));
        }else if(choose==="upload"){
            if(url){
                img_ext = url.name.split('.').pop();
                if(img_ext === "webp" || img_ext === "png" || img_ext === "PNG"){
                    formdata.append('url',url);
                }else{
                    sbtn_dis(false);
                    return swal("Invalid extension name.");
                }
            }else{
                sbtn_dis(false);
                return swal("Authorized client's signature required.");
            }
        }

        formdata.append('email',email);
        formdata.append('sr_no',sr_no);
        formdata.append('se',se);
        formdata.append('rtype',rtype);
        formdata.append('choose',choose);

        let result = await fetch("http://"+local_host+"/api/auth/se_report",{
            method:'POST',
            body:formdata,
            headers:{              
                'Authorization': "Bearer " + jwttoken,
                'X-Requested-With':'XMLHttpRequest',
            },
        });

        result = await result.json();
        viewdetails(sr_no,rtype);
        sbtn_dis(false);
    }

    return(
        <>
        <div className="form-group">
            <label>SERVICE PROVIDED BY : <span>(Technical Engineer)</span></label>
            <input type="text" value={se} onChange = {(e)=>sse(e.target.value)} className="form-control" />
        </div>
        <div className="form-group">
            <select value={choose} onChange={btnsign} className="form-control">
                <option value="">-Select Category</option>3                                        
                <option value="sign">-Sign with sign pad</option>
                <option value="upload">-Upload signature</option>
            </select>
        </div>
        {
            signshow === "sign" ?
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
            signshow === "upload" &&
                <div className="form-group">
                    <label>Attach signature</label>
                    <input onChange={upload} type="file" className="form-control" />
                </div>
        }
        {
            preview &&
            <img src={preview} style={{width:'100%',height:'200px',border:'1px solid gray',padding:'5px'}}/>
        }
        <div className="d-grid mt-3">
            <button disabled={btn_dis} onClick={btn_submit} className="btn bg-gradient-info">Update</button>
        </div>
        
        </>
    )
}















export default Engineerinput;