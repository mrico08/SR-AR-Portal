import {useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom'

function Nomatch(){
    const navigate=useNavigate();
    // const [credential,scredential] = useState(null);
    // const [role,srole] = useState("");

    useEffect(()=>{
        let credential =null; 
        if(localStorage.getItem('credential1')){
            credential = JSON.parse(localStorage.getItem('credential1'));
        }

        if(!credential){
            navigate('../login');
        }else if(credential[1].role[0]==="Creator"){
            navigate('../creator/home');
        }else if(credential[1].role[0]==="System Engineer"){
            navigate('../se/home');
        }else if(credential[1].role[0]==="Admin"){
            navigate('../admin/useradministration');
        }else if(credential[1].role[0]==="Delegator"){
            navigate('../delegator/home');
        }
    },[])
}

export default Nomatch;