import {useEffect,useState}  from 'react';

function Form2({sproductinformation,data}){
    const [inputfields3,sinputfields3] = useState([{
        bussiness_unit:'',
        product_involved:'',
        account_manager:'',
        sales_unit:'',
    }]);

    const handleFormChange = (index, event) => {
        let data = [...inputfields3];
        data[index][event.target.name] = event.target.value;
        sinputfields3(data);
        sproductinformation(data);
    }

    const addFields = () =>{
        let newfield = {
            bussiness_unit:'',
            product_involved:'',
            account_manager:'',
            sales_unit:'',
        }

        sinputfields3([...inputfields3, newfield])
    }

    const removeFields = (index) => {
        let data = [...inputfields3];
        data.splice(index, 1)
        sinputfields3(data)
        sproductinformation(data);
    }

    useEffect(()=>{
        if(Object.keys(data).length>0){
            sinputfields3(JSON.parse(data.p_information));
            sproductinformation(JSON.parse(data.p_information));
        }
    },[data])

    return(
        <div className="card h-100 mt-3">
            <div className="card-body p-5">
                <h5>PRODUCT INFORMATION</h5>
                <div className="d-flex justify-content-end">
                    <button onClick={addFields} type="button" className="btn bg-gradient-info">Add<i className="fa fa-plus ms-3"></i><></></button>                    
                </div>

                {
                    inputfields3.map((input,index)=>
                        <div key={index} className="p-3 mb-3" style={{border:'1px solid #e9ecef'}}>
                            <div className="table-responsive">
                                <table>
                                    <thead></thead>
                                    <tbody>
                                        <tr>
                                            <td className="px-1">
                                                <div className="form-group">
                                                    <label>Business Unit</label>
                                                    <input name="bussiness_unit" value={input.bussiness_unit}  onChange={event => handleFormChange(index, event)} type="text" className="form-control" placeholder="Enter Business Unit" />
                                                </div>
                                            </td>

                                            <td className="px-1">
                                                <div className="form-group">
                                                    <label>Products Involved</label>
                                                    <input name="product_involved" value={input.product_involved}  onChange={event => handleFormChange(index, event)} type="text" className="form-control" placeholder="Enter Products Involved" />
                                                </div>
                                            </td>
                                            <td className="px-1">
                                                <div className="form-group">
                                                    <label>Account Manager</label>
                                                    <input name="account_manager" value={input.account_manager}  onChange={event => handleFormChange(index, event)} type="text" className="form-control" placeholder="Enter Account Manager" />
                                                </div>
                                            </td>
                                            <td className="px-1">
                                                <div className="form-group">
                                                    <label>Sales Unit</label>
                                                    <input name="sales_unit" value={input.sales_unit}  onChange={event => handleFormChange(index, event)} type="text" className="form-control" placeholder="Enter Sales Unit" />
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
    )
}

export default Form2;