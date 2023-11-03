import {useContext} from 'react';
import LocalHost from "../../../../portal/context";



function Details({data1}){
    const local_host = useContext(LocalHost);
    return(
        <div className="container-fluid mb-3">
            <div className="page-header min-height-100 border-radius-xl mt-1 mb-5">
                <img src="../images/mecbg.jpeg" alt="profile_image" className="w-100 border-radius-lg shadow-sm"/>
                <span className="mask bg-gradient-info opacity-1"></span>
            </div>

            <div className="card card-body blur shadow-blur mx-4 mt-n6 overflow-hidden">
                <div className="row gx-4">
                    <div className="col-auto">
                        <div className="avatar avatar-xl position-relative">
                            {
                                data1 &&
                                <img src={"http://"+local_host+"/profile_picture/"+data1.profile} alt="profile_image" className="w-100 border-radius-lg shadow-sm"/>
                            }

                        </div>
                    </div>

                    <div className="col-auto my-auto">
                        <div className="h-100">
                            <h5 className="mb-1">
                                {data1 && data1.name}
                            </h5>

                            <p className="mb-0 font-weight-bold text-sm">
                                {data1 && data1.role}
                            </p>

                            <p className="mb-0 font-weight-bold text-sm">
                                {data1 && data1.email}
                            </p>

                        </div>
                    </div>   
                </div>
            </div>
        </div>
    )
}

export default Details;