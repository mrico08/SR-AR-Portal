import {useRef} from 'react';
import Topbar from '../../portal_body/topbar';
import Sidebar from '../../portal_body/sidebar';
import Footer from '../../portal_body/footer';

function Adminhome(){
    const childRef = useRef(null);
    function btn_sidebar(){
        
    }

    return(
        <>
        <Sidebar sort_no={1}
        />
        <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
            <Topbar btn_sidebar={btn_sidebar} />
            <img className="border-radius-lg w-40 rounded mx-auto d-block mt-4" src="http://localhost:3000/images/mec-bars.png"/>
        </main>
        </>
    )
}

export default Adminhome