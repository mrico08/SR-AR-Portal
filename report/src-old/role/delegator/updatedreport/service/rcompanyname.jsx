import {useEffect,useState,useContext} from 'react';
import LocalHost from '../../../../portal/context';

function Rcompanyname({sr_cname}){
    const [showdropdown,sshowdropdown] = useState(false);
    const local_host = useContext(LocalHost);
    const credential = JSON.parse(localStorage.getItem('credential1'));
    const jwttoken=credential[0];

    const [clist,sclist] = useState([]);
    const gpartner = async (type1,search) =>{
        let item = {type1,search}
        let result = await fetch('http://'+local_host+'/api/auth/g_partnerenduser',{
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
        sclist(result);
    }

    const btn_click = (item) =>{
        scname(item);
        sr_cname(item);
        sshowdropdown(false);
    }

    const inputtext = () =>{        
        gpartner('enduser',cname);
        sshowdropdown(true);
    }

    const [cname,scname] = useState("");
    const txt_input = (e) =>{
        scname(e.target.value);
        sr_cname(e.target.value);
        gpartner('enduser',e.target.value);
    }

    useEffect(()=>{
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
            <input value={cname}  onFocus={inputtext} onChange = {txt_input} type="text" className="form-control" placeholder="Enter Company Name" />
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