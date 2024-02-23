import './Navbar.css';
import LoginModal from './Login';

function Navbar(){
    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="navbar-content">
                <a className="navbar-brand" href="#">Správa financí</a>
                <div className="login-component">
                    <LoginModal/>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
