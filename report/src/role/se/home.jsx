import {useRef} from 'react';
import Topbar from '../../portal_body/topbar';
import Sidebar from '../../portal_body/sidebar';
import Footer from '../../portal_body/footer';
import Dashboard from "./home/dashboard";

function Sehome(){
    const childRef = useRef(null);
    function btn_sidebar(){
        
    }
    return(
        <>
        <Sidebar sort_no={1}
        />
        <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
            <Topbar btn_sidebar={btn_sidebar} />
            <Dashboard />
            <div style={{marginTop:'500px'}}>
                <Footer />
            </div>
        </main>
        </>
    )
}

export default Sehome;