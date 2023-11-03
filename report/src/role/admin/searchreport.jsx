import {useRef} from 'react';
import Topbar from '../../portal_body/topbar';
import Sidebar from '../../portal_body/sidebar';
import AR_SR_List from './arsrsearch/arsr_list';

function Adminsearch(){
    const childRef = useRef(null);
    function btn_sidebar(){
        
    }

    return(
        <>
        <Sidebar sort_no={1}
        />
        <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
            <Topbar btn_sidebar={btn_sidebar} />
            <h3 className='text-center mt-2'>Search SR / AR</h3>
            <AR_SR_List />
        </main>
        </>
    )
}

export default Adminsearch;