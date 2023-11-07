import {useEffect,useState,useContext} from 'react';
import LocalHost from '../../../portal/context';

function Companyname({sc_cname}){
    const [showdropdown,sshowdropdown] = useState(false);
    const local_host = useContext(LocalHost);
    const credential = JSON.parse(localStorage.getItem('credential1'));
    const jwttoken=credential[0];

    const [clist,sclist] = useState([]);
    const gpartner = async (search) =>{
        let result = enduser.filter(item => item.name.toLowerCase().includes(search.toLowerCase())).slice(0, 10);
        sclist(result);
    }

    const btn_click = (item) =>{
        scname(item);
        sc_cname(item);
        sshowdropdown(false);
    }

    const inputtext = () =>{
        gpartner(cname);
        sshowdropdown(true);
    }

    const inputtextout = () =>{
        sshowdropdown(false);
    }

    const [cname,scname] = useState("");
    const txt_input = (e) =>{
        scname(e.target.value);
        sc_cname(e.target.value);
        gpartner(e.target.value);
    }

    const [dis_cname,sdis_cname] = useState(false);
    const [enduser,senduser] = useState([]);
    const enduserlist = async () =>{
        sdis_cname(true);
        let result=  await fetch("http://"+local_host+"/api/auth/enduserlist",{
            method: 'GET',
            headers:{
                'Authorization': "Bearer " + jwttoken,
                'X-Requested-With':'XMLHttpRequest',
            }
        });

        result = await result.json();
        senduser(result);
        sdis_cname(false);
    }


    useEffect(()=>{
        enduserlist();
        const concernedElement = document.querySelector(".textdropdown");

        document.addEventListener("mousedown", (e) => {
        if (concernedElement.contains(e.target)) {
            sshowdropdown(true);
        } else {
            sshowdropdown(false);
        }
        });
    },[]);




    return(
        <div className="form-group mt-5 textdropdown">
            <label>Company Name</label>
            <input disabled={dis_cname} value={cname}  onFocus={inputtext} onChange = {txt_input} type="text" className="form-control" placeholder="Enter Company Name" required/>
            {
                showdropdown &&
                    <div className="dropdown1">
                        <div className="card h-100 mt-3" style={{width:'100%'}}>
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

export default Companyname;