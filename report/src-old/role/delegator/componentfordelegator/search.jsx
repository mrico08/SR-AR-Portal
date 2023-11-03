import {useState} from 'react';
import {Link} from 'react-router-dom';

function Search({search,title}){
    const [category,scategory] = useState("");
    const [from,sfrom] = useState("");
    const [to,sto] = useState("");
    const [sr_no,ssr_no] = useState("");
    const [reporttype,sreporttype] = useState(0);

    const [pholder,spholder] = useState("");
    const scategory1 = (e) =>{
        scategory(e.target.value);
        sfrom("");
        sto("");
        ssr_no("");

        (e.target.value==="1") ?
            spholder("Enter Service Report #")
        :
        (e.target.value==="2") &&
            spholder("Enter Activity Report #")
    }

    const btn_type = (value) =>{
        scategory("");
        sfrom("");
        sto("");
        ssr_no("");

        search("","","",value);
    }

    const search1 = () =>{
        search(sr_no,from,to,reporttype,category);
    }

    return(
        <div className="card">
            <div className="card-header pb-0 p-3">
                <div className="row">
                    <div className="col-lg-6 col-7">
                        <h6 className="mb-0">SR / AR REPORT ({title})</h6>
                    </div>
                    <div className="col-lg-6 col-5 my-auto text-end">
                    <div className="dropdown float-lg-end pe-4">
                        <a className="cursor-pointer" id="dropdownTable" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa fa-ellipsis-v text-secondary"></i>
                        </a>
                        <ul className="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5" aria-labelledby="dropdownTable">
                            <li onClick={()=>btn_type(0)}><Link className="dropdown-item border-radius-md">All</Link></li>
                            <li onClick={()=>btn_type(1)}><Link className="dropdown-item border-radius-md">Service Report</Link></li>
                            <li onClick={()=>btn_type(2)}><Link className="dropdown-item border-radius-md">Activity Report</Link></li>
                        </ul>
                    </div>
                    </div>
                </div>
            </div>
            <div className="card-body p-3">
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
                                    <input value = {sr_no} onChange={(e)=>ssr_no(e.target.value)} type="text" className="form-control" placeholder={pholder} />
                                </div>
                            </div>
                            <div className="col-md-1" >
                                <button type="button" onClick={search1} className="btn bg-gradient-info">SEARCH</button>
                            </div>
                        </div>
                    :
                    (category === "3") ?
                        <div className="row">
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label>from :</label>
                                    <input type="date" value={from} onChange={(e)=>sfrom(e.target.value)} className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label>to :</label>
                                    <input type="date" value={to} onChange={(e)=>sto(e.target.value)} className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-1" style={{marginTop:'30px'}}>
                                <button type="button" onClick={search1} className="btn bg-gradient-info">SEARCH</button>
                            </div>
                        </div>
                    :
                        <></>
                }
            </div>
        </div>
    )
}

export default Search;