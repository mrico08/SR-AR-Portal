import {useEffect,useState,useContext} from 'react';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import LocalHost from '../../../portal/context';

function Form1({sserviceinformation,st_activity,data}){
    // const [inputfields2,sinputfields2] = useState([{
    //     date:'',
    //     timein:'',
    //     timeout:'',
    //     breakfrom:'',
    //     breakto:'',
    //     se:'',
    // }]);

    const local_host = useContext(LocalHost);
    const [inputfields2,sinputfields2] = useState([]);

    const handleFormChange = (index, event) => {
        let data = [...inputfields2];
        data[index][event.target.name] = event.target.value;
        sinputfields2(data);
        sinputfields3(data);
        sserviceinformation(data);
    }

    // const addFields = () =>{
    //     let newfield = {
    //         date:'',
    //         timein:'',
    //         timeout:'',
    //         breakfrom:'',
    //         breakto:'',
    //         se:'',
    //     }

    //     sinputfields2([...inputfields2, newfield])
    // }
    
    

    // const removeFields = (index) => {
    //     let data = [...inputfields2];
    //     data.splice(index, 1)
    //     sinputfields2(data)
    //     sserviceinformation(data);
    // }
    
    const [select_activity,sselect_activity] = useState("");
    const select_activity2 = (e) =>{
        sselect_activity(e.target.value)
        if(e.target.value==="Others"){
            st_activity("");
        }else{
            st_activity(e.target.value);
        } 
    }

    const [t_activity2,st_activity2] = useState("");
    const st_activity3 = (e) =>{
        st_activity(e.target.value)
        st_activity2(e.target.value);
    }

    const [inputfields3,sinputfields3] = useState([]);
    const se_info= () =>{
        const assignse = (JSON.parse(data.assignse));
        const sitedate = data.site_date;
        let newfield = [];
        assignse.map((item)=>
            newfield.push({
                date:sitedate,
                timein:'',
                timeout:'',
                breakfrom:'',
                breakto:'',
                se:item,
            })
        )

        sinputfields2(newfield);
        sinputfields3(newfield);
    }

    useEffect(()=>{
        if(Object.keys(data).length>0){
            if(JSON.parse(data.s_information).length>0){
                sinputfields2(JSON.parse(data.s_information));
                sinputfields3(JSON.parse(data.s_information));
                sserviceinformation(JSON.parse(data.s_information));
            }else{
                se_info();
            }
            const array1 = ["Demo","POC","Site Survey","Presentation","Enablement","Pre BID","Design Meeting"];
        
            if(array1.includes(data.t_activity)){
                sselect_activity(data.t_activity);
                st_activity(data.t_activity);
            }else if(data.t_activity===null){
                sselect_activity("");
                st_activity("");
            }else{
                sselect_activity("Others");
                st_activity(data.t_activity);
                st_activity2(data.t_activity);
            }
        }
    },[data])

    const seinformation = (se) =>{
        let sedetails=JSON.parse(data.seinfo)[se];
        return(
            <div className="d-flex px-2 py-1">
                <div>
                    <img src={"http://"+local_host+"/profile_picture/"+sedetails[2]} className="avatar avatar-sm me-3 border-radius-lg" alt="img" />
                </div>
                <div className="d-flex flex-column justify-content-center">
                    <h6 className="mb-0 text-sm">{sedetails[1]}</h6>
                </div>
            </div>
        )
    }
    

    return(
        <>
        <div className="card h-100 mt-3">
            <div className="card-body p-5">
                <h5>SERVICE INFORMATION</h5>
                {/* <div className="d-flex justify-content-end">
                    <button onClick={addFields} type="button" className="btn bg-gradient-info">Add<i className="fa fa-plus ms-3"></i><></></button>                    
                </div> */}
                
                        {
                            inputfields3.map((input,index)=>
                                <div key={index} className="p-3 mb-3" style={{border:'1px solid #e9ecef'}}>
                                    <div className="row">
                                        {
                                            seinformation(input.se)
                                        }

                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label>Date</label>
                                                <input 
                                                    // name="date"
                                                    // onChange={event => handleFormChange(index, event)} 
                                                    value={input.date}
                                                    type="date" 
                                                    className="form-control"
                                                    placeholder="Enter Contact #"
                                                    disabled={true}
                                                />
                                            </div>                                        
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Time In</label>
                                                <input name="timein" value={input.timein} onChange={event => handleFormChange(index, event)} type="time" className="form-control" placeholder="Enter Contact #" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Time Out</label>
                                                <input name="timeout" value={input.timeout} onChange={event => handleFormChange(index, event)} type="time" className="form-control" placeholder="Enter Contact #" />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label>Break</label>
                                                <div className="d-flex justify-content-start">
                                                    <input name="breakfrom" value={input.breakfrom} onChange={event => handleFormChange(index, event)} type="time" className="form-control" placeholder="Enter Contact #" />
                                                    <p className="mx-3">to</p>
                                                    <input name="breakto" value={input.breakto} onChange={event => handleFormChange(index, event)}  type="time" className="form-control" placeholder="Enter Contact #" />
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="form-group">
                                            <br />
                                            <button onClick={() => removeFields(index)} type="button" className="btn btn-pinterest btn-icon-only mt-1">
                                                <span className="btn-inner--icon"><i className="fa fa-times"></i></span>
                                            </button>
                                        </div> */}
                                    </div>
                                </div>
                            )
                        }                        
            </div>
        </div>
        <div className="card h-100 mt-3">
            <div className="card-body p-5">
                <h5>TYPE OF ACTIVITY</h5>
                <select value={select_activity} onChange={select_activity2} className="form-control mt-4">
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
                            <Input value={t_activity2} onChange={st_activity3} id="component-simple" placeholder="Enter Type of Service" />
                    }
                </FormControl>
            </div>
        </div>
        </>
    )
}

export default Form1;