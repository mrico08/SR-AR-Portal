import Topbar from '../../portal_body/topbar';
import Sidebar from '../../portal_body/sidebar';
import Footer from '../../portal_body/footer';
import Report from './forapproval/report';

function CreatorForapprovalreport(){
    return(
        <>
        <Sidebar />
        <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
            <Topbar />
            <Report />
            <div style={{marginTop:'110px'}}>
                <Footer />
            </div>
         </main>
        </>
    )
}

export default CreatorForapprovalreport;