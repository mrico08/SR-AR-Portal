import {useRef} from 'react';
import Topbar from '../../portal_body/topbar';
import Sidebar from '../../portal_body/sidebar';
import Footer from '../../portal_body/footer';
import Profile_Page from './profile/profile_page';

function Profile(){
    const childRef = useRef(null);
    function btn_sidebar(){
        
    }
    return(
        <>
        <Sidebar sort_no={1}
        />
        <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
            <Topbar btn_sidebar={btn_sidebar} />
            <h3 className='text-center mt-2 mb-2'>Profile Page</h3>
            <Profile_Page />
        </main>
        </>
    )
}
export default Profile;