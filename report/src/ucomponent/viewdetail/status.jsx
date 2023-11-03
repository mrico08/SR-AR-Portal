import { useEffect,useState,useContext,Fragment } from "react";
import LocalHost from "../../portal/context";

function Status({status,reporttype,srno}){
    const [status1,sstatus1] = useState(0);
    const [details,sdetails] = useState([]);
    const local_host = useContext(LocalHost);
    const credential = JSON.parse(localStorage.getItem('credential1'));
    const jwttoken=credential[0];
    useEffect(()=>{
        if(status>0){
            sstatus1(status);
            reporthistory();
        }
    },[status])

    const [data,sdata] = useState(null);
    const reporthistory = async () =>{
        let item = {reporttype,srno,status};
        let result = await fetch('http://'+local_host+'/api/auth/r_details',{
            method: 'POST',
            body:JSON.stringify(item),
            headers:{
                "Content-Type":'application/json',
                "Accept":'application/json',
                'Authorization': "Bearer " + jwttoken,
                'X-Requested-With':'XMLHttpRequest',
            }
        });
        
        result= await result.json();
         
        if(status===2){
           sdata(result[result.length-1])
        }else{
            sdata(result);
        }

    }

    const forapprovaldetails = (item) =>{
        return(
            Object.keys(item).map((key,i) => (
                <Fragment key={i}>
                Date submitted : {item[key][3] || ""}<br />
                Submitted by : {item[key][0]}<br />
                </Fragment>
            ))
        )
    }

    const Forapproval = () =>{
        return(
            <div className="overflow-hidden position-relative border-radius-lg bg-cover h-100 mb-3" style={{'backgroundImage':'url("../assets/img/curved-images/curved0.jpg")'}}>
                <span className="mask bg-gradient-info"></span>
                <div className="card-body position-relative z-index-1 d-flex flex-column h-100 p-3">
                    <div className="d-flex flex-row bd-highlight mb-3">
                        <div className="px-2 py-5 bd-highlight">
                            <i className="fa fa-check-circle fa-2xl text-white fa-5x"></i>
                        </div>
                        <div className="p-2">
                            <h5 className="text-white font-weight-bolder mb-4 pt-2">FOR APPROVAL !</h5>
                            <p className="text-white text-sm font-weight-bold mb-0 icon-move-right mt-auto">
                                {                                                                        
                                    data &&
                                    forapprovaldetails(data)
                                }
                            </p>
                        </div>
                    </div>                
                </div>
            </div>
        )
    }

    const Forrevision = () =>{
        return(
            <div className="overflow-hidden position-relative border-radius-lg bg-cover h-100 mb-3" style={{'backgroundImage':'url("../assets/img/curved-images/curved0.jpg")'}}>
                <span className="mask bg-gradient-warning"></span>        
                <div className="card-body position-relative z-index-1 d-flex flex-column h-100 p-3">
                    <div className="d-flex flex-row bd-highlight mb-3">
                        <div className="px-2 py-5 bd-highlight">
                            <i className="fa fa-exclamation-circle fa-2xl text-white fa-5x"></i>
                        </div>
                        <div className="p-2">
                            <h5 className="text-white font-weight-bolder mb-4 pt-2">FOR REVISION !</h5>
                            <p className="text-white text-sm font-weight-bold mb-0 icon-move-right mt-auto">
                                {
                                    data &&
                                    <>
                                    Date of Returned : {data.date || ""}<br />
                                    Returned by : {data.update_by.length> 0 && data.update_by[0]}<br />
                                    Reason  : {data.notes || ""}
                                    </>
                                }
                                
                            </p>
                        </div>
                    </div>                
                </div>
            </div>
        )
    }

    const approvedetails = (item) =>{
        return(
            Object.keys(item).map((key,i) => (
                <Fragment key={i}>
                Date approved : {item[key].date || ""}<br />
                Approved by : {item[key].approver[0]}<br />
                </Fragment>
            ))
        )        
    }

    const Approvealert = () =>{ 
        return(
            <div className="overflow-hidden position-relative border-radius-lg bg-cover h-100 mb-3" style={{'backgroundImage':'url("../assets/img/curved-images/curved0.jpg")'}}>
                <span className="mask bg-gradient-success"></span>
                <div className="card-body position-relative z-index-1 d-flex flex-column h-100 p-3">
                    <div className="d-flex flex-row bd-highlight mb-3">
                        <div className="px-2 py-5 bd-highlight">
                            <i className="fa fa-check-circle fa-2xl text-white fa-5x"></i>
                        </div>
                        <div className="p-2">
                            <h5 className="text-white font-weight-bolder mb-4 pt-2">APPROVED !</h5>
                            <p className="text-white text-sm font-weight-bold mb-0 icon-move-right mt-auto">
                                {                                                                        
                                    data &&
                                    approvedetails(data)
                                }
                            </p>
                        </div>
                    </div>                
                </div>
            </div>
        )
    }



    const Cancelalert = () =>{
        return(
            <div className="overflow-hidden position-relative border-radius-lg bg-cover h-100 mb-3" style={{'backgroundImage':'url("../assets/img/curved-images/curved0.jpg")'}}>
                <span className="mask bg-gradient-danger"></span>        
                <div className="card-body position-relative z-index-1 d-flex flex-column h-100 p-3">
                    <div className="d-flex flex-row bd-highlight mb-3">
                        <div className="px-2 py-5 bd-highlight">
                            <i className="fa fa-times-circle fa-2xl text-white fa-5x"></i>
                        </div>
                        <div className="p-2">
                            <h5 className="text-white font-weight-bolder mb-4 pt-2">CANCELLED !</h5>
                            <p className="text-white text-sm font-weight-bold mb-0 icon-move-right mt-auto">
                                {
                                    data &&
                                    <>
                                    Date of cancellation : {data.date || ""}<br />
                                    Cancelled by : {data.update_by.length> 0 && data.update_by[0]}<br />
                                    Reason of Cancellation : {data.notes || ""}
                                    </>
                                }
                                
                            </p>
                        </div>
                    </div>                
                </div>
            </div>
        )
    }


    return(
        status1===1 ?
            <Forapproval />
        :
        status1===2 ?
            <Forrevision />
        :
        status1===3 ?
            <Approvealert />
        :
        status1===4 ?
            <Cancelalert />        
        :
        <></>
    )
}

export default Status;