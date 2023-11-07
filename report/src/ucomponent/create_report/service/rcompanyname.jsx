import {useEffect,useState,useContext} from 'react';
import LocalHost from '../../../portal/context';

function Rcompanyname({sr_cname}){
    const [showdropdown,sshowdropdown] = useState(false);
    const local_host = useContext(LocalHost);
    const credential = JSON.parse(localStorage.getItem('credential1'));
    const jwttoken=credential[0];

    const [clist,sclist] = useState([]);
    const gpartner = async (search) =>{
        let result = partner.filter(item => item.name.toLowerCase().includes(search.toLowerCase())).slice(0, 10);

        sclist(result);
    }

    const btn_click = (item) =>{
        scname(item);
        sr_cname(item);
        sshowdropdown(false);
    }

    const inputtext = () =>{        
        gpartner(cname);
        sshowdropdown(true);
    }

    const [cname,scname] = useState("");
    const txt_input = (e) =>{
        scname(e.target.value);
        sr_cname(e.target.value);
        gpartner(e.target.value);
    }

    const [dis_cname,sdis_cname] = useState(false);
    const [partner,spartner] = useState([]);
    const partnerlist  = async () =>{
        sdis_cname(true);
        let result=  await fetch("http://"+local_host+"/api/auth/partnerlist",{
            method: 'GET',
            headers:{
                'Authorization': "Bearer " + jwttoken,
                'X-Requested-With':'XMLHttpRequest',
            }
        });

        result = await result.json();
        spartner(result);
        sdis_cname(false);
    }

    useEffect(()=>{
        partnerlist();
        const concernedElement = document.querySelector(".textdropdown2");

        document.addEventListener("mousedown", (e) => {
        if (concernedElement.contains(e.target)) {
            sshowdropdown(true);
        } else {
            sshowdropdown(false);
        }
        });
    },[]);

    return(
        <div className="form-group mt-5 textdropdown2">
            <label>Company Name</label>
            <input  disabled={dis_cname} value={cname}  onFocus={inputtext} onChange = {txt_input} type="text" className="form-control" placeholder="Enter Company Name" required/>
            {
                showdropdown &&
                    <div className="dropdown1">
                        <div className="card h-100 mt-3">
                            <div className="card-body">
                                {
                                    clist.map((item,i)=>
                                        <h6 key={i} onClick={()=>btn_click(item.name)}>{item.name} </h6>                        
                                    )
                                }
                            </div>
                        </div>
                    </div>                                    
            }
        </div>
    )
}

export default Rcompanyname;