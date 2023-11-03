import {useEffect,useState,useContext} from 'react';
import LocalHost from '../../../../portal/context';

function Dmaintenance({data1,setData1}){
    const local_host = useContext(LocalHost);
    const credential = JSON.parse(localStorage.getItem('credential1'));
    const jwttoken=credential[0];
    const [role,srole] = useState([]);
    const designation = ['Creator','Delegator','System Engineer','Admin'];
    const [btn_dis,sbtn_dis] = useState(false);

    const btn_check = async (value) =>{
        sbtn_dis(true);
        let item = {uid,value};
        let result = await fetch('http://'+local_host+'/api/auth/changedesig',{
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
        console.log(result);
        setData1(result);
        sbtn_dis(false);
    }

    const [uid,suid] = useState("");
    useEffect(()=>{
        suid(data1.id);
    },[data1])

    const Dconfig = () =>{
        return(
            designation.map((item,i)=>{
                let checkitem = role.find((element) => element ===item);

                return(
                    <div key={i} className="col-md-3">
                        <div className="form-check">
                            {
                            checkitem===undefined ?
                                <input disabled={btn_dis} onClick={()=>btn_check(item)} className="form-check-input" defaultChecked={false} type="checkbox" />
                            :
                                <input disabled={btn_dis} onClick={()=>btn_check(item)} className="form-check-input" defaultChecked={true} type="checkbox" value={item} />
                            }

                            <label className="custom-control-label" for="customCheck1">{item}</label>
                        </div>
                    </div>
                )
            })
        )
    }

    useEffect(()=>{
        if(data1)
        srole(data1.role);
        

    },[data1])

    return(
        data1 &&
        <div className="card">
            <div className="card-header">
                <h6>Designation / Role</h6>
            </div>
            <div className="card-body px-3 pt-0 pb-3">
                <div className="row mx-3">
                    <Dconfig />
                </div>
            </div>
        </div>
    )
}

export default Dmaintenance;