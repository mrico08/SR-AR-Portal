import Topbar from '../../portal_body/topbar';
import Sidebar from '../../portal_body/sidebar';
import Footer from '../../portal_body/footer';
import Dashboard from './home/dashboard';

function Delegatorhome(){

    return(
        <>
        <Sidebar />
        <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
            <Topbar />
            <Dashboard />

            <div style={{marginTop:'500px'}}>
                <Footer />
            </div>
        </main>
        </>
    )
}

export default Delegatorhome;