function Form4({spurpose,sa_taken,sfindings,sn_action,srecommendation,sremarks}){
    return(
        <div className="card h-100 mt-3">
            <div className="card-body">
                <div className="form-group">
                    <label>Purpose / Reported Concerns</label>
                    <textarea onChange={(e)=>spurpose(e.target.value)} className="form-control" required rows="4" cols="50" />                
                </div>
                <div className="form-group">
                    <label>Action Taken</label>
                    <textarea onChange={(e)=>sa_taken(e.target.value)} className="form-control" required rows="4" cols="50" />                
                </div>
                <div className="form-group">
                    <label>Finding/s</label>
                    <textarea onChange={(e)=>sfindings(e.target.value)} className="form-control" required rows="4" cols="50" />                
                </div>
                <div className="form-group">
                    <label>Next Action Item / Pending</label>
                    <textarea onChange={(e)=>sn_action(e.target.value)} className="form-control" required rows="4" cols="50" />                
                </div>
                <div className="form-group">
                    <label>Recommendation/s</label>
                    <textarea onChange={(e)=>srecommendation(e.target.value)} className="form-control" required rows="4" cols="50" />                
                </div>
                <div className="form-group">
                    <label>Remarks</label>
                    <textarea onChange={(e)=>sremarks(e.target.value)} className="form-control" required rows="4" cols="50" />                
                </div>
            </div>
        </div>
    )
}

export default Form4;