import React, {useEffect, useContext, useState, useRef} from "react";
import LocalHost from "../../../portal/context";
import { Link } from "react-router-dom";
import Add from "./add";
import Activate from "./activate";
import zIndex from "@mui/material/styles/zIndex";

function CategoryList()
{
    const modalRef = useRef();
    const activateRef = useRef();

    const local_host = useContext(LocalHost);
    const credential = JSON.parse(localStorage.getItem('credential1'));
    const jwttoken=credential[0];

    const [data3, setData3]=useState([]);
    const [name_1, setName_1]=useState("");
    const [type, setType]=useState("partner");

    const displayCategorylist =  () => {
        getData2(name_1, type);
    }

    useEffect(()=>{
        displayCategorylist();
    },[])

    async function getData2(value1, typing)
    {
        let item = {value1, typing};
        let result = await fetch(`http://${local_host}/api/auth/categorylist`,{
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
        setData3(result)
    }

    const search2 = (e)=> {
        getData2(e.target.value, type);
    }

    function handleAddCategory (type){
        
        if(modalRef.current){
            modalRef.current.openmodal(type);
        }
    }

    function handleActivate (value, id, type){

        if(activateRef.current){
            activateRef.current.openmodal(value,id,type);
        }
    }

    const [categoryTitle, setCategoryTitle]=useState("Partner");

    // TITLE AND TYPE CATEGORY ELIPSIS BUTTON SELECT
    const handleCategoryChange = (type1) => {
        setType(type1);

        if (type1 === 'partner'){
            setCategoryTitle("Partner")
        } else if (type1 === 'enduser'){
            setCategoryTitle("End User")
        } else if (type1 === 'business_unit'){
            setCategoryTitle("Business Unit")
        }

        getData2('',type1);
    }


    return (
        <div className="card mt-3 mx-3">
            <div className="card-header pb-0">
              <div className="row">
                <div className="col-lg-6 col-7">
                    <h6>{categoryTitle}</h6>
                </div>
                <div className="col-lg-6 col-5 my-auto text-end">
                  <div className="dropdown float-lg-end pe-4">
                    <a className="cursor-pointer" id="dropdownTable" data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="fa fa-ellipsis-v text-secondary"></i>
                    </a>
                    <ul className="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5" aria-labelledby="dropdownTable">
                        <li onClick={()=>handleCategoryChange('partner')}><Link className="dropdown-item">Partner</Link></li>
                        <li onClick={()=>handleCategoryChange('enduser')}><Link className="dropdown-item">End User</Link></li>
                        <li onClick={()=>handleCategoryChange('business_unit')}><Link className="dropdown-item">Business Unit</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>         

            <div className="card-body p-3">
                <div className="d-flex flex-row-reverse">
                    <button onClick={()=>handleAddCategory()} className="btn bg-gradient-info me-4" type="button" aria-expanded="false">
                    <i className="fa fa-plus" aria-hidden="true"></i>
                        <span style={{"paddingLeft":10}}>
                            Add Category
                        </span>
                    </button>
                </div>

                <div className="row mb-3">
                    <div className="col-md-4 ms-1">
                        <div className="input-group" style={{zIndex:0}}>
                            <span className="input-group-text text-body" ><i className="fas fa-search" aria-hidden="true"></i></span>
                            <input className="form-control" onChange={search2} placeholder="Search" type="text"/>
                        </div>
                    </div>
                </div>
  
                <div className="table-responsive">
                    <table className="table align-items-center mb-0">
                        <thead>
                            <tr>
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Action</th>
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Name</th>
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                                {
                                    data3.map((item,i) =>
                                        <tr key={i}>

                                            <td>
                                                <div className="d-flex flex-column justify-content-center">
                                                    <div>                                                     
                                                        {
                                                            (item.status) === 0 ?
                                                            <button onClick={()=>handleActivate(0, item.id, type)} className="btn bg-gradient-warning" type="button" aria-expanded="false">Deactivate</button>
                                                            :
                                                            (item.status) === 1 &&
                                                            <button onClick={()=>handleActivate(1, item.id, type)} className="btn bg-gradient-info" type="button" aria-expanded="false">Activate</button>
                                                        }                                                       
                                                    </div>
                                                </div>
                                            </td>

                                            <td>
                                                <div className="d-flex flex-column justify-content-center">
                                                    <h6 className="mb-0 text-xs">{item.name}</h6>
                                                </div>
                                            </td>

                                            <td>
                                                <div className="d-flex flex-column justify-content-center">
                                                    <div className="mb-0 text-xs">
                                                    {
                                                        (item.status) === 0 ?
                                                        <span defaultValue={0} className="badge bg-gradient-success">Active</span>
                                                        :
                                                        (item.status) === 1 &&
                                                        <span defaultValue={1} className="badge bg-gradient-danger">Inactive</span>
                                                    }
                                                    </div>
                                                </div>
                                            </td>
                                    </tr>
                                    )
                                }
                        </tbody>
                    </table>
                </div>
            
                <Add ref={modalRef} handleCategoryChange={handleCategoryChange}/>
                <Activate ref={activateRef} handleCategoryChange={handleCategoryChange}/>
                </div>

            
            
        </div>
    )

}
export default CategoryList;