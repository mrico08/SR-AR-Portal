import { useEffect,useState } from "react";

function Form3({sa_description,sa_assessment,sn_action,sremarks,data}){
    const [a_description2,sa_description2] = useState("");
    const [a_assessment2,sa_assessment2] = useState("");
    const [n_action2,sn_action2] = useState("");
    const [remarks2,sremarks2] = useState("");
    
    useEffect(()=>{
        sa_description2(data.a_description || "");
        sa_assessment2(data.a_assessment || "");
        sn_action2(data.pending || "");
        sremarks2(data.remarks || "");

        sa_description(data.a_description || "");
        sa_assessment(data.a_assessment || "");
        sn_action(data.pending || "");
        sremarks(data.remarks || "");
    },[data])

    const sa_description3 = (e) =>{
        sa_description(e.target.value);
        sa_description2(e.target.value);
    }

    const sa_assessment3 = (e) =>{
        sa_assessment(e.target.value);
        sa_assessment2(e.target.value);
    }
    

    const sn_action3 = (e) =>{
        sn_action(e.target.value);
        sn_action2(e.target.value);
    }

    const sremarks3 = (e) =>{
        sremarks(e.target.value);
        sremarks2(e.target.value);
    }

    return(
    <>
        <div className="card h-100 mt-3">
            <div className="card-body p-5">
                <div className="form-group">
                    <label>Activity Description</label>
                    <textarea value={a_description2} onChange={sa_description3} className="form-control" required rows="4" cols="50" />                
                </div>
                <div className="form-group">
                    <label>Activity Assessment</label>
                    <textarea value={a_assessment2} onChange={sa_assessment3} className="form-control" required rows="4" cols="50" />                
                </div>
                <div className="form-group">
                    <label>Next Action Item / Pending</label>
                    <textarea value={n_action2} onChange={sn_action3} className="form-control" required rows="4" cols="50" />                
                </div>
            </div>
        </div>

        <div className="card h-100 mt-3">
            <div className="card-body p-5">
                <div className="form-group">
                    <label>Potential Upsell / Remarks</label>
                    <textarea value={remarks2} onChange={sremarks3} className="form-control" required rows="4" cols="50" />
                </div>
            </div>
        </div>
    </>
    )
}

export default Form3;