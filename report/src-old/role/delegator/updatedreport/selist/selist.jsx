import {useEffect, useState,useContext} from 'react';
import LocalHost from '../../../../portal/context';

function Selist({sse}){
    const local_host = useContext(LocalHost);
    const credential = JSON.parse(localStorage.getItem('credential1'));
    const jwttoken=credential[0];

    const [inputse,sinputse] = useState([{
        engineer:[]
    }]);

    const addFields = () =>{
        let newfield ={
            engineer:[]
        }
        sinputse([...inputse, newfield])
    }

    const removeFields = (index) => {
        let data = [...inputse];
        data.splice(index, 1)
        sinputse(data)
        sse(data);
    }

    const handleFormChange = (index, event) => {
        let nameArr= [];
        if(event.target.value!==""){
            nameArr = event.target.value.split(',');
        }

        let data = [...inputse];
        data[index][event.target.name] = nameArr;
        sinputse(data);
        sse(data);
    }

    const [serecord,sserecord] = useState([]);
    const getselist = async () =>{
        let result=  await fetch("http://"+local_host+"/api/auth/selist",{
            method: 'GET',            
            headers:{
                'Authorization': "Bearer " + jwttoken,
                'X-Requested-With':'XMLHttpRequest',
            }
        });

        result= await result.json();
        sserecord(result);
    }

    useEffect(()=>{
        getselist();
    },[])

    return(
        <div className="card h-100 mt-3">
            <div className="card-body">
                <h5>ASSIGN ENGINEER</h5>
                <div className="row">
                    <div className="p-3 mb-3">
                        <button onClick={addFields} type="button" className="btn bg-gradient-info"> ADD ENGINEER</button>
                    </div>
                    <div className="responsive">
                        <table className="table">
                            <tbody>
                                {
                                    inputse.map((input,index)=>
                                        <tr key={index}>
                                            <td style={{border:0}}>                                                
                                                <select name="engineer"  onChange={event => handleFormChange(index, event)}  className="form-control">
                                                    <option value="">-Select Engineer</option>
                                                    {
                                                        serecord.map((item,i)=>
                                                            <option key={i} value={[item.email,item.name,item.profile]}>{item.name}</option>
                                                        )
                                                    }
                                                </select>
                                                {/* <input name="engineer" value={input.engineer}  onChange={event => handleFormChange(index, event)} type="text" className="form-control" placeholder="Enter Contact #" />                                                 */}
                                            </td>
                                            <td style={{border:0}}>
                                                <button onClick={removeFields} type="button" className="btn bg-gradient-danger btn-icon-only rounded-circle">
                                                    <span className="btn-inner--icon"><i className="fa fa-trash-o"></i></span>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Selist;