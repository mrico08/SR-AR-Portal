import {useState}  from 'react';

function Form3({sproductinformation}){
    const [inputfields3,sinputfields3] = useState([{
        brand:'',
        partno:'',
        serial:'',
    }]);

    const handleFormChange = (index, event) => {
        let data = [...inputfields3];
        data[index][event.target.name] = event.target.value;
        sinputfields3(data);
        sproductinformation(data);
    }

    const addFields = () =>{
        let newfield = {
            brand:'',
            partno:'',
            serial:'',
        }

        sinputfields3([...inputfields3, newfield])
    }

    const removeFields = (index) => {
        let data = [...inputfields3];
        data.splice(index, 1)
        sinputfields3(data)
        sproductinformation(data);
    }

    return(
        <div className="card h-100 mt-3">
            <div className="card-body">
                <h5>PRODUCT INFORMATION</h5>
                <div className="d-flex justify-content-end">
                    <button onClick={addFields} type="button" className="btn bg-gradient-info">Add<i className="fa fa-plus ms-3"></i><></></button>                    
                </div>

                {
                    inputfields3.map((input,index)=>
                        <div key={index} className="p-3 mb-3" style={{border:'1px solid #e9ecef'}}>
                            <div className="table-responsive">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className="px-1">
                                                <div className="form-group">
                                                    <label>Brand</label>
                                                    <input name="brand" value={input.brand}  onChange={event => handleFormChange(index, event)} type="text" className="form-control" placeholder="Enter Brand" />
                                                </div>
                                            </td>

                                            <td className="px-1">
                                                <div className="form-group">
                                                    <label>Part #</label>
                                                    <input name="partno" value={input.partno}  onChange={event => handleFormChange(index, event)} type="text" className="form-control" placeholder="Enter Part #" />
                                                </div>
                                            </td>
                                            <td className="px-1">
                                                <div className="form-group">
                                                    <label>Serial #</label>
                                                    <input name="serial" value={input.serial}  onChange={event => handleFormChange(index, event)} type="text" className="form-control" placeholder="Enter Serial #" />
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

export default Form3;