import {useState} from 'react';

function Search({open_modal,search,title}){
    const [category,scategory] = useState("0");
    const [from,sfrom] = useState("");
    const [to,sto] = useState("");
    const [sr_no,ssr_no] = useState("");

    const scategory1 = (e) =>{
        scategory(e.target.value);
        sfrom("");
        sto("");
        ssr_no("");
    }

    const search1 = () =>{
        search(sr_no,from,to,category);
    }

    return(
        <div className="card">
            <div className="card-header pb-0 p-3">
              <h6 className="mb-0">SR / AR REPORT ({title})</h6>
            </div>
            <div className="card-body p-3">
                <div className="d-flex justify-content-end">
                    <div className="me-3">
                        {/* <button onClick={()=>open_modal()} type="button" className="btn bg-gradient-info">Create Report</button> */}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <div className="form-group">
                            <label>Search</label>
                            <select className="form-control" value={category} onChange={scategory1}>
                                <option value="">-Select Category</option>
                                <option value="1">Service Report</option>
                                <option value="2">Activity Report</option>
                                <option value="3">Date</option>
                            </select>
                        </div>
                    </div>                    
                </div>
                {
                    (category === "1" || category === "2") ?
                        <div className="row">
                            <div className="col-md-3">
                                <div className="form-group">
                                    <input value = {sr_no} onChange={(e)=>ssr_no(e.target.value)} type="text" className="form-control" placeholder="Enter SR / AR #" />
                                </div>
                            </div>
                            <div className="col-md-1" >
                                <button type="button" onClick={search1} className="btn bg-gradient-info">SEARCH</button>
                            </div>
                        </div>
                    :
                    category === "3" &&
                        <div className="row">
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label>from :</label>
                                    <input type="date" value={from} onChange={(e)=>sfrom(e.target.value)} className="form-control" placeholder="Enter Reference #" />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label>to :</label>
                                    <input type="date" value={to} onChange={(e)=>sto(e.target.value)} className="form-control" placeholder="Enter Reference #" />
                                </div>
                            </div>
                            <div className="col-md-1" style={{marginTop:'30px'}}>
                                <button type="button" onClick={search1} className="btn bg-gradient-info">SEARCH</button>
                            </div>
                        </div>                    
                }
            </div>
        </div>
    )
}

export default Search;