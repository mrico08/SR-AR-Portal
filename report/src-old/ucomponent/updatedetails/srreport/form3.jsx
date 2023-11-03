import {useEffect,useState} from 'react';

function Form3({spurpose,sa_taken,sfindings,sn_action,srecommendation,sremarks,data}){
    const [purpose2,spurpose2] = useState("");
    const [a_taken2,sa_taken2] = useState("");
    const [findings2,sfindings2] = useState("");
    const [n_action2,sn_action2] = useState("");
    const [recommendation2,srecommendation2] = useState("");
    const [remarks2,sremarks2] = useState("");

    useEffect(()=>{
        spurpose2(data.purpose || "");
        sa_taken2(data.action_taken || "");
        sfindings2(data.finding || "");
        sn_action2(data.pending || "");
        srecommendation2(data.recommendation || "");
        sremarks2(data.remarks || "");

        spurpose(data.purpose);
        sa_taken(data.action_taken);
        sfindings(data.finding);
        sn_action(data.pending);
        srecommendation(data.recommendation);
        sremarks(data.remarks);
    },[data])

    const spurpose3 = (e) =>{
        spurpose(e.target.value);
        spurpose2(e.target.value);
    }

    const sa_taken3 = (e) =>{
        sa_taken(e.target.value);
        sa_taken2(e.target.value);
    }

    const sfindings3 = (e) =>{
        sfindings(e.target.value);
        sfindings2(e.target.value);
    }
    const sn_action3 = (e) =>{
        sn_action(e.target.value);
        sn_action2(e.target.value);
    }
    const srecommendation3 = (e) =>{
        srecommendation(e.target.value);
        srecommendation2(e.target.value);
    }
    const sremarks3 = (e) =>{
        sremarks(e.target.value);
        sremarks2(e.target.value);
    }

    
    return(
        <div className="card h-100 mt-3">
            <div className="card-body">
                <div className="form-group">
                    <label>Purpose / Reported Concerns</label>
                    <textarea value={purpose2} onChange={spurpose3} className="form-control" required rows="4" cols="50" />                
                </div>
                <div className="form-group">
                    <label>Action Taken</label>
                    <textarea value={a_taken2} onChange={sa_taken3} className="form-control" required rows="4" cols="50" />                
                </div>
                <div className="form-group">
                    <label>Finding/s</label>
                    <textarea value={findings2} onChange={sfindings3} className="form-control" required rows="4" cols="50" />                
                </div>
                <div className="form-group">
                    <label>Next Action Item / Pending</label>
                    <textarea value={n_action2} onChange={sn_action3} className="form-control" required rows="4" cols="50" />                
                </div>
                <div className="form-group">
                    <label>Recommendation/s</label>
                    <textarea value={recommendation2} onChange={srecommendation3} className="form-control" required rows="4" cols="50" />
                </div>
                <div className="form-group">
                    <label>Remarks</label>
                    <textarea value={remarks2} onChange={sremarks3} className="form-control" required rows="4" cols="50" />                
                </div>
            </div>
        </div>
    )
}

export default Form3;