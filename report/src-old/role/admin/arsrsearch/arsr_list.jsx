import React, {useEffect, useContext, useState, useRef} from "react";
import LocalHost from "../../../portal/context";

function AR_SR_List()
{
    const [data, setData]=useState([]);
    const [sr_num, setNumber]=useState("")
    const [type, setType]=useState("0");

    const local_host = useContext(LocalHost);
    const credential = JSON.parse(localStorage.getItem('credential1'));
    const jwttoken=credential[0];


    const getData = async (rnum, rtype2) => {
        
        if (rtype2 === '0' || rtype2 === 0){
            return false;        
        }
        
        let item = {rnum, rtype2};
        let result = await fetch(`http://${local_host}/api/auth/ar_sr_search`,{
            method: 'POST',
            body:JSON.stringify(item),
            headers:{
                "Content-Type":'application/json',
                "Accept":'application/json',
                'Authorization': "Bearer " + jwttoken,
                'X-Requested-With':'XMLHttpRequest',
            }
        });
        result = await result.json();
        setData(result);            
    }

    const displayReportlist = () => {
        getData(sr_num, type);
    }
    
    useEffect(()=>{
        displayReportlist();
    },[])

    const search = (e) => {
        setNumber(e.target.value);

        if (e.target.value === ""){
            setData([]);
        }else {
            getData(e.target.value, type);
        }
    }

    const handleTypeChange = (e) => {
        setType(e.target.value);
        if (sr_num === ""){
            setData([]);
        }else{
            getData(sr_num, e.target.value);
        }
    }

    return (
        <div>
            <div className="card mt-3 mx-3">
                <div className="card-body p-3">
                    <div className="row mb-3">
                        <div className="col-md-4 ms-1">
                            <div className="input-group" style={{zIndex:0}}>
                                <span className="input-group-text text-body" ><i className="fas fa-search" aria-hidden="true"></i></span>
                                <input className="form-control" onChange={search} placeholder="Search #" type="number"/>
                            </div>
                        </div>

                        <div className="col-md-4 ms-1">
                            <select onChange={handleTypeChange} className="form-control" id="exampleFormControlSelect1" required>
                                <option value="0">- Select Report -</option>
                                <option value="1">SR Report</option>
                                <option value="2">AR Report</option>
                            </select>
                        </div>
                    </div>    
                </div>     
            </div>   

            <div className="card mt-3 mx-12">
                <div className="card-body p-3">
                    {
                        (type === "0") ?
                        <>
                            <div>
                                <img className="border-radius-lg w-100" src="http://localhost:3000/images/original-93c7c3593e7d733ddd8ca2fd83ac0ed4.png" alt="No Results Found"/>
                            </div>
                        </>
                        :
                        (sr_num === "") ?
                        <>
                            <div>
                                <img className="border-radius-lg w-100" src="http://localhost:3000/images/original-93c7c3593e7d733ddd8ca2fd83ac0ed4.png" alt="No Results Found"/>
                            </div>
                        </>
                        :
                        (data.length === 0) ?
                        <>
                            <div>
                                <img className="border-radius-lg w-100" src="http://localhost:3000/images/original-93c7c3593e7d733ddd8ca2fd83ac0ed4.png" alt="No Results Found"/>
                            </div>
                        </>
                        :
                        <>
                            <ul className="list-group">
                                <li className="list-group-item bg-gradient-info text-white">Search Results:</li>

                                {
                                data.map((item)=>
                                    <li className="list-group-item">{item.sr_no}</li>
                                    )
                                }

                            </ul>
                        </>
                    }
                </div>
            </div>
        </div>        
    )
}
export default AR_SR_List;