import {useContext,useEffect,useState} from 'react';
import LocalHost from '../../../portal/context';
import SocketContext from '../../../portal/socket';


function Dashboard(){
    const socket = useContext(SocketContext);
    const local_host = useContext(LocalHost);
    const credential = JSON.parse(localStorage.getItem('credential1'));
    const jwttoken=credential[0];
    const email = credential[1].email;
    const [newr,snewr] = useState(0);
    const [forapproval,sforapproval] = useState(0);
    const [forrevision,sforrevision] = useState(0);
    const [approved,sapproved] = useState(0);
    const [cancelled,scancelled] = useState(0);

    const reportdisplay = async () =>{
        let result = await fetch('http://'+local_host+'/api/auth/se_dashboard/'+email,{
            method: 'GET',            
            headers:{
                'Authorization': "Bearer " + jwttoken,
                'X-Requested-With':'XMLHttpRequest',
            }
        })
        
        result = await result.json();
        counter(result);
    }

    useEffect(()=>{
        socket.on('auto_reflect',()=>{
            reportdisplay();
        });
        
        return(()=>{
            socket.off('auto_reflect',()=>{
                reportdisplay();
            });
        })
    },[socket])

    const counter = (data) =>{
        let new1 = 0;
        let forapproval1 = 0;
        let forrevision1 = 0;
        let approved1 = 0;
        let cancelled1 = 0;
        data.map((item,i)=>{
            if(item.status===0){
                new1 = item.count_report
            }else if(item.status===1) {
                forapproval1 = item.count_report
            }else if(item.status===2) {
                forrevision1 = item.count_report
            }else if(item.status===3) {
                approved1 = item.count_report
            }else if(item.status===4) {
                cancelled1 = item.count_report
            }  
        })


        snewr(new1);
        sforapproval(forapproval1);
        sforrevision(forrevision1);
        sapproved(approved1);
        scancelled(cancelled1);
    }

    useEffect(()=>{
        reportdisplay();
    },[])

    return(
        <div className="row mt-4 mx-3">
            <div className="col-md-3 mb-4">
                <div className="card">
                    <div className="card-body p-3">
                        <div className="row">
                            <div className="col-8">
                                <div className="numbers">
                                    <p className="text-sm mb-0 text-capitalize font-weight-bold">New SR/AR</p>
                                    <h5 className="font-weight-bolder mb-0">
                                        {newr}
                                    </h5>
                                </div>
                            </div>
                            <div className="col-4 text-end">
                                <div className="icon icon-shape bg-gradient-secondary shadow text-center border-radius-md">
                                    <i className="fa fa-newspaper text-lg opacity-10" aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-3 mb-4">
                <div className="card">
                    <div className="card-body p-3">
                        <div className="row">
                            <div className="col-8">
                                <div className="numbers">
                                    <p className="text-sm mb-0 text-capitalize font-weight-bold">For Approval</p>
                                    <h5 className="font-weight-bolder mb-0">
                                        {forapproval}
                                    </h5>
                                </div>
                            </div>
                            <div className="col-4 text-end">
                                <div className="icon icon-shape bg-gradient-info shadow text-center border-radius-md">
                                    <i className="fa fa-check-square-o text-lg opacity-10" aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-3 mb-4">
                <div className="card">
                    <div className="card-body p-3">
                        <div className="row">
                            <div className="col-8">
                                <div className="numbers">
                                    <p className="text-sm mb-0 text-capitalize font-weight-bold">For Revision</p>
                                    <h5 className="font-weight-bolder mb-0">
                                        {forrevision}
                                    </h5>
                                </div>
                            </div>
                            <div className="col-4 text-end">
                                <div className="icon icon-shape bg-gradient-warning shadow text-center border-radius-md">
                                    <i className="fa fa-edit text-lg opacity-10" aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-3 mb-4">
                <div className="card">
                    <div className="card-body p-3">
                        <div className="row">
                            <div className="col-8">
                                <div className="numbers">
                                    <p className="text-sm mb-0 text-capitalize font-weight-bold">Approved</p>
                                    <h5 className="font-weight-bolder mb-0">
                                        {approved}
                                    </h5>
                                </div>
                            </div>
                            <div className="col-4 text-end">
                                <div className="icon icon-shape bg-gradient-success shadow text-center border-radius-md">
                                    <i className="ni ni-world text-lg opacity-10" aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-3 mb-4">
                <div className="card">
                    <div className="card-body p-3">
                        <div className="row">
                            <div className="col-8">
                                <div className="numbers">
                                    <p className="text-sm mb-0 text-capitalize font-weight-bold">Cancelled</p>
                                    <h5 className="font-weight-bolder mb-0">
                                        {cancelled}
                                    </h5>
                                </div>
                            </div>
                            <div className="col-4 text-end">
                                <div className="icon icon-shape bg-gradient-danger shadow text-center border-radius-md">
                                    <i className="ni ni-fat-remove text-lg opacity-10" aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;