import {useState} from 'react';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';

function Form2({sserviceinformation,st_activity}){
    const [inputfields2,sinputfields2] = useState([{
        date:'',
        timein:'',
        timeout:'',
        breakfrom:'',
        breakto:'',
        se:'',
    }]); 

    const handleFormChange = (index, event) => {
        let data = [...inputfields2];
        data[index][event.target.name] = event.target.value;
        sinputfields2(data);
        sserviceinformation(data);
    }

    const addFields = () =>{
        let newfield = {
            date:'',
            timein:'',
            timeout:'',
            breakfrom:'',
            breakto:'',
            se:'',
        }

        sinputfields2([...inputfields2, newfield])
    }
    
    

    const removeFields = (index) => {
        let data = [...inputfields2];
        data.splice(index, 1)
        sinputfields2(data)
        sserviceinformation(data);
    }
    
    const [select_activity,sselect_activity] = useState("");
    const select_activity2 = (e) =>{
        sselect_activity(e.target.value)
        if(e.target.value==="Others"){
            st_activity("");
        }else{
            st_activity(e.target.value);
        }
    }
    

    return(
        <>
        <div className="card h-100 mt-3">
            <div className="card-body p-5">
                <h5>SERVICE INFORMATION</h5>
                <div className="d-flex justify-content-end">
                    <button onClick={addFields} type="button" className="btn bg-gradient-info">Add<i className="fa fa-plus ms-3"></i><></></button>                    
                </div>
                
                        {
                            inputfields2.map((input,index)=>
                            <div key={index} className="p-3 mb-3" style={{border:'1px solid #e9ecef'}}>
                               <div className="table-responsive">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className="px-1">
                                                    <div className="form-group">
                                                        <label>Date</label>
                                                        <input name="date" value={input.date}  onChange={event => handleFormChange(index, event)} type="date" className="form-control" placeholder="Enter Contact #" />
                                                    </div>
                                                </td>
                                                <td className="px-1">
                                                    <div className="form-group">
                                                        <label>Time In</label>
                                                        <input name="timein" value={input.timein} onChange={event => handleFormChange(index, event)} type="time" className="form-control" placeholder="Enter Contact #" />
                                                    </div>
                                                </td>
                                                <td className="px-1">
                                                    <div className="form-group">
                                                        <label>Time Out</label>
                                                        <input name="timeout" value={input.timeout} onChange={event => handleFormChange(index, event)} type="time" className="form-control" placeholder="Enter Contact #" />
                                                    </div>
                                                </td>
                                                <td className="">
                                                    <div className="form-group">
                                                        <label>Break</label>
                                                        <div className="d-flex justify-content-start">
                                                            <input name="breakfrom" value={input.breakfrom} onChange={event => handleFormChange(index, event)} type="time" className="form-control" placeholder="Enter Contact #" />
                                                            <p className="mx-3">to</p>
                                                            <input name="breakto" value={input.breakto} onChange={event => handleFormChange(index, event)}  type="time" className="form-control" placeholder="Enter Contact #" />
                                                        </div>
                                                    </div>                                        
                                                </td>
                                                <td className="px-1">
                                                    <div className="form-group">
                                                        <label>Engineer</label>
                                                        <div className="d-flex justify-content-start">
                                                            <input name="se" value={input.se} onChange={event => handleFormChange(index, event)} type="Engineer" className="form-control" placeholder="Enter Contact #" />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-1">
                                                    <div className="form-group">
                                                        <br />
                                                        <button onClick={() => removeFields(index)} type="button" className="btn btn-pinterest btn-icon-only mt-1">
                                                            <span className="btn-inner--icon"><i className="fa fa-times"></i></span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            )
                        }                        
            </div>
        </div>
        <div className="card h-100 mt-3">
            <div className="card-body p-5">
                <h5>TYPE OF ACTIVITY</h5>
                <select onChange={select_activity2} className="form-control mt-4">
                    <option value="">-Type of Activity</option>
                    <option value="Demo">Demo</option>
                    <option value="POC">POC</option>
                    <option value="Site Survey">Site Survey</option>
                    <option value="Presentation">Presentation</option>
                    <option value="Enablement">Enablement</option>
                    <option value="Pre BID">Pre BID</option>
                    <option value="Design Meeting">Design Meeting</option>
                    <option value="Others">Others</option>
                </select>

               
                <FormControl variant="standard" className="mt-5">
                    <InputLabel htmlFor="component-simple">Others</InputLabel>
                    {
                        select_activity==="Others" &&
                            <Input onChange={(e)=>st_activity(e.target.value)} id="component-simple" placeholder="Enter Type of Service" />
                    }
                </FormControl>
            </div>
        </div>
        </>
    )
}

export default Form2;