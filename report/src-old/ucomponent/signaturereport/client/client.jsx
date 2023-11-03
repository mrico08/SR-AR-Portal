import {useState,useEffect,useContext} from 'react';
import SignatureCanvas from 'react-signature-canvas'
import {Link} from 'react-router-dom';
import  swal from 'sweetalert';
import LocalHost from '../../../portal/context';

function Client({rtype,sr_no,data,viewdetails,sclientconfirmation}){
    const local_host = useContext(LocalHost);
    const credential = JSON.parse(localStorage.getItem('credential1'));
    const jwttoken=credential[0];

    const [conforme,sconforme] = useState("");

    const [signshow2,ssignshow2] = useState("");
    const [choose2,schoose2] = useState("");
    const [preview2, setPreview2] = useState(null);
    const [sign2,setsign2] = useState("");

    const btn_clear2 = () =>{
        sign2.clear();        
    }

    const [url2,setUrl2] = useState(null);
    const upload2 = (e) =>{
        if(e.target.files.length===0){
            setPreview2("");
            return setUrl2(null);
        }

        const img_ext = e.target.files[0].name.split('.').pop();
        if(img_ext === "webp" || img_ext === "png" || img_ext === "PNG"){
            setUrl2(e.target.files[0]);
        }else{
            setUrl2(e.target.files[0]);
            e.target.value = null;
            return swal("Invalid extension name.");
        }
    }

    const [csign,scsign] = useState("");
    const [cname,scname] = useState("");
    useEffect(()=>{
        if(data){
            if(data.conforme_name===null && data.conforme_sign===null){
                sclientconfirmation(true);
            }else if(data.conforme_name!==null && data.conforme_sign!==null){
                sclientconfirmation(false);
            }
            scsign(data.conforme_sign);
            scname(data.conforme_name);
        }
    },[data])

    useEffect(()=>{
        if (url2=== null) {
            return setPreview2("")
        }
        const objectUrl = URL.createObjectURL(url2)
        setPreview2(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)
    },[url2])


    const btnsign2 = (e) =>{
        schoose2(e.target.value);
        ssignshow2(e.target.value);
        setPreview2("");
        setsign2("");
    }

    const [btn_dis,sbtn_dis] = useState(false);
    const btn_submit = async() =>{
        sbtn_dis(true)
        let img_ext ="";
        const formdata=new FormData();
        
        if(conforme===""){
            sbtn_dis(false)
            return swal("Authorized client's name required.");
        }else if(choose2===""){
            sbtn_dis(false)
            return swal("Authorized client's signature required.");
        }

        if(choose2==="sign"){
            formdata.append('url2',sign2.getTrimmedCanvas().toDataURL("image/png"));
        }else if(choose2==="upload"){
            if(url2){
                img_ext = url2.name.split('.').pop();
                if(img_ext === "webp" || img_ext === "png" || img_ext === "PNG"){
                    formdata.append('url2',url2);
                }else{
                    sbtn_dis(false)
                    return swal("Invalid extension name.");
                }
            }else{
                sbtn_dis(false)
                return swal("Authorized client's signature required.");
            }
        }

        formdata.append('sr_no',sr_no);
        formdata.append('conforme',conforme);
        formdata.append('rtype',rtype);
        formdata.append('choose2',choose2);

        let result = await fetch("http://"+local_host+"/api/auth/conforme_report",{
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

    const conformesign = () =>{
        
    }

    const [[preview,setPreview]] = useState("");
    useEffect(()=>{
        conformesign();
    },[data])

    return(
        <div className="card h-100 mt-4">
            {
                !csign ?
                    <>
                    <div className="card-body">
                        <div className="fluid">
                            <div className="row">
                                <div className="form-group">
                                    <label>CONFORME : <span>(Authorized Client Representative)</span></label>
                                    <input type="text" value={conforme} onChange = {(e)=>sconforme(e.target.value)} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <select value={choose2} onChange={btnsign2} className="form-control">
                                        <option value="">-Select Category</option>3                                        
                                        <option value="sign">-Sign with sign pad</option>
                                        <option value="upload">-Upload signature</option>
                                    </select>
                                </div>
                                {
                                    signshow2 === "sign" ?
                                    <>
                                        <div className="signature-wrapper">
                                            <SignatureCanvas 
                                                penColor='black' 
                                                ref={data=>setsign2(data)}
                                                canvasProps={{
                                                    className: 'signature',
                                                }}                                    
                                            />
                                            <div className="d-flex justify-content-center signaturebottons">
                                                <Link onClick={btn_clear2}>Clear</Link>
                                            </div>
                                        </div>
                                    </>
                                    :
                                    signshow2 === "upload" &&
                                        <div className="form-group">
                                            <label>Attach signature</label>
                                            <input onChange={upload2} type="file" className="form-control" />
                                        </div>
                                }
                                {
                                    preview2 &&
                                    <img src={preview2} style={{width:'100%',height:'200px',border:'1px solid gray',padding:'5px'}}/>
                                }
                            </div>
                        </div>
                    </div>               
                    <div className="container d-grid gap-2">
                        <button disabled={btn_dis} onClick={btn_submit} className="btn bg-gradient-info px-3">Update</button>
                    </div>
                    </>
                :
                <div className="card">
                    <div className="card-body pt-0 p-3 text-center">
                        <img className="mt-3"  src={"http://"+local_host+"/signature/"+csign} style={{width:'50%',padding:'5px'}}/>
                        <h6 className="text-center mb-0">{cname}</h6>
                        <hr className="horizontal dark my-3" />
                        <h6 className="mb-0">CONFORME : (Authorized Client Representative)</h6>
                    </div>
                </div>

            }
        </div>
    )
}

export default Client;