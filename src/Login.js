import React, { useState } from 'react';
import Modal from 'react-modal';
import './Login.css';

function LoginModal() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log('Username:', username);
        console.log('Password:', password);
    };

    return (
        <div>
            <button className='btn btn-dark' onClick={() => setModalIsOpen(true)}>Login</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                className="modal-custom-style"
                contentLabel="Login Modal"
            >
                <div className="modal-box">
                    <h2 id="modal-title">Login</h2>
                    <form>
                        <label>Uživatelské jméno:</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <label>Heslo:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button type="button" className="btn btn-primary" onClick={handleLogin}>Login</button>
                        <button type="button" className="btn btn-danger" onClick={() => setModalIsOpen(false)}>Close</button>
                    </form>
                </div>
            </Modal>
        </div>
    );
}

export default LoginModal;
