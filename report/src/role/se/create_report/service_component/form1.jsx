function Form1({sc_cname,sc_saddress,sc_cperson,sc_contact,sr_cname,sr_reported,sr_cperson,sr_contact,sproject,scaseno}){
    return(
        <>
        <div className="card h-100 mt-3">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Project / SA No.</label>
                            <input onChange = {(e)=>sproject(e.target.value)} type="number" className="form-control" placeholder="Enter Project / SA #." />
                        </div>
                        <div className="form-group">
                            <label>Case No.</label>
                            <input onChange = {(e)=>scaseno(e.target.value)} type="number" className="form-control" placeholder="Enter Case #" />
                        </div>
                    </div>
                </div>
            </div>
        </div>        
        <div className="card h-100 mt-3">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <h5>CLIENT INFORMATION</h5>
                        <div className="form-group">
                            <label>Company Name</label>
                            <input onChange = {(e)=>sc_cname(e.target.value)} type="text" className="form-control" placeholder="Enter Company Name" />
                        </div>
                        <div className="form-group">
                            <label>Site Address</label>
                            <input onChange = {(e)=>sc_saddress(e.target.value)} type="text" className="form-control" placeholder="Enter Site Address" />
                        </div>
                        <div className="form-group">
                            <label>Contact Person</label>
                            <input onChange = {(e)=>sc_cperson(e.target.value)} type="text" className="form-control" placeholder="Enter Contact Person" />
                        </div>
                        <div className="form-group">
                            <label>Contact No.</label>
                            <input onChange = {(e)=>sc_contact(e.target.value)} type="number" className="form-control" placeholder="Enter Contact #" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h5>RESELLER INFORMATION</h5>
                        <div className="form-group">
                            <label>Company Name</label>
                            <input onChange = {(e)=>sr_cname(e.target.value)} type="text" className="form-control" placeholder="Enter Company Name" />
                        </div>
                        <div className="form-group">
                            <label>Reported by</label>
                            <input onChange = {(e)=>sr_reported(e.target.value)} type="text" className="form-control" placeholder="Enter Reported by" />
                        </div>
                        <div className="form-group">
                            <label>Contact Person</label>
                            <input onChange = {(e)=>sr_cperson(e.target.value)} type="text" className="form-control" placeholder="Enter Contact Person" />
                        </div>
                        <div className="form-group">
                            <label>Contact No.</label>
                            <input onChange = {(e)=>sr_contact(e.target.value)} type="number" className="form-control" placeholder="Enter Contact #" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Form1;