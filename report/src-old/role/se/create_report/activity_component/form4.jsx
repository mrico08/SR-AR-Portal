function Form4({sa_description,sa_assessment,sn_action,sremarks}){
    return(
    <>
        <div className="card h-100 mt-3">
            <div className="card-body p-5">
                <div className="form-group">
                    <label>Activity Description</label>
                    <textarea onChange={(e)=>sa_description(e.target.value)} className="form-control" required rows="4" cols="50" />                
                </div>
                <div className="form-group">
                    <label>Activity Assessment</label>
                    <textarea onChange={(e)=>sa_assessment(e.target.value)} className="form-control" required rows="4" cols="50" />                
                </div>
                <div className="form-group">
                    <label>Next Action Item / Pending</label>
                    <textarea onChange={(e)=>sn_action(e.target.value)} className="form-control" required rows="4" cols="50" />                
                </div>
            </div>
        </div>

        <div className="card h-100 mt-3">
            <div className="card-body p-5">
                <div className="form-group">
                    <label>Potential Upsell / Remarks</label>
                    <textarea onChange={(e)=>sremarks(e.target.value)} className="form-control" required rows="4" cols="50" />                
                </div>
            </div>
        </div>
    </>
    )
}

export default Form4;