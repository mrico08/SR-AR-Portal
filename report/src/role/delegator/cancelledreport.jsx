import Topbar from '../../portal_body/topbar';
import Sidebar from '../../portal_body/sidebar';
import Footer from '../../portal_body/footer';
import Report from './cancelledreport/report';

function DelegatorCancelledreport(){
    const btn_sidebar = () =>{
        
    }

    return(
        <>
        <Sidebar sort_no={2}
        // ref={childRef}
        />
        <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
            <Topbar btn_sidebar={btn_sidebar} />
            <Report />
            <div style={{marginTop:'110px'}}>
                <Footer />
            </div>
        </main>
        </>
    )
}

export default DelegatorCancelledreport;